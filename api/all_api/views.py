from django.shortcuts import render,HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
def productapi(request,pk=0):
    if request.method=="GET":
        all_product=product.objects.all()
        students_serializer = productSerializer(all_product, many=True)
        return JsonResponse(students_serializer.data,  safe=False)