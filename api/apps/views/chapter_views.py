from django.conf import settings
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django_htmx.http import trigger_client_event
from django_tables2 import RequestConfig

from api.apps.filters import ChapterFilter
from api.apps.forms import ChapterForm
from api.apps.forms import ChapterImageForm
from api.apps.forms import CommentForm
from api.apps.models import Chapter
from api.apps.models import ChapterImage
from api.apps.models import Comic
from api.apps.tables import ChapterTable
from api.users.decorators import admin_only
from api.users.decorators import user_only


@user_only
@admin_only
@require_http_methods(["GET"])
def chapter_list_view(request):
    htmx_template_name = "partials/chapters/container.html"
    template_name = "chapters/chapter_list.html"
    qs = Chapter.objects.prefetch_related("chapteritems").select_related("comic").all()
    chapter_filter = ChapterFilter(
        request.GET,
        queryset=qs,
    )
    table = ChapterTable(chapter_filter.qs)
    RequestConfig(request, paginate={"per_page": settings.PAGINATE_BY}).configure(table)  # type: ignore  # noqa: PGH003
    context = {"filter": chapter_filter, "table": table}
    if request.htmx:
        htmx_template_name += "#chapter-container"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@require_http_methods(["GET", "POST"])
def chapter_detail_hx_view(
    request,
    slug=None,
):
    if not request.htmx:
        raise Http404
    try:
        obj = get_object_or_404(Chapter, slug=slug)
        pages = obj.get_chapter_images_children()
        chapter_comic_category = obj.comic.category.name  # type: ignore  # noqa: PGH003
        chapter_comic_author = obj.comic.author.name  # type: ignore  # noqa: PGH003
        chapter_comic_artist = obj.comic.artist.name  # type: ignore  # noqa: PGH003
        chapterlookups = (
            Q(category__name__iexact=chapter_comic_category)
            | Q(author__name__iexact=chapter_comic_author)
            | Q(artist__name__iexact=chapter_comic_artist)
        )
        comics = (
            Comic.objects.prefetch_related(
                "comicitems",
                "genres",
                "followers",
                "comicchapters",
            )
            .select_related("user", "author", "category", "artist")
            .filter(chapterlookups)
            .distinct()[0:6]
        )
        comments = obj.get_comments_children()
        chapters = obj.comic.get_chapters_children()
        paginator = Paginator(chapters, 1)
        page_number = request.GET.get("page")
        try:
            page_obj = paginator.page(page_number)  # type: ignore  # noqa: PGH003
        except PageNotAnInteger:
            page_obj = paginator.page(1)

        except EmptyPage:
            page_obj = paginator.page(paginator.num_pages)
        page_obj = paginator.get_page(page_number)
        if request.method == "POST":
            commentform = CommentForm(request.POST)
            if commentform.is_valid():
                comment = commentform.save(commit=False)
                comment.user = request.user
                comment.chapter = obj
                comment.comic = obj.comic
                comment.save()
        context = {
            "items": comics,
            "object": obj,
            "comments": comments,
            "form": CommentForm(),
            "chapters": chapters,
            "object_list": page_obj,
        }
    except:  # noqa: E722
        obj = None
    if obj is None:
        return HttpResponse("Not found.")

    context = {"object": obj, "commentform": CommentForm()}
    return render(request, "partials/chapter/detail.html", context)


@require_http_methods(["GET"])
def chapter_detail_view(request, slug=None):
    hx_url = reverse("chapters:hx_chapter_detail", kwargs={"slug": slug})

    context = {"hx_url": hx_url}
    return render(request, "chapters/detail.html", context)


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def chapter_create_view(request):
    form = ChapterForm(request.POST or None)
    htmx_template_name = "partials/chapters/create.html"
    template_name = "chapters/create_chapter.html"
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        obj.numpages = obj.get_chapter_images_children().count()
        obj.save()
        success_url = obj.get_edit_url()
        if request.htmx:
            headers = {"HX-Redirect": success_url}
            return HttpResponse("Created", headers=headers)
        return redirect(success_url)
    if request.htmx:
        htmx_template_name += "#create-form-section"
        return render(request, htmx_template_name, {"form": form})
    return render(request, template_name, {"form": form})


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def chapter_update_view(request, slug=None):
    obj = get_object_or_404(Chapter, slug=slug)
    form = ChapterForm(request.POST or None, instance=obj)
    htmx_template_name = "partials/chapters/update.html"
    template_name = "chapters/update_chapter.html"
    new_chapter_image_url = reverse(
        "chapters:hx_image_create",
        kwargs={"parent_slug": obj.slug},
    )
    if form.is_valid():
        obj = form.save(commit=False)
        obj.numpages = obj.get_chapter_images_children().count()
        obj.save()
        success_url = obj.get_edit_url()
        if request.htmx:
            htmx_template_name += "#update-form-section"
            return render(
                request,
                htmx_template_name,
                {
                    "form": form,
                    "object": obj,
                    "new_chapter_image_url": new_chapter_image_url,
                },
            )
        return redirect(success_url)
    if request.htmx:
        htmx_template_name += "#update-form-section"
        return render(
            request,
            htmx_template_name,
            {
                "form": form,
                "object": obj,
                "new_chapter_image_url": new_chapter_image_url,
            },
        )
    return render(
        request,
        template_name,
        {
            "form": form,
            "object": obj,
            "new_chapter_image_url": new_chapter_image_url,
        },
    )


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def chapter_delete_view(request, slug=None):
    htmx_template_name = "partials/chapters/delete.html"
    template_name = "chapters/delete_chapter.html"
    try:
        obj = (
            Chapter.objects.prefetch_related("chapteritems")
            .select_related("comic")
            .get(slug=slug)
        )
    except:  # noqa: E722
        obj = None
    if obj is None:
        if request.htmx:
            return HttpResponse("Not Found")
        raise Http404
    if request.method == "DELETE":
        obj.delete()
        success_url = reverse("chapters:chapter_list")
        if request.htmx:
            headers = {"HX-Redirect": success_url}
            return HttpResponse("Created", headers=headers)
        return redirect(success_url)
    context = {"object": obj}
    if request.htmx:
        htmx_template_name += "#delete-form-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def chapter_image_delete_all_view(request):
    data = request.GET.getlist("mycheck", "")  # type: ignore  # noqa: PGH003

    chapter_images = ChapterImage.objects.filter(id__in=data)
    print(list(chapter_images))  # noqa: T201

    if request.htmx:
        response = HttpResponse("")
        return trigger_client_event(
            response,
            "chapter-deleted",
        )
    return render(request, "chapters/delete.html")


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def chapter_delete_all_view(request):
    data = request.GET.getlist("id", "")  # type: ignore  # noqa: PGH003

    chapters = Chapter.objects.filter(id__in=data)
    print(list(chapters))  # noqa: T201

    if request.htmx:
        response = HttpResponse("")
        return trigger_client_event(
            response,
            "chapter-deleted",
        )
    return render(request, "chapters/delete.html")


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def chapter_image_update_hx_view(
    request,
    parent_slug=None,
    id=None,  # noqa: A002
):
    template_name = "chapters/upload-image.html"
    if request.htmx:
        template_name = "partials/chapters/images-inline-form.html"
    try:
        parent_obj = (
            Chapter.objects.prefetch_related("chapteritems")
            .select_related("comic")
            .get(slug=parent_slug)
        )
    except:  # noqa: E722
        parent_obj = None
    if parent_obj is None:
        raise Http404
    instance = None
    if id is not None:
        try:
            instance = ChapterImage.objects.select_related("chapter").get(
                chapter=parent_obj,
                id=id,
            )
        except:  # noqa: E722
            instance = None
    form = ChapterImageForm(
        request.POST or None,
        request.FILES or None,
        instance=instance,
    )
    url = reverse("chapters:hx_image_create", kwargs={"parent_slug": parent_obj.slug})
    chapter_url = parent_obj.get_edit_url()
    if instance:
        url = instance.get_hx_edit_url()
    context = {"url": url, "chapter_url": chapter_url, "object": instance, "form": form}
    if form.is_valid():
        new_obj = form.save(commit=False)
        img = form.cleaned_data.get("image")
        new_obj.image = img
        new_obj.chapter = parent_obj
        new_obj.save()
        context["object"] = new_obj
        if request.htmx:
            return render(request, "partials/chapters/images-inline.html", context)

    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def chapter_image_delete_view(
    request,
    parent_slug=None,
    id=None,  # noqa: A002
):
    try:
        obj = ChapterImage.objects.select_related("chapter").get(
            chapter__slug=parent_slug,
            id=id,
        )
    except:  # noqa: E722
        obj = None
    if obj is None:
        if request.htmx:
            return HttpResponse("Not Found")
        raise Http404
    if request.method == "DELETE":
        obj.delete()
        success_url = reverse("chapters:update_chapter", kwargs={"slug": parent_slug})
        if request.htmx:
            response = HttpResponse("")
            return trigger_client_event(
                response,
                "chapter-image-deleted",
            )
        return redirect(success_url)
    context = {"object": obj}
    return render(request, "chapters/delete.html", context)
