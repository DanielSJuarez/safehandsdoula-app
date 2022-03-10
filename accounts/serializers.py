from rest_framework import serializers
from .models import Profile, DoulaProfile
from rest_auth.serializers import UserDetailsSerializer, TokenSerializer, TokenModel


class DoulaProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoulaProfile
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user')

# class ContactSerializer(serializers.ModelSerializer):
#     class Meta: 
#         model = Contact
#         fields = '__all__'

class UserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields

class TokenSerializer(TokenSerializer):
    class Meta(TokenSerializer.Meta):
        model = TokenModel
        fields = TokenSerializer.Meta.fields
