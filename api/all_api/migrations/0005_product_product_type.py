# Generated by Django 4.1.6 on 2023-04-19 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0004_card_info'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.CharField(default='non vage', max_length=100),
        ),
    ]
