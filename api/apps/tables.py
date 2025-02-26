import django_tables2 as tables
from django.conf import settings
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from api.apps.models import Chapter
from api.apps.models import Comic
from api.users.models import User


class MaterializeCssCheckboxColumn(tables.CheckBoxColumn):
    def render(self, value, bound_column, record):
        default = {"type": "checkbox", "name": bound_column.name, "value": value}
        if self.is_checked(value, record):
            default.update({"checked": "checked"})

        general = self.attrs.get("input")
        specific = self.attrs.get("td__input")
        attrs = tables.utils.AttributeDict(default, **(specific or general or {}))
        html = f"<div class='flex items-center'><input class='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600' {attrs.as_html()}/><label class='sr-only'></label></div>"  # noqa: E501
        return mark_safe(html)  # noqa: S308


class MyChoiceColumn(tables.Column):
    def render(self, value):
        if value == "Ongoing":
            html = f"<span class='cus_ongoing'>{value}</span>"
        elif value == "Completed":
            html = f"<span class='cus_completed'>{value}</span>"
        elif value == "Dropped":
            html = f"<span class='cus_dropped'>{value}</span>"
        elif value == "Hiatus":
            html = f"<span class='cus_hiatus'>{value}</span>"
        elif value == "Season End":
            html = f"<span class='cus_season_end'>{value}</span>"
        elif value == "Coming Soon":
            html = f"<span class='cus_coming_soon'>{value}</span>"
        else:
            html = "None"
        return format_html(html)


class ComicCustomColumn(tables.Column):
    def render(self, record):
        img = record.get_comic_images_children().first()
        if img.image:
            html = f"<img class='w-10 h-10 rounded-full' alt='{record.title} avatar' src='{img.image.url}' /><div class='text-sm font-normal text-gray-500 dark:text-gray-400'><div class='text-base font-semibold text-gray-900 dark:text-white'><a href='{record.get_absolute_url()}'>{record.title}</a></div><div class='text-sm font-normal text-gray-500 dark:text-gray-400'>{record.category.name}</div></div>"  # noqa: E501
        else:
            html = f"<div class='text-sm font-normal text-gray-500 dark:text-gray-400'><div class='text-base font-semibold text-gray-900 dark:text-white'><a href='{record.get_absolute_url()}'>{record.title}</a></div><div class='text-sm font-normal text-gray-500 dark:text-gray-400'>{record.category.name}</div></div>"  # noqa: E501
        return format_html(html)


class ChapterCustomColumn(tables.Column):
    def render(self, value, record):
        pass


class UserCustomColumn(tables.Column):
    def render(self, value, record):
        pass


# class ImageColumn(tables.Column):
#     def render(self, value):
#         return format_html('<img src="{}" />', value.url)  # noqa: ERA001


class ComicTable(tables.Table):
    actions = tables.TemplateColumn(
        orderable=True,
        template_name="partials/comics/table_actions.html",
    )

    # url = tables.URLColumn()
    updated_at = tables.DateColumn(orderable=True, format=settings.FORMAT)
    check = MaterializeCssCheckboxColumn(accessor="id")
    comic = ComicCustomColumn(linkify=False, accessor="title", verbose_name="Comic")
    status = MyChoiceColumn(accessor="status")

    class Meta:
        model = Comic
        sequence = (
            "check",
            "comic",
            "status",
            "rating",
            # "url",
            "updated_at",
            "actions",
        )
        fields = (
            "check",
            "comic",
            "status",
            "rating",
            # "url",
            "updated_at",
            "actions",
        )
        unlocalize = (
            # "comic",
            "rating",
        )
        localize = ("id",)
        template_name = "partials/comics/tailwind.html"
        attrs = {
            "class": "mytable",
            "td": {
                "class": "mytablecol",
            },
            "th": {
                "_ordering": {
                    "orderable": "sortable",  # Instead of `orderable`
                    "ascending": "ascend",  # Instead of `asc`
                    "descending": "descend",  # Instead of `desc`
                },
            },
        }
        row_attrs = {"id": lambda record: record.pk, "class": "mytablerow"}


class ChapterTable(tables.Table):
    id = MaterializeCssCheckboxColumn(orderable=True)
    chapter = tables.TemplateColumn(
        orderable=True,
        template_name="partials/chapters/table_chapter.html",
    )
    actions = tables.TemplateColumn(
        orderable=True,
        template_name="partials/chapters/table_actions.html",
    )
    updated_at = tables.DateColumn(orderable=True, format=settings.FORMAT)

    class Meta:
        model = Chapter
        sequence = (
            "id",
            "chapter",
            "comic",
            "numpages",
            "updated_at",
            "actions",
        )
        fields = (
            "id",
            "chapter",
            "comic",
            "numpages",
            "updated_at",
            "actions",
        )
        template_name = "partials/chapters/tailwind.html"
        attrs = {
            "class": "mytable",
            "td": {
                "class": "mytablecol",
            },
            "th": {
                "_ordering": {
                    "orderable": "sortable",  # Instead of `orderable`
                    "ascending": "ascend",  # Instead of `asc`
                    "descending": "descend",  # Instead of `desc`
                },
            },
        }
        row_attrs = {"data-id": lambda record: record.pk, "class": "mytablerow"}

    def render_comic(self, record):
        value = record.comic.get_comic_images_children().first().image.url
        return format_html(
            '<img class="size-10 rounded-full object-cover" src="{}" />',
            value,
        )


class UserTable(tables.Table):
    id = MaterializeCssCheckboxColumn(orderable=True)
    user = tables.TemplateColumn(
        orderable=True,
        template_name="partials/users/table_user.html",
    )
    actions = tables.TemplateColumn(
        orderable=True,
        template_name="partials/users/table_actions.html",
    )
    # image = ImageColumn(accessor="image")  # noqa: ERA001

    class Meta:
        model = User
        sequence = (
            "id",
            "user",
            # "image",
            "first_name",
            "last_name",
            "is_active",
            "is_superuser",
            "actions",
        )
        fields = (
            "id",
            "user",
            # "image",
            "first_name",
            "last_name",
            "is_active",
            "is_superuser",
            "actions",
        )
        unlocalize = ("user",)
        localize = ("id",)
        template_name = "partials/users/tailwind.html"
        attrs = {
            "class": "mytable",
            "td": {
                "class": "mytablecol",
            },
            "th": {
                "_ordering": {
                    "orderable": "sortable",  # Instead of `orderable`
                    "ascending": "ascend",  # Instead of `asc`
                    "descending": "descend",  # Instead of `desc`
                },
            },
        }
        row_attrs = {"data-id": lambda record: record.pk, "class": "mytablerow"}

    def render_is_active(self, value):
        if value is True:
            return format_html(
                '<div class="flex items-center"><div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{}</div>',  # noqa: E501
                value,
            )

        return format_html(
            '<div class="flex items-center"><div class="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>{}</div>',  # noqa: E501
            value,
        )

    def render_is_superuser(self, value):
        if value is True:
            return format_html(
                '<div class="flex items-center"><div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{}</div>',  # noqa: E501
                value,
            )

        return format_html(
            '<div class="flex items-center"><div class="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>{}</div>',  # noqa: E501
            value,
        )
