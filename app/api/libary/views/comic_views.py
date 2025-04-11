from django.shortcuts import get_object_or_404
from django.shortcuts import render

from api.libary.forms import ComicForm
from api.libary.models import Comic
from api.libary.tables import ComicTable


def comic_list_view(request):
    qs = (
        Comic.objects.prefetch_related(
            "comicimages",
            "genres",
            "users",
            "comicchapters",
        )
        .select_related("user", "author", "category", "artist", "website")
        .all()
    )
    table = ComicTable(qs)
    context = {
        "table": table,
    }
    return render(request, "libary/comics/list.html", context)


def comic_detail_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "object": comic,
    }
    return render(request, "libary/comics/detail.html", context)


def comic_update_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "form": ComicForm(instance=comic),
        "object": comic,
    }
    if request.method == "POST":
        form = ComicForm(request.POST, instance=comic)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.numchapters = obj.get_chapters().count()
            obj.numimages = obj.get_comic_images().count()
            obj.save()
            form.save_m2m()
            context.update({"object": obj, "form": form})

    return render(request, "libary/comics/update_form.html", context)


def comic_delete_view(request, slug=None):
    comic = get_object_or_404(Comic, slug=slug)
    context = {
        "object": comic,
    }
    if request.method == "POST":
        comic.delete()

    return render(request, "libary/comics/delete.html", context)
