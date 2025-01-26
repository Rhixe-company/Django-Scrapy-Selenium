from django.conf import settings
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import Http404
from django.http import HttpRequest
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django_htmx.http import trigger_client_event
from django_htmx.middleware import HtmxDetails

from api.apps.filters import ComicFilter
from api.apps.forms import ComicForm
from api.apps.forms import ComicImageForm
from api.apps.forms import CommentForm
from api.apps.models import Comic
from api.apps.models import ComicImage
from api.users.decorators import admin_only
from api.users.decorators import user_only


# Typing pattern recommended by django-stubs:
# https://github.com/typeddjango/django-stubs#how-can-i-create-a-httprequest-thats-guaranteed-to-have-an-authenticated-user
class HtmxHttpRequest(HttpRequest):
    htmx: HtmxDetails


@user_only
@admin_only
@require_http_methods(["GET"])
def comic_list_view(
    request: HtmxHttpRequest,
) -> HttpResponse:
    title = request.GET.get("title")
    types = request.GET.getlist("type")
    status = request.GET.get("status")
    updated_at = request.GET.get("updated_at")
    genres = request.GET.getlist("genres")
    titleq = title if title is not None else ""
    statusq = status if status is not None else ""
    typesq = types if types is not None else ""
    genresq = genres if genres is not None else ""
    updated_atq = updated_at if updated_at is not None else ""
    if titleq:
        qs = Comic.objects.search(query=titleq)
    elif statusq:
        qs = Comic.objects.filter(Q(status__icontains=statusq))
    elif typesq:
        qs = Comic.objects.filter(Q(type__name__in=typesq))
    elif genresq:
        qs = Comic.objects.filter(Q(genres__name__in=genresq))
    elif updated_atq:
        qs = Comic.objects.all().order_by(updated_atq)
    else:
        qs = Comic.objects.all()

    comic_filter = ComicFilter(
        request.GET,
        queryset=qs,
    )
    paginator = Paginator(qs, settings.PAGINATE_BY)
    page_number = request.GET.get("page")
    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)

    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    page_obj = paginator.get_page(page_number)
    htmx_template_name = "partials/comics/container.html"
    template_name = "comics/comic_list.html"
    context = {"filter": comic_filter, "object_list": page_obj}
    if request.htmx:
        htmx_template_name += "#container-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@require_http_methods(["GET"])
def comic_detail_hx_view(
    request: HtmxHttpRequest,
    slug=None,
) -> HttpResponse:
    if not request.htmx:
        raise Http404
    try:
        obj = get_object_or_404(Comic, slug=slug)
        comic_type = obj.type.name
        comic_author = obj.author.name
        comic_artist = obj.artist.name
        comiclookups = (
            Q(type__name__iexact=comic_type)
            | Q(author__name__iexact=comic_author)
            | Q(artist__name__iexact=comic_artist)
        )
        comics = (
            Comic.objects.prefetch_related(
                "comicitems",
                "genres",
                "followers",
                "comicchapters",
            )
            .select_related("user", "author", "type", "artist")
            .filter(comiclookups)
            .distinct()[0:5]
        )
        form = CommentForm()
    except:  # noqa: E722
        obj = None
    if obj is None:
        return HttpResponse("Not found.")

    context = {"items": comics, "object": obj, "commentform": form}
    return render(request, "partials/comic/detail.html", context)


@require_http_methods(["GET"])
def comic_detail_view(request: HtmxHttpRequest, slug=None) -> HttpResponse:
    hx_url = reverse("comics:hx_comic_detail", kwargs={"slug": slug})

    context = {"hx_url": hx_url}
    return render(request, "comics/detail.html", context)


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def comic_create_view(
    request: HtmxHttpRequest,
) -> HttpResponse:
    form = ComicForm(request.POST or None)
    context = {
        "form": form,
    }
    htmx_template_name = "partials/comics/create.html"
    template_name = "comics/add_comic.html"
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        obj.numChapters = obj.get_chapters_children().count()
        obj.numItems = obj.get_comic_images_children().count()
        obj.save()
        form.save_m2m()
        success_url = obj.get_edit_url()
        if request.htmx:
            headers = {"HX-Redirect": success_url}
            return HttpResponse("Created", headers=headers)
        return redirect(success_url)
    if request.htmx:
        htmx_template_name += "#form-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def comic_update_view(request: HtmxHttpRequest, slug=None) -> HttpResponse:
    obj = get_object_or_404(Comic, slug=slug)
    form = ComicForm(request.POST or None, instance=obj)
    htmx_template_name = "partials/comics/update.html"
    template_name = "comics/update_comic.html"
    new_comic_image_url = reverse(
        "comics:hx_image_create",
        kwargs={"parent_slug": obj.slug},
    )
    context = {"form": form, "object": obj, "new_comic_image_url": new_comic_image_url}
    if form.is_valid():
        obj = form.save(commit=False)
        obj.numchapters = obj.get_chapters_children().count()
        obj.numitems = obj.get_comic_images_children().count()
        obj.save()
        form.save_m2m()
        success_url = obj.get_edit_url()
        if request.htmx:
            headers = {"HX-Redirect": success_url}
            return HttpResponse("Created", headers=headers)
        return redirect(success_url)
    if request.htmx:
        htmx_template_name += "#form-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def comic_delete_view(request: HtmxHttpRequest, slug=None) -> HttpResponse:
    try:
        obj = (
            Comic.objects.prefetch_related(
                "comicitems",
                "comicchapters",
                "genres",
                "followers",
            )
            .select_related("author", "type", "artist", "user")
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
        success_url = reverse("comics:comic_list")
        if request.htmx:
            response = HttpResponse("")
            return trigger_client_event(
                response,
                "comic-deleted",
            )
        return redirect(success_url)
    context = {"object": obj}
    return render(request, "comics/delete.html", context)


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def comic_images_update_hx_view(
    request: HtmxHttpRequest,
    parent_slug=None,
    id=None,  # noqa: A002
) -> HttpResponse:
    if not request.htmx:
        raise Http404
    try:
        parent_obj = (
            Comic.objects.prefetch_related(
                "comicitems",
                "comicchapters",
                "genres",
                "followers",
            )
            .select_related("author", "type", "artist", "user")
            .get(slug=parent_slug)
        )
    except:  # noqa: E722
        parent_obj = None
    if parent_obj is None:
        return HttpResponse("Not found.")
    instance = None
    if id is not None:
        try:
            instance = ComicImage.objects.select_related("comic").get(
                comic=parent_obj,
                id=id,
            )
        except:  # noqa: E722
            instance = None
    form = ComicImageForm(
        request.POST or None,
        request.FILES or None,
        instance=instance,
    )
    url = reverse("comics:hx_image_create", kwargs={"parent_slug": parent_obj.slug})
    comic_url = parent_obj.get_edit_url()
    if instance:
        url = instance.get_hx_edit_url()
    context = {"url": url, "comic_url": comic_url, "object": instance, "form": form}
    if form.is_valid():
        new_obj = form.save(commit=False)
        new_obj.comic = parent_obj
        new_obj.save()
        context["object"] = new_obj
        return render(request, "partials/comics/images-inline.html", context)

    return render(request, "partials/comics/images-inline-form.html", context)


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def comic_images_delete_view(
    request: HtmxHttpRequest,
    parent_slug=None,
    id=None,  # noqa: A002
) -> HttpResponse:
    try:
        obj = ComicImage.objects.select_related("comic").get(
            comic__slug=parent_slug,
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
        success_url = reverse("comics:update_comic", kwargs={"slug": parent_slug})
        if request.htmx:
            response = HttpResponse("")
            return trigger_client_event(
                response,
                "comic-image-deleted",
            )
        return redirect(success_url)
    context = {"object": obj}
    return render(request, "comics/delete.html", context)
