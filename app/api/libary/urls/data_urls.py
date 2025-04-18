from django.urls import path

from api.libary.views.data_views import add_record
from api.libary.views.data_views import data_table_view
from api.libary.views.data_views import delete_record
from api.libary.views.data_views import edit_record
from api.libary.views.data_views import export

urlpatterns = [
    path("<str:model_name>/", data_table_view),
    path("<str:model_name>/add/", add_record),
    path("<str:model_name>/edit/<int:id>/", edit_record),
    path("<str:model_name>/delete/<int:id>/", delete_record),
    path("<str:model_name>/export/", export),
]
