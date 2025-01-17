from dashboard.viewsets import ProductViewset
from dashboard.viewsets import UserViweset,OrderViweset
from rest_framework import routers

router = routers.DefaultRouter()
router.register('product',ProductViewset),
router.register('users',UserViweset),
router.register('orders',OrderViweset)