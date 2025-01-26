import django_tables2 as tables
from django.utils.safestring import mark_safe

from api.apps.models import Chapter
from api.apps.models import Comic


class MaterializeCssCheckboxColumn(tables.CheckBoxColumn):
    def render(self, value, bound_column, record):
        default = {"type": "checkbox", "name": bound_column.name, "value": value}
        if self.is_checked(value, record):
            default.update({"checked": "checked"})
        general = self.attrs.get("input")
        specific = self.attrs.get("td__input")
        attrs = tables.utils.AttributeDict(default, **(specific or general or {}))
        return mark_safe(  # noqa: S308
            f'<label class="flex cursor-pointer items-center text-neutral-600 dark:text-neutral-300"><div class="relative flex items-center"><input {attrs.as_html()} class="custom_checkbox_input":checked="checkAll" /><svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"aria-hidden="true"stroke="currentColor"fill="none"stroke-width="4"class="invisible pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-neutral-100 peer-checked:visible dark:text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div></label>',  # noqa: E501
        )


class ComicTable(tables.Table):

    check = MaterializeCssCheckboxColumn(orderable=False)

    comic = tables.TemplateColumn(
        template_name="partials/comic/comic.html",
        orderable=False,
    )
    actions = tables.TemplateColumn(
        template_name="partials/comic/actions.html",
        orderable=False,
    )

    class Meta:
        model = Comic

        sequence = (
            "check",
            "comic",
            "id",
            "updated_at",
        )
        fields = (
            "check",
            "comic",
            "id",
            "updated_at",
        )
        attrs = {
            "th": {
                "_ordering": {
                    "orderable": "sortable",  # Instead of `orderable`
                    "ascending": "ascend",  # Instead of `asc`
                    "descending": "descend",  # Instead of `desc`
                },
            },
        }
        row_attrs = {"data-id": lambda record: record.pk}


class ChapterTable(tables.Table):

    check = MaterializeCssCheckboxColumn(orderable=False)

    chapter = tables.TemplateColumn(
        template_name="partials/chapter/chapter.html",
        orderable=False,
    )
    actions = tables.TemplateColumn(
        template_name="partials/chapter/actions.html",
        orderable=False,
    )

    class Meta:
        model = Chapter

        sequence = (
            "check",
            "chapter",
            "id",
            "updated_at",
        )
        fields = (
            "check",
            "chapter",
            "id",
            "updated_at",
        )
        attrs = {
            "th": {
                "_ordering": {
                    "orderable": "sortable",  # Instead of `orderable`
                    "ascending": "ascend",  # Instead of `asc`
                    "descending": "descend",  # Instead of `desc`
                },
            },
        }
        row_attrs = {"data-id": lambda record: record.pk}
