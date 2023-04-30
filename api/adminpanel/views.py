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

#product section 

def product(request):
    data=requests.get('http://127.0.0.1:8000/product/').json()
    return render(request,"admin/manage_product.html",{'productlist':data})

def product_search_product_id(request):
    if request.method=="GET":
        product_id=request.GET.get('product_id')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['id'])==str(product_id):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait")
    
def product_search_product_name(request):
    if request.method=="GET":
        product_name=request.GET.get('product_name')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['product_name'])==str(product_name):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait")
    
def product_search_price(request):

    if request.method=="GET":
        price=request.GET.get('price')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['price'])==str(price):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait")   

def product_search_offer(request):
    if request.method=="GET":
        offer=request.GET.get('offer')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['offer'])==str(offer):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait")     
    
def product_search_product_type(request):
    if request.method=="GET":
        product_type=request.GET.get('product_type')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['product_type'])==str(product_type):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait") 

def product_search_location(request):
    if request.method=="GET":
        location=request.GET.get('location')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['location'])==str(location):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait")  

def product_search_number_product(request):
    if request.method=="GET":
        number_product=request.GET.get('number_product')
        data=requests.get('http://127.0.0.1:8000/product/').json()
        arr=[]
        for i in data:
            if str(i['number_count'])==str(number_product):
                arr.append(i)
        return render(request,"admin/manage_product.html",{'productlist':arr})
    else:
        return HttpResponse("Please Wait")       
    
# managereviews

def managereviews(request):
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    return render(request,"admin/Manage_reviews.html",{'reviews':data})

def managereviews_search_Reviews_id(request):
    Reviews_id=request.GET.get('Reviews_id')
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    arr=[]
    for i in data:
        if str(i['Reviews_id'])==str(Reviews_id):
            arr.append(i)
    return render(request,"admin/Manage_reviews.html",{'reviews':arr})

def managereviews_search_order_id(request):
    order_id=request.GET.get('order_id')
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    arr=[]
    for i in data:
        if str(i['order_id'])==str(order_id):
            arr.append(i)
    return render(request,"admin/Manage_reviews.html",{'reviews':arr})

def managereviews_search_mobile(request):
    mobile=request.GET.get('mobile')
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    arr=[]
    for i in data:
        if str(i['mobile'])==str(mobile):
            arr.append(i)
    return render(request,"admin/Manage_reviews.html",{'reviews':arr})

def managereviews_search_product_id(request):
    product_id=request.GET.get('product_id')
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    arr=[]
    for i in data:
        if str(i['product_id'])==str(product_id):
            arr.append(i)
    return render(request,"admin/Manage_reviews.html",{'reviews':arr})

def managereviews_search_rating(request):
    rating=request.GET.get('rating')
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    arr=[]
    for i in data:
        if str(i['rating'])==str(rating):
            arr.append(i)
    return render(request,"admin/Manage_reviews.html",{'reviews':arr})

def managereviews_search_time_created(request):
    time_created=request.GET.get('time_created')
    data=requests.get('http://127.0.0.1:8000/Reviews/').json()
    arr=[]
    for i in data:
        if str(i['time_created'])==str(time_created):
            arr.append(i)
    return render(request,"admin/Manage_reviews.html",{'reviews':arr})


# manage_cart

def manage_cart(request):
    data=requests.get('http://127.0.0.1:8000/mybag/').json()
    return render(request,"admin/manage_cart.html",{'cart':data})

def manage_cart_search_mobile(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/mybag/').json()
        mobile=request.GET.get('mobile')
        arr=[]
        for i in data:
            if str(i['mobile'])==str(mobile):
                arr.append(i)
        return render(request,"admin/manage_cart.html",{'cart':arr})
    else:
        return HttpResponse("Please wait some time")
    
def manage_cart_search_product_id(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/mybag/').json()
        product_id=request.GET.get('product_id')
        arr=[]
        for i in data:
            if str(i['product_id'])==str(product_id):
                arr.append(i)
        return render(request,"admin/manage_cart.html",{'cart':arr})
    else:
        return HttpResponse("Please wait some time")
 
def manage_cart_search_number_product(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/mybag/').json()
        number_product=request.GET.get('number_product')
        arr=[]
        for i in data:
            if str(i['number_product'])==str(number_product):
                arr.append(i)
        return render(request,"admin/manage_cart.html",{'cart':arr})
    else:
        return HttpResponse("Please wait some time")
    
#iswishlist

def iswishlist(request):
    data=requests.get('http://127.0.0.1:8000/iswishlist/').json()
    return render(request,"admin/iswishlist.html",{'cart':data})

def iswishlist_search_love_id(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/iswishlist/').json()
        love_id=request.GET.get('love_id')
        arr=[]
        for i in data:
            if str(i['loveid'])==str(love_id):
                arr.append(i)
        return render(request,"admin/iswishlist.html",{'cart':arr})
    else:
        return HttpResponse("Please Wait")  

def iswishlist_search_mobile(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/iswishlist/').json()
        mobile=request.GET.get('mobile')
        arr=[]
        for i in data:
            if str(i['mobile'])==str(mobile):
                arr.append(i)
        return render(request,"admin/iswishlist.html",{'cart':arr})
    else:
        return HttpResponse("Please Wait")  


def iswishlist_search_product_id(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/iswishlist/').json()
        product_id=request.GET.get('product_id')
        arr=[]
        for i in data:
            if str(i['product_id'])==str(product_id):
                arr.append(i)
        return render(request,"admin/iswishlist.html",{'cart':arr})
    else:
        return HttpResponse("Please Wait")  

#manage_contact

def manage_contact(request):
    data=requests.get('http://127.0.0.1:8000/contact_api/').json()
    return render(request,"admin/Manage_contact.html",{'data':data})

def manage_contact_search_mobile(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/contact_api/').json()
        mobile=request.GET.get('mobile')
        arr=[]
        for i in data:
            if str(i['mobile'])==str(mobile):
                arr.append(i)
        return render(request,"admin/Manage_contact.html",{'data':arr})
    else:
        return HttpResponse("Wait for sometime")   

def manage_contact_search_contact_id(request):

    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/contact_api/').json()
        contact_id=request.GET.get('contact_id')
        arr=[]
        for i in data:
            if str(i['contact_id'])==str(contact_id):
                arr.append(i)
        return render(request,"admin/Manage_contact.html",{'data':arr})
    else:
        return HttpResponse("Wait for sometime") 

#manage card 

def manage_card(request):
    data=requests.get('http://127.0.0.1:8000/card_info/').json()
    return render(request,"admin/card_info.html",{'data':data})

def manage_card_search_card_id(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/card_info/').json()
        card_id=request.GET.get('card_id')
        arr=[]
        for i in data:
            if str(i['card_id'])==str(card_id):
                arr.append(i)
        return render(request,"admin/card_info.html",{'data':arr})
    else:
        return HttpResponse("wait sometime") 

def manage_card_search_mobile(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/card_info/').json()
        mobile=request.GET.get('mobile')
        arr=[]
        for i in data:
            if str(i['mobile'])==str(mobile):
                arr.append(i)
        return render(request,"admin/card_info.html",{'data':arr})
    else:
        return HttpResponse("wait sometime")    

def manage_card_search_card_number(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/card_info/').json()
        card_number=request.GET.get('card_number')
        arr=[]
        for i in data:
            if str(i['card_number'])==str(card_number):
                arr.append(i)
        return render(request,"admin/card_info.html",{'data':arr})
    else:
        return HttpResponse("wait sometime")    

def manage_card_search_name(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/card_info/').json()
        name=request.GET.get('name')
        arr=[]
        for i in data:
            if str(i['name'])==str(name):
                arr.append(i)
        return render(request,"admin/card_info.html",{'data':arr})
    else:
        return HttpResponse("wait sometime")    

def manage_card_search_expiry(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/card_info/').json()
        expiry=request.GET.get('expiry')
        arr=[]
        for i in data:
            if str(i['expiry'])==str(expiry):
                arr.append(i)
        return render(request,"admin/card_info.html",{'data':arr})
    else:
        return HttpResponse("wait sometime")    

def manage_card_search_cvv(request):
    if request.method=="GET":
        data=requests.get('http://127.0.0.1:8000/card_info/').json()
        cvv=request.GET.get('cvv')
        arr=[]
        for i in data:
            if str(i['cvv'])==str(cvv):
                arr.append(i)
        return render(request,"admin/card_info.html",{'data':arr})
    else:
        return HttpResponse("wait sometime")    
    
