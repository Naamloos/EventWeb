import Note from '@/types/Note';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function NoteComponent({ note }: { note: Note })
{
    const noteForm = useForm({
        content: note.content,
    });

    const [saved, setSaved] = useState<boolean | null>(null);

    const [submitTimeOut, setSubmitTimeout] = useState<NodeJS.Timeout | null>(null);

    const submit = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        e.preventDefault();
        setSaved(false)

        noteForm.setData('content', e.target.value)

        if (submitTimeOut)
        {
            clearTimeout(submitTimeOut);
        }

        let submit = setTimeout(() => {
            noteForm.patch(route('notes.update', { id: note.id }), {
                onFinish: () => {
                    setSaved(true);
                    setTimeout(() => {
                        setSaved(null);
                    }, 1500);
                }
            });
        }, 500);

        setSubmitTimeout(submit);
    };

    // return a card with a textarea, that after a delay, with a delete button
    return <>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 pt-0 text-gray-900">
                {saved && <p className="text-green-500 absolute text-xs pl-2 pt-1">Saved!</p>}
                {saved === false && <p className="text-green-200 absolute text-xs pl-2 pt-1">Stop typing to save...</p>}
                <textarea
                    className="w-full border border-gray-300 rounded p-4"
                    value={noteForm.data.content}
                    onChange={e => submit(e)}
                ></textarea>
                <button
                    className="bg-red-500 text-white rounded p-1 px-2 mt-1"
                    onClick={() => noteForm.delete(route('notes.destroy', { id: note.id }))}
                >🗑️</button>
            </div>
        </div>
    </>
}
