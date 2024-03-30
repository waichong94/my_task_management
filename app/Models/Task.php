<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;
    use SoftDeletes;
    use LogsActivity;

    public const STATUS = [
        0 => 'On Hold',
        1 => 'To Do',
        2 => 'In Progress',
        3 => 'Staging',
        4 => 'Completed',
    ];

    protected $fillable = [
        'task_name',
        'description',
        'checklist',
        'uid',
        'due_date',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'checklist' => 'object',
    ];

    // public function personInCharge()
    // {
    //     return $this->belongsTo(User::class, 'uid', 'id');
    // }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class)->using(TaskUser::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logFillable()
        ->logOnlyDirty()
        ->setDescriptionForEvent(fn(string $eventName) => "Task has been {$eventName}")
        ->useLogName('task_log');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
