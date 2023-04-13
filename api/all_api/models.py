from django.db import models



class user_detail(models.Model):
    mobile=models.CharField(primary_key=True,max_length=10)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=300)
    password=models.CharField(max_length=20,default=None)
    address=models.CharField(max_length=300)
    pin=models.IntegerField()
    state=models.CharField(max_length=20)
    
    def __str__(self):
        return str(self.mobile)

class product(models.Model):
    id=models.AutoField(primary_key=True)
    product_url=models.CharField(max_length=200)
    product_name=models.CharField(max_length=50)
    price=models.IntegerField()
    rating =models.IntegerField()
    current_status=models.CharField(max_length=50)
    offer=models.IntegerField(default=0)

    def __str__(self):
        return str(self.product_name)

class mybag(models.Model):
    mobile=models.CharField(max_length=10)
    product_id=models.CharField(max_length=100)
    number_product=models.IntegerField()

    def __str__(self):
        return str(self.mobile)

class order_product(models.Model):
    order_id=models.AutoField(primary_key=True)
    mobile=models.CharField(max_length=10)
    product_id=models.IntegerField()
    price=models.CharField(max_length=100)
    number_product=models.IntegerField()
    date=models.CharField(max_length=100)

 




    