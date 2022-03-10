from django.urls import include, path
from .views import ProfileListAPIView, DoulaProfileListAPIView, DoulaProfileEditListAPIView

urlpatterns = [
    path('accounts/<int:pk>/doula/', DoulaProfileEditListAPIView.as_view()),
    # path('accounts/doula/<int:doula>/contact/', ContactListAPIView.as_view()),
    path('accounts/doula/', DoulaProfileListAPIView.as_view()),
    path('accounts/', ProfileListAPIView.as_view()),
]