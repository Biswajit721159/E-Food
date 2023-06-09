
from django.contrib import admin
from django.urls import path,include
from all_api import views
from rest_framework import routers
from .views import *


# router = routers.DefaultRouter()  
# router.register(r'product', productViewSet)
# router.register(r'user',userViewSet)




urlpatterns = [
    # path('', include(router.urls)),
    path('product/',views.productapi),
    path('user/',views.userapi),
    path('mybag/',views.mybagapi),
    path('order/',views.orderapi),
    path('iswishlist/',views.iswishlistapi),
    path('Reviews/',views.Reviewsapi),
    path('card_info/',views.card_info_api),
    path('admin_user/',views.admin_user),
    path('contact_api/',views.contact_api),
    path('Restaurant_user/',views.Restaurant_user_api),
    path('image_detail_api/',views.image_detail_api),
]
