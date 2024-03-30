<?php

namespace App\Listeners;

use App\Models\User;
use App\Notifications\NewNotification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class SendNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
       
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $users = User::whereIn("id", $event->users)
                ->where("id", "!=", auth()->user()->id) // exclude self in notification
                ->get();
        Notification::send($users, new NewNotification($event->message));
    }
}
