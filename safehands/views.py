from django.shortcuts import render
from .models import Article
from rest_framework import generics
from .serializers import ArticleSerializer

# Create your views here.

class ArticleListAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
