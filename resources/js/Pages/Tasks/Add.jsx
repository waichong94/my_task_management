import { Head, Link } from '@inertiajs/react';
import AddTaskForm from './Partials/AddTaskForm';

export default function Add({ auth, userList, projectList, statusList, isOpen, onClose }) {
    if(!isOpen) return null;
    return (
        <>
            <Head title={'Add Task'} />

            <div className="w-30 py-2 space-y-6 relative">
                <Link href="/tasks">{"< Back"}</Link>
                <div className="p-4 sm:p-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <AddTaskForm userList={userList} projectList={projectList} statusList={statusList} className='max-w-xl'/>
                </div>
            </div>
            
        </>
    );
}
