import Table from '@/Components/Table';
import AddButton from '@/Components/AddButton';
import Add from '@/Pages/Users/Add';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from "react";
import SearchBar from '@/Components/SearchBar';
import PrimaryButton from '@/Components/PrimaryButton';
import Paginator from '@/Components/Paginator';

const columns = [
    {"name": "name", "css": ""},
    {"name": "email", "css": ""},
    {"name": "department", "css": ""},
    {"name": "created_at", "css": ""},
]

const action = [
    {"route": "user.edit", "label": "Edit"},
    {"route": "user.tasks", "label": "Tasks"},
]

export default function All({ auth, users, departmentList }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filterText, setFilterText] = useState("");

    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <div className='flex flex-col mx-2 mt-2 sm:px-6 lg:px-8'>
                {isOpen ? 

                <Add auth={auth} departmentList={departmentList} isOpen={isOpen} setIsOpen={setIsOpen} /> : 
                
                <>
                    <div className='flex justify-between w-30 py-2 relative' >
                        <div className='flex justify-between items-center'>
                            <div className="mr-2">
                                <SearchBar id="search" filterText={filterText} onFilterTextChange={setFilterText} />
                            </div>
                            <Link
                                href={route('user.show', {
                                    search: filterText,
                                })}
                                only={['users']}
                            >
                                <PrimaryButton>
                                    Search
                                </PrimaryButton>
                            </Link>
                        </div>
                        
                        <AddButton onClick={() => setIsOpen(true)}>Add User</AddButton>
                    </div>
                    <div className="w-30 py-2 relative">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <Table items={users.data} columns={columns} primary="User ID" action={action} />
                        </div>
                        <div className="overflow-hidden shadow-sm sm:rounded-lg">
                            <Paginator links={users.links} only={['users']}></Paginator>
                        </div>
                    </div>
                </>
                }
                <Head title="Users" />
                
            </div>
        </AuthenticatedLayout>
    );
}
