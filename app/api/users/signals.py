from django.db.models.signals import pre_delete

from api.users.helpers import delete_instance_image
from api.users.models import User


def user_image_pre_delete(sender, instance, *args, **kwargs):
    if instance.image:
        delete_instance_image(instance)


pre_delete.connect(user_image_pre_delete, sender=User)
