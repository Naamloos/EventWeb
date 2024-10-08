import SiteLayout from "@/Layouts/SiteLayout";
import { IndexProps } from "@/types/props/IndexProps";
import PlaceholderBanner from "@/../img/placeholderBanner.jpg";
import InstagramComponent from "@/Components/InstagramComponent";
import { Head } from "@inertiajs/react";
import Logo from "@/../img/placeholderLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

export default function Index(props : IndexProps) {
    library.add(fab);
    return (
        <SiteLayout>
            <Head title="Welcome"/>
            {/* big banner image with text centered vertically and horizontally, fullwidth */}
            <div
                className="w-full xl:h-96 flex justify-center items-center h-56 border-t-2 border-b-2 shadow-xl mb-6"
                style={{
                    backgroundImage: `url(${PlaceholderBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderColor: import.meta.env.VITE_BASE_COLOR
                }}
            >
                <img src={Logo} alt="Logo" className="h-full xl:h-5/6"/>
            </div>

            {/* pretty info components */}
            <div className="w-full flex flex-wrap justify-center mb-6">
                <div className="w-full md:w-1/4 p-4">
                    <h2 className="text-center text-2xl font-bold">
                        What is Eventweb?
                    </h2>
                    <p className="text-center">
                    Eventweb is a web app for hosting information related to events. We provide a platform for event organizers to create and manage events, and for attendees to find and join events.
                    </p>
                </div>
                <div className="w-full md:w-1/4 p-4">
                    <h2 className="text-center text-2xl font-bold">
                        When is the next event?
                    </h2>
                    <p className="text-center">
                        We can't wait to see you at our next event!
                        Visit our <a href={route('events')}>events</a> page to find out when it's happening.
                    </p>
                </div>
                <div className="full md:w-1/4 p-4">
                    <h2 className="text-center text-2xl font-bold">
                        How can I join?
                    </h2>
                    <p className="text-center">
                        You can join our community by signing up via the events page. Follow our socials to be notified of upcoming events.
                    </p>
                </div>
            </div>

                {/* Social media links */}
                <div className="w-full flex flex-wrap justify-center mb-6 text-4xl">
                    <div className="flex flex-wrap justify-center">
                        {props.socials.map((social) => (
                            <a href={social.url} target="_blank" rel="noreferrer" className="p-2">
                                {/* @ts-ignore */}
                                <FontAwesomeIcon icon={social.icon} className="inline-block"/>
                            </a>
                        ))}
                    </div>
                </div>

            {/* Instagram feed */}
            <div className="w-full text-center md:mb-6 m:0">
                <div className="inline-block lg:w-2/4 sm:w-4/5 w-full">
                    {props.instagramPhotos?.map((photo) => (
                        <a href={photo.url} target="_blank" rel="noreferrer">
                            <img src={photo.image} alt="" className="inline-block p-1"
                            style={{
                                height: "200px",
                                width: "200px",
                                // make image fit, not stretch
                                objectFit: "cover",
                            }}/>
                        </a>
                    ))}
                </div>
            </div>
        </SiteLayout>
    );
}
