import { Event } from "@/types/Event";
import PlaceholderBanner from "@/../img/banner.jpg";

export default function EventBlock(event: Event) {
    const start = new Date(event.starts_at);
    const end = new Date(event.ends_at);
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
        <a href={route("eventinfo", { id: event.id })}>
            <div
                className="w-full bg-white bg-opacity-5 my-6 rounded lg:h-56 hover:opacity-75"
                key={event.id}
            >
                <div className="w-full lg:w-3/6 lg:float-left inline-block lg:h-full sm:h-48 h-36 ">
                    <img
                        src={
                            event.image == "" ? PlaceholderBanner : event.image
                        }
                        alt={event.name}
                        className="h-full w-full object-cover rounded-t lg:rounded-s"
                    />
                </div>
                <div className="w-full lg:w-3/6 lg:float-right p-5 lg:h-full text-ellipsis text-wrap">
                    <h2 className="text-2xl font-bold text-white">
                        {event.name}
                    </h2>
                    <h3 className="text-xs font-semibold py-1">
                        {formattedStart} at {startTime}
                        &nbsp;-&nbsp;
                        {formattedEnd} at {endTime}
                    </h3>
                    <p className="text-white hover:text-white whitespace-normal ellipsis-multiline">
                        {event.description}
                    </p>
                </div>
            </div>
        </a>
    );
}
