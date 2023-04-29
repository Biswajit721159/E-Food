
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('all_api.urls')),
    path('adminpanel/',include('adminpanel.urls')),
]
