import SiteLayout from "@/Layouts/SiteLayout";
import { EventsProps } from "@/types/props/EventsProps";
import PlaceholderBanner from "@/../img/placeholderBanner.jpg";
import { Head } from "@inertiajs/react";
import Logo from "@/../img/placeholderLogo.png";
import EventBlock from "@/Components/EventBlock";

export default function Events(props : EventsProps) {

    const sortedEvents = props.events?.sort((b, a) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());

    const pastEvents = sortedEvents?.filter((event) => new Date(event.ends_at).getTime() < new Date().getTime());
    const futureEvents = sortedEvents?.filter((event) => new Date(event.ends_at).getTime() > new Date().getTime());

    const hasPastEvents = (pastEvents?.length ?? 0) > 0;
    const hasUpcomingEvents = (futureEvents?.length ?? 0) > 0;
    const hasNoEvents = !hasPastEvents && !hasUpcomingEvents;

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
                    borderColor: import.meta.env.VITE_BASE_COLOR,
                }}
            >
                {/* do somnething fancy with the text */}
                <img src={Logo} alt="Logo" className="h-full xl:h-5/6"/>
            </div>

            <div className="text-center py-3">
                <h1 className="text-5xl text-white font-bold pb-2">
                    Events
                </h1>
                <div className="inline-block lg:max-w-5xl w-full text-left px-6">
                    {hasNoEvents && <div className="w-full bg-white bg-opacity-5 rounded p-4 mb-2">
                        <p>
                            There are no events to display.
                        </p>
                    </div>}

                    {hasUpcomingEvents && <>
                        <h2 className="text-3xl text-white font-bold pb-2 pt-3">
                            Upcoming Events
                        </h2>
                        {futureEvents?.map((event) => (
                            <EventBlock {...event} />
                        ))}
                    </>}
                    {hasPastEvents && <>
                        <h2 className="text-3xl text-white font-bold pb-2 pt-3">
                            Past Events
                        </h2>
                        {pastEvents?.map((event) => (
                            <EventBlock {...event} />
                        ))}
                    </>}
                </div>
            </div>
        </SiteLayout>
    );
}
