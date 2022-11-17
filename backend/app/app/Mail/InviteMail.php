<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InviteMail extends Mailable
{
    use Queueable, SerializesModels;

    public $username;
    public $base64Url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $username, string $base64Url)
    {
        $this->username = $username;
        $this->base64Url = $base64Url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mails.inviteMail');
    }
}
