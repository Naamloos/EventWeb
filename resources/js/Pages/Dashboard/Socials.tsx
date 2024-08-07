import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { SocialsProps } from '@/types/props/SocialsProps';
import SocialListComponent from '@/Components/SocialListComponent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IconPicker } from 'react-fa-icon-picker-alen';

export default function Socials({ auth, socials }: SocialsProps) {
    library.add(fab);

    const newSocial = useForm({
        name: 'Facebook',
        url: 'https://facebook.com/facebook',
        icon: 'facebook'
    })

    const postNewSocial = () => {
        newSocial.put(route('socials.new'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-svh">
                        {/* tiny form to add a new social */}
                        <div className="p-6 text-gray-900">
                            <h2 className="text-3xl font-semibold text-black">Socials (Contact Page)</h2>
                            <label htmlFor="name" className="font-semibold mt-3 mr-1">Social Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newSocial.data.name}
                                onChange={e => newSocial.setData('name', e.target.value)}
                                className="border border-gray-300 p-1 rounded-lg"
                            />

                            <label htmlFor="url" className="font-semibold mt-3 ml-2 mr-1">URL</label>
                            <input
                                type="text"
                                id="url"
                                name="url"
                                value={newSocial.data.url}
                                onChange={e => newSocial.setData('url', e.target.value)}
                                className="border border-gray-300 p-1 rounded-lg"
                            />

                            <label htmlFor="icon" className="font-semibold mt-3 ml-2 mr-1">Icon</label>
                            <div className='inline-block'>
                                <IconPicker
                                    id="icon"
                                    value={newSocial.data.icon}
                                    // @ts-ignore
                                    onChange={icon => newSocial.setData('icon', icon)}
                                />
                            </div>

                            <button
                                onClick={postNewSocial}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-3 ml-2"
                            >
                                Add Social
                            </button>
                        </div>
                        {socials? <SocialListComponent socials={socials} /> : null}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
