import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UpdateProjectForm from './Partials/UpdateProjectForm';

export default function Edit({ auth, project, projectStatus }) {
    return (
        <AuthenticatedLayout
            notification={auth.notification}
            sidebar={auth.sidebar}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project #{project.id}</h2>}
        >
            <Head title={'Project #' + project.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link href={route('project.show')}>{"< Back"}</Link>
                    <div className="p-4 sm:p-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <UpdateProjectForm project={project} projectStatus={projectStatus} className='max-w-xl'/>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
