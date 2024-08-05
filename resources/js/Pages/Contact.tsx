import SiteLayout from "@/Layouts/SiteLayout";
import { ContactProps } from "@/types/props/ContactProps";
import PlaceholderBanner from "@/../img/placeholder-banner.jpg";
import { Head } from "@inertiajs/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from "@/../img/logo.png";

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
                    borderColor: "#6DC952",
                }}
            >
                {/* do somnething fancy with the text */}
                <img src={Logo} alt="Tanoshima" className="h-full xl:h-5/6"/>
            </div>
            {/* list every social from props.socials */}
            <div className="w-full text-center">
                <h1 className="text-5xl text-white font-bold pb-4">
                    Contact
                </h1>
                <div className="inline-block xl:w-2/5 sm:w-3/5 w-full text-left">
                    <div className="w-full bg-white bg-opacity-5 rounded-t p-4">
                        {/* block of text about how to contact us */}
                        You can contact us either by mailing to <a href={"mailto:"} className="text-blue-900 hover:text-opacity-50">our@mail.here</a> or by following us on our socials:
                        {props.socials?.map((social) => (
                            <>
                                <a
                                    href={social.url}
                                    className="block text-l font-bold p-1 hover:opacity-60"
                                >
                                    {/* @ts-ignore*/ }
                                    <FontAwesomeIcon icon={["fab", social.icon]} className="mr-2 w-5"/>
                                    {social.name}
                                </a>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
