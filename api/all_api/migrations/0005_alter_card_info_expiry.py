# Generated by Django 4.1.6 on 2023-04-27 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0004_alter_product_offer_alter_product_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card_info',
            name='expiry',
            field=models.CharField(max_length=15),
        ),
    ]
