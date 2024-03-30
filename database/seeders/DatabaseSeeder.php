<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);
        $this->call(ProjectStatusSeeder::class);
        $this->call(SidebarSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(UserSeeder::class);
        
        if(App::environment() === 'production'){

        }else{
            $this->call(TaskSeeder::class);
        }
    }
        
}
