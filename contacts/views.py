from curses import doupdate
from django.shortcuts import render
from .models import Contact
from accounts.models import DoulaProfile
from rest_framework import generics
from .serializers import ContactSerializer, AdminSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import IsDoulaOrReadOnly
from django.core.mail import send_mail

# Create your views here.

class ContactListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

    def perform_create(self, serializer):
        doula = self.kwargs['doula']
        email_profile = DoulaProfile.objects.get(id = doula)
        send_mail(
                'New message Received from safehandsdoula.com', 
                "Good Day, you have received a new message about your services at safehandsdoula.com. Please login to view your message. Have a wonderful rest of your day - Safehandsdoula's Admin Team", 
                'safehandsdoula@gmail.com', 
                [email_profile.user.email], 
                fail_silently=False
            )
        # print(dir(super().__self__))
        return super().perform_create(serializer)

class ContactControlListAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsDoulaOrReadOnly,)
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

class ContactDoulaListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ContactSerializer
  
    def get_queryset(self):
        '''
        This view should return a list of all contacts by the doula passed in the url
        '''

        doula = self.kwargs['doula'] 
        return Contact.objects.filter(doula=doula) 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AdminContactEditListAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = AdminSerializer
    queryset = Contact.objects.all()


class AdminContactListAPIView(generics.ListAPIView):
     permission_classes = (IsAdminUser,)
     serializer_class = AdminSerializer
     queryset = Contact.objects.all()
