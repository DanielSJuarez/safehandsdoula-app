# Generated by Django 3.2.12 on 2022-03-11 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_doulaprofile_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doulaprofile',
            name='is_active',
            field=models.CharField(choices=[('ACTIVE', 'Active'), ('INACTIVE', 'Inactive')], default='ACTIVE', max_length=8),
        ),
    ]
