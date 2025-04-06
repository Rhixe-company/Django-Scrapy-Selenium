from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "home/index.html"


index = IndexView.as_view()


class SeriesView(TemplateView):
    template_name = "home/series.html"


series = SeriesView.as_view()


class BookmarksView(TemplateView):
    template_name = "home/bookmarks.html"


bookmarks = BookmarksView.as_view()


class PrivacyView(TemplateView):
    template_name = "home/privacy.html"


privacy = PrivacyView.as_view()


class DmcaView(TemplateView):
    template_name = "home/dmca.html"


dmca = DmcaView.as_view()


class TermsView(TemplateView):
    template_name = "home/terms.html"


terms = TermsView.as_view()
