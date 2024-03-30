<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Task $task)
    {
        try {
            $comments = CommentResource::collection($task->comments()->get());

            return $comments;
        } catch (\Exception $e) {
            // handle the exception here
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
    public function store(Request $request, Task $task)
    {
        try {
            $request->validate([
                'text' => 'required|string',
            ]);

            $task->comments()->create([
                'text' => $request->text,
                'uid' => Auth::user()->id,
            ]);

            return Redirect::back();
        } catch (\Exception $e) {
            // handle the exception here
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
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
    public function edit(string $id)
    {
        //
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
