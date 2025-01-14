from django.urls import path
from .views import StockAlertView
from .views import generate_csv_report
from .views import register_user, CustomTokenObtainPairView, get_user_role

urlpatterns = [
    path('stock-alerts/', StockAlertView.as_view(), name='stock-alerts'),
    path('generate-csv/', generate_csv_report, name='generate_csv'),
    path('register/', register_user, name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user-role/', get_user_role, name='user_role'),
]
