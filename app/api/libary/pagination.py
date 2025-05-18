from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = "page_size"
    max_page_size = 10000

    def get_paginated_response(self, data):
        return Response(
            {
                "results": data,
                "count": self.page.paginator.count,  # type: ignore  # noqa: PGH003
                "numpages": self.page.paginator.num_pages,  # type: ignore  # noqa: PGH003
                "links": {
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                },
            },
        )


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response(
            {
                "results": data,
                "count": self.page.paginator.count,  # type: ignore  # noqa: PGH003
                "numpages": self.page.paginator.num_pages,  # type: ignore  # noqa: PGH003
                "links": {
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                },
            },
        )
