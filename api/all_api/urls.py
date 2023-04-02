
from django.contrib import admin
from django.urls import path,include
from all_api import views
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()  
router.register(r'product', productViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
