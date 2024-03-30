import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import TextArea from "@/Components/TextArea";

export default function ChecklistCreateForm({ taskId, onItemAdded, isShowingForm, onShow, onClose }) {
    const { data, setData, post } = useForm({
        text: '',
        checked: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('tasks.checklist.store', taskId), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                onItemAdded(data);
            }
        });
    }

    return (
        <>
            {!isShowingForm &&
                <div className="mt-4 space-y-6">
                    <PrimaryButton
                        type="button"
                        onClick={onShow}
                    >Add Items</PrimaryButton>
                </div>
            }

            {isShowingForm &&
                <form onSubmit={submit} className="mt-4 space-y-4">
                    <TextArea
                        className="mt-1 block w-full"
                        name="add"
                        rows="2"
                        placeholder="Add item..."
                        onChange={(e) => setData('text', e.target.value)}
                        value={data.text}
                    ></TextArea>
                    <div className="flex items-center gap-4 justify-end">
                        <PrimaryButton
                            type="submit"
                            onClick={submit}
                        >Save</PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={onClose}
                        >Back</PrimaryButton>
                    </div>
                </form>
            }
        </>
    );
}