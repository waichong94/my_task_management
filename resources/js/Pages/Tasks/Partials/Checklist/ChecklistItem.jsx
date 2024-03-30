import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import TextArea from '@/Components/TextArea';
import { Link, useForm } from "@inertiajs/react";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ChecklistItem({ taskId, index, item, onItemEdited, isShowingForm, onShow, onClose }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        text: item.text,
        checked: item.checked,
        index: index
    });

    const handleEdit = (e) => {
        e.preventDefault();
        onShow(index);
    }

    const handleCheckbox = (e) => {
        setData('checked', e.target.checked);
        submit(e);
    }

    const submit = (e) => {
        e.preventDefault();
        // patch(route('tasks.checklist.update', taskId), {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         setIsShowingForm(false);
        //         onItemEdited(data, index);
        //     }
        // });
        // return
        const param = {
            text: data.text,
            checked: e.target.checked,
            index: data.index
        };
        axios.patch(
            route('tasks.checklist.update', taskId),
            param
        ).then((response) => {
            onClose();
            onItemEdited(param, index);
        }).catch((error) => {
            // console.log(error);
        });

    }

    return (
        <div className="block w-full">
            {!isShowingForm &&
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Checkbox
                            name={index}
                            className="text-gray-500"
                            checked={data.checked}
                            onChange={(e) => handleCheckbox(e)}
                            disabled={processing}
                        ></Checkbox>
                        <div className="text-gray-500">{item.text}</div>
                        <Link
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={"pen-to-square"} />
                        </Link>
                    </div>
                </form>
            }

            {isShowingForm &&
                <form onSubmit={submit} className="space-y-4">
                    <TextArea
                        name={index}
                        className="mt-1 block w-full"
                        rows="2"
                        onChange={(e) => setData('text', e.target.value)}
                        value={data.text}
                    ></TextArea>
                    <div className="flex items-center gap-4 justify-end">
                        <PrimaryButton
                            type="submit"
                            onClick={submit}
                            disabled={processing}
                        >Save</PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={onClose}
                        >Back</PrimaryButton>
                    </div>
                </form>
            }
        </div>
    );
}