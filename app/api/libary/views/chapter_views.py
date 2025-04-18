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

from api.libary.forms import ChapterForm
from api.libary.forms import CommentForm
from api.libary.models import Chapter
from api.libary.tables import ChapterTable


class ChapterListView(LoginRequiredMixin, SingleTableView):
    """All chapters."""

    model = Chapter
    table_class = ChapterTable
    queryset = Chapter.objects.all()
    template_name = "libary/chapters/list.html"


list_view = ChapterListView.as_view()


class ChapterDetailView(LoginRequiredMixin, SuccessMessageMixin, DetailView, FormView):
    """Chapter detail view."""

    model = Chapter
    form_class = CommentForm
    slug_field = "slug"
    slug_url_kwarg = "slug"
    success_message = _("Comment successfully created")
    template_name = "libary/chapters/detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = CommentForm()
        return context

    def post(self, request, *args, **kwargs):
        form = CommentForm(request.POST, request.FILES)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.chapter = self.get_object()
            comment.save()
        success_url = reverse(
            "chapters:detail",
            kwargs={"slug": self.get_object().slug},
        )
        return HttpResponseRedirect(success_url)


detail_view = ChapterDetailView.as_view()


class ChapterCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    """Chapter create view"""

    model = Chapter
    form_class = ChapterForm
    template_name = "libary/chapters/create_form.html"
    success_message = _("Information successfully created")

    def get_success_url(self):
        return reverse("chapters:list")


create_view = ChapterCreateView.as_view()


class ChapterUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView, FormView):
    """Chapter update view."""

    model = Chapter
    form_class = ChapterForm
    slug_field = "slug"
    slug_url_kwarg = "slug"
    template_name = "libary/chapters/update_form.html"
    success_message = _("Information successfully updated")


update_view = ChapterUpdateView.as_view()


class ChapterDeleteView(LoginRequiredMixin, SuccessMessageMixin, DeleteView, FormView):
    """Chapter delete view."""

    model = Chapter
    form_class = ChapterForm
    slug_field = "slug"
    slug_url_kwarg = "slug"
    template_name = "libary/chapters/delete_form.html"
    success_message = _("Information successfully deleted")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = ChapterForm()
        return context

    def post(self, request, *args, **kwargs):
        form = ChapterForm(request.POST, request.FILES)
        if form.is_valid():
            chapter = form.save(commit=False)
            chapter.save()
        success_url = reverse(
            "chapters:delete",
            kwargs={"slug": self.get_object().slug},
        )
        return HttpResponseRedirect(success_url)


delete_view = ChapterDeleteView.as_view()
