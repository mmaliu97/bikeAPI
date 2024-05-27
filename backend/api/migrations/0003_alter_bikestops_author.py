# Generated by Django 4.2.11 on 2024-05-14 03:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_bikestops_delete_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bikestops',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bikestops', to=settings.AUTH_USER_MODEL),
        ),
    ]
