import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from "react";
import SearchBar from '@/Components/SearchBar';
import PrimaryButton from '@/Components/PrimaryButton';
import Paginator from '@/Components/Paginator';
import highlight from '@/task_status_color';

const columns = [
    {"name": "task_name", "css": ""},
    {"name": "description", "css": ""},
    {"name": "project_name", "css": ""},
    {"name": "pic_name", "css": ""},
    {"name": "status", "css": ""},
    {"name": "created_at", "css": ""},
]


const action = [
    {"route": "project.tasks.edit", "label": "Edit"},
]

export default function UserTask({ auth, tasks, project_id }) {
    const [filterText, setFilterText] = useState("");
    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}
        >
            <div className='flex flex-col mx-2 mt-2 sm:px-6 lg:px-8'>
                <>
                    <Link className='w-30 py-2' href="/projects">{"< Back"}</Link>
                    <div className='w-30 py-2 flex justify-between' >
                        <div className='flex justify-between items-center'>
                            <div className="mr-2">
                                <SearchBar id="search" filterText={filterText} onFilterTextChange={setFilterText} />
                            </div>
                            <Link
                                href={route('project.tasks',project_id)+'?search='+filterText}
                                only={['tasks']}
                            >
                                <PrimaryButton>
                                    Search
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    <div className="w-30 py-2 relative">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <Table items={tasks.data} columns={columns} primary="Task ID" action={action} highlight={highlight}></Table>
                        </div>
                        <div className="overflow-hidden shadow-sm sm:rounded-lg">
                            <Paginator links={tasks.links} only={['tasks']}></Paginator>
                        </div>
                    </div>
                </>
            <Head title="Tasks" />

            </div>

        </AuthenticatedLayout>
    );
}
