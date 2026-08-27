<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <header>
        <nav aria-label="Account">
            @auth
                <a href="{{ route('dashboard') }}">Dashboard</a>
            @else
                <a href="{{ route('login') }}">Log in</a>
                @if (Route::has('register'))
                    <a href="{{ route('register') }}">Register</a>
                @endif
            @endauth
        </nav>
    </header>

    <main>
        <h1>{{ $heading ?? 'Laravel' }}</h1>

        @forelse ($projects as $project)
            <x-project-card :project="$project" />
        @empty
            <p>No projects yet.</p>
        @endforelse
    </main>
</body>

</html>
