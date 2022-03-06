from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import DoulaProfile, User, Profile

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(DoulaProfile)
