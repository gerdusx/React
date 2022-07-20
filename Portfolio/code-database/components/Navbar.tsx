import Link from "next/link";
import React from "react";

export const Navbar: React.FunctionComponent = () => {

    const [activeItem, setActiveItem] = React.useState<string>("home");

    return (
        <>
            <nav className="bg-gray-100">
                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-10">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <Link href="/">
                                        <a className="text-gray-800 hover:bg-gray-300 px-3 py-2 text-sm font-medium">Dashboard</a>
                                    </Link>
                                    <Link href="/projects">
                                        <a className="text-gray-800 hover:bg-gray-300 px-3 py-2 text-sm font-medium">Projects</a>
                                    </Link>
                                    <Link href="/search">
                                        <a className="text-gray-800 hover:bg-gray-300 px-3 py-2 text-sm font-medium">Search</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}