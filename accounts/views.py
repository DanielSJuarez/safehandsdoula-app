from django.shortcuts import render
from .models import Profile, DoulaProfile
from rest_framework import generics
from .serializers import DoulaProfileSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class DoulaProfileListAPIView(generics.CreateListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DoulaProfileSerializer
    queryset = DoulaProfile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DoulaProfileEditListAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DoulaProfileSerializer

    def get_queryset(self):
        user = self.request.user
        return DoulaProfile.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileListAPIView(generics.CreateListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)