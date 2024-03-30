import moment from "moment";
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";

export default function CommentSection({ className = '', task, comments }) {
    const { data, setData, post, processing, recentlySuccessful, reset } = useForm({
        text: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('tasks.comments.store', task.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Comments</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex flex-row items-center gap-4 justify-between">
                    <TextInput
                        id="comment"
                        value={data.text}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        isFocused={false}
                        onChange={(e) => setData('text', e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <PrimaryButton>Comment</PrimaryButton>
                </div>
            </form>
            {comments ?
                <div className="flex flex-col gap-4 mt-6 ">
                    {comments.map((comment) =>
                        <div key={comment.id} className="border border-gray-300 rounded-md shadow-sm p-2 px-3">
                            <div className="flex flex-row justify-between items-center">
                                <div className="">{comment.author}</div>
                                <div className="text-sm text-gray-500 ">{moment(comment.created_at).fromNow()}</div>
                            </div>
                            <div className="items-center m-2">
                                <div className="">{comment.text}</div>
                            </div>
                        </div>
                    )}
                </div>
                :
                <></>
            }
        </section>
    );
}