# Generated by Django 4.1.6 on 2023-05-05 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0012_restaurant_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant_user',
            name='first_name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='restaurant_user',
            name='last_name',
            field=models.CharField(default='', max_length=100),
        ),
    ]