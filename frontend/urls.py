from django.urls import path
from .views import IndexView

app_name = 'frontend'

urlpatterns = [
    # path('home/',IndexView.as_view(), name='index'), 
    # path('login/',IndexView.as_view(), name='index'),
    # path('register/',IndexView.as_view(), name='index'),
    # path('create/',IndexView.as_view(), name='index'),
    # path('profile/',IndexView.as_view(), name='index'),
    # path('doula/',IndexView.as_view(), name='index'),
    # path('calendly/',IndexView.as_view(), name='index'),
    # path('reported/',IndexView.as_view(), name='index'),
    # path('why/',IndexView.as_view(), name='index'),
    # path('what/',IndexView.as_view(), name='index'),
    # path('how/',IndexView.as_view(), name='index'),
    path('', IndexView.as_view(), name='index'),
    path('<path:resource>/', IndexView.as_view()),
]
