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
            "status",
            "spider",
            "serialization",
            "link",
            "updated_at",
            "category",
            "author",
            "artist",
            "genres",
            "numchapters",
            "numimages",
        )
        widgets = {
            "updated_at": MyDateInput(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["title"].widget.attrs.update(
            {
                "placeholder": _("Enter Title"),
                "class": "custom_char_input",
            },
        )
        self.fields["slug"].widget.attrs.update(
            {
                "placeholder": _("Enter Slug"),
                "class": "custom_char_input",
            },
        )
        self.fields["description"].widget.attrs.update(
            {
                "placeholder": _("Enter Description"),
                "class": "custom_textarea_input",
                "rows": "2",
            },
        )
        self.fields["rating"].widget.attrs.update(
            {
                "placeholder": _("0.0"),
                "class": "custom_char_input",
            },
        )
        self.fields["numchapters"].widget.attrs.update(
            {
                "placeholder": _("0"),
                "class": "custom_char_input",
            },
        )
        self.fields["numimages"].widget.attrs.update(
            {
                "placeholder": _("0"),
                "class": "custom_char_input",
            },
        )
        self.fields["spider"].widget.attrs.update(
            {
                "placeholder": _("Enter Spider"),
                "class": "custom_char_input",
            },
        )
        self.fields["updated_at"].widget.attrs.update(
            {
                "class": "custom_char_input",
            },
        )
        self.fields["serialization"].widget.attrs.update(
            {
                "placeholder": _("Enter Serialization"),
                "class": "custom_char_input",
            },
        )
        self.fields["link"].widget.attrs.update(
            {
                "placeholder": _("Enter Url"),
                "class": "custom_char_input",
            },
        )
        self.fields["status"].widget.attrs.update(
            {
                "class": "custom_select_input",
            },
        )
        self.fields["category"].widget.attrs.update(
            {
                "class": "custom_select_input",
            },
        )
        self.fields["artist"].widget.attrs.update(
            {
                "class": "custom_select_input",
            },
        )
        self.fields["author"].widget.attrs.update(
            {
                "class": "custom_select_input",
            },
        )
        self.fields["genres"].widget.attrs.update(
            {
                "class": "custom_mulselect_input",
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
                "class": "custom_char_input",
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
            "spider",
            "link",
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
                "class": "custom_select_input",
            },
        )
        self.fields["name"].widget.attrs.update(
            {
                "placeholder": _("Enter Name"),
                "class": "custom_char_input",
            },
        )
        self.fields["title"].widget.attrs.update(
            {
                "placeholder": _("Enter Title"),
                "class": "custom_char_input",
            },
        )
        self.fields["slug"].widget.attrs.update(
            {
                "placeholder": _("Enter Slug"),
                "class": "custom_char_input",
            },
        )
        self.fields["numimages"].widget.attrs.update(
            {
                "placeholder": _("0"),
                "class": "custom_char_input",
            },
        )
        self.fields["spider"].widget.attrs.update(
            {
                "placeholder": _("Enter Spider"),
                "class": "custom_char_input",
            },
        )
        self.fields["updated_at"].widget.attrs.update(
            {
                "class": "custom_char_input",
            },
        )
        self.fields["link"].widget.attrs.update(
            {
                "placeholder": _("Enter Url"),
                "class": "custom_char_input",
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
                "class": "custom_char_input",
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
