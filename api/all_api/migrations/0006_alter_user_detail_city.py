# Generated by Django 4.1.6 on 2023-04-27 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0005_alter_card_info_expiry'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_detail',
            name='city',
            field=models.CharField(max_length=100),
        ),
    ]
