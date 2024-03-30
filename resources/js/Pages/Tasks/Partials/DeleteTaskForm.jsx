import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteTaskForm({ className = '', task }) {
    const [confirmingTaskDeletion, setConfirmingTaskDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmTaskDeletion = () => {
        setConfirmingTaskDeletion(true);
    };

    const deleteTask = (e) => {
        e.preventDefault();

        destroy(route('tasks.destroy', task.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingTaskDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <DangerButton onClick={confirmTaskDeletion}>Delete Task</DangerButton>

            <Modal show={confirmingTaskDeletion} onClose={closeModal}>
                <form onSubmit={deleteTask} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this task?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Delete Task
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
