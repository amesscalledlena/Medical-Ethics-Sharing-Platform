from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

def home_view (request):
    return render (request, 'blog/index.html')

def login_view (request):
    error_message = None

    if request.method == 'POST':
        u_name = request.POST.get('username')
        p_word = request.POST.get('password')

        user = authenticate(request, username=u_name, password=p_word)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            error_message = "Invalid username or password. Please try again."
    return render(request, 'blog/login.html', {'error': error_message})


def approved_posts_view (request):
    return render (request, 'blog/approved_posts.html')

def create_post_view (request):
    return render(request, 'blog/create_post.html')

def editor_panel_view (request):
    return render(request, 'blog/editor_panel.html')

def post_detail_view (request):
    return render (request, 'blog/post_detail.html')

def register_view (request):
    error_message = None

    if request.method == 'POST':
        u_name = request.POST.get('username')
        email = request.POST.get('email', '')
        p_word = request.POST.get('password')

        if User.objects.filter(username=u_name).exists():
            error_message = "This username is already taken. Please choose another."
        else:
            user = User.objects.create_user(username=u_name, email=email, password=p_word)

            login(request, user)
            return redirect('home')
        
    return render(request, 'blog/register.html', {'error': error_message})
