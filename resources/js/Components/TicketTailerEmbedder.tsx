import { useEffect, useRef } from "react";

export default function TicketTailerEmbedder({link} : {link?: string})
{
    if(link == undefined)
    {
        return (
            <>
                {/* iframe for ticketing site, fills width horizontally */}
                <div
                    className="w-full text-center mb-6"
                >
                    <p>
                        No tickets available yet.
                    </p>
                </div>
            </>
        );
    }

    useEffect(() => {

    });

    return (
        <>
            {/* iframe for ticketing site, fills width horizontally */}
            <div
                className="w-full text-center"
            >
                <iframe
                    src={link}
                    className="w-full pb-5 border-none"
                    id="tickettailor-iframe"
                    style={{
                        height: "100vh",
                        width: "100%",
                        border: "none",
                        overflow: "hidden",
                        display: "block",
                    }}
                />
            </div>
        </>
    );
}
