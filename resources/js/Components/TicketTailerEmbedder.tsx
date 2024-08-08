import { useEffect, useRef, useState } from "react";

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

    const ref = useRef<HTMLDivElement>(null);
    const [loadedState, setLoadedState]= useState(false);

    useEffect(() => {
        if(ref.current && !loadedState)
        {
            setLoadedState(true);
            let style = document.createElement('style');
            style.innerHTML = `
                iframe {
                    width: 100% !important;
                    max-width: 100% !important;
                }
            `;
            document.head.appendChild(style)

            const script = document.createElement('script');
            script.src = "https://cdn.tickettailor.com/js/widgets/min/widget.js";
            script.async = true;
            script.setAttribute("data-url", link);
            script.setAttribute("data-type", "inline");
            script.setAttribute("data-inline-minimal", "true");
            script.setAttribute("data-inline-show-logo", "false");
            script.setAttribute("data-inline-bg-fill", "true");
            script.setAttribute("data-inline-inherit-ref-from-url-param", "");
            script.setAttribute("data-inline-ref", "website_widget");
            ref.current.appendChild(script);
        }
    }, [loadedState, ref])

    return (
        <>
            {/* iframe for ticketing site, fills width horizontally */}
            <div
                className="text-center w-full"
            >
                {/* <iframe
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
                /> */}
                <div className="opacity-80">
                    <div className="tt-widget" ref={ref}>
                        <div className="tt-widget-fallback">
                            <a href={link} target="_blank" rel="noreferrer">
                                Buy tickets
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
