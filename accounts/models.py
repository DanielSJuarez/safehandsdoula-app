from email.policy import default
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class DoulaProfile(models.Model):

    STATUS = (
        ('ACT', 'Active'),
        ('INA', 'Inactive'),
    )

    STATES = (
    ('--', 'Not Selected'),
    ('AK', 'Alaska'),
    ('AL', 'Alabama'),
    ('AR', 'Arkansas'),
    ('AZ', 'Arizona'),
    ('CA', 'California'),
    ('CO', 'Colorado'),
    ('CT', 'Connecticut'),
    ('DC', 'District of Columbia'),
    ('DE', 'Delaware'),
    ('FL', 'Florida'),
    ('GA', 'Georgia'),
    ('HI', 'Hawaii'),
    ('IA', 'Iowa'),
    ('ID', 'Idaho'),
    ('IL', 'Illinois'),
    ('IN', 'Indiana'),
    ('KS', 'Kansas'),
    ('KY', 'Kentucky'),
    ('LA', 'Louisiana'),
    ('MA', 'Massachusetts'),
    ('MD', 'Maryland'),
    ('ME', 'Maine'),
    ('MI', 'Michigan'),
    ('MN', 'Minnesota'),
    ('MO', 'Missouri'),
    ('MS', 'Mississippi'),
    ('MT', 'Montana'),
    ('NC', 'North Carolina'),
    ('ND', 'North Dakota'),
    ('NE', 'Nebraska'),
    ('NH', 'New Hampshire'),
    ('NJ', 'New Jersey'),
    ('NM', 'New Mexico'),
    ('NV', 'Nevada'),
    ('NY', 'New York'),
    ('OH', 'Ohio'),
    ('OK', 'Oklahoma'),
    ('OR', 'Oregon'),
    ('PA', 'Pennsylvania'),
    ('RI', 'Rhode Island'),
    ('SC', 'South Carolina'),
    ('SD', 'South Dakota'),
    ('TN', 'Tennessee'),
    ('TX', 'Texas'),
    ('UT', 'Utah'),
    ('VA', 'Virginia'),
    ('VT', 'Vermont'),
    ('WA', 'Washington'),
    ('WI', 'Wisconsin'),
    ('WV', 'West Virginia'),
    ('WY', 'Wyoming')
    )



    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
    image = models.ImageField(upload_to='doula/', null=True, default='doula/beef_taco.jpeg')
    name = models.CharField(max_length=255)
    about = models.TextField(null=True, blank=True)
    services = models.TextField(null=True, blank=True)
    why = models.TextField(null=True, blank=True)
    started = models.DateField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)
    calendly = models.URLField(null=True, blank=True)
    is_doula = models.BooleanField(default=True, null=True)
    certification = models.TextField(null=True, blank=True)
    is_active = models.CharField(max_length=3, choices=STATUS, default='ACT')
    linked = models.BooleanField(null=False, default=False)
    reported = models.BooleanField(null=False, default=False)
    service_range = models.IntegerField(null=True)
    city = models.CharField(max_length=255, default='')
    state = models.CharField(max_length=2, choices=STATES, default='--')



    def __str__(self):
        return self.user.username


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
    is_doula = models.BooleanField(default=False, null=False)

    def __str__(self):
        return self.user.username


# class Contact(models.Model):
#         doula = models.ForeignKey(DoulaProfile, on_delete=models.CASCADE)
#         name = models.CharField(max_length=255)
#         user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True) 
#         email = models.EmailField()
#         phone_number = models.CharField(max_length=255)
#         question = models.TextField(blank=True)

#         def __str__(self):
#             return self.user.username

        
   