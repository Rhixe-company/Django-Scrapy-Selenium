from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView
from django.views.generic import DeleteView
from django.views.generic import FormView
from django.views.generic import UpdateView
from django.views.generic.detail import DetailView
from django_tables2 import SingleTableView

from api.libary.forms import ComicForm
from api.libary.forms import CommentForm
from api.libary.models import Comic
from api.libary.tables import ComicTable


class ComicListView(LoginRequiredMixin, SingleTableView):
    """All comics."""

    model = Comic
    table_class = ComicTable
    queryset = Comic.objects.all()
    template_name = "libary/comics/list.html"


list_view = ComicListView.as_view()


class ComicDetailView(LoginRequiredMixin, SuccessMessageMixin, DetailView, FormView):
    """Comic detail view."""

    model = Comic
    form_class = CommentForm
    slug_field = "slug"
    slug_url_kwarg = "slug"
    success_message = _("Comment successfully created")
    template_name = "libary/comics/detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = CommentForm()
        return context

    def post(self, request, *args, **kwargs):
        form = CommentForm(request.POST, request.FILES)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.comic = self.get_object()
            comment.save()
        success_url = reverse("comics:detail", kwargs={"slug": self.get_object().slug})
        return HttpResponseRedirect(success_url)


detail_view = ComicDetailView.as_view()


class ComicCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    """Comic create view"""

    model = Comic
    form_class = ComicForm
    template_name = "libary/comics/create_form.html"
    success_message = _("Information successfully created")

    def get_success_url(self):
        return reverse("comics:list")


create_view = ComicCreateView.as_view()


class ComicUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView, FormView):
    """Comic update view."""

    model = Comic
    form_class = ComicForm
    slug_field = "slug"
    slug_url_kwarg = "slug"
    template_name = "libary/comics/update_form.html"
    success_message = _("Information successfully updated")


update_view = ComicUpdateView.as_view()


class ComicDeleteView(LoginRequiredMixin, SuccessMessageMixin, DeleteView, FormView):
    """Comic delete view."""

    model = Comic
    form_class = ComicForm
    slug_field = "slug"
    slug_url_kwarg = "slug"
    template_name = "libary/comics/delete_form.html"
    success_message = _("Information successfully deleted")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = ComicForm()
        return context

    def post(self, request, *args, **kwargs):
        form = ComicForm(request.POST, request.FILES)
        if form.is_valid():
            comic = form.save(commit=False)
            comic.save()
        success_url = reverse("comics:delete", kwargs={"slug": self.get_object().slug})
        return HttpResponseRedirect(success_url)


delete_view = ComicDeleteView.as_view()
