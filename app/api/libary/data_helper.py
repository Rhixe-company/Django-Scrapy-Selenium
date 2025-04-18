import base64
import os
import random
import string

import matplotlib.pyplot as plt

# Create your views here.
from matplotlib.backends.backend_pdf import PdfPages


def get_pdf(
    data_frame,
):
    fig, ax = plt.subplots(figsize=(12, 4))
    ax.axis("tight")
    ax.axis("off")
    ax.table(
        cellText=data_frame.values,
        colLabels=data_frame.columns,
        loc="center",
        colLoc="center",
    )
    random_file_name = get_random_string(10) + ".pdf"
    pp = PdfPages(random_file_name)
    pp.savefig(fig, bbox_inches="tight")
    pp.close()
    bytess = read_file_and_remove(random_file_name)
    return base64.b64encode(bytess).decode("utf-8")


def get_excel(
    data_frame,
):
    random_file_name = get_random_string(10) + ".xlsx"

    data_frame.to_excel(random_file_name, index=False, header=True, encoding="utf-8")
    bytess = read_file_and_remove(random_file_name)
    return base64.b64encode(bytess).decode("utf-8")


def get_csv(
    data_frame,
):
    random_file_name = get_random_string(10) + ".csv"

    data_frame.to_csv(random_file_name, index=False, header=True, encoding="utf-8")
    bytess = read_file_and_remove(random_file_name)
    return base64.b64encode(bytess).decode("utf-8")


def read_file_and_remove(path):
    with open(path, "rb") as file:  # noqa: PTH123
        bytess = file.read()
        file.close()

    # ths file pointer should be closed before removal
    os.remove(path)  # noqa: PTH107
    return bytess


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(length))  # noqa: S311


def _get_headings(model_class, filter_relations=True):  # noqa: FBT002
    headings = []
    for field in model_class._meta.get_fields():  # noqa: SLF001
        if filter_relations and _is_relation_field(field):
            continue
        headings.append(field.name)
    return headings


def _is_relation_field(field):
    is_many_to_many_field = field.many_to_many is not None
    is_many_to_one_field = field.many_to_one is not None
    is_one_to_many_field = field.one_to_many is not None
    is_one_to_one_field = field.one_to_one is not None
    return (
        is_many_to_many_field
        or is_many_to_one_field
        or is_one_to_many_field
        or is_one_to_one_field
    )
