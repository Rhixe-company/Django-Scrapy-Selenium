from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django.views.generic import RedirectView
from django_htmx.http import HttpResponse  # type: ignore  # noqa: PGH003
from django_htmx.http import trigger_client_event
from django_tables2 import RequestConfig

from api.apps.filters import UserFilter
from api.apps.tables import UserTable
from api.users.decorators import admin_only
from api.users.decorators import user_only
from api.users.forms import UserChangeForm
from api.users.forms import UserCreationForm
from api.users.models import User


@user_only
@admin_only
@require_http_methods(["GET"])
def user_list_view(request):
    htmx_template_name = "partials/users/container.html"
    template_name = "users/user_list.html"
    qs = User.objects.all()
    user_filter = UserFilter(
        request.GET,
        queryset=qs,
    )
    table = UserTable(user_filter.qs)
    table.paginate(page=request.GET.get("page", 1), per_page=settings.PAGINATE_BY)
    context = {"filter": user_filter, "table": table}
    if request.htmx:
        htmx_template_name += "#user-container"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@require_http_methods(["GET"])
def user_detail_hx_view(
    request,
    id=None,  # noqa: A002
):
    if not request.htmx:
        raise Http404
    try:
        obj = get_object_or_404(User, id=id)

    except:  # noqa: E722
        obj = None
    if obj is None:
        return HttpResponse("Not found.")

    context = {"object": obj}
    return render(request, "partials/user/detail.html", context)


@require_http_methods(["GET"])
def user_detail_view(request, id=None):  # noqa: A002
    hx_url = reverse("users:hx_user_detail", kwargs={"id": id})

    context = {"hx_url": hx_url}
    return render(request, "users/detail.html", context)


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse("users:user_detail", kwargs={"id": self.request.user.id})  # type: ignore  # noqa: PGH003


user_redirect_view = UserRedirectView.as_view()


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def user_create_view(request):
    form = UserCreationForm(
        request.POST or None,
        request.FILES or None,
    )
    htmx_template_name = "partials/users/create.html"
    template_name = "users/create_user.html"
    context = {"form": form}
    if form.is_valid():
        form.save()
        if request.htmx:
            htmx_template_name += "#create-form-section"
            response = render(request, htmx_template_name, context)
            return trigger_client_event(
                response,
                "createEvent",
                {"message": "Create Successfull!"},
            )
        return render(request, template_name, context)
    if request.htmx:
        htmx_template_name += "#create-form-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "POST"])
def user_update_view(
    request,
    id=None,  # noqa: A002
):
    obj = get_object_or_404(User, id=id)
    form = UserChangeForm(request.POST or None, request.FILES or None, instance=obj)
    htmx_template_name = "partials/users/update.html"
    template_name = "users/update_user.html"
    context = {"form": form, "record": obj}
    if form.is_valid():
        form.save()
        if request.htmx:
            htmx_template_name += "#update-form-section"
            response = render(request, htmx_template_name, context)
            return trigger_client_event(
                response,
                "updateEvent",
                {"message": "Update Successfull!"},
            )
        return render(request, template_name, context)
    if request.htmx:
        htmx_template_name += "#update-form-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def user_delete_view(request, id=None):  # noqa: A002
    htmx_template_name = "partials/users/delete.html"
    template_name = "users/delete_user.html"
    try:
        obj = User.objects.get(id=id)
    except:  # noqa: E722
        obj = None
    if obj is None:
        if request.htmx:
            return HttpResponse("Not Found")
        raise Http404
    context = {"record": obj}
    if request.method == "DELETE":
        if request.htmx:
            obj.delete()
            htmx_template_name += "#delete-form-section"
            response = render(request, htmx_template_name, context)
            return trigger_client_event(
                response,
                "deleteEvent",
                {"message": "Delete Successfull!"},
            )
        return render(request, template_name, context)
    if request.htmx:
        htmx_template_name += "#delete-form-section"
        return render(request, htmx_template_name, context)
    return render(request, template_name, context)


@user_only
@admin_only
@require_http_methods(["GET", "DELETE"])
def user_delete_all_view(request):
    qs = User.objects.filter(id__in=request.GET.getlist("id"))
    user_filter = UserFilter(
        request.GET,
        queryset=qs,
    )
    table = UserTable(user_filter.qs)
    RequestConfig(request, paginate={"per_page": settings.PAGINATE_BY}).configure(table)  # type: ignore  # noqa: PGH003
    context = {"filter": user_filter, "table": table}
    htmx_template_name = "partials/users/container.html"
    template_name = "users/user_list.html"

    if request.htmx:
        htmx_template_name += "#user-container"
        response = render(request, htmx_template_name, context)
        return trigger_client_event(
            response,
            "myEvent",
            {"message": "Hello, world!"},
        )
    return render(request, template_name, context)
