from datetime import timedelta

from django.utils.timezone import now

from api.libary.filters import SearchFilter
from api.libary.models import Comic


def load(request):
    week = now() - timedelta(weeks=1)
    month = now() - timedelta(weeks=4)
    comics = Comic.objects.all()
    weekcomics = Comic.objects.get_updated_at(week)  # type: ignore  # noqa: PGH003
    monthcomics = Comic.objects.get_updated_at(month)  # type: ignore  # noqa: PGH003
    myfilter = SearchFilter()

    return {
        "monthlycomics": monthcomics[0:10],
        "weeklycomics": weekcomics[0:10],
        "allcomics": comics[0:10],
        "myfilter": myfilter,
    }
