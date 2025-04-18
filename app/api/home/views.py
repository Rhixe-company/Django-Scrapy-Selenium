from django.db.models import Q
from django.shortcuts import render

from api.libary.models import Comic


def index(request):
    context = {
        "comics": Comic.objects.all()[0:16],
        "topcomics": Comic.objects.filter(
            Q(numimages__gt=1)
            & Q(status=Comic.ComicStatus.ONGOING)
            & Q(rating__gte=9.9),
        )[0:10],
        "featuredcomics": Comic.objects.filter(
            Q(status=Comic.ComicStatus.ONGOING) | Q(status=Comic.ComicStatus.COMPLETED),
        )[0:5],
    }
    return render(request, "home/index.html", context)


def series(request):
    context = {}
    return render(request, "home/series.html", context)


def bookmarks(request):
    context = {}
    return render(request, "home/bookmarks.html", context)


def privacy(request):
    context = {}
    return render(request, "home/privacy.html", context)


def dmca(request):
    context = {}
    return render(request, "home/dmca.html", context)


def terms(request):
    context = {}
    return render(request, "home/terms.html", context)
