from django.shortcuts import get_object_or_404
from django.shortcuts import render

from api.libary.models import Chapter


def chapter_list_view(request):
    context = {
        "chapters": Chapter.objects.all(),
    }
    return render(request, "libary/chapter_list.html", context)


def chapter_detail_view(request, slug=None):
    chapter = get_object_or_404(Chapter, slug=slug)
    context = {
        "chapter": chapter,
    }
    return render(request, "libary/chapter.html", context)
