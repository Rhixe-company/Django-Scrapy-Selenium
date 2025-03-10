from django.db.models import Max

from api.apps.models import UserItem


def get_max_order(user) -> int:
    existing_comics = UserItem.objects.filter(user=user)
    if not existing_comics.exists():
        return 1
    current_max = existing_comics.aggregate(max_order=Max("order"))["max_order"]
    return current_max + 1


def reorder(user):
    existing_comics = UserItem.objects.filter(user=user)
    if not existing_comics.exists():
        return
    number_of_comics = existing_comics.count()
    new_ordering = range(1, number_of_comics + 1)

    for order, user_comic in zip(new_ordering, existing_comics, strict=False):
        user_comic.order = order
        user_comic.save()
