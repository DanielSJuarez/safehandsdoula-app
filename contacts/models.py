from django.db import models
from django.conf import settings
from accounts.models import DoulaProfile

# Create your models here.

class Contact(models.Model):

        CONTACT = (
        ('NEW', 'New'),
        ('CON', 'Contacted'),
        )
        
        doula = models.ForeignKey(DoulaProfile, null=True, on_delete=models.CASCADE)
        name = models.CharField(max_length=255)
        email = models.EmailField()
        phone_number = models.CharField(max_length=255)
        question = models.TextField(blank=True)
        contact_status = models.CharField(max_length=3, choices=CONTACT, default='NEW')
        reported = models.BooleanField(null=False, default=False)
        read_status = models.BooleanField(null=False, default=False)

        def __str__(self):
            return self.name