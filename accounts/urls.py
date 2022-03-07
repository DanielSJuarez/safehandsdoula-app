from django.urls import include, path
from .views import ProfileListAPIView, DoulaProfileListAPIView, DoulaProfileEditListAPIView, FeedbackListAPIView

urlpatterns = [
    path('accounts/doula/user', DoulaProfileEditListAPIView.as_view()),
    path('accounts/doula/feedback', FeedbackListAPIView.as_view()),
    path('accounts/doula/', DoulaProfileListAPIView.as_view()),
    path('accounts/', ProfileListAPIView.as_view()),
]