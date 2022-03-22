from django.urls import path
from .views import ArticleListAPIView, HomePageListAPIView

app_name = "articles"

urlpatterns = [
    path('articles/', ArticleListAPIView.as_view(), name='article'),   
    path('homepage/', HomePageListAPIView.as_view(), name='homepage'),
]