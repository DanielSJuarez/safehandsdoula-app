from django.shortcuts import render
from .models import Article, HomePage
from rest_framework import generics
from .serializers import ArticleSerializer, HomePageSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.

class ArticleListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()


class HomePageListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
