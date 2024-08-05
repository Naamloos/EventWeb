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
    return (
        <>
            {/* iframe for ticketing site, fills width horizontally */}
            <div
                className="w-full text-center"
            >
                <iframe
                    src={link}
                    className="w-full pb-5 border-none opacity-80"
                    style={{
                        height: '70vh',
                    }}
                />
            </div>
        </>
    );
}
