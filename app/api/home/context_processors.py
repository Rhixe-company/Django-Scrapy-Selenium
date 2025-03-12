from datetime import timedelta

from django.http import HttpRequest
from django.utils.timezone import now

from api.apps.filters import SearchFilter
from api.apps.models import Comic


def load(request: HttpRequest) -> dict[str, str]:
    oneweek = now() - timedelta(weeks=4)
    onemonth = now() - timedelta(weeks=8)
    weekcomics = Comic.objects.get_updated_at(oneweek)
    monthcomics = Comic.objects.get_updated_at(onemonth)
    allc = Comic.objects.all()

    return {
        "moncomics": monthcomics[0:10],
        "weeklycomics": weekcomics[0:10],
        "allcomics": allc[0:10],
        "myfilter": SearchFilter(),
    }
