from allauth.account.forms import AddEmailForm
from allauth.account.forms import ChangePasswordForm
from allauth.account.forms import LoginForm
from allauth.account.forms import ResetPasswordForm
from allauth.account.forms import ResetPasswordKeyForm
from allauth.account.forms import SetPasswordForm
from allauth.account.forms import SignupForm
from allauth.account.forms import UserTokenForm
from allauth.socialaccount.forms import DisconnectForm
from allauth.socialaccount.forms import SignupForm as SocialSignupForm
from django import forms
from django.contrib.auth import forms as admin_forms
from django.utils.translation import gettext_lazy as _

from api.users.models import User
from api.users.widgets import MyCustomImageWidget


class UserAdminChangeForm(admin_forms.UserChangeForm):
    class Meta(admin_forms.UserChangeForm.Meta):  # type: ignore[name-defined]
        model = User


class UserAdminCreationForm(admin_forms.UserCreationForm):
    """
    Form for User Creation in the Admin Area.
    To change user signup, see UserSignupForm and UserSocialSignupForm.
    """

    class Meta(admin_forms.UserCreationForm.Meta):  # type: ignore[name-defined]
        model = User
        error_messages = {
            "username": {"unique": _("This username has already been taken.")},
            "email": {"unique": _("This email has already been taken.")},
        }


class UserChangeForm(forms.ModelForm):
    class Meta:  # type: ignore[name-defined]
        model = User
        fields = (
            "email",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "is_superuser",
            "image",
        )
        widgets = {
            "image": MyCustomImageWidget(
                attrs={
                    "aria-describedby": "image_input_help",
                    "class": "mb-5 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-xs text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400",  # noqa: E501
                },
            ),
        }
        error_messages = {
            "username": {"unique": _("This username has already been taken.")},
            "email": {"unique": _("This email has already been taken.")},
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"].widget.attrs.update(
            {
                "placeholder": _("Enter your Email"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["username"].widget.attrs.update(
            {
                "placeholder": _("Enter your Username"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["first_name"].widget.attrs.update(
            {
                "placeholder": _("Enter your First Name"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["last_name"].widget.attrs.update(
            {
                "placeholder": _("Enter your Last Name"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["is_active"].widget.attrs.update(
            {
                "class": "size-4 shrink-0 rounded border border-gray-300 text-indigo-600 shadow-sm ring-offset-background focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",  # noqa: E501
            },
        )
        self.fields["is_superuser"].widget.attrs.update(
            {
                "class": "size-4 shrink-0 rounded border border-gray-300 text-indigo-600 shadow-sm ring-offset-background focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",  # noqa: E501
            },
        )


class UserCreationForm(admin_forms.UserCreationForm):
    """
    Form for User Creation in the Admin Area.
    To change user signup, see UserSignupForm and UserSocialSignupForm.
    """

    class Meta(admin_forms.UserCreationForm.Meta):  # type: ignore[name-defined]
        model = User
        fields = (
            "email",
            "username",
            # "first_name",
            # "last_name",
            "password1",
            "password2",
            "image",
        )
        widgets = {
            "image": MyCustomImageWidget(
                attrs={
                    "aria-describedby": "image_input_help",
                    "class": "mb-5 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-xs text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400",  # noqa: E501
                },
            ),
        }
        error_messages = {
            "username": {"unique": _("This username has already been taken.")},
            "email": {"unique": _("This email has already been taken.")},
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"].widget.attrs.update(
            {
                "placeholder": _("Enter your Email"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["username"].widget.attrs.update(
            {
                "placeholder": _("Enter your Username"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["password1"].widget.attrs.update(
            {
                "placeholder": _("Enter your Password"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["password2"].widget.attrs.update(
            {
                "placeholder": _("Enter your Password Again"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )


class UserSignupForm(SignupForm):
    # add form fields here
    """
    Form that will be rendered on a user sign up section/screen.
    Default fields will be added automatically.
    Check UserSocialSignupForm for accounts created from social.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["email"].widget.attrs.update(
            {
                "placeholder": _("Enter your Email"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["username"].widget.attrs.update(
            {
                "placeholder": _("Username"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["password1"].widget.attrs.update(
            {
                "placeholder": _("Password"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )
        self.fields["password2"].widget.attrs.update(
            {
                "placeholder": _("Password Confirm"),
                "class": "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm",  # noqa: E501
            },
        )


class UserSocialSignupForm(SocialSignupForm):
    # add form fields here
    """
    Renders the form when user has signed up using social accounts.
    Default fields will be added automatically.
    See UserSignupForm otherwise.
    """


class MyCustomLoginForm(LoginForm):
    # add form fields here
    def login(self, *args, **kwargs):
        return super().login(*args, **kwargs)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["login"].widget.attrs.update(
            {
                "placeholder": _("Enter your Email"),
                "class": "",  # noqa: E501
            },
        )
        self.fields["password"].widget.attrs.update(
            {
                "placeholder": _("Password"),
                "class": "",  # noqa: E501
            },
        )
        self.fields["remember"].widget.attrs.update(
            {
                "class": "size-4 shrink-0 rounded border border-gray-300 text-indigo-600 shadow-sm ring-offset-background focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",  # noqa: E501
            },
        )


class MyCustomAddEmailForm(AddEmailForm):
    # add form fields here
    def save(self, request):
        return super().save(request)


class MyCustomChangePasswordForm(ChangePasswordForm):
    # add form fields here
    def save(self):
        super().save()


class MyCustomSetPasswordForm(SetPasswordForm):
    # add form fields here
    def save(self):
        super().save()


class MyCustomResetPasswordForm(ResetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["email"].widget.attrs.update(
            {
                "placeholder": _("Enter your Email"),
                "class": "",
            },
        )

    # add form fields here
    def save(self, request):
        return super().save(request)


class MyCustomResetPasswordKeyForm(ResetPasswordKeyForm):
    # add form fields here
    def save(self):
        super().save()


class MyCustomSocialDisconnectForm(DisconnectForm):
    # add form fields here
    def save(self):
        super().save()


class MyCustomUserTokenForm(UserTokenForm):
    # add form fields here
    def save(self):
        super().save()  # type: ignore  # noqa: PGH003
