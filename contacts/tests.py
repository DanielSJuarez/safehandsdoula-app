from django.test import TestCase, Client
from django.contrib.auth import get_user_model 
from .models import Contact
from .serializers import ContactSerializer
from accounts.models import DoulaProfile
from django.urls import reverse
from rest_framework import status


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

        user2 = User.objects.create_user(
            username = 'sadie',
            email = 'sadie@example.com',
            password='safepass1',
        )

        doulaProfile = DoulaProfile.objects.create(
            user = user,
            name = 'daniel',
            about = 'I am a doula',
            why = 'for the good of the people',
            is_doula = True,
            reported = False,
            facebook = 'testfacebook.com',
            twitter = 'testtwitter.com',
            instagram = 'testinstagram.com',
            is_active = 'ACT',
        )

        Contact.objects.create(
            user = user2,
            name = 'Daniel',
            question = 'What is your service price?',
            email = 'daniel@example.com',
            reported = False,
            doula = doulaProfile
        )

        client.login(username='daniel', password='safepass1')

    def test_create_contact(self):
        contact = Contact.objects.get()
        self.assertEqual(contact.name, 'Daniel')
        self.assertEqual(contact.email, 'daniel@example.com')
        self.assertEqual(contact.reported, False)
        self.assertEqual(contact.user.username, 'sadie')

    def test_get_all_contacts(self):
        # import pdb 
        # pdb.set_trace()
        # doulaProfile = DoulaProfile.objects.get()
        response = client.get(reverse('api_v1:contacts:contactList', kwargs={'doula': 1}),) 

        contacts = Contact.objects.filter(doula = 1)
        serializer = ContactSerializer(contacts, many = True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

class CreateRetrieveDeleteContactTest(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username = 'daniel',
            email='daniel@example.com',
            password='safepass1',
        )

        user2 = User.objects.create_user(
            username = 'sadie',
            email = 'sadie@example.com',
            password='safepass1',
        )

        doulaProfile = DoulaProfile.objects.create(
            user = user, # daniel
            name = 'daniel',
            about = 'I am a doula',
            why = 'for the good of the people',
            is_doula = True,
            reported = False,
            facebook = 'testfacebook.com',
            twitter = 'testtwitter.com',
            instagram = 'testinstagram.com',
            is_active = 'ACT',
        )

        DoulaProfile.objects.create(
            user = user2, # sadie
            name = 'daniel',
            about = 'I am a doula',
            why = 'for the good of the people',
            is_doula = True,
            reported = False,
            facebook = 'testfacebook.com',
            twitter = 'testtwitter.com',
            instagram = 'testinstagram.com',
            is_active = 'ACT',
        )

        Contact.objects.create(
            # user id of 2
            user = user2,
            name = 'Daniel',
            question = 'What is your service price?',
            email = 'daniel@example.com',
            reported = False,
            # doula id of 1
            doula = doulaProfile, # daniel
        )

        client.login(username='daniel', password='safepass1')

    def test_update_contact_list_url(self):
        response = client.patch(
            reverse('api_v1:contacts:contactList', kwargs={'doula': 1}),
            content_type='application/json',
        )
        # import pdb 
        # pdb.set_trace()
        # contacts = Contact.objects.filter(doula = 1)
        # serializer = ContactSerializer(contacts, many = True)

        # self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        

    def test_delete_contact_list_url(self):
        response = client.delete(
            reverse('api_v1:contacts:contactList', kwargs={'doula': 1}),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_contact_url_is_doula(self):
        response = client.patch(
            reverse('api_v1:contacts:updateContactList', kwargs={'doula' : 1, 'pk': 1}),
            content_type='application/json',
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_update_contact_url_not_doula(self):
        # import pdb 
        # pdb.set_trace()
        client.logout()
        client.login(username='sadie', password='safepass1')
        response = client.patch(
            reverse('api_v1:contacts:updateContactList', kwargs={'doula' : 1, 'pk': 1}),
            content_type='application/json',
        )
        

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_contact_update_url(self):
        response = client.delete(
            reverse('api_v1:contacts:updateContactList', kwargs={'doula' : 1, 'pk': 1}),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    