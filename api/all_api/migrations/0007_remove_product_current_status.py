# Generated by Django 4.1.6 on 2023-04-21 02:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0006_product_number_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='current_status',
        ),
    ]
