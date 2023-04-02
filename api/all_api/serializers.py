
# import serializer from rest_framework
from rest_framework import serializers
 
# import model from models.py
from .models import product
 
# Create a model serializer
class productSerializer(serializers.HyperlinkedModelSerializer):
    # specify model and fields
    class Meta:
        model = product
        fields = ('id', 'product_url','product_name', 'price','rating', 'current_status','offer')