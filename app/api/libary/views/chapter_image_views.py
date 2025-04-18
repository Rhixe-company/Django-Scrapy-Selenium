from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.shortcuts import render

from api.libary.decorators import admin_only
from api.libary.decorators import user_only
from api.libary.forms import ChapterImageForm
from api.libary.models import Chapter
from api.libary.models import ChapterImage


@admin_only
@user_only
def create_view(request, slug=None):
    chapter = get_object_or_404(Chapter, slug=slug)
    if request.method == "POST":
        form = ChapterImageForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.chapter = chapter
            obj.comic = chapter.comic
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
        }
        return render(request, "libary/chapterimages/create_form.html", context)
    context = {
        "form": ChapterImageForm(),
        "object": chapter,
    }
    return render(request, "libary/chapterimages/create_form.html", context)


@admin_only
@user_only
def update_view(request, slug=None, pk=None):
    chapterimage = get_object_or_404(ChapterImage, pk=pk)
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "form": ChapterImageForm(instance=chapterimage),
        "object": chapterimage,
    }
    if request.method == "POST":
        form = ChapterImageForm(request.POST, request.FILES, instance=chapterimage)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.chapter = chapter
            obj.comic = chapter.comic
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
            "object": chapterimage,
        }
        return render(request, "libary/chapterimages/update_form.html", context)

    return render(request, "libary/chapterimages/update_form.html", context)


@admin_only
@user_only
def delete_view(request, slug=None, pk=None):
    chapterimage = get_object_or_404(ChapterImage, pk=pk)
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "object": chapterimage,
    }
    if request.method == "POST":
        chapterimage.delete()
        success_url = chapter.get_update_url()
        return HttpResponseRedirect(success_url)

    return render(request, "libary/chapterimages/delete.html", context)
