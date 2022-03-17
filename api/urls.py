from django.urls import include, path

app_name="api_v1"

urlpatterns = [
    path('',include('accounts.urls', namespace="accounts")),
    path('', include('contacts.urls', namespace="contacts")),
    path('',include('safehands.urls', namespace='articles')),
]