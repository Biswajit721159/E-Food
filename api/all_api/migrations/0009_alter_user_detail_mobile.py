# Generated by Django 4.1.6 on 2023-04-28 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_api', '0008_alter_user_detail_pin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_detail',
            name='mobile',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]