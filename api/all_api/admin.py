from django.contrib import admin

from .models import *
# Register your models here.


admin.site.register(user_detail)

admin.site.register(product)

admin.site.register(mybag)

admin.site.register(order_product)