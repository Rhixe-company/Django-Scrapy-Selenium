from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.shortcuts import render

from api.libary.decorators import admin_only
from api.libary.decorators import user_only
from api.libary.forms import ComicImageForm
from api.libary.models import Comic
from api.libary.models import ComicImage


@admin_only
@user_only
def create_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    if request.method == "POST":
        form = ComicImageForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.comic = comic
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
        }
        return render(request, "libary/comicimages/create_form.html", context)
    context = {
        "form": ComicImageForm(),
        "object": comic,
    }
    return render(request, "libary/comicimages/create_form.html", context)


@admin_only
@user_only
def update_view(request, slug=None, pk=None):
    comicimage = get_object_or_404(ComicImage, pk=pk)
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "form": ComicImageForm(instance=comicimage),
        "object": comicimage,
    }
    if request.method == "POST":
        form = ComicImageForm(request.POST, request.FILES, instance=comicimage)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.comic = comic
            obj.save()
            form.save_m2m()
            success_url = obj.get_update_url()
            return HttpResponseRedirect(success_url)
        context = {
            "form": form,
            "object": comicimage,
        }
        return render(request, "libary/comicimages/update_form.html", context)

    return render(request, "libary/comicimages/update_form.html", context)


@admin_only
@user_only
def delete_view(request, slug=None, pk=None):
    comicimage = get_object_or_404(ComicImage, pk=pk)
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "object": comicimage,
    }
    if request.method == "POST":
        comicimage.delete()
        success_url = comic.get_update_url()
        return HttpResponseRedirect(success_url)

    return render(request, "libary/comicimages/delete.html", context)
