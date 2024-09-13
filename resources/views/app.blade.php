<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="w-full h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- if route is eventinfo -->
        @if (Route::currentRouteName() === 'eventinfo')
            <!-- Meta Tags -->
            @php
                $event = App\Models\Event::find(Route::current()->parameter('id'));
                if(!$event->published)
                {
                    abort(404);
                }
            @endphp
            <meta property="og:title" content="{{ $event->name }}" />
            <meta property="og:description" content="{{ $event->description }}" />
            <meta property="og:image" content={{route('eventImage', ['id' => $event->id], absolute: true)}} />
            <meta property="og:url" content="{{ route('eventinfo', ['id' => $event->id]) }}" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="{{ config('app.name') }}" />
        @else
            @php
                $pageName = Route::currentRouteName();
                if($pageName === 'index') {
                    $pageName = '';
                }else{
                    $pageName = ' - ' . Str::ucfirst($pageName);
                }
            @endphp
            <!-- Meta Tags -->
            <meta property="og:title" content="{{ config('app.name') }}{{$pageName}}" />
            <meta property="og:description" content="{{ config('app.description') }}" />
            <meta property="og:image" content="{{ route('logo') }}" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="{{ config('app.name') }}" />
        @endif

        <title inertia>{{ config('app.name', 'Eventweb') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="antialiased w-full min-h-full">
        @inertia
    </body>
</html>
