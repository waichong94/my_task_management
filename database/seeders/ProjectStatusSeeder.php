<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('project_status')->upsert(array(
            [
                'name' => 'live',
                'display' => 'Live',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
            , [
                'name' => 'development',
                'display' => 'Development',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
            , [
                'name' => 'inactive',
                'display' => 'Inactive',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
            ),  ['name'], ['display', 'updated_at']);
    }
}
