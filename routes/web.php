<?php

use App\Http\Controllers\ChecklistController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\MyTaskController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('mytask.index');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {

    // Profile & Notification
    Route::post('/notification-read-all', [NotificationController::class, 'notificationReadAll'])->name('notification.read.all');
    Route::post('/notification-read/{id}', [NotificationController::class, 'notificationRead'])->name('notification.read');
    Route::get('/notifications', [NotificationController::class, 'list'])->name('notification.list');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // My Task Listing
    Route::group(['middleware' => ['permission:mytask']], function () {
        Route::resource('mytask', MyTaskController::class)->except([
            'create', 'show', 'edit'
        ]);
        Route::get('/mytask/{task}/edit', [TaskController::class, 'edit'])->name('mytask.edit');
    });
    
    // User Listing
    Route::group(['middleware' => ['permission:users']], function () {
        Route::get('/users', [UserController::class, 'show'])->name('user.show');
        Route::get('/users/{user}', [UserController::class, 'edit'])->name('user.edit');
        Route::patch('/users/{user}', [UserController::class, 'update'])->name('user.update');
        Route::post('/users', [UserController::class, 'store'])->name('user.store');
        Route::get('/users/{user}/tasks', [UserController::class, 'userTask'])->name('user.tasks');
        Route::get('/users/tasks/{task}', [TaskController::class, 'edit'])->name('user.tasks.edit');
    });
   
    // Project Listing
    Route::group(['middleware' => ['permission:projects']], function () {
        Route::get('/projects', [ProjectController::class, 'show'])->name('project.show');
        Route::get('/projects/{project}/tasks', [ProjectController::class, 'projectTask'])->name('project.tasks');
        Route::get('/projects/tasks/{task}', [TaskController::class, 'edit'])->name('project.tasks.edit');
        Route::post('/projects', [ProjectController::class, 'store'])->name('project.store');
        Route::get('/projects/{project}', [ProjectController::class, 'edit'])->name('project.edit');
        Route::patch('/projects/{project}', [ProjectController::class, 'update'])->name('project.update');
    });
    
    // Task Listing
    Route::group(['middleware' => ['permission:tasks']], function () {
        Route::resource('tasks', TaskController::class)->except([
            'create', 'show',
        ]);
        Route::resource('tasks.comments', CommentController::class)->only([
            'index', 'store', 'update',
        ]);
        Route::post('/tasks/{task}/checklist', [ChecklistController::class, 'store'])->name('tasks.checklist.store');
        // Route::put('/tasks/{task}/checklist', [ChecklistController::class, 'update'])->name('tasks.checklist.update');
        Route::patch('/tasks/{task}/checklist', [ChecklistController::class, 'update'])->name('tasks.checklist.update');
    });
});

require __DIR__.'/auth.php';
