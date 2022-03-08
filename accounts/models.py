from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class DoulaProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
    image = models.ImageField(upload_to='doula/', null=True)
    name = models.CharField(max_length=255)
    about = models.TextField(blank=True)
    services = models.TextField(blank=True)
    why = models.TextField(blank=True)
    started = models.DateField(blank=True)
    website = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    calendly = models.URLField(blank=True)
    refresh_token = models.CharField(max_length=255, blank=True)
    is_doula = models.BooleanField(default=True, null=True)
    certification = models.TextField(blank=True)


    def __str__(self):
        return self.user.username


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
    is_doula = models.BooleanField(default=False, null=False)

    def __str__(self):
        return self.user.username


class Feedback(models.Model):
        doula = models.ForeignKey(DoulaProfile, on_delete=models.CASCADE)
        name = models.CharField(max_length=255)
        user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
        email = models.EmailField()
        phone_number = models.CharField(max_length=255)
        question = models.TextField(blank=True)

        def __str__(self):
            return self.user.username

        
   