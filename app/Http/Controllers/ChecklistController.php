<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ChecklistController extends Controller
{
    public function store(Request $request, Task $task)
    {
        try {
            $request->validate([
                'text' => 'required|string',
            ]);

            $checklist = $task->findOrfail($task->id)->checklist ?? [];

            array_push($checklist, [
                'text' => $request->text,
                'checked' => false,
            ]);
            $task->update([
                'checklist' => $checklist
            ]);

            return Redirect::back();
        } catch (\Exception $e) {
            // handle the exception here
            // handle the exception here
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
            ]);
        }
    }

    public function update(Request $request, Task $task)
    {
        try {
            $checklist = $task->findOrfail($task->id)->checklist ?? [];

            if ($request->text == null) {
                unset($checklist[$request->index]);
                // reindex array
                $checklist = array_values($checklist);
            } else {
                $checklist[$request->index]->checked = $request->checked;
                $checklist[$request->index]->text = $request->text;    
            }

            $task->update([
                'checklist' => $checklist
            ]);

            // return null because call with axios
            return null;
            // return Redirect::back();
        } catch (\Exception $e) {
            // handle the exception here
            // handle the exception here
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Something went wrong.'
            ]);
        }
    }

}
