from django.shortcuts import render,HttpResponse

# Create your views here.


# import viewsets
from rest_framework import viewsets
 
# import local data
from .serializers import productSerializer
from .models import product
 
# create a viewset
class productViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = product.objects.all()
     
    # specify serializer to be used 
    serializer_class = productSerializer

def home(request):
    return HttpResponse("Hello")