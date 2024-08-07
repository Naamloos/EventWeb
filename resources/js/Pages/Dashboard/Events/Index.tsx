import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { EventIndexProps } from '@/types/props/EventIndexProps';
import EventListComponent from '@/Components/EventListComponent';

export default function Index({ events, auth }: EventIndexProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link href={route('events.new')} method='put' className="text-gray-900">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    New Empty Event
                                </button>
                            </Link>
                            <EventListComponent events={events} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
