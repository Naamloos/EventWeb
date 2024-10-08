import SiteLayout from "@/Layouts/SiteLayout";
import { ContactProps } from "@/types/props/ContactProps";
import PlaceholderBanner from "@/../img/placeholderBanner.jpg";
import { Head } from "@inertiajs/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from "@/../img/placeholderLogo.png";

export default function Events(props : ContactProps) {
    library.add(fab);
    return (
        <SiteLayout>
            <Head title="Contact"/>
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
                {/* do somnething fancy with the text */}
                <img src={Logo} alt="Logo" className="h-full xl:h-5/6"/>
            </div>
            {/* list every social from props.socials */}
            <div className="w-full text-center">
                <h1 className="text-5xl text-white font-bold pb-4">
                    Contact
                </h1>
                <div className="inline-block xl:w-2/5 sm:w-3/5 w-full text-left">
                    <div className="w-full bg-white bg-opacity-5 rounded p-4 mb-2">
                        {/* block of text about how to contact us */}
                        You can easily reach out to us by following our social media accounts. Stay connected with our latest updates, events, and announcements. We look forward to connecting with you!
                        {props.socials?.map((social) => (
                            <>
                                <a
                                    href={social.url}
                                    className="block text-l font-bold p-1 hover:opacity-60 mt-1"
                                >
                                    {/* @ts-ignore */}
                                    <FontAwesomeIcon icon={social.icon} className="mr-2 w-5 inline-block"/>
                                    <span className="align-top inline-block">
                                        {social.name}
                                    </span>
                                </a>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
