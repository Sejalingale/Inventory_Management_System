from rest_framework import serializers
from .models import Product,Order
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class StockAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'stock', 'threshold']

class UserSerializer(serializers.ModelSerializer):
    class  Meta:
        model = User
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    staff_name = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'product','product_name', 'staff_name', 'order_quantity', 'date']

    def get_product_name(self, obj):
        return obj.product.name if obj.product else "No Product"

    def get_staff_name(self, obj):
        return obj.staff.username if obj.staff else "No Staff"