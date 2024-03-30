<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $permissions = ['users', 'mytask', 'projects', 'tasks'];
        foreach ($permissions as $permission) {
            $p = Permission::updateOrCreate(['name' => $permission]);
        }

        $bePermissions = $fePermissions = $appsPermissions = $designerPermissions = $pcPermissions = ['mytask', 'projects', 'tasks'];


        $roles = [
            ['name'=> 'admin', "display" => 'Admin', 'permissions' => $permissions], 
            ['name'=> 'director', "display" => 'Director', 'permissions' => $permissions], 
            ['name'=> 'hr', "display" => 'Human Resource', 'permissions' => $permissions],
            ['name'=> 'backend', "display" => 'Backend Developer', 'permissions' => $bePermissions],
            ['name'=> 'frontend', "display" => 'Frontend Developer', 'permissions' => $fePermissions],
            ['name'=> 'apps', "display" => 'IOS/Android Developer', 'permissions' => $appsPermissions],
            ['name'=> 'designer', "display" => 'Designer', 'permissions' => $designerPermissions],
            ['name'=> 'pc', "display" => 'Project Coordinator', 'permissions' => $pcPermissions]
        ];

        foreach ($roles as $role) {
            $r = Role::updateOrCreate(['name' => $role['name'], 'display' => $role['display']]);
            $r->syncPermissions($role['permissions']);
        }


    }
}
