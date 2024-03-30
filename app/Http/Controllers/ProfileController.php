<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        try {
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
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
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        try {
            $request->user()->fill($request->validated());

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();

            return Redirect::route('profile.edit')->with('flashMessage', [
                'type' => 'success',
                'message' => 'Profile updated successfully'
            ]);
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Update Profile Failed.'
            ]);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);

            $user = $request->user();

            Auth::logout();

            $user->delete();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::to('/');
        } catch (\Exception $e) {
            return back()->with('flashMessage', [
                'debug' => $e->getMessage(),
                'type' => 'error',
                'message' => 'Delete User Failed'
            ]);
        }
    }

}
