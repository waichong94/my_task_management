import Paginator from '@/Components/Paginator';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const columns = [
    {"name": "title", "css": ""},
    {"name": "description", "css": ""},
    {"name": "created_at", "css": ""},
]

export default function All({ auth, notifications }) {

    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notifications</h2>}
        >
            <div className='flex flex-col mx-2 mt-2 sm:px-6 lg:px-8'>
                <div className="w-30 py-2 relative">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table items={notifications.data} columns={columns} primary="" />
                    </div>
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <Paginator links={notifications.links} only={['notifications']}></Paginator>
                    </div>
                </div>
                <Head title="Notifications" />
            </div>
        </AuthenticatedLayout>
    );
}
