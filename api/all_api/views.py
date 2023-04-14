from django.shortcuts import render,HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

# import viewsets
from rest_framework import viewsets
from .serializers import productSerializer,userSerializer,mybagSerializer,orderSerializer
from .models import *
from .models import mybag
 
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
    
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        data = user_detail.objects.all()
        user_arrays=[]
        for i in data:
            if str(i.mobile)==str(user_data['mobile']):
                user_arrays=i
                break    
        user_serialzer = userSerializer(user_arrays, data=user_data)
        if user_serialzer.is_valid():
            user_serialzer.save() 
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")	



@csrf_exempt
def mybagapi(request,pk=0):

    if request.method=="GET":
        all_mybag=mybag.objects.all()
        mybag_serializer = mybagSerializer(all_mybag, many=True)
        # print(mybag_serializer)
        return JsonResponse(mybag_serializer.data,  safe=False)
    
    elif request.method == 'POST':
        mybag_data = JSONParser().parse(request)
        mybag_serializer = mybagSerializer(data=mybag_data)
        if mybag_serializer.is_valid():
            mybag_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)
    
    elif request.method == 'PUT':
        mybag_data = JSONParser().parse(request)
        data = mybag.objects.all()
        mybag_arrays=[]
        for i in data:
            if str(i.mobile)==str(mybag_data['mobile']) and str(i.product_id)==str(mybag_data['product_id']):
                mybag_arrays=i
                break

        mybag_serialzer = mybagSerializer(mybag_arrays, data=mybag_data)
        if mybag_serialzer.is_valid():
            mybag_serialzer.save() 
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")	
    
    elif request.method == 'DELETE':
        mybag_data = JSONParser().parse(request)
        print(mybag_data)
        data = mybag.objects.all()
        new_data=[]
        for i in data:
            if str(i.mobile)==str(mybag_data['mobile']):
                new_data=i
                break    
        new_data.delete()
        return JsonResponse("Data Was Deleted Successfully", safe=False)	



@csrf_exempt

def orderapi(request,pk=0):
    if request.method=="GET":
        all_order=order_product.objects.all()
        order_serializer = orderSerializer(all_order, many=True)
        return JsonResponse(order_serializer.data,  safe=False)
    
    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        order_serializerr = orderSerializer(data=order_data)
        # print(order_serializerr)
        if order_serializerr.is_valid():
            order_serializerr.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)


@csrf_exempt
def productapi(request,pk=0):

    if request.method=="PATCH":
        location = JSONParser().parse(request)
        all_product=product.objects.filter(location=location['location'])
        product_serializer = productSerializer(all_product, many=True)
        return JsonResponse(product_serializer.data,  safe=False)
    
    
    if request.method=="GET":
        all_product=product.objects.all()
        product_serializer = productSerializer(all_product, many=True)
        return JsonResponse(product_serializer.data,  safe=False)