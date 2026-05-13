from django.shortcuts import render

def home_view (request):
    return render (request, 'blog/index.html')

def login_view (request):
    return render (request, 'blog/login.html')

def approved_posts_view (request):
    return render (request, 'blog/approved_posts.html')

def create_post_view (request):
    return render(request, 'blog/create_post.html')

def editor_panel_view (request):
    return render(request, 'blog/editor_panel.html')

def post_detail_view (request):
    return render (request, 'blog/post_detail.html')

def register_view (request):
    return render (request, 'blog/register.html')