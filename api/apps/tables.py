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


class ImageColumn(tables.Column):
    def render(self, value):
        return format_html('<img src="{}" />', value)


class ComicTable(tables.Table):
    comic = tables.TemplateColumn(
        orderable=True,
        template_name="partials/comics/table_comic.html",
    )
    actions = tables.TemplateColumn(
        orderable=True,
        template_name="partials/comics/table_actions.html",
    )

    updated_at = tables.DateColumn(orderable=True, format=settings.FORMAT)
    check = MaterializeCssCheckboxColumn(accessor="id")

    class Meta:
        model = Comic
        sequence = (
            "check",
            "comic",
            "status",
            "rating",
            "updated_at",
            "actions",
        )
        fields = (
            "check",
            "comic",
            "status",
            "rating",
            "updated_at",
            "actions",
        )
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

    def render_status(self, value):  # noqa: PLR0911
        if value.lower() == "completed":
            return format_html(
                "<span class='mr-2 rounded-md border border-green-100 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:border-green-500 dark:bg-gray-700 dark:text-green-400'>{}</span>",  # noqa: E501
                value,
            )
        if value.lower() == "dropped":
            return format_html(
                "<span class='mr-2 rounded-md border border-red-100 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:border-red-500 dark:bg-gray-700 dark:text-red-400'>{}</span>",  # noqa: E501
                value,
            )
        if value.lower() == "hiatus":
            return format_html(
                "<span class='mr-2 rounded-md border border-blue-100 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:border-blue-500 dark:bg-gray-700 dark:text-blue-400'>{}</span>",  # noqa: E501
                value,
            )
        if value.lower() == "season end":
            return format_html(
                "<span class='mr-2 rounded-md border border-orange-100 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:border-orange-500 dark:bg-gray-700 dark:text-orange-400'>{}</span>",  # noqa: E501
                value,
            )
        if value.lower() == "coming soon":
            return format_html(
                "<span class='mr-2 rounded-md border border-violet-100 bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:border-violet-500 dark:bg-gray-700 dark:text-violet-400'>{}</span>",  # noqa: E501
                value,
            )
        if value.lower() == "ongoing":
            return format_html(
                "<span class='mr-2 rounded-md border border-purple-100 bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:border-purple-500 dark:bg-gray-700 dark:text-purple-400'>{}</span>",  # noqa: E501
                value,
            )
        return None


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
    image = ImageColumn("image")

    class Meta:
        model = User
        sequence = (
            "id",
            "user",
            "image",
            "is_active",
            "actions",
        )
        fields = (
            "id",
            "user",
            "image",
            "is_active",
            "actions",
        )
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
        if value is False:
            return format_html(
                "<div class='flex items-center'><div class='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>{}</div>",  # noqa: E501
                value,
            )

        return format_html(
            "<div class='flex items-center'><div class='h-2.5 w-2.5 rounded-full bg-green-400 mr-2'></div>{}</div>",  # noqa: E501
            value,
        )
