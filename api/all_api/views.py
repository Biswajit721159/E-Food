from django.shortcuts import render,HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .serializers import productSerializer,userSerializer,mybagSerializer,orderSerializer,iswishlistSerializer,ReviewsSerializer,card_infoSerializer,adminuser_Serializer,contact_Serializer
from .models import *
from .models import mybag,adminuser
 
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
        return JsonResponse("Failed To Update",safe=False)	


@csrf_exempt
def mybagapi(request,pk=0):

    if request.method=="GET":
        all_mybag=mybag.objects.all()
        mybag_serializer = mybagSerializer(all_mybag, many=True)
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
            if str(i.mobile.mobile)==str(mybag_data['mobile']) and str(i.product_id.id)==str(mybag_data['product_id']):
                mybag_arrays=i
                break    
        mybag_serialzer = mybagSerializer(mybag_arrays, data=mybag_data)
        if mybag_serialzer.is_valid():
            mybag_serialzer.save() 
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")	
    
    elif request.method == 'DELETE':
        mybag_data = JSONParser().parse(request)
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
        if order_serializerr.is_valid():
            order_serializerr.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)


@csrf_exempt
def productapi(request,pk=0):

    if request.method=="PATCH":
        location = JSONParser().parse(request)
        all_product=product.objects.all()
        user_data=user_detail.objects.all()
        count=''
        for i in user_data:
            if i.mobile==location['mobile']:
                count=i.city
        arr=[]
        for i in all_product:
            if i.location==count:
                arr.append(i)
        product_serializer = productSerializer(arr, many=True)
        return JsonResponse(product_serializer.data,  safe=False)
    
    
    elif request.method=="GET":
        all_product=product.objects.all()
        product_serializer = productSerializer(all_product, many=True)
        return JsonResponse(product_serializer.data,  safe=False)
    
    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        data = product.objects.all()
        product_arrays=[]
        for i in data:
            # print()
            # print(i.id)
            # print(product_data['id'])
            # print("Hello")
            # print()
            if str(i.id)==str(product_data['id']):
                product_arrays=i
                break          
        print(product_arrays)      
        product_s = productSerializer(product_arrays, data=product_data) 
        print(product_s.error_messages)  
        if product_s.is_valid():
            product_s.save() 
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update",  safe=False)	
    

@csrf_exempt
def iswishlistapi(request,pk=0):
    if request.method=="GET":
        all_data=iswishlist.objects.all()
        iswistlis_serilizer=iswishlistSerializer(all_data,many=True)
        return JsonResponse(iswistlis_serilizer.data, safe=False)
    
    elif request.method=="POST":
        get_data=JSONParser().parse(request)
        iswistlist_serializerr = iswishlistSerializer(data=get_data)
        if iswistlist_serializerr.is_valid():
            iswistlist_serializerr.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)
    

    elif request.method == 'DELETE':
        all_data = JSONParser().parse(request)
        data = iswishlist.objects.all()
        new_data=[]
        for i in data:
            if str(i.mobile.mobile)==str(all_data['mobile']) and str(i.product_id.id)==str(all_data['product_id']):
                new_data=i
                break     
        new_data.delete()
        return JsonResponse("Deleted Successfully", safe=False)	

@csrf_exempt
def Reviewsapi(request,pk=0):

        if request.method=="GET":
            all_data=Reviews.objects.all()
            Reviews_serilizer=ReviewsSerializer(all_data,many=True)
            return JsonResponse(Reviews_serilizer.data, safe=False)
    
        elif request.method=="POST":
            get_data=JSONParser().parse(request)
            Reviews_serializerr = ReviewsSerializer(data=get_data)
            if Reviews_serializerr.is_valid():
                Reviews_serializerr.save()
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed To Add", safe=False)


@csrf_exempt
def card_info_api(request,pk=0):
         
        if request.method=="GET":
            all_data=card_info.objects.all()
            card_info_serilizer=card_infoSerializer(all_data,many=True)
            return JsonResponse(card_info_serilizer.data, safe=False)  
         
        elif request.method=="POST":
            get_data=JSONParser().parse(request)
            card_info_serializerr = card_infoSerializer(data=get_data)
            if card_info_serializerr.is_valid():
                card_info_serializerr.save()
                return JsonResponse("Your Card is Successfully Added", safe=False)
            return JsonResponse("Failed To Add", safe=False)

        elif request.method == 'PUT':
            card_data = JSONParser().parse(request)
            data = card_info.objects.all()
            card_arrays=[]
            for i in data:
                if str(i.mobile.mobile)==str(card_data['mobile']):
                    card_arrays=i
                    break
            card_serialzer = card_infoSerializer(card_arrays, data=card_data)
            if card_serialzer.is_valid():
                card_serialzer.save() 
                return JsonResponse("Updated Successfully", safe=False)
            return JsonResponse("Failed To Update")	


@csrf_exempt
def admin_user(request,pk=0):
        if request.method=="GET":
            admindata=adminuser.objects.all()
            admin_s=adminuser_Serializer(admindata,many=True)
            return JsonResponse(admin_s.data, safe=False)  
    
          
@csrf_exempt
def contact_api(request,pk=0):
    if request.method=="GET":
        contactdata=contact.objects.all()
        contact_s=contact_Serializer(contactdata,many=True)
        return JsonResponse(contact_s.data, safe=False) 
    
    elif request.method=="POST":
        
        get_data=JSONParser().parse(request)
        contact_serializerr = contact_Serializer(data=get_data)
        if contact_serializerr.is_valid():
            contact_serializerr.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)         