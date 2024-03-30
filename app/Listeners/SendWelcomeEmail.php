<?php

namespace App\Listeners;

use App\Events\NewUserAdded;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendWelcomeEmail
{   

    /**
     * Create the event listener.
     */
    public function __construct(NewUserAdded $event)
    {
    }

    /**
     * Handle the event.
     */
    public function handle(NewUserAdded $event): void
    {
        Mail::to($event->user->email)->send(new WelcomeEmail($event->user));
    }
}
