import time

from celery import shared_task
from celery.utils.log import get_task_logger
from celery_progress.backend import ProgressRecorder
from django.core.management import call_command

from api.apps.models import Comic
from api.users.models import User

logger = get_task_logger(__name__)


@shared_task(bind=True, name="Get Users Count")
def get_users_count(self, seconds):
    """A pointless Celery task to demonstrate usage."""
    logger.info("A pointless Celery task to demonstrate usage.")
    progress_recorder = ProgressRecorder(self)
    for i in range(seconds):
        time.sleep(1)

        progress_recorder.set_progress(
            i + 1,
            seconds,
            description="Get Users Count description",
        )
    return {
        "users": User.objects.all(),
        "users_count": User.objects.count(),
    }


@shared_task(bind=True, name="Get Comics Count")
def get_comics_count(self, seconds):
    """A pointless Celery task to demonstrate usage."""
    logger.info("A pointless Celery task to demonstrate usage.")
    progress_recorder = ProgressRecorder(self)
    for i in range(seconds):
        time.sleep(1)

        progress_recorder.set_progress(
            i + 1,
            seconds,
            description="Get Comics Count description",
        )
    return {
        "comics": Comic.objects.all(),
        "comics_count": Comic.objects.count(),
    }


@shared_task(bind=True, name="Crawl task")
def crawl_task(self, seconds):
    """A Celery task to Run Crawl Custom command crawl."""
    logger.info("A Celery task to Run Crawl Custom command crawl")
    progress_recorder = ProgressRecorder(self)

    for i in range(seconds):
        time.sleep(1)

        progress_recorder.set_progress(
            i + 1,
            seconds,
            description="Crawl task description",
        )

    return call_command("crawl")
