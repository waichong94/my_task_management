<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable 
{
    use HasApiTokens, HasFactory, Notifiable, LogsActivity, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class)->using(TaskUser::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['name', 'email', 'department_id'])
        ->logOnlyDirty()
        ->setDescriptionForEvent(fn(string $eventName) => "User has been {$eventName}")
        ->useLogName('user_log');
    }
}
