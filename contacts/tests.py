import profile
from django.test import TestCase, Client
from django.contrib.auth import get_user_model 

from .serializers import ContactSerializer
from .models import Contact
from django.urls import reverse
from rest_framework import status
import json

client = Client()

from django.test import TestCase

# Create your tests here.
class ContactTestModel(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )
        Contact.objects.create(
            user = user,
            name = 'Daniel',
            question = 'What is your service price?',
            email = 'daniel@example.com',
            reported = False,
            id = 1,
        )

    def test_create_contact(self):
        contact = Contact.objects.get()
        user = f'{contact.user}'
        self.assertEqual(contact.name, 'Daniel')
        self.assertEqual(contact.email, 'daniel@example.com')
        self.assertEqual(contact.reported, False)

    # def test_get_all_contacts(self):
    #     response = client.get(reverse('contactList', kwargs={'doula': 1}),) 

    #     contacts = Contact.objects.get()
    #     serializer = ContactSerializer(contacts)

    #     self.assertEqual(response.data, serializer.data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    

class CreateRetrieveDeleteArticleTest(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )
        Contact.objects.create(
            user = user,
            name = 'Daniel',
            question = 'What is your service price?',
            email = 'daniel@example.com',
            reported = False,
            id = 4,
        )

    client.login(username = 'daniel', password='safepass1')

    def test_update_article(self):
        response = client.patch(
            reverse('doulaProfile', kwargs={'pk': 4}),
            content_type='application/json',
        )



      