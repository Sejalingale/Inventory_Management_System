from django.contrib import admin
from .models import Product,Order
# Register your models here.

@admin.register(Product)  # Alternate registration method
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','category', 'sku', 'quantity', 'price', 'supplier', 'expiration_date','stock','threshold')  # Specify fields to display
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'staff', 'order_quantity', 'date')  # Use the custom method

    def product_name(self, obj):
        return obj.product.name if obj.product else "No Product"

    product_name.short_description = 'Product Name'


    