# Generated by Django 4.1.6 on 2023-04-27 02:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0002_user_detail_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='location',
            field=models.CharField(default='Jalpaiguri', max_length=100),
        ),
    ]
