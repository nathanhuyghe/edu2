<?php

namespace App\Listeners;

use App\Events\NewChatMessages;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendChatMessageNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\NewChatMessages  $event
     * @return void
     */
    public function handle(NewChatMessages $event)
    {
        //
    }
}
