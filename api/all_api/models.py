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
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    product_id=models.ForeignKey(product,on_delete=models.CASCADE)
    number_product=models.IntegerField()

class order_product(models.Model):
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    product_id=models.ForeignKey(product,on_delete=models.CASCADE)
    total_price=models.IntegerField()
    number_product=models.IntegerField()
    date=models.DateField()

 




    