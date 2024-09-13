<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Social;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::all()->each->delete();
        Social::all()->each->delete();

        // make 5 fake events without factory
        for ($i = 0; $i < 5; $i++) {
            $event = new Event();
            $event->name = 'Event ' . $i;
            $event->description = fake()->sentence();
            $event->slug = 'event-' . $i;
            $event->about = implode("\n\n", fake()->paragraphs(6));
            $event->location = 'Bassment Utrecht';
            $event->starts_at = now();
            $event->ends_at = now()->addDays(1);
            $event->ticket_price = 15;
            $event->ticket_url = ' ';
            $event->published = true;
            $event->tickets_available = true;
            $event->image = '';
            $event->save();
        }

        $social = new Social();
        $social->name = 'Instagram';
        $social->icon = 'instagram';
        $social->url = 'https://instagram.com/naamloser';
        $social->order = 0;
        $social->save();

        $social = new Social();
        $social->name = 'Discord';
        $social->icon = 'discord';
        $social->url = 'https://instagram.com/naamloser';
        $social->order = 1;
        $social->save();

        $social = new Social();
        $social->name = 'YouTube';
        $social->icon = 'youtube';
        $social->url = 'https://instagram.com/naamloser';
        $social->order = 2;
        $social->save();
    }
}
