from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
from .models import Product
from .serializers import StockAlertSerializer
import csv
from django.http import HttpResponse

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
