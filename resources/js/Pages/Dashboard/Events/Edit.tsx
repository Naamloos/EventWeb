import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { EditEventProps } from '@/types/props/EditEventProps';
import { useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import PlaceholderImage from '../../../../img/placeholder-banner.jpg';

export default function Index({ event, auth }: EditEventProps) {

    // create form to use
    const form = useForm
    ({
        name: event.name,
        description: event.description,
        location: event.location,
        starts_at: new Date(event.starts_at).toISOString().slice(0, 19),
        ends_at: new Date(event.ends_at).toISOString().slice(0, 19),
        image: event.image,
        about: event.about,
        ticket_url: event.ticket_url,
        published: event.published
    });

    // function to submit form data
    const submitFormUpdate = () =>
    {
        // submit form data to back-end
        form.patch(route('events.update', {id: event.id}));
    }

    const updateImage = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        let reader = new FileReader();
        reader.onload = function () {
            form.setData('image', reader.result as string);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        reader.readAsDataURL(e.target.files![0]);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title={event.name} />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* form with all inputs to modify current event */}
                            <div className="flex flex-col">
                                <h2 className="text-3xl font-semibold text-black">Edit Event</h2>
                                <label htmlFor="name" className="text-lg font-semibold mt-3">Event Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.data.name}
                                    onChange={e => form.setData('name', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-lg"
                                />

                                <label htmlFor="description" className="text-lg font-semibold mt-3">Short Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.data.description}
                                    onChange={e => form.setData('description', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-lg"
                                />

                                <div className='pt-3'>
                                    <label htmlFor="published" className="text-lg font-semibold pt-2">Visible to Users?</label>
                                    <input
                                        type="checkbox"
                                        id="published"
                                        name="published"
                                        checked={form.data.published}
                                        onChange={e => form.setData('published', e.target.checked)}
                                        className="border border-gray-300 p-2 rounded-lg ml-2"
                                    />
                                </div>

                                <label htmlFor="location" className="text-lg font-semibold mt-3">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={form.data.location}
                                    onChange={e => form.setData('location', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-lg"
                                />

                                <label htmlFor="starts_at" className="text-lg font-semibold mt-3">Starts At</label>
                                {/* date and time separately */}
                                <input
                                    type='datetime-local'
                                    id='startDate'
                                    name='startDate'
                                    value={form.data.starts_at}
                                    onChange={e => form.setData('starts_at', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-lg"
                                />

                                <label htmlFor="ends_at" className="text-lg font-semibold mt-3">Ends At</label>
                                {/* date and time separately */}
                                <input
                                    type='datetime-local'
                                    id='endDate'
                                    name='endDate'
                                    value={form.data.ends_at}
                                    onChange={e => form.setData('ends_at', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-lg"
                                />

                                <label htmlFor="image" className="text-lg font-semibold mt-3">Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="border border-gray-300 p-2 rounded-lg"
                                    onChange={e => updateImage(e)}
                                />
                                <img src={form.data.image} alt={event.name} className="h-36 w-36 flex-none bg-gray-50 m-3" onError={(e) => { e.currentTarget.src = PlaceholderImage }}/>

                                <label htmlFor="about" className="text-lg font-semibold mt-3">Long Description (Supports Markdown)</label>
                                <div className="container">
                                    <MDEditor
                                        value={form.data.about}
                                        onChange={val => form.setData('about', val || '')}
                                        commands={[...commands.getCommands()]}
                                        className='min-h-96'
                                        data-color-mode='light'
                                    />
                                </div>

                                <label htmlFor="ticket_url" className="text-lg font-semibold mt-3">TicketTailer URL (full embed code works too)</label>
                                <textarea
                                    id="ticket_url"
                                    name="ticket_url"
                                    value={form.data.ticket_url}
                                    onChange={e => form.setData('ticket_url', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-lg"
                                />

                                <button
                                    type="button"
                                    className="bg-blue-500 text-white p-2 rounded-lg mt-5"
                                    onClick={() => submitFormUpdate()}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
