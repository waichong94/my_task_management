<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if(!empty(auth()->user())){
            $permissionId = array_column(auth()->user()->getAllPermissions()->toArray(), 'id');
            $sidebar = \DB::table('sidebar')->whereIn('permission_id', $permissionId)->select('name', 'route', 'route_group', 'icon')->get();
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'notification' =>  $request->user() ? $request->user()->unreadNotifications : null,
                'sidebar' => $sidebar ?? [],
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flashMessage' => fn () => $request->session()->get('flashMessage'),
        ];
    }
}
