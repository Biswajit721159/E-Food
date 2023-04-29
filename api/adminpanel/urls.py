
from django.contrib import admin
from django.urls import path,include
from adminpanel import views

urlpatterns = [
    path('',views.Dashboard),
]
