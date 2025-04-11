from django.shortcuts import get_object_or_404
from django.shortcuts import render

from api.libary.models import Chapter


def list_view(request):
    context = {
        "chapters": Chapter.objects.all(),
    }
    return render(request, "libary/chapters/list.html", context)


def detail_view(request, slug=None):
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "chapter": chapter,
    }
    return render(request, "libary/chapters/detail.html", context)
