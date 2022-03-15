from urllib import response
from django.test import TestCase, Client

from safehands.serializers import ArticleSerializer
from .models import Article
from django.urls import reverse
from rest_framework import status
import json

# Create your tests here.
client = Client()

class ArticleTestModels(TestCase):
    def setUp(self):
    
        Article.objects.create(
            title = 'How Doula',
            text = 'How Doula do what they do',
            catagory = 'HOW',
        )

    def test_article_content(self):
        article = Article.objects.get()
        self.assertEqual(article.catagory, 'HOW')
        self.assertEqual(article.title, 'How Doula')

