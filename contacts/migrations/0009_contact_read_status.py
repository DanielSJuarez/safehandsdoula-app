# Generated by Django 3.2.12 on 2022-03-23 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0008_remove_contact_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='read_status',
            field=models.BooleanField(default=False),
        ),
    ]
