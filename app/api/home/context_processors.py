from datetime import timedelta

from django.db.models import Q
from django.utils.timezone import now

from api.libary.filters import SearchFilter
from api.libary.models import Comic


def load(request):
    week = now() - timedelta(weeks=1)
    month = now() - timedelta(weeks=4)
    comics = Comic.objects.filter(
        Q(rating__gte=9.9)
        | Q(status=Comic.ComicStatus.ONGOING)
        | Q(status=Comic.ComicStatus.COMPLETED),
    )
    weekcomics = Comic.objects.filter(
        Q(rating__gte=9.9) & Q(updated_at__gte=week),
    )
    monthcomics = Comic.objects.filter(
        Q(rating__gte=9.9) & Q(updated_at__gt=month),
    )
    myfilter = SearchFilter()

    return {
        "monthlycomics": monthcomics[0:10],
        "weeklycomics": weekcomics[0:10],
        "allcomics": comics[0:10],
        "myfilter": myfilter,
    }
