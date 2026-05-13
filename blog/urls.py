from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('index.html', views.home_view, name='return home'),
    path('login.html', views.login_view, name='login'),
    path('approved_posts.html', views.approved_posts_view, name='approved posts'),
    path('create_post.html', views.create_post_view, name='create post'),
    path('editor_panel.html', views.editor_panel_view, name='editor panel'),
    path('post_detail.html', views.post_detail_view, name='post detail'),
    path('register.html', views.register_view, name='register'),
]