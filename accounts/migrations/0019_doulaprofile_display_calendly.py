# Generated by Django 3.2.12 on 2022-03-18 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0018_auto_20220318_0152'),
    ]

    operations = [
        migrations.AddField(
            model_name='doulaprofile',
            name='display_calendly',
            field=models.BooleanField(default=True),
        ),
    ]