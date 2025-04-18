import json
import math

import pandas as pd
from django.conf import settings
from django.db.models import Q
from django.db.models.fields import DateField
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django_dyn_dt.helpers import Utils

from api.libary.data_helper import _get_headings
from api.libary.data_helper import get_csv
from api.libary.data_helper import get_excel
from api.libary.data_helper import get_pdf

DYNAMIC_DATATB = {}

try:  # noqa: SIM105
    DYNAMIC_DATATB = getattr(settings, "DYNAMIC_DATATB")  # noqa: B009
except:  # noqa: E722, S110
    pass


# TODO: 404 for wrong page number
def data_table_view(request, **kwargs):
    try:
        model_class = Utils.get_class(DYNAMIC_DATATB, kwargs.get("model_name"))  # type: ignore  # noqa: PGH003
    except KeyError:
        return render(request, "datatable/404.html", status=404)
    headings = _get_headings(model_class)
    page_number = int(request.GET.get("page", 1))
    search_key = request.GET.get("search", "")
    entries = int(request.GET.get("entries", 10))

    if page_number < 1:
        return render(request, "datatable/404.html", status=404)

    filter_options = Q()
    for field in headings:
        filter_options = filter_options | Q(**{field + "__icontains": search_key})
    all_data = model_class.objects.filter(filter_options)
    data = all_data[(page_number - 1) * entries : page_number * entries]
    if all_data.count() != 0 and not 1 <= page_number <= math.ceil(
        all_data.count() / entries,
    ):
        return render(request, "datatable/404.html", status=404)
    return render(
        request,
        "datatable/index.html",
        context={
            "model_name": kwargs.get("model_name"),
            "headings": headings,
            "data": [
                [getattr(record, heading) for heading in headings] for record in data
            ],
            "is_date": [
                True if type(field) == DateField else False  # noqa: E721, SIM210
                for field in model_class._meta.get_fields()  # noqa: SLF001
            ],
            "total_pages": range(1, math.ceil(all_data.count() / entries) + 1),
            "has_prev": False
            if page_number == 1
            else (True if all_data.count() != 0 else False),  # noqa: SIM210
            "has_next": False
            if page_number == math.ceil(all_data.count() / entries)
            else (True if all_data.count() != 0 else False),  # noqa: SIM210
            "current_page": page_number,
            "entries": entries,
            "search": search_key,
        },
    )


@csrf_exempt
def add_record(request, **kwargs):
    try:
        model_manager = Utils.get_manager(DYNAMIC_DATATB, kwargs.get("model_name"))  # type: ignore  # noqa: PGH003
    except KeyError:
        return HttpResponse(
            json.dumps(
                {
                    "message": "this model is not activated or not exist.",
                    "success": False,
                },
            ),
            status=400,
        )
    body = json.loads(request.body.decode("utf-8"))
    try:
        thing = model_manager.create(**body)
    except Exception as ve:  # noqa: BLE001
        return HttpResponse(
            json.dumps({"detail": str(ve), "success": False}),
            status=400,
        )
    return HttpResponse(
        json.dumps({"id": thing.id, "message": "Record Created.", "success": True}),
        status=200,
    )


@csrf_exempt
def delete_record(request, **kwargs):
    try:
        model_manager = Utils.get_manager(DYNAMIC_DATATB, kwargs.get("model_name"))  # type: ignore  # noqa: PGH003
    except KeyError:
        return HttpResponse(
            json.dumps(
                {
                    "message": "this model is not activated or not exist.",
                    "success": False,
                },
            ),
            status=400,
        )
    to_delete_id = kwargs.get("id")
    try:
        to_delete_object = model_manager.get(id=to_delete_id)
    except Exception:  # noqa: BLE001
        return HttpResponse(
            json.dumps({"message": "matching object not found.", "success": False}),
            status=404,
        )
    to_delete_object.delete()
    return HttpResponse(
        json.dumps({"message": "Record Deleted.", "success": True}),
        status=200,
    )


@csrf_exempt
def edit_record(request, **kwargs):
    try:
        model_manager = Utils.get_manager(DYNAMIC_DATATB, kwargs.get("model_name"))  # type: ignore  # noqa: PGH003
    except KeyError:
        return HttpResponse(
            json.dumps(
                {
                    "message": "this model is not activated or not exist.",
                    "success": False,
                },
            ),
            status=400,
        )
    to_update_id = kwargs.get("id")

    body = json.loads(request.body.decode("utf-8"))
    try:
        model_manager.filter(id=to_update_id).update(**body)
    except Exception as ve:  # noqa: BLE001
        return HttpResponse(
            json.dumps({"detail": str(ve), "success": False}),
            status=400,
        )
    return HttpResponse(
        json.dumps({"message": "Record Updated.", "success": True}),
        status=200,
    )


@csrf_exempt
def export(request, **kwargs):
    try:
        model_class = Utils.get_class(DYNAMIC_DATATB, kwargs.get("model_name"))  # type: ignore  # noqa: PGH003
    except KeyError:
        return render(request, "datatable/404.html", status=404)
    request_body = json.loads(request.body.decode("utf-8"))
    search_key = request_body.get("search", "")
    hidden = request_body.get("hidden_cols", [])  # noqa: F841
    export_type = request_body.get("type", "csv")
    filter_options = Q()

    headings = list(_get_headings(model_class))
    for field in headings:
        field_name = field
        try:  # noqa: SIM105
            filter_options = filter_options | Q(
                **{field_name + "__icontains": search_key},
            )
        except Exception as _:  # noqa: BLE001, S110
            pass

    all_data = model_class.objects.filter(filter_options)
    table_data = []
    for data in all_data:
        this_row = []
        for heading in headings:
            this_row.append(getattr(data, heading))  # noqa: PERF401
        table_data.append(this_row)

    df = pd.DataFrame(table_data, columns=tuple(heading for heading in headings))  # noqa: PD901
    if export_type == "pdf":
        base64encoded = get_pdf(df)
    elif export_type == "xlsx":
        base64encoded = get_excel(df)
    elif export_type == "csv":
        base64encoded = get_csv(df)
    else:
        base64encoded = "nothing"

    return HttpResponse(
        json.dumps(
            {"content": base64encoded, "file_format": export_type, "success": True},
        ),
        status=200,
    )
