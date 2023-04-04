from django.shortcuts import render,HttpResponse

# Create your views here.


# import viewsets
from rest_framework import viewsets
from .serializers import productSerializer,userSerializer
from .models import *
 
# create a viewset
class productViewSet(viewsets.ModelViewSet):
    queryset = product.objects.all()
    serializer_class = productSerializer

class userViewSet(viewsets.ModelViewSet):
    queryset = user_detail.objects.all()
    serializer_class = userSerializer





def home(request):
    return HttpResponse("Hello")