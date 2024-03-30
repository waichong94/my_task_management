import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UpdateUserForm from './Partials/UpdateUserForm';

export default function Edit({ auth, user, departmentList }) {
    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User #{user.id}</h2>}
        >
            <Head title={'User #' + user.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link onClick={()=>{window.history.back()}}>{"< Back"}</Link>
                    <div className="p-4 sm:p-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <UpdateUserForm user={user} departmentList={departmentList} className='max-w-xl'/>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
