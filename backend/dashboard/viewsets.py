from rest_framework import viewsets
from . import models
from .import serializers
from rest_framework.permissions import IsAuthenticated

class ProductViewset(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductSerializer

class UserViweset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class=serializers.UserSerializer

class OrderViweset(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users can make an order

    def perform_create(self, serializer):
        # Automatically set the staff (user) as the currently logged-in user
        serializer.save(staff=self.request.user)