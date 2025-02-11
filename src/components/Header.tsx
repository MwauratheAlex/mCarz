'use client'

import Image from "next/image";
import logoImg from "@/../public/logo.svg"

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageLoadingStore } from "@/providers/LoadingStoreProvider";

export function Header() {
    const { isPageLoading } = usePageLoadingStore(state => state)
    return (
        <header className="bg-white/5 backdrop-blur-lg px-4 sticky
            z-[999] w-full top-0 shadow-lg shadow-black/5">
            <div className="flex justify-between items-center shadow-black">
                <Link href="/" className="z-[999]">
                    <Logo />
                </ Link>

                <div className="flex gap-4">
                    <NavContent className="hidden md:flex md:gap-2 lg:gap-4" />
                    <ThemeChangeBtn />
                    <MobileNav />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-[100%]
                bg-gray-500/10 -z-50"></div>
            {isPageLoading && <ProgressBar />}
        </header>
    );
}

function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="md:hidden" >
            <label
                className="daisy-btn daisy-btn-circle daisy-swap 
                daisy-swap-rotate z-[999]"
            >
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onChange={handleToggle} checked={isOpen} />

                {/* hamburger icon */}
                <IoIosMenu size={30} className="daisy-swap-off" />

                {/* close icon */}
                <IoClose className="daisy-swap-on" size={30} />
            </label>
            {isOpen && (
                <div className={cn(
                    "absolute top-0 w-full left-0 shadow-2xl shadow-black/10",
                    "transition-all ease-in-out",
                    "animate-in slide-in-from-top fade-in-100 duration-500"
                )}>
                    <NavContent
                        className="text-center bg-gray-50 
                        flex flex-col pt-28"
                        setNavOpen={setIsOpen}
                    />
                </div>
            )}
        </div>
    );
}

function NavContent({ className, setNavOpen }: {
    className: string,
    setNavOpen?: Dispatch<SetStateAction<boolean>>
}) {
    const pathname = usePathname()

    const navLinks = [
        { title: "Vehicles", url: "/vehicles" },
        { title: "Sell Your Car", url: "/sell-car" },
        { title: "About", url: "/about" },
        { title: "Contact", url: "/contact" },
        { title: "FAQ", url: "/faq" },
    ]

    const closeMobileNav = () => {
        if (setNavOpen) {
            setNavOpen(false);
        }
    }

    return (
        <ul className={className}>
            {navLinks.map((link, idx) => (
                <Link
                    href={link.url}
                    key={`navlink-${idx}`}
                    onClick={closeMobileNav}
                    className={cn(
                        "daisy-btn daisy-btn-ghost rounded-none",
                        "hover:bg-white/0 font-normal hover:underline",
                        "underline-offset-8 w-full md:w-max py-8 md:py-2",
                        "md:border-none border border-gray-200",
                        pathname === link.url && "font-semibold underline"
                    )}>
                    {link.title}
                </Link>
            ))}
        </ul>
    );
}

function Logo() {
    return (
        <div className="text-center z-[999]">
            <Image src={logoImg} priority alt="logo image" className="w-20" />
            <div className="text-sm font-mono tracking-wider font-semibold">
                <span className="text-green-600 text-base">m</span>Carz
            </div>
        </div>
    );
}

export function NavDropDown(props: { text: string }) {
    return (
        <div className="daisy-dropdown">
            <div tabIndex={0} role="button" className="daisy-btn daisy-btn-ghost 
            daisy-btn-sm rounded-none hover:bg-white/0 hover:underline
            underline-offset-8">
                <div className="flex gap-1 items-center font-normal">
                    <span>
                        {props.text}
                    </span>
                    <ChevronDown className="font-normal w-4" />
                </div>
            </div>
            <ul tabIndex={0} className="daisy-dropdown-content daisy-menu bg-base-100  z-[1] p-2 w-max shadow rounded-md">
                <li><a>All {props.text}</a></li>
                <li><a>Available in Kenya</a></li>
                <li><a>Direct Import/International</a></li>
            </ul>
        </div>

    );
}

function ThemeChangeBtn() {
    return (
        <label className="daisy-swap z-[999] daisy-swap-rotate daisy-btn-square">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            {/* sun icon */}
            <svg
                className="daisy-swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
                className="daisy-swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
        </label>
    );
}

function ProgressBar() {
    return (
        <div className="w-full absolute bottom-0 left-0">
            <div className="h-1.5 w-full bg-black/0 overflow-hidden">
                <div className="animate-progress w-full h-full bg-gradient-to-r 
                    from-transparent via-purple-600 to-transparent origin-left-right"></div>
            </div>
        </div>
    );
}
