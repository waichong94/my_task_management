<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(['email'=>'admin@oxyminds.com'],[
            'name' => 'Admin',
            'email' => 'admin@oxyminds.com',
            'password' => Hash::make('qweqwe11'),
        ]);
        $user->assignRole('admin');

        $backend = [[
            'name' => 'John Doe',
            'email' => 'johndow@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        [
            'name' => 'John Doe 2',
            'email' => 'johndow2@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        [
            'name' => 'John Doe 3',
            'email' => 'johndow3@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        ];
        foreach ($backend as $key => $value) {
            $users = User::updateOrCreate(['email'=> $value['email']],$value);
            $users->assignRole('backend');
        }

        $frontend = [[
            'name' => 'John Doe 4',
            'email' => 'johndow4@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        [
            'name' => 'John Doe 5',
            'email' => 'johndow5@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        [
            'name' => 'John Doe 6',
            'email' => 'johndow6@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        ];
        foreach ($frontend as $key => $value) {
            $users = User::updateOrCreate(['email'=> $value['email']], $value);
            $users->assignRole('frontend');
        }

        $apps = [[
            'name' => 'John Doe 7',
            'email' => 'johndow7@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        [
            'name' => 'John Doe 8',
            'email' => 'johndow8@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        ];
        foreach ($apps as $key => $value) {
            $users = User::updateOrCreate(['email'=> $value['email']],$value);
            $users->assignRole('apps');
        }

        $pc = [[
            'name' => 'John Doe 9',
            'email' => 'johndow9@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        [
            'name' => 'John Doe10',
            'email' => 'johndow10@mail.com',
            'password' => Hash::make('qweqwe11'),
        ],
        ];
        foreach ($pc as $key => $value) {
            $users = User::updateOrCreate(['email'=> $value['email']],$value);
            $users->assignRole('pc');
        }
    }
}
