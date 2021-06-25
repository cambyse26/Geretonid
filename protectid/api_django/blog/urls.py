from django.urls import path
from . import views

urlpatterns = [
    path('docs/', views.docs, name='docs'),
    path('api/posts', views.api_posts, name='api_posts'),
    path('api/posts/<int:id>', views.api_post, name='api_post'),
   
    
]