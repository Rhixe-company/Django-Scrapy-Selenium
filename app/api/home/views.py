from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "home/index.html"


index = IndexView.as_view()
