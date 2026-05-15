from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Post, Category
from django.db.models import Q

def home_view (request):
    recent_posts = Post.objects.filter(status='approved').order_by('-id')[:3] #Displays the 3 most recently approved posts
    return render(request, 'blog/index.html', {'posts': recent_posts})

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


def logout_view (request):
    logout(request)
    return redirect('home')


def approved_posts_view(request):
    posts = Post.objects.filter(status='approved')
    
    #Filter by Category
    category_query = request.GET.get('cat')
    if category_query:
        posts = posts.filter(category__name=category_query)
        
    #Search Bar
    search_query = request.GET.get('q')
    if search_query:
        posts = posts.filter(
            Q(title__icontains=search_query) | 
            Q(content__icontains=search_query)
        )

    return render(request, 'blog/approved_posts.html', {'posts': posts})

def create_post_view (request):
    error_message = None

    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == "POST":
        p_title = request.POST.get('title')
        p_content = request.POST.get('content')
        p_link = request.POST.get('link')
        cat_id = request.POST.get('category')

        if not p_title or not p_content or not cat_id:
            error_message = "Please fill out all required fields, including selecting a category."
        else:
            selected_category = Category.objects.get(id=cat_id)

            Post.objects.create(
                title=p_title,
                content=p_content,
                link=p_link,
                category=selected_category,
                author=request.user
            )
            return redirect('home')
    
    all_categories = Category.objects.all()
    return render(request, 'blog/create_post.html', {'categories': all_categories, 'error': error_message})

def editor_panel_view (request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        action = request.POST.get('action')

        if post_id and action:
            post_to_update = Post.objects.get(id=post_id)

            if action == 'approve':
                post_to_update.status = 'approved'
            elif action == 'reject':
                post_to_update.status = 'rejected'

            post_to_update.save() #Save the changes to database
        
        return redirect('editor_panel') #Refreshing the page
    
    pending_posts = Post.objects.filter(status='pending') #Show only pending posts if they're only loading the page
    return render(request, 'blog/editor_panel.html', {'posts': pending_posts})

def post_detail_view (request, post_id):
    post = Post.objects.get(id=post_id)
    return render(request, 'blog/post_detail.html', {'post': post})

def register_view (request):
    error_message = None

    if request.method == 'POST':
        u_name = request.POST.get('username')
        email = request.POST.get('email', '')
        p_word = request.POST.get('password')
        p_word_confirm = request.POST.get('confirm')

        if p_word != p_word_confirm:
            error_message = "Passwords do not match. Please try again."

        elif User.objects.filter(username=u_name).exists():
            error_message = "This username is already taken. Please choose another."
        else:
            user = User.objects.create_user(username=u_name, email=email, password=p_word)
            login(request, user)
            return redirect('home')
        
    return render(request, 'blog/register.html', {'error': error_message})
