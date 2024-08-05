import React from 'react';

export default function MapsEmbedComponent({location} : {location: string})
{
    return (
        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
            <div
                id="google-maps-display"
                style={{ height: "100%", width: "100%", maxWidth: "100%" }}
            >
                <iframe
                style={{ height: "100%", width: "100%", border: 0 }}
                src={"https://www.google.com/maps/embed/v1/place?q="+encodeURI(location)+"&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}
                />
            </div>
            {/* <style
                dangerouslySetInnerHTML={{
                __html:
                    "#google-maps-display .text-marker{}.map-generator{max-width: 100%; max-height: 100%; background: none;"
                }}
            /> */}
        </div>

    );
};
