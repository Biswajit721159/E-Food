
from django.contrib import admin
from django.urls import path,include
from adminpanel import views

urlpatterns = [
    path('',views.index), 
    path('connect',views.connect),
    path('dashboard',views.dashboard,name="dashboard"),

    #manage users

    path('userinfo',views.userinfo),
    path('userinfo/search_first_name',views.user_info_search_first_name),
    path('userinfo/search_last_name',views.user_info_search_last_name),
    path('userinfo/search_mobile',views.user_info_search_mobile),
    path('userinfo/search_pin',views.user_info_search_pin),
    path('userinfo/search_city',views.user_info_search_city),
    path('userinfo/search_state',views.user_info_search_state),

    # order section ---
    path('order',views.order),
    path('order/search_order_id',views.order_search_order_id),
    path('order/search_product_id',views.order_search_product_id),
    path('order/search_mobile',views.order_search_mobile),
    path('order/search_price',views.order_search_price),
    path('order/search_number_product',views.order_search_number_product),
    path('order/search_date',views.order_search_date),


    


]
