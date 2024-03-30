<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NotificationController extends Controller
{
    function list()
    {
        try {
            $user = User::find(auth()->id());
            $user->unreadNotifications()->update(['read_at' => now()]);

            $notifications = auth()->user()->notifications()->paginate(10)->through(function ($notification) {
                return [
                    'title' => $notification->data['title'],
                    'description' => $notification->data['body'],
                    'created_at' => $notification->created_at->format('Y-m-d H:i:s')
                ];
            });

            return Inertia::render('Notifications/All', [
                'notifications' => $notifications,
            ]);
        } catch (\Exception $e) {
            // Handle the exception here
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
            ]);
        }
    }

    function notificationReadAll()
    {
        try {
            $user = User::find(auth()->id());
            $user->unreadNotifications()->update(['read_at' => now()]);
        } catch (\Exception $e) {
            // Handle the exception here
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
            ]);
        }
    }

    function notificationRead(Request $request, string $notificationId)
    {
        try {
            $notification = auth()->user()->notifications()->find($notificationId);
            $notification->markAsRead();

            $json = $notification->data;

            if(isset($json['link']) && !empty($json['link'])){
                return Redirect::route($json['link'], $json['ref_id']);
            }
        } catch (\Exception $e) {
            // Handle the exception here
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
            ]);
        }
    }
}
