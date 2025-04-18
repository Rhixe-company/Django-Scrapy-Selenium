from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.urls import reverse
from django_tables2 import RequestConfig

from api.libary.decorators import admin_only
from api.libary.decorators import user_only
from api.libary.filters import ComicFilterSet
from api.libary.forms import ComicForm
from api.libary.forms import CommentForm
from api.libary.models import Comic
from api.libary.tables import ComicTable


@admin_only
@user_only
def list_view(request):
    f = ComicFilterSet(
        request.GET,
        queryset=Comic.objects.prefetch_related(
            "comicimages",
            "genres",
            "users",
            "comicchapters",
        )
        .select_related("user", "author", "category", "artist", "website")
        .all(),
    )
    table = ComicTable(f.qs)
    RequestConfig(request, paginate={"per_page": 30}).configure(table)  # type: ignore  # noqa: PGH003
    context = {
        "table": table,
        "filter": f,
    }
    return render(request, "libary/comics/list.html", context)


@admin_only
@user_only
def detail_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "object": comic,
        "form": CommentForm(),
    }
    if request.method == "POST":
        form = CommentForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            obj.comic = comic
            obj.save()
            success_url = comic.get_absolute_url()
            return HttpResponseRedirect(success_url)
        return render(request, "libary/comics/detail.html", context)
    return render(request, "libary/comics/detail.html", context)


@admin_only
@user_only
def create_view(request):
    if request.method == "POST":
        form = ComicForm(request.POST, request.FILES)
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
        return render(request, "libary/comics/create_form.html", context)
    context = {
        "form": ComicForm(),
    }
    return render(request, "libary/comics/create_form.html", context)


@admin_only
@user_only
def update_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "form": ComicForm(instance=comic),
        "object": comic,
    }
    if request.method == "POST":
        form = ComicForm(request.POST, request.FILES, instance=comic)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
            "object": comic,
        }
        return render(request, "libary/comics/update_form.html", context)

    return render(request, "libary/comics/update_form.html", context)


@admin_only
@user_only
def delete_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "object": comic,
    }
    if request.method == "POST":
        comic.delete()
        success_url = reverse("comics:list")
        return HttpResponseRedirect(success_url)

    return render(request, "libary/comics/delete.html", context)
