<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    public const STATUS = [
        1 => 'Live',
        2 => 'Development',
        3 => 'Inactive',
    ];

    protected $fillable = [
        'name',
        'display',
        'status',
        'project_status_id'
    ];
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }

    public function status()
    {
        return $this->belongsTo(ProjectStatus::class, 'project_status_id');
    }
}
