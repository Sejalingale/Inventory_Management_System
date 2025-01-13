from django.db import models
from django.contrib.auth.models import User

# Create your models here.

CATEGORY=(
      ('Stationary','Stationary'),
      ('Electronics','Electronics'),
      ('Food','Food'),
)

class Product(models.Model):
    name = models.CharField(max_length=100,default="Unnamed Product")
    category = models.CharField(max_length=50,choices=CATEGORY,null=True)
    sku = models.CharField(max_length=50,unique=True,default="xxx")
    quantity = models.PositiveIntegerField(default=0)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField( max_digits=10, decimal_places=2,default=0.00)
    supplier = models.CharField( max_length=50,default="xyz")
    expiration_date = models.DateField()
    threshold = models.PositiveIntegerField(default=10)  # Alert when stock falls below this

def __str__(self):
        return str(self.name)

def is_below_threshold(self):
        return self.stock < self.threshold

class Order(models.Model):
      product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
      staff = models.ForeignKey(User,models.CASCADE,null=True)
      order_quantity = models.PositiveIntegerField(null=True)
      date = models.DateTimeField(auto_now_add=True)

def __str__(self):
       return str(self.product.name)
