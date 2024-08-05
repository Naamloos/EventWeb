<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Social;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class SiteController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function events(Request $request)
    {
        return Inertia::render('Events', [
            'events' => Event::all()
        ]);
    }

    public function eventInfo(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('EventInfo', [
            'event' => $event
        ]);
    }

    public function contact(Request $request)
    {
        return Inertia::render('Contact', [
            'socials' => Social::all()
        ]);
    }
}
