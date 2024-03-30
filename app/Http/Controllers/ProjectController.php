<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ProjectController extends Controller
{
    function show(Request $request)
    {
        try {
            $filters = $request->only([
                'search'
            ]);
            $select = Project::selectRaw("projects.id, projects.name, projects.display as project_name, projects.created_at, projects.project_status_id as status");

            if (isset($filters['search']) && $filters['search'] !== "") {
                $select->where('projects.name', 'like', "%$request->search%");
            }
            $projects = $select->paginate(10)->through(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'project_name' => $project->project_name,
                    'created_at' => $project->created_at->format('Y-m-d H:i:s'),
                    'status' => Project::find($project->id)->status()->pluck('display')->join('')
                ];
            });

            return Inertia::render('Projects/All', [
                'projects' => $projects,
                'projectStatus' => ProjectStatus::all()
            ]);
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something Went Wrong.'
            ]);
        }
    }

    public function projectTask(Project $project, Request $request)
    {
        try {
            $filters = $request->only([
                'search'
            ]);

            $select = Task::with('projects')
                ->leftJoin('task_user', 'tasks.id', '=', 'task_user.task_id')
                ->leftJoin('users', 'tasks.uid', '=', 'users.id')
                ->whereHas('projects', function ($query) use ($project) {
                    $query->where('projects.id', $project->id);
                });

            if (isset($filters['search']) && $filters['search'] !== "") {
                $select->where('tasks.task_name', 'like', "%$request->search%");
            }

            $tasks = $select->select('tasks.*', \DB::raw("ifnull(users.name, '-') as pic_name"))->paginate(10)->through(function ($task) {
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
            return Inertia::render('Projects/ProjectTask', [
                'tasks' => $tasks,
                'project_id' => $project->id
            ]);
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something Went Wrong.'
            ]);
        }
    }

    function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:projects',
                'status' => 'required|exists:project_status,id',
            ]);

            $project = Project::create([
                'name' => str_replace(' ', '', strtolower($request->name)),
                'display' => $request->name,
                'project_status_id' => $request->status,
            ]);

            return Redirect::route('project.show')->with('flashMessage', [
                'type' => 'success',
                'message' => 'Project created successfully'
            ]);
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Add Project Failed.'
            ]);
        }
    }

    function edit(Project $project)
    {
        try{
            $project = Project::with('status')->find($project->id);

            $project->project_status_id = $project->status()->first()->id;

            return Inertia::render('Projects/Edit', [
                'project' => $project,
                'projectStatus' => ProjectStatus::all()
            ]);
        }catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something Went Wrong.'
            ]);
        }
        
    }

    function update(Project $project, Request $request)
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255|unique:projects,name,' . $project->id,
                'status' => 'required|exists:project_status,id',
            ]);

            $project->fill([
                'name' => str_replace(' ', '', strtolower($request->name)),
                'display' => $request->name,
                'project_status_id' => $request->status,

            ]);
    
            $project->save();
    
            return Redirect::route('project.edit', $project->id)->with('flashMessage', [
                'type' => 'success',
                'message' => 'Project updated successfully'
            ]);;
        }catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Update Project Failed.'
            ]);
        }
        
    }
}