from django.urls import path
from .views import StockAlertView
from .views import generate_csv_report

urlpatterns = [
    path('stock-alerts/', StockAlertView.as_view(), name='stock-alerts'),
    path('generate-csv/', generate_csv_report, name='generate_csv'),
]
