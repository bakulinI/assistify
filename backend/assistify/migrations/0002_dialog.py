# Generated by Django 5.1.2 on 2024-11-26 17:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assistify', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dialog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('settings', models.JSONField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_dialog', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Ассистент',
                'verbose_name_plural': 'Ассистенты',
            },
        ),
    ]
