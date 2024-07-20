<?php

use App\Http\Controllers\Fields\{
    CreateFieldController,
    DeleteFieldController,
    EditFieldController,
    ShowFieldController,
    StoreFieldController,
    UpdateFieldController
};
use App\Http\Controllers\Projects\{
    CreateProjectController,
    DeleteProjectController,
    EditProjectController,
    PreviewProjectController,
    ShowProjectController,
    StoreProjectController,
    UpdateProjectController
};
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('projects')->as('projects.')->group(function () {
        Route::get('/', ShowProjectController::class)->name('show');
        Route::get('/create', CreateProjectController::class)->name('create');
        Route::get('/{project}', PreviewProjectController::class)->name('preview');
        Route::get('/{project}/edit', EditProjectController::class)->name('edit');
        Route::patch('/{project}/update', UpdateProjectController::class)->name('update');
        Route::post('/store', StoreProjectController::class)->name('store');
        Route::delete('/{project}/delete', DeleteProjectController::class)->name('delete');
    });

    Route::prefix('fields')->as('fields.')->group(function () {
        Route::get('/', ShowFieldController::class)->name('show');
        Route::get('/create', CreateFieldController::class)->name('create');
        Route::get('/{field}/edit', EditFieldController::class)->name('edit');
        Route::patch('/{field}/update', UpdateFieldController::class)->name('update');
        Route::post('/store', StoreFieldController::class)->name('store');
        Route::delete('/{field}/delete', DeleteFieldController::class)->name('delete');
    });
});

require __DIR__.'/auth.php';
