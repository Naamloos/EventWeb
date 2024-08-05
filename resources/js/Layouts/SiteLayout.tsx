import { PropsWithChildren } from "react";

export default function SiteLayout({children} : PropsWithChildren)
{
    return (
        <div
            className="w-full min-h-screen"
            style={{
                backgroundColor: "#0D0D0D",
                color: "#f0f0f0"
            }}
        >
            <header className="w-full p-2 text-center">
                <nav className="inline-block">
                    <a
                        href={route('index')}
                        className="hover:opacity-50 px-2"
                    >
                        Home
                    </a>
                    <a
                        href={route('events')}
                        className="hover:opacity-50 px-2"
                    >
                        Events
                    </a>
                    <a
                        href={route('contact')}
                        className="hover:opacity-50 px-2"
                    >
                        Contact
                    </a>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer className="w-full p-6 text-center text-sm">
                <p>
                    <a
                        href={route('dashboard')}
                        className="text-white cursor-default hover:opacity-100 hover:text-white"
                    >
                        &copy;&nbsp;
                    </a>
                    2024 Tanoshima Raves - Site by <a className="text-blue-900 hover:text-opacity-50" href="https://naamloos.dev/">Ryan</a>
                </p>
            </footer>
        </div>
    );
}
