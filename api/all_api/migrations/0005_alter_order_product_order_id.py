# Generated by Django 4.1.6 on 2023-04-12 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0004_alter_order_product_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order_product',
            name='order_id',
            field=models.AutoField(default=False, primary_key=True, serialize=False),
        ),
    ]
