# Generated by Django 4.1.6 on 2023-04-12 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0002_alter_order_product_product_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order_product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=3),
        ),
    ]