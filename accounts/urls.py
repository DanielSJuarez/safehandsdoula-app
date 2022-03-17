from django.urls import include, path
from .views import ProfileListAPIView, DoulaProfileListAPIView, DoulaProfileEditListAPIView, AdminProfileEditListAPIView, AdminProfileListAPIView, ReportProfileEditListAPIView


app_name = "accounts"


urlpatterns = [
    path('accounts/<int:pk>/admin/', AdminProfileEditListAPIView.as_view()),
    path('accounts/admin/', AdminProfileListAPIView.as_view()),
    path('accounts/<int:pk>/doula/', DoulaProfileEditListAPIView.as_view(), name='doulaProfile'),
    path('accounts/doula/<int:pk>/report/', ReportProfileEditListAPIView.as_view()),
    path('accounts/doula/', DoulaProfileListAPIView.as_view()),
    path('accounts/', ProfileListAPIView.as_view(), name='doulaProfileList'),
]