<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskUser extends Pivot
{
    use HasFactory, LogsActivity;
    protected $table = 'task_user';
    public $timestamps = false;
    public $incrementing = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logAll()
        ->logOnlyDirty()
        ->setDescriptionForEvent(fn(string $eventName) => "Task Member has been {$eventName}")
        ->useLogName('task_user_log');
    }
    public function tapActivity(Activity $activity, string $eventName)
    {
        $activity->properties = [
            "attributes" => $this->getDirty(),
            "old"=> $this->getOriginal(),
            'user_name' => $this->user->name,
        ];
    }
}
