from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.urls import reverse
from django_tables2 import RequestConfig

from api.libary.decorators import admin_only
from api.libary.decorators import user_only
from api.libary.filters import ChapterFilterSet
from api.libary.forms import ChapterForm
from api.libary.forms import CommentForm
from api.libary.models import Chapter
from api.libary.tables import ChapterTable


@admin_only
@user_only
def list_view(request):
    f = ChapterFilterSet(
        request.GET,
        queryset=Chapter.objects.prefetch_related(
            "chapterimages",
        )
        .select_related("comic", "website")
        .all(),
    )
    table = ChapterTable(f.qs)
    RequestConfig(request, paginate={"per_page": 30}).configure(table)  # type: ignore  # noqa: PGH003
    context = {
        "table": table,
        "filter": f,
    }
    return render(request, "libary/chapters/list.html", context)


@admin_only
@user_only
def detail_view(request, slug=None):
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "object": chapter,
        "form": CommentForm(),
    }
    if request.method == "POST":
        form = CommentForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            obj.chapter = chapter
            obj.comic = chapter.comic
            obj.save()
            success_url = chapter.get_absolute_url()
            return HttpResponseRedirect(success_url)
        return render(request, "libary/chapters/detail.html", context)
    return render(request, "libary/chapters/detail.html", context)


@admin_only
@user_only
def create_view(request):
    if request.method == "POST":
        form = ChapterForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
        }
        return render(request, "libary/chapters/create_form.html", context)
    context = {
        "form": ChapterForm(),
    }
    return render(request, "libary/chapters/create_form.html", context)


@admin_only
@user_only
def update_view(request, slug=None):
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "form": ChapterForm(instance=chapter),
        "object": chapter,
    }
    if request.method == "POST":
        form = ChapterForm(request.POST, request.FILES, instance=chapter)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
            "object": chapter,
        }
        return render(request, "libary/chapters/update_form.html", context)

    return render(request, "libary/chapters/update_form.html", context)


@admin_only
@user_only
def delete_view(request, slug=None):
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "object": chapter,
    }
    if request.method == "POST":
        chapter.delete()
        success_url = reverse("chapters:list")
        return HttpResponseRedirect(success_url)

    return render(request, "libary/chapters/delete.html", context)
