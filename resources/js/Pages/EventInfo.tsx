import SiteLayout from "@/Layouts/SiteLayout";
import { EventInfoProps } from "@/types/props/EventInfoProps";
import PlaceholderBanner from "@/../img/banner.jpg";
import TicketTailerEmbedder from "@/Components/TicketTailerEmbedder";
import MapsEmbedComponent from "@/Components/MapsEmbedComponent";
import Logo from "@/../img/ravelogo.png";
import { Head } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";

export default function Events(props : EventInfoProps) {

    const isValidUrl = (url : string) : boolean => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(url);
  }

  const eventHappened = new Date(props.event.ends_at).getTime() < new Date().getTime();

    return (
        <SiteLayout>
            <Head title={props.event.name}/>
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
                <img src={Logo} alt="Tanoshima" className="h-full xl:h-5/6"/>
            </div>

            {/* show event info, wider box, nicer box, use all properties */}
            <div className="w-full text-center">
                <h1 className="text-5xl text-white font-bold pb-6">
                    {props.event.name}<br/>
                    {props.admin && <span className="text-red-600">(HIDDEN PREVIEW)</span>}
                </h1>
                <div className="inline-block xl:w-2/5 sm:w-3/5 w-full text-left">
                    <div className="w-full bg-white bg-opacity-5 mt-2 rounded-t">
                        {/* two columns, image left, info right */}
                        <div className="p-5 h-full w-full">
                            <img
                                src={props.event.image}
                                alt={props.event.name}
                                className="h-72 w-full object-cover rounded my-2"
                                onError={(e) => { e.currentTarget.src = PlaceholderBanner }}
                            />
                            <h2 className="text-l font-semibold">
                                Location: {props.event.location} (<a
                                    href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(props.event.location)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-300 hover:text-opacity-50"
                                >
                                    Google Maps
                                </a>)
                            </h2>
                            <p className="text-l">
                                Start:&nbsp;
                                <span className="text-white font-normal">
                                    {new Date(props.event.starts_at).toLocaleDateString()} ({new Date(props.event.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                                </span>
                            </p>
                            <p className="text-l">
                                End:&nbsp;
                                <span className="text-white font-normal">
                                    {new Date(props.event.ends_at).toLocaleDateString()} ({new Date(props.event.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                                </span>
                            </p>
                            <p className="py-5">
                                <MDEditor.Markdown
                                    source={props.event.about}
                                    style={{
                                        textAlign: 'left',
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        font: 'inherit',
                                    }}
                                    wrapperElement={{
                                        "data-color-mode": "dark"
                                    }}
                                />
                            </p>
                            <div className="w-full text-center h-64">
                                <div className="w-full h-full p-2 my-2 inline-block">
                                    <MapsEmbedComponent location={props.event.location}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        eventHappened? <>
                            <div className="w-full bg-white bg-opacity-5 rounded-b p-4 mb-4">
                                <p className="text-xl pl-2 font-semibold text-red-600">
                                    This event already happened! It is no longer possible to buy tickets.
                                </p>
                            </div>
                        </> :
                        isValidUrl(props.event.ticket_url) ? <TicketTailerEmbedder link={props.event.ticket_url}/>
                        : <div className="w-full bg-white bg-opacity-5 rounded-b p-4">
                            <p className="text-xl pl-2 font-semibold text-red-600">
                                Tickets are not yet available for this event. Please check again later!
                            </p>
                        </div>
                    }
                </div>
            </div>


        </SiteLayout>
    );
}
