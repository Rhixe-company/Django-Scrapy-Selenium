import django_filters
from django.db import models
from django.utils.translation import gettext_lazy as _

from project.libary.models import Category
from project.libary.models import Chapter
from project.libary.models import Comic
from project.libary.models import Genre
from project.libary.models import UserItem
from project.users.models import User
from project.users.widgets import MyAdminCheckboxSelectMultiple
from project.users.widgets import MyCheckboxSelectMultiple
from project.users.widgets import MyRadioSelect


class Order(models.TextChoices):
    LAST_UPDATES = "-updated_at", "Last Updated"
    RATING = "-rating", "Rating"
    NAMEZ = "-title", "Name (Z-A)"
    NAMEA = "title", "Name (A-Z)"


class ChapterFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(
        field_name="name",
        lookup_expr="icontains",
    )

    class Meta:
        model = Chapter
        fields = ("name",)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form.fields["name"].widget.attrs.update(
            {
                "placeholder": _("Search for chapters"),
                "class": "",
                # "hx-get": reverse_lazy("chapters:chapter_list"),
                # "hx-trigger": "keyup[target.value.length > 3] changed delay:500ms, search",  # noqa: E501
                # "hx-target": "#chapter-container",
                # "hx-indicator": ".progress",
                # "hx-swap": "outerHTML",
                # "_": "on htmx:afterOnLoad  put '' into @value of #id_name",
            },
        )


class MyMultipleChoiceFilter(django_filters.ModelMultipleChoiceFilter):
    def filter(self, qs, value):
        if value:
            qs = super().filter(qs, value)
        return qs


class ComicFilter(django_filters.FilterSet):
    category = MyMultipleChoiceFilter(
        queryset=Category.objects.all(),
        label=_("Categorys"),
        field_name="category__name",
        lookup_expr="in",
        widget=MyAdminCheckboxSelectMultiple,
    )
    genres = MyMultipleChoiceFilter(
        queryset=Genre.objects.all(),
        widget=MyAdminCheckboxSelectMultiple,
        lookup_expr="in",
        field_name="genres__name",
        to_field_name="name",
    )
    status = django_filters.ChoiceFilter(
        choices=Comic.ComicStatus.choices,
        empty_label=None,
        widget=MyRadioSelect(),
    )
    updated_at = django_filters.ChoiceFilter(
        choices=Order.choices,
        empty_label=None,
        widget=MyRadioSelect(),
    )

    title = django_filters.CharFilter(
        field_name="title",
        lookup_expr="icontains",
    )

    class Meta:
        model = Comic
        fields = ("title", "category", "status", "genres", "updated_at")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form.fields["title"].widget.attrs.update(
            {
                "placeholder": _("Search for comics"),
                "class": "",
                "type": "search",
                # "hx-get": reverse_lazy("comics:comic_list"),
                # "hx-trigger": "keyup[target.value.length > 3] changed delay:500ms, search",  # noqa: E501
                # "hx-target": "#comic-container",
                # "hx-indicator": ".progress",
                # "hx-swap": "outerHTML",
                # "_": "on htmx:afterOnLoad  put '' into @value of #id_title",
                # "_": "on input show <tbody>tr/> in closest <table/> when its textContent.toLowerCase() contains my value.toLowerCase()",  # noqa: E501, ERA001
            },
        )
        self.form.fields["genres"].widget.attrs.update(
            {
                "class": "",
            },
        )
        self.form.fields["category"].widget.attrs.update(
            {
                "class": "",
                # "hx-get": reverse_lazy("comics:comic_list"),
                # "hx-trigger": "change delay:1s",
                # "hx-target": "#comic-container",
                # "hx-indicator": ".progress",
                # "hx-swap": "outerHTML",
                # "hx-replace-url": "true",
            },
        )


class UserFilter(django_filters.FilterSet):
    cemail = django_filters.CharFilter(
        field_name="email",
        lookup_expr="icontains",
    )

    class Meta:
        model = User
        fields = ("cemail",)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form.fields["cemail"].widget.attrs.update(
            {
                "placeholder": _("Search for users"),
                "class": "",
                # "hx-get": reverse_lazy("users:user_list"),
                # "hx-trigger": "keyup[target.value.length > 3] changed delay:500ms, search",  # noqa: E501
                # "hx-target": "#user-container",
                # "hx-indicator": ".progress",
                # "hx-swap": "outerHTML",
                # "_": "on htmx:afterOnLoad  put '' into @value of #id_cemail",
            },
        )


class SearchFilter(django_filters.FilterSet):
    category = MyMultipleChoiceFilter(
        queryset=Category.objects.all(),
        label=_("Categorys"),
        field_name="category__name",
        lookup_expr="in",
        widget=MyAdminCheckboxSelectMultiple,
    )
    genres = MyMultipleChoiceFilter(
        queryset=Genre.objects.all(),
        widget=MyCheckboxSelectMultiple,
        lookup_expr="in",
        field_name="genres__name",
        to_field_name="name",
    )
    status = django_filters.ChoiceFilter(
        choices=Comic.ComicStatus.choices,
        empty_label=None,
        widget=MyRadioSelect(),
    )
    updated_at = django_filters.ChoiceFilter(
        choices=Order.choices,
        empty_label=None,
        widget=MyRadioSelect(),
    )

    search = django_filters.CharFilter(
        field_name="title",
        lookup_expr="icontains",
    )

    class Meta:
        model = Comic
        fields = ("search", "category", "status", "genres", "updated_at")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form.fields["search"].widget.attrs.update(
            {
                "placeholder": _("Search for comics"),
                "class": "",
            },
        )
        self.form.fields["genres"].widget.attrs.update(
            {
                "class": "",
            },
        )
        self.form.fields["category"].widget.attrs.update(
            {
                "class": "",
            },
        )


class UserItemFilter(django_filters.FilterSet):
    class Meta:
        model = UserItem
        fields = {
            "order": ["exact", "lt", "gt", "range"],
        }
