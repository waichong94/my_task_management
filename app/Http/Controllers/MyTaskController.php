<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;

class MyTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only([
                'search'
            ]);
            $select = \DB::table('tasks')
                ->leftJoin('task_user', function($join)
                             {
                                 $join->on('tasks.id', '=', 'task_user.task_id');
                                 $join->on('task_user.user_id','=', \DB::raw(auth()->id()));
                             })
                ->leftJoin('users', 'tasks.uid', '=', 'users.id')
                ->where(function ($query) {
                    $query->where('tasks.uid', '=', auth()->id())
                        ->orWhere('task_user.user_id','=', auth()->id());
                });
            if (isset($filters['search']) && $filters['search'] !== "") {
                $select->where('tasks.task_name', 'like', "%$request->search%");
            }

            $tasks = $select->select('tasks.*', \DB::raw("ifnull(users.name, '-') as pic_name"))->paginate(10)->through(function ($task) {
                return [
                    'id' => $task->id,
                    'task_name' => $task->task_name,
                    'description' => $task->description,
                    'project_name' => Task::find($task->id)->projects()->pluck('display')->join(', ') ?: '-',
                    'created_at' => $task->created_at,
                    'status' => Task::STATUS[$task->status],
                    'pic_name' => $task->pic_name,
                ];
            });
            return Inertia::render('MyTask/All', [
                'tasks' => $tasks,
            ]);
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $mytask)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
