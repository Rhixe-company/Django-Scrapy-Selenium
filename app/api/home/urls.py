from django.urls import path

from api.home import views

urlpatterns = [
    path("", view=views.index, name="index"),
]
