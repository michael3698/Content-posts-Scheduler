# Content-posts-Scheduler
content scheduling app built with Laravel and Angular

## Features
- User authentication
- Schedule posts for multiple platforms
- Limit to 10 scheduled posts per user per day
- Enable/disable platforms
- JWT token-based API auth (Sanctum)
- Admin panel to manage content (Angular UI)

## Tech Stack
- Laravel 10
- Angular 15+
- MySQL
- Sanctum for API authentication

## Installation Instructions

### Backend (Laravel)
1. Clone the repo and navigate to the backend directory.
2. Run:
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
