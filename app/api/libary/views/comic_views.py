from django.shortcuts import get_object_or_404
from django.shortcuts import render

from api.libary.models import Comic


def comic_list_view(request):
    context = {
        "comics": Comic.objects.all(),
    }
    return render(request, "libary/comic_list.html", context)


def comic_detail_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "comic": comic,
    }
    return render(request, "libary/comic.html", context)
