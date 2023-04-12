# Generated by Django 4.1.6 on 2023-04-12 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='mybag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile', models.CharField(max_length=10)),
                ('product_id', models.CharField(max_length=100)),
                ('number_product', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='order_product',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('mobile', models.CharField(max_length=10)),
                ('product_id', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('number_product', models.IntegerField()),
                ('date', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('product_url', models.CharField(max_length=200)),
                ('product_name', models.CharField(max_length=50)),
                ('price', models.IntegerField()),
                ('rating', models.IntegerField()),
                ('current_status', models.CharField(max_length=50)),
                ('offer', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='user_detail',
            fields=[
                ('mobile', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=300)),
                ('password', models.CharField(default=None, max_length=20)),
                ('address', models.CharField(max_length=300)),
                ('pin', models.IntegerField()),
                ('state', models.CharField(max_length=20)),
            ],
        ),
    ]
