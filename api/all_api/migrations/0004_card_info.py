# Generated by Django 4.1.6 on 2023-04-18 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0003_reviews_order_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='card_info',
            fields=[
                ('mobile', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('card_number', models.CharField(max_length=12)),
                ('name', models.CharField(max_length=50)),
                ('expiry', models.CharField(max_length=5)),
                ('cvv', models.CharField(max_length=4)),
            ],
        ),
    ]
