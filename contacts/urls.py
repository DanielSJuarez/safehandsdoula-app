from django.urls import include, path
from .views import ContactListAPIView, ContactControlListAPIView, ContactDoulaListAPIView

urlpatterns = [
    path('doula/<int:doula>/contact/<int:pk>/', ContactControlListAPIView.as_view()),
    path('doula/<int:doula>/contacts/' , ContactDoulaListAPIView.as_view()),
    path('doula/<int:doula>/contact/', ContactListAPIView.as_view()),
]