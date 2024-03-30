<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SidebarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('sidebar')->upsert(array(
            [
                'name' => 'Users',
                'route' => 'user.show',
                'route_group' => json_encode(["user.show", "user.edit", "user.tasks", "user.tasks.edit"]),
                'icon' => "users",
                'permission_id' => "1",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'My Task',
                'route' => 'mytask.index',
                'route_group' => json_encode(["mytask.index", "mytask.edit"]),
                'icon' => "clipboard-list",
                'permission_id' => "2",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Tasks',
                'route' => 'tasks.index',
                'route_group' => json_encode(["tasks.index", "tasks.show", "tasks.edit"]),
                'icon' => "list-check",
                'permission_id' => "4",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Projects',
                'route' => 'project.show',
                'route_group' => json_encode(["project.show", "project.tasks", "project.tasks.edit"]),
                'icon' => "bars-progress",
                'permission_id' => "3",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ), ['name'], ['route', 'route_group', 'icon', 'permission_id', 'updated_at']);
    }
}
