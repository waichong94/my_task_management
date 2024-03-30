import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import AddUserForm from './Partials/AddUserForm';

export default function Add({ auth, departmentList, isOpen, onClose }) {
    if(!isOpen) return null;
    return (
        <>
            <Head title={'Add User'} />

            <div className="w-30 py-2 space-y-6 relative">
                <Link href="/users">{"< Back"}</Link>
                <div className="p-4 sm:p-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <AddUserForm departmentList={departmentList} className='max-w-xl'/>
                </div>
            </div>
            
        </>
    );
}
