from django.urls import include, path
from .views import ContactListAPIView, ContactControlListAPIView, ContactDoulaListAPIView, AdminContactEditListAPIView, AdminContactListAPIView

urlpatterns = [
    path('contacts/<int:pk>/admin/', AdminContactEditListAPIView.as_view()),
    path('contacts/admin/', AdminContactListAPIView.as_view()),
    path('doula/<int:doula>/contact/<int:pk>/', ContactControlListAPIView.as_view()),
    path('doula/<int:doula>/contacts/' , ContactDoulaListAPIView.as_view(), name = 'contactList'),
    path('doula/<int:doula>/contact/', ContactListAPIView.as_view()),
]