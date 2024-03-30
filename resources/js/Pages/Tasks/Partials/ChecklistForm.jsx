import { useState } from "react";
import ChecklistItem from "./Checklist/ChecklistItem";
import ChecklistItemCreateForm from "./Checklist/ChecklistItemCreateForm";

export default function ChecklistForm({ className='', task }) {
    const [checklist, setChecklist] = useState(task.checklist ?? []);
    const [openIndex, setOpenIndex] = useState(null);

    const handleItemEdited = (newItem, index) => {
        let newChecklist;
        if (newItem.text === null || newItem.text.trim() === '') {
            newChecklist = checklist.filter((item, i) => i !== index);
            setChecklist(newChecklist);
        } else {
            newChecklist = checklist.map(
                (item, i) => i === index ? { text: newItem.text, checked: newItem.checked } : item
            );
            setChecklist(newChecklist);
        }
    }

    const handleItemAdded = (newItem) => {
        setChecklist([...checklist, newItem]);
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Checklist</h2>
            </header>

            <div className="flex flex-col items-start mt-4 gap-4">
                {checklist.map((item, key) => {
                    return <ChecklistItem
                        key={key}
                        item={item}
                        index={key}
                        taskId={task.id}
                        onItemEdited={handleItemEdited}
                        isShowingForm={key == openIndex}
                        onShow={() => setOpenIndex(key)}
                        onClose={() => setOpenIndex(null)}
                    />
                })}
            </div>

            <ChecklistItemCreateForm
                taskId={task.id}
                onItemAdded={handleItemAdded}
                isShowingForm={'add' == openIndex}
                onShow={() => setOpenIndex('add')}
                onClose={() => setOpenIndex(null)}
            ></ChecklistItemCreateForm>
        </section>
    );

}
