from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('index.html', views.home_view, name='return_home'),
    path('login.html', views.login_view, name='login'),
    path('logout.html', views.logout_view, name='logout'),
    path('approved_posts.html', views.approved_posts_view, name='approved_posts'),
    path('create_post.html', views.create_post_view, name='create_post'),
    path('editor_panel.html', views.editor_panel_view, name='editor_panel'),
    path('post_detail.html', views.post_detail_view, name='post_detail'),
    path('register.html', views.register_view, name='register'),
]