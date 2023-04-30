from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth. models import User
from django.contrib import messages
import datetime
import requests
import re
from django.contrib.auth import authenticate, login, logout
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect


def index(request):
    return render(request, "admin/Admin_login.html")

@csrf_exempt
def connect(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/adminpanel/dashboard')
        else:
            error_mess=[]
            error_mess.append("Invalid Username or Password")
            return render(request,"admin/Admin_login.html",{'error':error_mess})
    else:
        return HttpResponse("Something is wrong")
    
def dashboard(request):
    context = {
        'Total_product': 0,
        'Total_user': 0,
        'Total_reviews': 0,
        'Total_Order_product': 0,
    }
    return render(request, "admin/dashboard.html", context)

#user info section 

def userinfo(request):
    userlist=requests.get('http://127.0.0.1:8000/user/').json()
    return render(request, 'admin/User_info.html',{'userlist': userlist})

def user_info_search_first_name(request):
    if request.method=="GET":
        first_name=request.GET.get('first_name')
        data=requests.get('http://127.0.0.1:8000/user/').json()
        arr=[]
        for i in data:
            if str(i['first_name'])==str(first_name):
                arr.append(i)
        return render(request,'admin/User_info.html',{'userlist': arr})  
    else:
        return HttpResponse("Wait Sometime")   

def user_info_search_last_name(request):
    if request.method=="GET":
        last_name=request.GET.get('last_name')
        data=requests.get('http://127.0.0.1:8000/user/').json()
        arr=[]
        for i in data:
            if str(i['last_name'])==str(last_name):
                arr.append(i)
        return render(request,"admin/User_info.html",{'userlist':arr})
    else:
        return HttpResponse("Wait some time") 

def user_info_search_mobile(request):
    if request.method=="GET":
        mobile=request.GET.get('mobile')
        data=requests.get('http://127.0.0.1:8000/user/').json()
        arr=[]
        for i in data:
            if str(i['mobile'])==str(mobile):
                arr.append(i)               
        return render(request,"admin/User_info.html",{'userlist':arr})
    else:
        return HttpResponse("Wait some time")   

def user_info_search_pin(request):
    if request.method=="GET":
        pin=request.GET.get('pin')
        data=requests.get('http://127.0.0.1:8000/user/').json()
        arr=[]
        for i in data:
            if str(i['pin'])==str(pin):
                arr.append(i)               
        return render(request,"admin/User_info.html",{'userlist':arr})
    else:
        return HttpResponse("Wait some time") 
    
def user_info_search_state(request):
    if request.method=="GET":
        state=request.GET.get('state')
        data=requests.get('http://127.0.0.1:8000/user/').json()
        arr=[]
        for i in data:
            if str(i['state'])==str(state):
                arr.append(i)               
        return render(request,"admin/User_info.html",{'userlist':arr})
    else:
        return HttpResponse("Wait some time") 

def user_info_search_city(request):

    if request.method=="GET":
        city=request.GET.get('city')
        data=requests.get('http://127.0.0.1:8000/user/').json()
        arr=[]
        for i in data:
            if str(i['city'])==str(city):
                arr.append(i)               
        return render(request,"admin/User_info.html",{'userlist':arr})
    else:
        return HttpResponse("Wait some time") 
    

#order section 

def order(request):
    data=requests.get('http://127.0.0.1:8000/order/').json()
    return render(request,"admin/order.html",{'userlist':data})    

def order_search_order_id(request):
    if request.method=="GET":
        order_id=request.GET.get('order_id')
        data=requests.get('http://127.0.0.1:8000/order/').json()
        arr=[]
        for i in data:
            if str(i['order_id'])==str(order_id):
                arr.append(i)
        return render(request,"admin/order.html",{'userlist':arr})        

    else:
        return HttpResponse("Please wait")    

def order_search_product_id(request):
    if request.method=="GET":
        product_id=request.GET.get('product_id')
        data=requests.get('http://127.0.0.1:8000/order/').json()
        arr=[]
        for i in data:
            if str(i['product_id'])==str(product_id):
                arr.append(i)
        return render(request,"admin/order.html",{'userlist':arr})        

    else:
        return HttpResponse("Please wait")   

def order_search_mobile(request):
    if request.method=="GET":
        mobile=request.GET.get('mobile')
        data=requests.get('http://127.0.0.1:8000/order/').json()
        arr=[]
        for i in data:
            if str(i['mobile'])==str(mobile):
                arr.append(i)
        return render(request,"admin/order.html",{'userlist':arr})        

    else:
        return HttpResponse("Please wait")   

def order_search_price(request):
    if request.method=="GET":
        price=request.GET.get('price')
        data=requests.get('http://127.0.0.1:8000/order/').json()
        arr=[]
        for i in data:
            if str(i['price'])==str(price):
                arr.append(i)
        return render(request,"admin/order.html",{'userlist':arr})        

    else:
        return HttpResponse("Please wait")   

def order_search_number_product(request):
   
    if request.method=="GET":
        number_product=request.GET.get('number_product')
        data=requests.get('http://127.0.0.1:8000/order/').json()
        arr=[]
        for i in data:
            if str(i['number_product'])==str(number_product):
                arr.append(i)
        return render(request,"admin/order.html",{'userlist':arr})        
    else:
        return HttpResponse("Please wait")      
    
def order_search_date(request):
    if request.method=="GET":
        date=request.GET.get('date')
        data=requests.get('http://127.0.0.1:8000/order/').json()
        arr=[]
        for i in data:
            if str(i['date'])==str(date):
                arr.append(i)
        return render(request,"admin/order.html",{'userlist':arr})        

    else:
        return HttpResponse("Please wait")   


def product(request):
    data=requests.get('http://127.0.0.1:8000/product/').json()
    return render(request,"admin/manage_product.html",{'productlist':data})