<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Social;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class SiteController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'instagramPhotos' => $this->fetchInstagramPhotos()
        ]);
    }

    private function fetchInstagramPhotos()
    {
        // check if data in laravel cache
        if(Cache::has('instagram_photos'))
        {
            return json_decode(Cache::get('instagram_photos'));
        }
        // GET https://graph.instagram.com/{api-version}/{user-id}?fields={fields}&access_token={access-token}
        $url = 'https://graph.instagram.com/me/media?fields=id,permalink,thumbnail_url,media_url,media_type&access_token=' . env('INSTAGRAM_ACCESS_TOKEN');
        // make request through laravel
        $out = [];
        $response = Http::get($url);
        $data = $response->json()['data'];
        foreach($data as $photo)
        {
            array_push($out, [
                'url' => $photo['permalink'],
                'image' => $photo['media_type'] == 'VIDEO'? $photo['thumbnail_url'] : $photo['media_url'],
            ]);
        }

        $newCacheItem = json_encode($out);
        Cache::put('instagram_photos', $newCacheItem, 60*60*12);
        return json_decode($newCacheItem); // ensure format is persistent
    }

    public function events(Request $request)
    {
        $events = Event::where('published', true)->get();
        // hide ticket_url if tickets_available is false
        foreach($events as $event)
        {
            if(!$event->tickets_available)
            {
                $event->ticket_url = 'none';
            }
        }
        return Inertia::render('Events', [
            'events' => $events
        ]);
    }

    public function eventInfo(Request $request, $id)
    {
        $event = Event::find($id);
        if(!$event)
        {
            return redirect()->route('events');
        }
        if(!$event->published) {
            return redirect()->route('events');
        }
        if(!$event->tickets_available)
        {
            $event->ticket_url = 'none';
        }
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

    public function displayEventImage(Request $request, $id)
    {
        $event = Event::find($id);
        if(!$event)
        {
            return redirect()->route('events');
        }
        if(!$event->published) {
            return redirect()->route('events');
        }

        if(strpos($event->image, 'data:image') === false)
        {
            // return image from resources/img/banner.jpg
            return response(file_get_contents(resource_path('img/banner.jpg')))->header('Content-Type', 'image/png');
        }

        // convert the base64 image url in $event->image to a that is returned
        $contentType = substr(explode(';', $event->image)[0], 5);
        $content = explode(',', $event->image)[1];
        return response(base64_decode($content))->header('Content-Type', $contentType);
    }

    public function displayLogo(Request $request)
    {
        return response(file_get_contents(resource_path('img/ravelogo4kant_transparant.png')))->header('Content-Type', 'image/png');
    }
}
