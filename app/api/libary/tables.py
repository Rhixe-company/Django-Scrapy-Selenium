import django_tables2 as tables
from django.utils.html import format_html

from api.libary.models import Comic


class ComicTable(tables.Table):
    comic = tables.TemplateColumn(
        orderable=True,
        template_name="partials/comics/table_comic.html",
    )
    actions = tables.TemplateColumn(
        orderable=True,
        template_name="partials/comics/table_actions.html",
    )

    class Meta:
        model = Comic
        fields = (
            "comic",
            "updated_at",
            "status",
            "actions",
        )
        template_name = "partials/comics/custom_table.html"

    def render_status(self, value):
        if value == "Completed":
            return format_html(
                "<span class='mr-2 rounded-md border border-green-100 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:border-green-500 dark:bg-gray-700 dark:text-green-400'>{}</span>",  # noqa: E501
                value,
            )
        if value == "Dropped":
            return format_html(
                "<span class='mr-2 rounded-md border border-red-100 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:border-red-500 dark:bg-gray-700 dark:text-red-400'>{}</span>",  # noqa: E501
                value,
            )
        if value == "Hiatus":
            return format_html(
                "<span class='mr-2 rounded-md border border-blue-100 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:border-blue-500 dark:bg-gray-700 dark:text-blue-400'>{}</span>",  # noqa: E501
                value,
            )
        if value == "Season End":
            return format_html(
                "<span class='mr-2 rounded-md border border-orange-100 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:border-orange-500 dark:bg-gray-700 dark:text-orange-400'>{}</span>",  # noqa: E501
                value,
            )
        if value == "Coming Soon":
            return format_html(
                "<span class='mr-2 rounded-md border border-violet-100 bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:border-violet-500 dark:bg-gray-700 dark:text-violet-400'>{}</span>",  # noqa: E501
                value,
            )
        return format_html(
            "<span class='mr-2 rounded-md border border-purple-100 bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:border-purple-500 dark:bg-gray-700 dark:text-purple-400'>{}</span>",  # noqa: E501
            value,
        )
