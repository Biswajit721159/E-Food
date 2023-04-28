from django.db import models


class user_detail(models.Model):
    mobile=models.CharField(primary_key=True,max_length=10)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=300)
    password=models.CharField(max_length=20)
    address=models.CharField(max_length=300)
    pin=models.CharField(max_length=100)
    state=models.CharField(max_length=20)
    city=models.CharField(max_length=100,default="Jalpaiguri")
    # def __str__(self):
    #     return str(self.first_name)


class product(models.Model):
    id=models.AutoField(primary_key=True)
    product_url=models.CharField(max_length=200)
    product_name=models.CharField(max_length=50)
    price=models.IntegerField(default=100)
    offer=models.IntegerField(default=5)
    product_type=models.CharField(max_length=100,default="non vage")
    location=models.CharField(max_length=100,default="Jalpaiguri")
    number_count=models.IntegerField(default=10)


class mybag(models.Model):
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    product_id=models.ForeignKey(product,on_delete=models.CASCADE)
    number_product=models.IntegerField()


class order_product(models.Model):
    order_id=models.AutoField(primary_key=True)
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    product_id=models.ForeignKey(product,on_delete=models.CASCADE)
    price=models.CharField(max_length=100)
    number_product=models.IntegerField()
    date=models.CharField(max_length=100)


class iswishlist(models.Model):
    loveid=models.AutoField(primary_key=True)
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    product_id=models.ForeignKey(product,on_delete=models.CASCADE) 


class Reviews(models.Model):
    Reviews_id=models.AutoField(primary_key=True)
    order_id=models.ForeignKey(order_product,on_delete=models.CASCADE)
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    product_id=models.ForeignKey(product,on_delete=models.CASCADE) 
    rating = models.CharField(max_length=10)
    review = models.CharField(max_length=500)
    time_created = models.CharField(max_length=100)  

   


class card_info(models.Model):
    card_id=models.AutoField(primary_key=True)
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    card_number=models.CharField(max_length=12)
    name=models.CharField(max_length=50)
    expiry=models.CharField(max_length=15)
    cvv=models.CharField(max_length=4)  

     
 

class adminuser(models.Model):
    username=models.CharField(primary_key=True,max_length=100)
    password=models.CharField(max_length=20)
    
    def __str__(self):
        return self.username
 
    
class contact(models.Model):
    contact_id=models.AutoField(primary_key=True)
    mobile=models.ForeignKey(user_detail,on_delete=models.CASCADE)
    message=models.TextField()

    
 


    