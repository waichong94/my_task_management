<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Events\ActionRequireNotification;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $filters = $request->only([
                'search'
            ]);

            $select = Task::with('projects')->select([
                'tasks.id',
                'tasks.task_name',
                'tasks.description',
                'tasks.created_at',
                'tasks.status',
                \DB::raw("ifnull(users.name, '-') as pic_name"),
            ])
            ->join('users', 'users.id', '=', 'tasks.uid', 'left');
            // ->join('project_task', 'project_task.task_id', '=', 'tasks.id', 'left')

            if (isset($filters['search']) && $filters['search'] !== "") {
                $select->where('tasks.task_name', 'like', '%' . $request->search . '%');
            }

            $tasks = $select->paginate(10)->through(function ($task) {
                return [
                    'id' => $task->id,
                    'task_name' => $task->task_name,
                    'description' => $task->description,
                    'project_name' => $task->projects->pluck('display')->join(', ') ?: '-',
                    'created_at' => $task->created_at->format('Y-m-d H:i:s'),
                    'status' => Task::STATUS[$task->status],
                    'pic_name' => $task->pic_name,
                ];
            });

            $userList = User::all('id', 'name as display'); // user dropdown selection
            $projectList = Project::all('id', 'display'); // project dropdown selection
            $statusList = array_map(fn($key, $value) => [
                'id' => $key,
                'display' => $value
            ], array_keys(Task::STATUS), Task::STATUS);

            return Inertia::render('Tasks/All', [
                'filters' => $filters,
                'tasks' => $tasks,
                'userList' => $userList,
                'projectList' => $projectList,
                'statusList' => $statusList,
            ]);
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'message' => 'Something went wrong.',
                'debug' => $e->getMessage(),
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
        try {
            $request->validate([
                'task_name' => 'required|string',
                'status' => 'required|integer',
            ]);

            $task = Task::create([
                'task_name' => $request->task_name,
                'description' => $request->description,
                'uid' => $request->pic_uid,
                'due_date' => $request->due_date,
                'status' => $request->status,
            ]);

            $task->projects()->sync($request->project_ids);
            $sync = $task->members()->sync($request->member_ids);

            $auth = Auth::user();
            $user = User::find($request->pic_uid);

            // PIC added
            if ($user) {
                event(new ActionRequireNotification([
                    'title' => "Task added",
                    'body' => "{$auth->name} added you to the Task {$task->task_name} as PIC"
                ], $user));
            }

            // notify newly added members
            foreach ($sync['attached'] as $userId) {
                $user = User::find($userId);
                event(new ActionRequireNotification([
                    'title' => "Task added",
                    'body' => "{$auth->name} added you to the Task {$task->task_name}",
                    'link' => "tasks.edit",
                    'ref_id' => $task->id,
                ], $user));
            }

            return Redirect::route('tasks.index')->with('flashMessage', [
                'type' => 'success',
                'message' => 'Task created successfully'
            ]);
        }catch (\Exception $e) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'message' => 'Task Creation Failed',
                'debug' => $e->getMessage()
            ]);
        }
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
    public function edit(Task $task)
    {   
        try{
            $task = Task::with('projects')->find($task->id);
            $task->project_ids = $task->projects()->pluck('project_id');
            $task->member_ids = $task->members()->pluck('user_id');

            $userList = User::all('id', 'name as display'); // user dropdown selection
            $projectList = Project::all('id', 'display'); // project dropdown selection
            $statusList = array_map(fn($key, $value) => [
                'id' => $key,
                'display' => $value
            ], array_keys(Task::STATUS), Task::STATUS);
            $checklist = $task->checklist;
            $comments = $task->comments()->with('user')->orderBy('created_at', 'desc')->get()->map(fn($comment) => [
                'id' => $comment->id,
                'text' => $comment->text,
                'author' => $comment->user->name,
                'created_at' => $comment->created_at,
            ]);

            return Inertia::render('Tasks/Edit', [
                'task' => $task,
                'userList' => $userList,
                'projectList' => $projectList,
                'statusList' => $statusList,
                'checklist' => $checklist,
                'comments' => $comments
            ]);
        }catch (\Exception $e) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'message' => 'Something went wrong.',
                'debug' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Task $task, Request $request)
    {
        try {
            $request->validate([
                'task_name' => 'required|string',
                'status' => 'required|integer',
            ]);
    
            $task->fill([
                'task_name' => $request->task_name,
                'description' => $request->description,
                'uid' => $request->pic_uid,
                'due_date' => $request->due_date,
                'status' => $request->status,
            ]);
    
            $task->projects()->sync($request->project_ids);
            $sync = $task->members()->sync($request->member_ids);
    
            $auth = Auth::user();
    
            // PIC changed
            if ($task->isDirty('uid')) {
                // new PIC
                $user = User::find($task->uid);
                if ($user) {
                    event(new ActionRequireNotification([
                        'title' => "Task added",
                        'body' => "{$auth->name} added you to the Task {$task->task_name} as PIC",
                        'link' => "tasks.edit",
                        'ref_id' => $task->id,
                    ], $user));
                }
    
                // old PIC
                $user = User::find($task->getOriginal('uid'));
                if ($user) {
                    event(new ActionRequireNotification([
                        'title' => "Task removed",
                        'body' => "{$auth->name} removed you from the Task {$task->task_name} as PIC"
                    ], $user));    
                }
            }
    
            // notify newly added members
            foreach ($sync['attached'] as $userId) {
                $user = User::find($userId);
                event(new ActionRequireNotification([
                    'title' => "Task added",
                    'body' => "{$auth->name} added you to the Task {$task->task_name}",
                    'link' => "tasks.edit",
                    'ref_id' => $task->id,
                ], $user));
            }
    
            // notify newly removed members
            foreach ($sync['detached'] as $userId) {
                $user = User::find($userId);
                event(new ActionRequireNotification([
                    'title' => "Task removed",
                    'body' => "{$auth->name} removed you from the Task {$task->task_name}",
                ], $user));
            }
    
            $task->save();
    
            return back()->with('flashMessage', [
                'type' => 'success',
                'message' => 'Task updated successfully'
            ]);
        }catch (\Exception $e) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'message' => 'Task update failed',
                'debug' => $e->getMessage()
            ]);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try{
            $task->delete();

            return Redirect::route('tasks.index');
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'message' => 'Task Deletion Failed',
                'debug' => $e->getMessage()
            ]);
        }
    }
}
