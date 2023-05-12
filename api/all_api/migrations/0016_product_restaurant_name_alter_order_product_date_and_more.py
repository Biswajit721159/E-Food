# Generated by Django 4.1.6 on 2023-05-07 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0015_order_product_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Restaurant_name',
            field=models.CharField(default='Golden Tuble', max_length=100),
        ),
        migrations.AlterField(
            model_name='order_product',
            name='date',
            field=models.CharField(default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='order_product',
            name='number_product',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='order_product',
            name='price',
            field=models.CharField(default=0, max_length=100),
        ),
        migrations.AlterField(
            model_name='restaurant_user',
            name='Restaurant_name',
            field=models.CharField(default='Golden Tuble', max_length=100),
        ),
    ]