import SiteLayout from "@/Layouts/SiteLayout";
import { EventInfoProps } from "@/types/props/EventInfoProps";
import PlaceholderBanner from "@/../img/siteBanner.jpg";
import TicketTailerEmbedder from "@/Components/TicketTailerEmbedder";
import MapsEmbedComponent from "@/Components/MapsEmbedComponent";
import Logo from "@/../img/placeholderLogo.png";
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

  const startTimeString = new Date(props.event.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const startDateString = new Date(props.event.starts_at).toLocaleDateString([], {});
    const endTimeString = new Date(props.event.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    const endDateString = new Date(props.event.ends_at).toLocaleDateString([], {});

    const start = new Date(props.event.starts_at);
    const end = new Date(props.event.ends_at);
    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'});
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'});

    const yyyy = start.getFullYear();
    let mm : any = start.getMonth() + 1; // Months start at 0!
    let dd : any = start.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedStart = dd + '-' + mm + '-' + yyyy;

    const yyyyEnd = end.getFullYear();
    let mmEnd : any = end.getMonth() + 1; // Months start at 0!
    let ddEnd : any = end.getDate();

    if (ddEnd < 10) ddEnd = '0' + ddEnd;
    if (mmEnd < 10) mmEnd = '0' + mmEnd;
    const formattedEnd = ddEnd + '-' + mmEnd + '-' + yyyyEnd;

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
                    borderColor: import.meta.env.VITE_BASE_COLOR,
                }}
            >
                <img src={Logo} alt="Logo" className="h-full xl:h-5/6"/>
            </div>

            {/* show event info, wider box, nicer box, use all properties */}
            <div className="w-full text-center pb-4">
                <h1 className="text-5xl text-white font-bold pb-6">
                    {props.event.name}<br/>
                    {props.admin && <span className="text-red-600">(HIDDEN PREVIEW)</span>}
                </h1>
                <div className="inline-block xl:w-2/5 sm:w-3/5 w-full text-left">
                    <div className="w-full bg-white bg-opacity-5 mt-2 rounded-t">
                        {/* two columns, image left, info right */}
                        <div className="p-5 pb-0 h-full w-full">
                            <img
                                src={props.event.image}
                                alt={props.event.name}
                                className="w-full max-h-96 object-cover rounded my-2"
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
                                    {formattedStart} {startTime}
                                </span>
                            </p>
                            <p className="text-l">
                                End:&nbsp;
                                <span className="text-white font-normal">
                                    {formattedEnd} {endTime}
                                </span>
                            </p>
                            <div className="py-5 pt-2">
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
                            </div>
                            <div className="w-full text-center h-64">
                                <div className="w-full h-full inline-block">
                                    <MapsEmbedComponent location={props.event.location}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white bg-opacity-5 p-4 rounded-b">
                    {
                        eventHappened?
                        <>
                            <p className="text-xl pl-2 font-semibold text-red-600">
                                This event already happened! It is no longer possible to buy tickets.
                            </p>
                        </> :
                        isValidUrl(props.event.ticket_url) ?
                            <TicketTailerEmbedder link={props.event.ticket_url}/>
                        :
                        <p className="text-xl pl-2 font-semibold text-red-600">
                            Tickets are not yet available for this event. Please check again later!
                        </p>
                    }
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
