import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { SocialsProps } from '@/types/props/SocialsProps';
import SocialListComponent from '@/Components/SocialListComponent';
import { InviteProps } from '@/types/props/InviteProps';
import { Button } from '@headlessui/react';

export default function Invites({ auth, newInvite }: InviteProps) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg text-center p-12">
                        {
                            newInvite?
                            <>
                                <p>Your new Invite:</p>
                                <p className='text-3xl'>{newInvite}</p>
                            </> :
                            <>
                                <Button onClick={() => {
                                    router.post(route('invites.new'))
                                }} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                                    New Invite
                                </Button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
