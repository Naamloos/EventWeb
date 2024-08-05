import SiteLayout from "@/Layouts/SiteLayout";
import { EventsProps } from "@/types/props/EventsProps";
import PlaceholderBanner from "@/../img/placeholder-banner.jpg";
import { Head } from "@inertiajs/react";
import Logo from "@/../img/logo.png";

export default function Events(props : EventsProps) {
    return (
        <SiteLayout>
            <Head title="Events"/>
            {/* banner, but small */}
            <div
                className="w-full flex justify-center items-center h-40 border-t-2 border-b-2 shadow-xl mb-6"
                style={{
                    backgroundImage: `url(${PlaceholderBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderColor: "#6DC952",
                }}
            >
                {/* do somnething fancy with the text */}
                <img src={Logo} alt="Tanoshima" className="h-full xl:h-5/6"/>
            </div>

            <div className="text-center py-3">
                <h1 className="text-5xl text-white font-bold pb-2">
                    Events
                </h1>
                <div className="inline-block xl:w-2/5 sm:w-3/5 w-full text-left px-6">
                    {props.events?.map((event) => (
                        <a href={route('eventinfo', {id: event.id})}>
                            <div className="w-full bg-white bg-opacity-5 my-2 rounded xl:h-40 h-52" key={event.id}>
                                <div className="w-2/6 float-left inline-block h-full">
                                    <img
                                        src={event.image == ''? PlaceholderBanner : event.image}
                                        alt={event.name}
                                        className="h-full w-full object-cover rounded-s"
                                    />
                                </div>
                                <div className="w-4/6 float-right p-5 h-full">
                                    <h2 className="text-2xl font-bold">
                                        {event.name}
                                    </h2>
                                    <h3 className="text-l font-semibold">
                                        {new Date(event.starts_at).toLocaleDateString()} ({new Date(event.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}) - {new Date(event.ends_at).toLocaleDateString()} ({new Date(event.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                                    </h3>
                                    <p>
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </SiteLayout>
    );
}
