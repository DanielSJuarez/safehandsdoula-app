from urllib import response
from django.test import TestCase, Client
# from django.contrib.auth import get_user_model
# from safehands.serializers import ArticleSerializer
from .models import Article
from django.urls import reverse
from rest_framework import status
import json

# Create your tests here.
client = Client()

class ArticleTestModels(TestCase):
    def setUp(self):
        # User = get_user_model()
        # user = User.objects.create_user(
        #     username = 'daniel',
        #     email='daniel@example.com',
        #     password='safepass1',
        # )
    
        Article.objects.create(
            title = 'How Doula',
            text = 'How Doula do what they do',
            catagory = 'HOW',
        )

        self.valid_payload = {
            'title': 'Not created',
            'text' : 'Should not be created',
            'catagory' : 'WHY',
        }

    def test_article_content(self):
        article = Article.objects.get()
        self.assertEqual(article.catagory, 'HOW')
        self.assertEqual(article.title, 'How Doula')


    def test_get_article(self):
        response = client.get(
            reverse('api_v1:articles:article'),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_article(self):
        response = client.post(
            reverse('api_v1:articles:article'),
             data=json.dumps(self.valid_payload),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_article(self):
        response = client.patch(
            reverse('api_v1:articles:article'),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_article(self):
        response = client.delete(
            reverse('api_v1:articles:article'),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

