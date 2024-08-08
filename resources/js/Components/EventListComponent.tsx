import { Event } from "@/types/Event";
import PlaceholderImage from "../../img/placeholder-banner.jpg";
import { Link } from "@inertiajs/react";

export default function EventListComponent({events} : {events: Event[]}) {
    // sort events by start date
    const sortedEvents = events.sort((b, a) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());

    return (
      <ul role="list" className="divide-y divide-gray-100">
        {sortedEvents.map((event) => {
            let eventHappened = new Date(event.ends_at).getTime() < new Date().getTime();

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
          <li key={event.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={event.image}
                className="h-12 w-16 flex-none bg-gray-50"
                onError={(e) => { e.currentTarget.src = PlaceholderImage }}
                />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="text-xs opacity-50 pr-1">ID {event.id}</span>{event.name}&nbsp;
                    {eventHappened && <span className="text-red-600 ml-2 font-bold">(Event has ended)</span>}
                    {(!event.published) && <span className="text-yellow-600 ml-2 font-bold">(Hidden)</span>}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {event.published ?
                        <a href={route('eventinfo', {id: event.id})} className="text-sm font-semibold text-orange-600 hover:text-orange-900 pr-2">View on site</a>:
                        <a href={route('events.preview', {id: event.id})} className="text-sm font-semibold text-yellow-600 hover:text-yellow-900 pr-2">Preview Hidden</a>
                    }
                    <a href={route('events.edit', {id: event.id})} className="text-sm font-semibold text-indigo-600 hover:text-indigo-900 pr-2">Edit</a>
                    <Link href={route('events.destroy', {id: event.id})} method="delete" className="text-sm font-semibold text-red-600 hover:text-red-900 pr-2">Delete</Link>
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
                <p className="mt-1 text-xs leading-5 text-gray-500">
                    Start: {formattedStart} at {startTime}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                    End: {formattedEnd} at {endTime}
                </p>
            </div>
          </li>
        )})}
      </ul>
    )
  }
