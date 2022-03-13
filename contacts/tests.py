import profile
from django.test import TestCase, Client
from django.contrib.auth import get_user_model 

from .serializers import ContactSerializer
from .models import Contact
from django.urls import reverse
from rest_framework import status
import json

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
        )

    def test_create_contact(self):
        contact = Contact.objects.get()
        user = f'{contact.user}'
        self.assertEqual(contact.name, 'Daniel')
        self.assertEqual(contact.email, 'daniel@example.com')
        self.assertEqual(contact.reported, False)

    
      