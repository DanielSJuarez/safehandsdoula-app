import pdb
from django.shortcuts import render
from .models import Profile, DoulaProfile, Feedback
from rest_framework import generics
from .serializers import DoulaProfileSerializer, ProfileSerializer, FeedbackSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

# Create your views here.

class DoulaProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DoulaProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def get_queryset(self):
        user = self.request.user
        return DoulaProfile.objects.filter(user=user)

class DoulaProfileEditListAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DoulaProfileSerializer

    def get_queryset(self):
        user = self.request.user
        return DoulaProfile.objects.filter(user=user)

    def perform_update(self, serializer):
        if self.request.data.get('image'):
            if not self.request.data['image']:
                serializer.save(image='doula/beef_taco.jpeg')
            else:
                super().perform_update(serializer)
        else:
            super().perform_update(serializer)


class ProfileListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = DoulaProfileSerializer
    queryset = DoulaProfile.objects.all()

class FeedbackListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

