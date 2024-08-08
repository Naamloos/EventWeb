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
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg pt-3">
            <div className="text-gray-900">
                <p className='text-xs opacity-50'>
                    Internal ID: {note.id}
                </p>
                {saved && <p className="text-green-500 absolute text-xs pl-2 pt-1">Saved!</p>}
                {saved === false && <p className="text-green-200 absolute text-xs pl-2 pt-1">Stop typing to save...</p>}
                <div className="    grid
                    text-sm
                    after:px-3.5
                    after:py-2.5
                    [&>textarea]:text-inherit
                    after:text-inherit
                    [&>textarea]:resize-none
                    [&>textarea]:overflow-hidden
                    [&>textarea]:[grid-area:1/1/2/2]
                    after:[grid-area:1/1/2/2]
                    after:whitespace-pre-wrap
                    after:invisible
                    after:content-[attr(data-cloned-val)_'_']
                    after:border"
                    data-cloned-val={noteForm.data.content}
                >
                    <textarea
                        className="border-gray-300 rounded p-4 w-full border appearance-none px-3.5 py-2.5 outline-none"
                        value={noteForm.data.content}
                        onChange={e => submit(e)}
                        // @ts-ignore
                        onInput={e => e.currentTarget.parentNode?.setAttribute('data-cloned-val', e.currentTarget.value)}
                    ></textarea>
                </div>
                <button
                    className="bg-red-500 text-white rounded p-1 px-2 mt-1"
                    onClick={() => noteForm.delete(route('notes.destroy', { id: note.id }))}
                >🗑️</button>
            </div>
        </div>
    </>
}
