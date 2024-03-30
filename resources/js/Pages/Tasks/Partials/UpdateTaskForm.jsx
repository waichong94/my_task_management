import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import MultiSelectInput from '@/Components/MultiSelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import DatePicker from '@/Components/DatePicker';
import { useState } from 'react';

export default function UpdateTaskForm({ mustVerifyEmail, status, className = '', task, userList, projectList, statusList}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        task_name: task.task_name,
        description: task.description,
        pic_uid: task.uid ?? '',
        project_ids: task.project_ids ?? [],
        member_ids: task.member_ids ?? [],
        due_date: task.due_date ?? '',
        status: task.status ?? '',
    });

    const [dueDate, setDueDate] = useState({
        startDate: data.due_date,
        endDate: data.due_date
    })

    const submit = (e) => {
        e.preventDefault();

        patch(route('tasks.update', task.id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Task #{task.id}</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="task_name" value="Name" />

                    <TextInput
                        id="task_name"
                        className="mt-1 block w-full"
                        value={data.task_name}
                        onChange={(e) => setData('task_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="task_name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextArea
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        isFocused
                        autoComplete="description"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="project_ids" value="Project" />

                    <MultiSelectInput 
                        id="project_ids"
                        className="mt-1 block w-full"
                        options={projectList}
                        value={data.project_ids}
                        onChange={(selectedValues) => setData('project_ids', selectedValues)}
                        placeholder="Add Project..."
                    >

                    </MultiSelectInput>

                    <InputError message={errors.project_ids} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="pic_uid" value="Person In Charge" />

                    <SelectInput 
                        id="pic_uid"
                        className="mt-1 block w-full"
                        options={userList}
                        value={data.pic_uid}
                        onChange={(e) => setData('pic_uid', e.target.value)}
                    >

                    </SelectInput>

                    <InputError message={errors.pic_uid} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="member_ids" value="Members" />

                    <MultiSelectInput 
                        id="member_ids"
                        className="mt-1 block w-full"
                        options={userList}
                        value={data.member_ids}
                        onChange={(selectedValues) => setData('member_ids', selectedValues)}
                        placeholder="Add Member..."
                    >

                    </MultiSelectInput>

                    <InputError message={errors.member_ids} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="status" value="Status" />

                    <SelectInput 
                        id="status"
                        className="mt-1 block w-full"
                        options={statusList}
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        required
                    >

                    </SelectInput>

                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="due_date" value="Due Date" />

                    <DatePicker
                        id="due_date"
                        asSingle={true}
                        useRange={false}
                        value={dueDate}
                        onChange={(date) => {
                            setDueDate(date)
                            setData('due_date', date.startDate)
                        }}
                    />

                    <InputError message={errors.due_date} className="mt-2" />
                </div>

                <div className="flex items-center gap-4 justify-between">
                    <div className='flex flex-row items-center justify-between'>
                        <PrimaryButton className="mr-5 bg-green-500" disabled={processing}>Save</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-500 font-semibold">Saved.</p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    );
}
