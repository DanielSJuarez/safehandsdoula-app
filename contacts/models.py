from django.db import models
from django.conf import settings
from accounts.models import DoulaProfile

# Create your models here.

class Contact(models.Model):
        doula = models.ForeignKey(DoulaProfile, null=True, on_delete=models.CASCADE)
        name = models.CharField(max_length=255)
        user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
        email = models.EmailField()
        phone_number = models.CharField(max_length=255)
        question = models.TextField(blank=True)

        def __str__(self):
            return self.user.username