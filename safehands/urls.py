from django.urls import path
from .views import ArticleListAPIView

urlpatterns = [
    path('articles/', ArticleListAPIView.as_view()),   
]