import { Event } from "@/types/Event";
import PlaceholderBanner from "@/../img/banner.jpg";

export default function EventBlock(event: Event) {
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
                        {new Date(event.starts_at).toLocaleDateString()} (
                        {new Date(event.starts_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        ) - {new Date(event.ends_at).toLocaleDateString()} (
                        {new Date(event.ends_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        )
                    </h3>
                    <p className="text-white hover:text-white whitespace-normal ellipsis-multiline">
                        {event.description}
                    </p>
                </div>
            </div>
        </a>
    );
}
