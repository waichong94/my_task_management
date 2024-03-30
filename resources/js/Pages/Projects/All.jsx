import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Add from '@/Pages/Projects/Add';
import { useState, useEffect } from "react";
import SearchBar from '@/Components/SearchBar';
import Paginator from '@/Components/Paginator';
import PrimaryButton from '@/Components/PrimaryButton';
import AddButton from '@/Components/AddButton';

const columns = [
    {"name": "project_name", "css": ""},
    {"name": "status", "css": {
        "Live" : "text-green-500 font-bold",
        "Development" : "text-yellow-500 font-bold",
        "Inactive" : "text-red-500 font-bold",
    }},
    {"name": "created_at", "css": ""},
]

const action = [
    {"route": "project.edit", "label": "Edit"},
    {"route": "project.tasks", "label": "Tasks"},
]

export default function All({ auth, projects, projectStatus }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filterText, setFilterText] = useState("");
    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className='flex flex-col mx-2 mt-2 sm:px-6 lg:px-8'>
                {isOpen ? 

                <Add auth={auth} isOpen={isOpen} setIsOpen={setIsOpen} projectStatus={projectStatus} /> : 
                
                <>
                    <div className='flex justify-between w-30 py-2 relative' >
                        <div className='flex justify-between items-center'>
                            <div className="mr-2">
                                <SearchBar id="search" filterText={filterText} onFilterTextChange={setFilterText} />
                            </div>
                            <Link
                                href={route('project.show', {
                                    search: filterText,
                                })}
                                only={['projects']}
                            >
                                <PrimaryButton>
                                    Search
                                </PrimaryButton>
                            </Link>
                        </div>
                        
                        <AddButton onClick={() => setIsOpen(true)}>Add Project</AddButton>
                    </div>
                    <div className="w-30 py-2 relative">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <Table items={projects.data} columns={columns} primary="Project ID" action={action} />
                        </div>
                        <div className="overflow-hidden shadow-sm sm:rounded-lg">
                            <Paginator links={projects.links} only={['projects']}></Paginator>
                        </div>
                    </div>
                </>
                }
            </div>
        </AuthenticatedLayout>
    );
}
