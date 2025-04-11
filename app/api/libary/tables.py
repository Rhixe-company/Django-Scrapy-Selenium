import django_tables2 as tables
from django.utils.html import format_html

from api.libary.models import Comic


class ComicTable(tables.Table):
    comic = tables.TemplateColumn(
        orderable=True,
        template_name="partials/comics/table_comic.html",
    )
    actions = tables.TemplateColumn(
        orderable=False,
        template_name="partials/comics/table_actions.html",
    )
    updated_at = tables.DateColumn(orderable=True)

    class Meta:
        model = Comic
        sequence = (
            "comic",
            "status",
            "updated_at",
            "actions",
        )
        fields = (
            "comic",
            "updated_at",
            "status",
            "actions",
        )
        template_name = "partials/comics/custom_table.html"
        attrs = {
            "th": {
                "_ordering": {
                    "orderable": "sortable",  # Instead of `orderable`
                    "ascending": "ascend",  # Instead of `asc`
                    "descending": "descend",  # Instead of `desc`
                },
            },
        }


