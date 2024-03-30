import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import AddProjectForm from './Partials/AddProjectForm';

export default function Add({ auth, isOpen, projectStatus }) {
    if(!isOpen) return null;
    return (
        <>
            <Head title={'Add Project'} />

            <div className="w-30 py-2 space-y-6 relative">
                <Link href="/projects">{"< Back"}</Link>
                <div className="p-4 sm:p-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <AddProjectForm projectStatus={projectStatus} className='max-w-xl'/>
                </div>
            </div>
            
        </>
    );
}
