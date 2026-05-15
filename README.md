# Medical Ethics Sharing Platform

## Project Description

The Medical Ethics Sharing Platform is a Django-based web application that allows users to share, discuss, and review posts related to medical ethics. Registered users can submit posts (with optional external reference links) categorized by topic, while designated editors review submissions through a moderation panel — approving or rejecting them before they become publicly visible.

Key features:
- User registration, login, and logout
- Post creation with title, content, category, and optional reference link
- Editor panel for reviewing and moderating submitted posts (pending / approved / rejected)
- Public listing of approved posts and detail view per post
- Category-based organization of posts

## Technical Stack

- **Backend:** Python 3, Django 6.0
- **Database:** SQLite (default Django dev database)
- **Frontend:** Django Templates (HTML), CSS, and static assets served via Django's staticfiles app
- **Authentication:** Django's built-in `django.contrib.auth` (User model)
- **Project structure:**
  - `core/` — Django project settings, root URL config, WSGI/ASGI entry points
  - `blog/` — main app containing models (`Category`, `Post`), views, URLs, templates, and static files

## How to Run the Project

### Prerequisites
- Python 3.10+ installed
- `pip` available on your PATH

### Setup

1. **Clone the repository** and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd "Medical Ethics Sharing Platform"
   ```

2. **Create and activate a virtual environment** (recommended):
   ```bash
   python -m venv venv
   # Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   # macOS / Linux
   source venv/bin/activate
   ```

3. **Install Django:**
   ```bash
   pip install django
   ```

4. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **(Optional) Create a superuser** to access the Django admin and act as an editor:
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

7. Open your browser and visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Task Distribution

The work was divided between two contributors based on the commit history of this repository.

### Lena (`itslena5831@gmail.com`)
- Initial Django project setup
- Connected backend views and URLs to the frontend home page
- Defined and finished URL routings
- Applied database migrations, registered models, and created the superuser
- Built the login functionality:
  - Adjusted `login.html` (form method, CSRF token, input naming)
  - Defined the login view function
  - Added error message handling
  - Finished login logic and resolved related errors
- Built the registration functionality (multi-stage: halfway → finished)
- Built the create-post feature and fixed post-saving bugs
- Built the approved post view, editor panel view, and post detail view, and fixed HTML bugs
- Fixed the relative links error

### boodl3 (`boodle.doobee@gmail.com`)
- Part 2 — Phase 1: Foundation and Django Setup
- Part 2 — Phase 2: Frontend Setup (templates, layout, static assets)
- Updated the login functionality and implemented Editor Panel access control
- Added the project `README.md`
