# filepath: /C:/Users/Kishan/OneDrive/Documents/GitHub/Food-delivery/backend/authapp/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class Customer(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username