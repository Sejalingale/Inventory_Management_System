from django.contrib import admin
from .models import Product,Order
# Register your models here.

@admin.register(Product)  # Alternate registration method
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','category', 'sku', 'quantity', 'price', 'supplier', 'expiration_date','stock','threshold')  # Specify fields to display

@admin.register(Order)  # Alternate registration method
class OrderAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'staff', 'order_quantity', 'date')  # Specify fields to display

    def product_name(self, obj):
        return obj.product.name
    product_name.admin_order_field = 'product__name'  # Allows sorting by product name
    product_name.short_description = 'Product Name'  # Set column header