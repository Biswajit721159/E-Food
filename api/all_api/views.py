from django.shortcuts import render,HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


# import viewsets
from rest_framework import viewsets
from .serializers import productSerializer,userSerializer,mybagSerializer
from .models import *
 
# create a viewset
# class productViewSet(viewsets.ModelViewSet):
#     queryset = product.objects.all()
#     serializer_class = productSerializer


# class userViewSet(viewsets.ModelViewSet):
#     queryset = user_detail.objects.all()
#     serializer_class = userSerializer


@csrf_exempt

def userapi(request,pk=0):

    if request.method=="GET":
        all_user_detail=user_detail.objects.all()
        user_detail_serializer = userSerializer(all_user_detail, many=True)
        return JsonResponse(user_detail_serializer.data,  safe=False)
    

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = userSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)

def mybagapi(request,pk=0):

    if request.method=="GET":
        all_mybag=mybag.objects.all()
        mybag_serializer = mybagSerializer(all_mybag, many=True)
        print(mybag_serializer)
        return JsonResponse(mybag_serializer.data,  safe=False)
    
    elif request.method == 'POST':
        mybag_data = JSONParser().parse(request)
        mybag_serializer = mybagSerializer(data=mybag_data)
        if mybag_serializer.is_valid():
            mybag_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)

def productapi(request,pk=0):

    if request.method=="GET":
        all_product=product.objects.all()
        product_serializer = productSerializer(all_product, many=True)
        return JsonResponse(product_serializer.data,  safe=False)