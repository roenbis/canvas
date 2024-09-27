from django.urls import path
from . import views

urlpatterns = [
    path('blocks/', views.block_list, name='block_list'),
    path('clear/', views.clear_all),
]
