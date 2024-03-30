<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewNotification extends Notification 
{
    use Queueable;

    public $message;
    /**
     * Create a new notification instance.
     */
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast','database', 'mail'];
    }
    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mailMessage = (new MailMessage)
                        ->greeting($this->message['title'])
                        ->line($this->message['body']);
                        
        if (!empty($this->message['link'])) {
            $mailMessage->action('View', url(route($this->message['link'], $this->message['ref_id'])));
        }
        return $mailMessage;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            "title"=>$this->message['title'],
            "body"=>$this->message['body'],
            "link"=>isset($this->message['link']) ? $this->message['link'] : "",
            "ref_id"=>isset($this->message['ref_id']) ? $this->message['ref_id'] : "",
        ];
    }
    public function toBroadcast($notifiable)
    {
        return [
            'data' => [
                "title"=>$this->message['title'],
                "body"=>$this->message['body'],
                "link"=>isset($this->message['link']) ? $this->message['link'] : "",
                "ref_id"=>isset($this->message['ref_id']) ? $this->message['ref_id'] : "",
            ],
            'unread' => null,
            'created_at' => now(),
        ];
    }
}
