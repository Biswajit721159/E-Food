
# import serializer from rest_framework
from rest_framework import serializers
 
# import model from models.py
from .models import *
 
# Create a model serializer
class productSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = product
        fields = ('id', 'product_url','product_name', 'price','rating', 'current_status','offer')


class userSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = user_detail
        fields = ('mobile', 'first_name','last_name','password' ,'address','pin', 'state')


class mybagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = mybag
        fields = ('mobile', 'product_id','number_product') 

class orderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=order_product
        fields =('order_id','mobile','product_id','price','number_product','date')                