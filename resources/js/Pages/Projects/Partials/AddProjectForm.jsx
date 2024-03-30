import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function AddProjectForm({ className = '', projectStatus}) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: "",
        status: "",
    });

    const submit = (e) => {
        e.preventDefault();

    post(route('project.store'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Add Project</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Please fill in the form to add new project.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Project Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="status" value="Status" />

                    <SelectInput 
                        id="status"
                        className="mt-1 block w-full"
                        options={projectStatus}
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        
                    </SelectInput>

                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="flex items-center gap-4 justify-between">
                    <div className='flex flex-row items-center justify-between'>
                        <PrimaryButton className="mr-5" disabled={processing}>Add</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-500 font-semibold">Added.</p>
                        </Transition>
                    </div>
                    
                </div>
            </form>
        </section>
    );
}
