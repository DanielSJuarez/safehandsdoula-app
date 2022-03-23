from ast import IsNot
from django.shortcuts import render
from .models import Profile, DoulaProfile
from rest_framework import generics
from .serializers import DoulaProfileSerializer, AdminSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from django.core.mail import send_mail

# send_mail('Thank you for creating your account', 'Good Day, thank you for creating your account with safehandsdoula. This email serves as confirmation that your account has been successfully created. Feel free to interact with the safehandsdoula community. Have a wonderful rest of your day - Safehandsdoula Admin Team', 'safehandsdoula@gmail.com', ['juarezdsv@gmail.com'], fail_silently=False)

# Create your views here.

class DoulaProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DoulaProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # send_mail(
    #         'Thank you for creating your account',
    #         'Good Day, thank you for creating your account with safehandsdoula. This email serves as confirmation that your account has been successfully created. Feel free to interact with the safehandsdoula community. Have a wonderful rest of your day - Safehandsdoula Admin Team',
    #         'safehandsdoula@gmail.com',
    #         ['juarezdsv@gmail.com'],
    #         fail_silently=False,
    #             )
        
    def get_queryset(self):
        user = self.request.user
        return DoulaProfile.objects.filter(user=user)

class ReportProfileEditListAPIView(generics.UpdateAPIView):
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

    def perform_update(self, serializer):
        if self.request.data.get('image'):
            if not self.request.data['image']:
                serializer.save(image='doula/download.jpeg')
            else:
                super().perform_update(serializer)
        else:
            super().perform_update(serializer)


class ProfileListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = DoulaProfileSerializer
    queryset = DoulaProfile.objects.all()

class AdminProfileEditListAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = AdminSerializer
    queryset = DoulaProfile.objects.all()


class AdminProfileListAPIView(generics.ListAPIView):
    #  permission_classes = (IsAdminUser,)
     serializer_class = AdminSerializer
     queryset = DoulaProfile.objects.all()
