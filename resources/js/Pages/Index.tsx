import SiteLayout from "@/Layouts/SiteLayout";
import { IndexProps } from "@/types/props/IndexProps";
import PlaceholderBanner from "@/../img/placeholder-banner.jpg";
import InstagramComponent from "@/Components/InstagramComponent";
import { Head } from "@inertiajs/react";
import Logo from "@/../img/logo.png";

export default function Index(props : IndexProps) {
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
                    borderColor: "#6DC952",
                    backgroundBlendMode: "darken",
                    backgroundColor: "#AAA",
                }}
            >
                {/* <h1 className="text-5xl text-white font-bold">
                    Tanoshima
                </h1> */}
                <img src={Logo} alt="Tanoshima" className="h-full xl:h-5/6"/>
            </div>

            {/* pretty info components */}
            <div className="w-full flex flex-wrap justify-center mb-6">
                <div className="w-full md:w-1/4 p-4">
                    <h2 className="text-center text-2xl font-bold">
                        What is TanoRave?
                    </h2>
                    <p className="text-center">
                        Tanoshima is a community of anime lovers who come together to celebrate their love for anime through music and dance.
                    </p>
                </div>
                <div className="w-full md:w-1/4 p-4">
                    <h2 className="text-center text-2xl font-bold">
                        When is the next event?
                    </h2>
                    <p className="text-center">
                        Our next event is (automatically gather next event from back-end).
                        We hope to see you there!
                        Check out the <a href={route('events')}>events</a> page for more information.
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


            {/* Instagram feed */}
            <div className="w-full text-center md:mb-6 m:0">
                <div className="inline-block lg:w-2/4 sm:w-4/5 w-full">
                    <InstagramComponent username="tanorave" height={500}/>
                </div>
            </div>
        </SiteLayout>
    );
}
