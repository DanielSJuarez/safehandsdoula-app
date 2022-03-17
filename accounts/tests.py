from email.mime import image
import profile
from django.test import TestCase, Client
from django.contrib.auth import get_user_model 

from .serializers import DoulaProfileSerializer
from .models import DoulaProfile
from django.urls import reverse
from rest_framework import status
import json

client = Client()
# Create your tests here.

class UserTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )

        self.assertEqual(user.username, 'daniel')
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)


    def test_create_superuser(self):
        User = get_user_model()
        user = User.objects.create_superuser(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )

        self.assertEqual(user.username, 'daniel')
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_active)

   
class DoulaProfileTestModel(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )
        DoulaProfile.objects.create(
            user = user,
            name = 'Daniel',
            about = 'I am a doula',
            services = 'I am a doula',
            why = 'I can provide you with encouragement and trust',
            facebook = 'testfacebook.com',
            twitter = 'testtwitter.com',
            instagram = 'testinstagram.com',
            is_doula = True,
            is_active = 'ACT',
            reported = False,
        )

    def test_create_doula_profile(self):
        profile = DoulaProfile.objects.get()
        user = f'{profile.user}'
        self.assertEqual(profile.name, 'Daniel')
        self.assertEqual(profile.is_doula, True)
        self.assertEqual(profile.reported, False)
        self.assertEqual(profile.user.username, 'daniel')
    
    def test_get_all_doula_profiles(self):
        # import pdb
        # pdb.set_trace()
        response = client.get(reverse('api_v1:accounts:doulaProfileList')) 

        profiles = DoulaProfile.objects.filter(is_active='ACT')
        serializer = DoulaProfileSerializer(profiles, many=True)

        # import pdb
        # pdb.set_trace()
        self.assertEqual(response.data[0].keys(), serializer.data[0].keys())
        self.assertEqual(len(response.data), len(serializer.data))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CreateRetrieveDeleteArticleTest(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )

        DoulaProfile.objects.create(
            user = user,
            name = 'Daniel',
            about = 'I am a doula',
            services = 'I am a doula',
            why = 'I can provide you with encouragement and trust',
            facebook = 'testfacebook.com',
            twitter = 'testtwitter.com',
            instagram = 'testinstagram.com',
            is_doula = True,
            is_active = 'ACT',
            reported = False,
        )

    client.login(username='daniel', password='safepass1')

    def test_update_profile(self):
        response = client.patch(
            reverse('api_v1:accounts:doulaProfile', kwargs={'pk': 3}),
            content_type='application/json',
        )