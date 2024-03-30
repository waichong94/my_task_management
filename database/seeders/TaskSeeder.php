<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('tasks')->insert(array(
            [
                'task_name' => 'Create search bar',
                'description' => 'Create a autocomplete search bar for the project',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ));
        Task::factory()
            ->count(10)
            ->create();
    }
}
