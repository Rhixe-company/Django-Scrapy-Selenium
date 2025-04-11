from django import forms
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.widgets import CKEditor5Widget

from api.libary.helpers import MyCustomImageWidget
from api.libary.helpers import MyDateInput
from api.libary.models import Artist
from api.libary.models import Author
from api.libary.models import Category
from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage
from api.libary.models import Comment
from api.libary.models import Genre


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ("name",)


class AuthorForm(forms.ModelForm):
    class Meta:
        model = Author
        fields = ("name",)


class ArtistForm(forms.ModelForm):
    class Meta:
        model = Artist
        fields = ("name",)


class GenreForm(forms.ModelForm):
    class Meta:
        model = Genre
        fields = ("name",)


class ComicForm(forms.ModelForm):
    class Meta:
        model = Comic
        fields = (
            "title",
            "slug",
            "description",
            "rating",
            # "serialization",
            "updated_at",
            "status",
            "website",
            "category",
            "author",
            "artist",
            "genres",
            # "numchapters",
            # "numimages",
        )
        widgets = {
            "updated_at": MyDateInput(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["title"].widget.attrs.update(
            {
                "placeholder": _("Enter Title"),
                "class": "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["slug"].widget.attrs.update(
            {
                "placeholder": _("Enter Slug"),
                "class": "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["description"].widget.attrs.update(
            {
                "placeholder": _("Enter Description"),
                "class": "block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
                "rows": "4",
            },
        )
        self.fields["rating"].widget.attrs.update(
            {
                "class": "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )

        self.fields["website"].widget.attrs.update(
            {
                "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["author"].widget.attrs.update(
            {
                "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["artist"].widget.attrs.update(
            {
                "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["updated_at"].widget.attrs.update(
            {
                "class": "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )

        self.fields["status"].widget.attrs.update(
            {
                "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["category"].widget.attrs.update(
            {
                "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",  # noqa: E501
            },
        )
        self.fields["genres"].widget.attrs.update(
            {
                "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",  # noqa: E501
            },
        )

    def clean(self):
        return self.cleaned_data


class ComicImageForm(forms.ModelForm):
    class Meta:
        model = ComicImage
        fields = ("image", "link")
        widgets = {
            "image": MyCustomImageWidget(
                attrs={
                    "aria-describedby": "image_input_help",
                    "class": "custom_image_input",
                },
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["link"].widget.attrs.update(
            {
                "placeholder": _("Enter Url"),
                "class": "",
            },
        )

    def clean(self):
        return self.cleaned_data


class ChapterForm(forms.ModelForm):
    class Meta:
        model = Chapter
        fields = (
            "name",
            "title",
            "slug",
            "website",
            "numimages",
            "updated_at",
            "comic",
        )
        widgets = {
            "updated_at": forms.DateInput(
                attrs={
                    "type": "date",
                },
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["comic"].widget.attrs.update(
            {
                "class": "",
            },
        )
        self.fields["name"].widget.attrs.update(
            {
                "placeholder": _("Enter Name"),
                "class": "",
            },
        )
        self.fields["title"].widget.attrs.update(
            {
                "placeholder": _("Enter Title"),
                "class": "",
            },
        )
        self.fields["slug"].widget.attrs.update(
            {
                "placeholder": _("Enter Slug"),
                "class": "",
            },
        )
        self.fields["numimages"].widget.attrs.update(
            {
                "placeholder": _("0"),
                "class": "",
            },
        )
        self.fields["website"].widget.attrs.update(
            {
                "placeholder": _("Enter Spider"),
                "class": "",
            },
        )
        self.fields["updated_at"].widget.attrs.update(
            {
                "class": "",
            },
        )

    def clean(self):
        return self.cleaned_data


class ChapterImageForm(forms.ModelForm):
    class Meta:
        model = ChapterImage
        fields = ("image", "link")
        widgets = {
            "image": MyCustomImageWidget(
                attrs={
                    "aria-describedby": "image_input_help",
                    "class": "custom_image_input",
                },
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["link"].widget.attrs.update(
            {
                "placeholder": _("Enter Url"),
                "class": "",
            },
        )

    def clean(self):
        return self.cleaned_data


class CommentForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["text"].required = True

    class Meta:
        model = Comment
        fields = ("text",)
        widgets = {
            "text": CKEditor5Widget(
                attrs={"class": "django_ckeditor_5"},
                config_name="comment",
            ),
        }

    def clean(self):
        return self.cleaned_data
