from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
from .models import Product,Order
from .serializers import StockAlertSerializer
import csv
from django.http import HttpResponse
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


class StockAlertView(APIView):
    def get(self, request):
        # Filter items with stock below the threshold
        low_stock_items = Product.objects.filter(stock__lt=F('threshold'))
        serializer = StockAlertSerializer(low_stock_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def generate_csv_report(request):
    # Create the HttpResponse object with CSV header
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="inventory_report.csv"'

    # Create a CSV writer
    writer = csv.writer(response)

    # Write the header row
    writer.writerow(['ID', 'Name','Quantity','Category','SKU','price','Supplier','Expiration_date', 'Stock', 'Threshold'])

    # Write the data rows from the Product model
    products = Product.objects.all()
    for product in products:
        writer.writerow([product.id, product.name,product.quantity,product.category,product.sku,product.price,product.supplier,product.expiration_date, product.stock, product.threshold,])

    return response


#registeration view 
@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create_user(
            username=data['username'],
            password=data['password'],
            email=data['email'],
            is_staff = data.get('is_admin',False) # this line is for admin role if is_admin is true
        )
        return Response({'message':'user registered successfully!'},status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)
    

#login view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_role(request):
    user = request.user
    role = "Admin" if user.is_staff else "Viewer"
    return Response({"username":user.username,"role":role}) 

class CustomTokenObtainPairView(TokenObtainPairView):
    pass



