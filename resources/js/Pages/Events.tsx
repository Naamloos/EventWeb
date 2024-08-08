import SiteLayout from "@/Layouts/SiteLayout";
import { EventsProps } from "@/types/props/EventsProps";
import PlaceholderBanner from "@/../img/banner.jpg";
import { Head } from "@inertiajs/react";
import Logo from "@/../img/ravelogo.png";
import EventBlock from "@/Components/EventBlock";

export default function Events(props : EventsProps) {

    const sortedEvents = props.events?.sort((b, a) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());

    const pastEvents = sortedEvents?.filter((event) => new Date(event.ends_at).getTime() < new Date().getTime());
    const futureEvents = sortedEvents?.filter((event) => new Date(event.ends_at).getTime() > new Date().getTime());

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
                <div className="inline-block lg:max-w-5xl w-full text-left px-6">
                    {futureEvents?.map((event) => (
                        <EventBlock {...event} />
                    ))}
                    <h2 className="text-3xl text-white font-bold pb-2 pt-3">
                        Past Events
                    </h2>
                    {pastEvents?.map((event) => (
                        <EventBlock {...event} />
                    ))}
                </div>
            </div>
        </SiteLayout>
    );
}
