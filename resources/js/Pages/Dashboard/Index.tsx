import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { DashboardProps } from '@/types/props/DashboardProps';
import NoteComponent from '@/Components/NoteComponent';

export default function Dashboard({ auth, notes }: DashboardProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {/* welcome text  */}
            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-3xl font-semibold text-black">Welcome, {auth.user.name}!</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* add button */}
                        <div className="text-gray-900">
                            <h2 className="text-xl font-semibold text-black inline-block pr-2 pb-1">Notes</h2>
                            <Link href={route('notes.new')} method='post' className="bg-blue-500 text-white rounded px-2 mt-1 inline-block">+</Link>
                            <p className="text-gray-500">Add notes to keep track of important information.<br/>⚠️ These notes are shared across all admins!</p>
                        </div>
                        {notes.map(note => <NoteComponent note={note} />)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
