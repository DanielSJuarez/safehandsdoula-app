# Generated by Django 3.2.12 on 2022-03-10 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_auto_20220310_2139'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doulaprofile',
            name='image',
            field=models.ImageField(default='doula/beef_taco.jpeg', null=True, upload_to='doula/'),
        ),
    ]