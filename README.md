<<<<<<< HEAD
# ContentSchedulerFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======
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
>>>>>>> 88e8c09fc9061272c43fb262b7142b8719197bcd
