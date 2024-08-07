<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(SiteController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/events', 'events')->name('events');
        Route::get('/event/{id}', 'eventInfo')->name('eventinfo');
        Route::get('/contact', 'contact')->name('contact');
        Route::get('/event_image/{id}', 'displayEventImage')->name('eventImage');
        Route::get('/logo', 'displayLogo')->name('logo');
    });

Route::middleware('auth')->prefix('admin')->group(function () {

    Route::controller(AdminController::class)
        ->group(function () {
            Route::get('/dashboard', 'dashboard')->name('dashboard');
            Route::get('/events', 'events')->name('events.index');
            Route::get('/events/{id}', 'editEvent')->name('events.edit');
            Route::patch('/events/{id}', 'updateEvent')->name('events.update');
            Route::delete('/events/{id}', 'destroyEvent')->name('events.destroy');
            Route::put('/events/new', 'addEmptyEvent')->name('events.new');
            Route::get('/socials', 'socials')->name('socials.index');
            Route::delete('/socials/{id}', 'removeSocial')->name('socials.destroy');
            Route::put('/socials/new', 'addSocial')->name('socials.new');
            Route::get('/invite', 'invite')->name('invites');
            Route::post('/invite', 'makeInvite')->name('invites.new');
            Route::get('/events/preview/{id}', 'viewEventAsAdmin')->name('events.preview');
        });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
