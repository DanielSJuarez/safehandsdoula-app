from rest_framework import serializers
from .models import Profile, DoulaProfile

class DoulaProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoulaProfile
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user')