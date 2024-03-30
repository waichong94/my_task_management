<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('projects')->upsert(array(
            [
                'name' => 'project 1',
                'display' => 'Project 1',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
            , [
                'name' => 'project 2',
                'display' => 'Project 2',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'project 3',
                'display' => 'Project 3',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]), ['name'], ['display', 'updated_at']);
    }
}
