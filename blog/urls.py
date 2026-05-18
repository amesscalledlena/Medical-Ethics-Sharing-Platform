from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('home/', views.home_view, name='return_home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('approved_posts/', views.approved_posts_view, name='approved_posts'),
    path('create_post/', views.create_post_view, name='create_post'),
    path('editor_panel/', views.editor_panel_view, name='editor_panel'),
    path('post/<int:post_id>/', views.post_detail_view, name='post_detail'),
    path('register/', views.register_view, name='register'),
]
