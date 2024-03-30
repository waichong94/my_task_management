<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    function show(Request $request)
    {
        try{

            $filters = $request->only([
                'search'
            ]);
            $users = User::with('roles')->select('users.id', 'users.name', 'users.email', 'users.created_at');

            if (isset($filters['search']) && $filters['search'] !== "") {
                $users->where(function ($query) use($request) {
                    $query->where('users.name', 'like', '%' . $request->search . '%')
                        ->orWhere('users.email','like', '%' . $request->search . '%');
                });
            }
            $users = $users->paginate(10)->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'department' => $user->roles->first()->display,
                    'email' => $user->email,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ];
            });
            $department = Role::all();
            return Inertia::render('Users/All', [
                'users' => $users,
                'departmentList' => $department
            ]);
        }
        catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something Went Wrong.'
            ]);
        }
    }

    function edit(User $user)
    {
        try{
            $user = User::with('roles')->find($user->id);
            $department = Role::all(); // department dropdown selection 

            $user->department_id = $user->roles->first()->id;
            return Inertia::render('Users/Edit', [
                'user' => $user,
                'departmentList' => $department
            
            ]);
        }catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something Went Wrong.'
            ]);
        }
        
    }

    function add()
    {
        
    }

    function update(User $user, Request $request)
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'department' => 'required|exists:roles,id',
            ]);
    
            $user->fill([
                'name' => $request->name,
                'email' => $request->email,
            ]);
    
            $user->save();
            $user->syncRoles([Role::find($request->department)->name]);
    
            return Redirect::route('user.edit', $user->id)->with('flashMessage', [
                'type' => 'success',
                'message' => 'User updated successfully'
            ]);;
        }catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Update User Failed.'
            ]);
        }
        
    }

    function store(Request $request): RedirectResponse
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:'.User::class,
                'department' => 'required|exists:roles,id',
            ]);
    
            // $bytes = openssl_random_pseudo_bytes(4);
            // $pwd = bin2hex($bytes);
            $pwd  = "qweqwe11";
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($pwd),
            ]);
            $user->pwd = $pwd;
            $user->assignRole(Role::find($request->department)->name);
            // event(new NewUserAdded($user));
    
            return Redirect::route('user.show')->with('flashMessage', [
                'type' => 'success',
                'message' => 'User created successfully'
            ]);;
        }catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Create User Failed.'
            ]);
        }
        
    }

    public function userTask(User $user,Request $request)
    {
        try{
            $filters = $request->only([
                'search'
            ]);
            $select = \DB::table('tasks')
                ->leftJoin('task_user', 'tasks.id', '=', 'task_user.task_id')
                ->leftJoin('users', 'tasks.uid', '=', 'users.id')
                ->where(function ($query) use($user) {
                    $query->where('tasks.uid', '=', $user->id)
                        ->orWhere('task_user.user_id','=', $user->id);
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
            return Inertia::render('Users/UserTask', [
                'tasks' => $tasks,
                'user_id' => $user->id
            ]);
        }catch(\Exception $e){
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something Went Wrong.'
            ]);
        }
        
    }
}
