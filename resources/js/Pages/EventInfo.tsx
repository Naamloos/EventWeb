import SiteLayout from "@/Layouts/SiteLayout";
import { EventInfoProps } from "@/types/props/EventInfoProps";
import PlaceholderBanner from "@/../img/placeholder-banner.jpg";
import TicketTailerEmbedder from "@/Components/TicketTailerEmbedder";
import MapsEmbedComponent from "@/Components/MapsEmbedComponent";

export default function Events(props : EventInfoProps) {
    return (
        <SiteLayout>
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
                <h1 className="text-5xl text-white font-bold">
                    {props.event.name}
                </h1>
            </div>

            {/* show event info, wider box, nicer box, use all properties */}
            <div className="w-full text-center">
                <div className="inline-block xl:w-2/5 sm:w-3/5 w-full text-left">
                    <div className="w-full bg-black bg-opacity-5 mt-2 rounded-t">
                        {/* two columns, image left, info right */}
                        <div className="p-5 h-full w-full">
                            <img
                                src={props.event.image == ''? PlaceholderBanner : props.event.image}
                                alt={props.event.name}
                                className="h-52 w-full object-cover rounded my-2"
                            />
                            <h2 className="text-l font-semibold">
                                Location: {props.event.location} (<a
                                    href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(props.event.location)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-900 hover:text-opacity-50"
                                >
                                    Google Maps
                                </a>)
                            </h2>
                            <h3 className="text-l font-semibold">
                                Start: {new Date(props.event.starts_at).toLocaleDateString()} ({new Date(props.event.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                            </h3>
                            <h3 className="text-l font-semibold">
                                End: {new Date(props.event.ends_at).toLocaleDateString()} ({new Date(props.event.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                            </h3>
                            <p className="whitespace-pre-wrap">
                                {props.event.about}
                            </p>
                            <div className="w-full text-center h-64">
                                <div className="w-full h-full p-2 my-2 inline-block">
                                    <MapsEmbedComponent location={props.event.location}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TicketTailerEmbedder link={props.event.ticket_url}/>
                </div>
            </div>


        </SiteLayout>
    );
}
