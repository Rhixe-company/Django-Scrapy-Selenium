# Generated by Django 5.1.8 on 2025-04-06 03:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("libary", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="comic",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="comicuser",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="chapterimage",
            name="comic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="libary.comic"
            ),
        ),
        migrations.AddField(
            model_name="chapter",
            name="comic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="comicchapters",
                to="libary.comic",
            ),
        ),
        migrations.AddField(
            model_name="comicimage",
            name="comic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="comicimages",
                to="libary.comic",
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="chapter",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="chaptercomments",
                to="libary.chapter",
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="comic",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="comiccomments",
                to="libary.comic",
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="usercomments",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="comic",
            name="genres",
            field=models.ManyToManyField(
                blank=True, related_name="comicgenre", to="libary.genre"
            ),
        ),
        migrations.AddField(
            model_name="useritem",
            name="comic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="followers",
                to="libary.comic",
            ),
        ),
        migrations.AddField(
            model_name="useritem",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="books",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="comic",
            name="users",
            field=models.ManyToManyField(
                blank=True, through="libary.UserItem", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
