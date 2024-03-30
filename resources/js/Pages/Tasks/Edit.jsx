import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import UpdateTaskForm from './Partials/UpdateTaskForm';
import DeleteTaskForm from './Partials/DeleteTaskForm';
import CommentSection from './Partials/CommentSection';
import ChecklistForm from './Partials/ChecklistForm';

export default function Edit({ auth, task, comments, userList, projectList, statusList }) {
    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task #{task.id}</h2>}
        >
            <Head title={'Task #' + task.id} />

                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='flex justify-between items-center'>
                        <Link onClick={()=>{window.location=document.referrer}}>{"< Back"}</Link>
                        <DeleteTaskForm task={task} className='max-w-xl'/>
                    </div>
                   
                    <div className="p-4 sm:p-8 bg-white overflow-visible shadow-sm sm:rounded-lg">
                        <UpdateTaskForm task={task} userList={userList} projectList={projectList} statusList={statusList} className='max-w-xl'/>
                    </div>
                    
                    <div className="p-4 sm:p-8 bg-white overflow-visible shadow-sm sm:rounded-lg">
                        <ChecklistForm task={task} className='max-w-xl'/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white overflow-visible shadow-sm sm:rounded-lg">
                        <CommentSection task={task} comments={comments} className='max-w-xl' />
                    </div>
                </div>

        </AuthenticatedLayout>
    );
}
