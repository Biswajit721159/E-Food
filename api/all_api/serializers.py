
# import serializer from rest_framework
from rest_framework import serializers
 
# import model from models.py
from .models import *
 
# Create a model serializer


class Restaurant_user_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Restaurant_user
        fields="__all__"

class productSerializer(serializers.ModelSerializer):
    tracks1 = Restaurant_user_Serializer(many=True, read_only=True)
    class Meta:
        model = product
        fields = ('tracks1','id', 'email','product_url','product_name', 'price','number_count','offer','product_type','location')


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_detail
        fields = ('mobile', 'first_name','last_name','password' ,'address','city','pin', 'state')


class mybagSerializer(serializers.ModelSerializer):
    tracks1 = userSerializer(many=True, read_only=True)
    tracks2 = productSerializer(many=True, read_only=True)
    class Meta:
        model = mybag
        fields = ('tracks1','tracks2','mobile', 'product_id','number_product') 


class orderSerializer(serializers.ModelSerializer):
    tracks1 = userSerializer(many=True, read_only=True)
    tracks2 = productSerializer(many=True, read_only=True)
    class Meta:
        model=order_product
        fields =('tracks1','tracks2','order_id','mobile','product_id','price','number_product','date')             


class iswishlistSerializer(serializers.ModelSerializer):
    tracks1 = userSerializer(many=True, read_only=True)
    tracks2 = productSerializer(many=True, read_only=True)
    class Meta:
        model=iswishlist
        fields =('tracks1','tracks2','loveid','mobile','product_id')  


class ReviewsSerializer(serializers.ModelSerializer):
    tracks1 = userSerializer(many=True, read_only=True)
    tracks2 = productSerializer(many=True, read_only=True)
    tracks3 = orderSerializer(many=True, read_only=True)
    class Meta:
        model=Reviews
        fields =('tracks1','tracks2','tracks3','Reviews_id','order_id','mobile','product_id','rating','review','time_created','image')   


class card_infoSerializer(serializers.ModelSerializer):
    tracks1 = userSerializer(many=True, read_only=True)
    class Meta:
        model=card_info
        fields =('tracks1','card_id','mobile','card_number','name','expiry','cvv') 

        
class adminuser_Serializer(serializers.ModelSerializer):
    class Meta:
        model=adminuser
        fields =('username','password')                   


class contact_Serializer(serializers.ModelSerializer):  
    tracks = userSerializer(many=True, read_only=True)
    class Meta:
        model=contact
        fields=('tracks','contact_id','mobile','message')  

