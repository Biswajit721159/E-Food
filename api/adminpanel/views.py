from django.shortcuts import render,HttpResponse

# Create your views here.

def Dashboard(request):
    return HttpResponse("Hello World")