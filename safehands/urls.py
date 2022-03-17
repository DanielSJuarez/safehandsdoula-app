from django.urls import path
from .views import ArticleListAPIView

app_name = "articles"

urlpatterns = [
    path('articles/', ArticleListAPIView.as_view(), name='article'),   
]