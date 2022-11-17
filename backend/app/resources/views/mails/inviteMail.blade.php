@component('mail::message')
# U bent uitgenodigd voor de edu app!

@component('mail::button', ['url' => ''])
Klik hier om de applicatie te installeren
@endcomponent

Na installatie en registratie kan u onderstaande qr-code scannen om toegang te krijgen tot de stage van {{ $username }}.

<img src='{{$base64Url}}'>

Veel succes,<br>
{{ config('app.name') }}
@endcomponent
