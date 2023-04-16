
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
]
