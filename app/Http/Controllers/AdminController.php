<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Invite;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard/Index');
    }

    public function events()
    {
        return Inertia::render('Dashboard/Events/Index', [
            'events' => Event::all()
        ]);
    }

    public function editEvent($id)
    {
        $event = Event::find($id);
        if(!$event) {
            return redirect()->route('events.index');
        }
        return Inertia::render('Dashboard/Events/Edit', [
            'event' => $event
        ]);
    }

    const EVENT_REGEX = '/data-url=\"(.+?)\"/';
    public function updateEvent(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $update = $request->all();
        $update['ticket_url'] = preg_match(self::EVENT_REGEX, $update['ticket_url'], $matches) ? $matches[1] : $update['ticket_url'];

        $update['image'] = $update['image'] ?? ' ';

        $event->update($update);
        return redirect()->route('events.index');
    }

    public function destroyEvent($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return redirect()->route('events.index');
    }

    public function addEmptyEvent()
    {
        $event = new Event();
        $event->name = 'New Empty Event';
        $event->description = fake()->sentence();
        $event->slug = 'event-' . Event::count();
        $event->about = "# Long About Text With Markdown\n\n:)";
        $event->location = 'Tianenmen Square';
        $event->starts_at = now();
        $event->ends_at = now()->addDays(1);
        $event->ticket_price = 0;
        $event->ticket_url = 'TicketTailer URL here';
        $event->published = false;
        $event->tickets_available = true;
        $event->image = 'placeholder';
        $event->save();
        return redirect()->route('events.edit', ['id' => $event->id]);
    }

    public function socials()
    {
        return Inertia::render('Dashboard/Socials', [
            'socials' => Social::all()
        ]);
    }

    public function removeSocial()
    {
        $social = Social::findOrFail(request('id'));
        $social->delete();
        return redirect()->route('socials.index');
    }

    public function addSocial()
    {
        $social = new Social();
        $social->name = request('name');
        $social->url = request('url');
        $social->icon = request('icon');
        $social->save();
        return redirect()->route('socials.index');
    }

    public function invite(Request $request)
    {
        return Inertia::render('Dashboard/Invites', [
            'newInvite' => $request->session()->has('newInvite')? $request->session()->get('newInvite') : null
        ]);
    }

    public function makeInvite(Request $request)
    {
        $key = bin2hex(random_bytes(16));

        $invite = Invite::create([
            'key' => $key
        ]);

        return Redirect()->back()->with('newInvite', $key);
    }
}
