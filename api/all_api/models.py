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
    product_type=models.CharField(max_length=100,default="non vage")
    location=models.CharField(max_length=100,default="Delhi")

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


class iswishlist(models.Model):
    loveid=models.AutoField(primary_key=True)
    mobile=models.CharField(max_length=10)
    product_id=models.CharField(max_length=100)  

class Reviews(models.Model):
    Reviews_id=models.AutoField(primary_key=True)
    order_id=models.CharField(max_length=100,default=0)
    mobile = models.CharField(max_length=10)
    product_id = models.CharField(max_length=100)
    rating = models.CharField(max_length=10)
    review = models.CharField(max_length=500)
    time_created = models.CharField(max_length=100)  

    def __str__ (self):
        return self.mobile

class card_info(models.Model):
    mobile=models.CharField(primary_key=True,max_length=12)
    card_number=models.CharField(max_length=12)
    name=models.CharField(max_length=50)
    expiry=models.CharField(max_length=5)
    cvv=models.CharField(max_length=4)  

    def __str__(self):
        return self.mobile       
 




    