'use client'

import Image from "next/image";
import logoImg from "@/../public/logo.svg"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageLoadingStore } from "@/providers/LoadingStoreProvider";

export function Header() {
    const { isPageLoading } = usePageLoadingStore(state => state)
    return (
        <header className="bg-black/0 backdrop-blur-lg px-4 sticky
            w-full top-0 z-[999]">
            <div className="flex justify-between items-center shadow-black">
                <Link href="/" className="z-[99999]">
                    <Logo />
                </ Link>

                <div className="flex gap-4">
                    <NavContent className="hidden md:flex md:gap-2 lg:gap-4" />
                    <MobileNav />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-[100%]
                bg-gray-500/0 -z-50"></div>
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
                daisy-swap-rotate z-[99999]"
            >
                <input type="checkbox" onChange={handleToggle} checked={isOpen} />
                <IoIosMenu size={30} className="daisy-swap-off" />
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
    const { setIsPageLoading } = usePageLoadingStore(state => state)
    useEffect(() => setIsPageLoading(false), [pathname, setIsPageLoading]);

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
                    onClick={(() => {
                        setIsPageLoading(true);
                        closeMobileNav();
                    })}
                    className={cn(
                        "daisy-btn daisy-btn-ghost rounded-none",
                        "hover:bg-white/0 font-normal hover:underline",
                        "underline-offset-8 w-full md:w-max py-8 md:py-2",
                        "md:border-none border border-gray-200",
                        { "font-semibold underline": pathname.indexOf(link.url) !== -1 }
                    )}
                >
                    {link.title}
                </Link>
            ))}
        </ul>
    );
}

function Logo() {
    return (
        <div className="text-center">
            <Image src={logoImg} priority alt="logo image" className="w-20" />
            <div className="text-sm font-mono tracking-wider font-semibold">
                <span className="text-green-600 text-base">m</span>Carz
            </div>
        </div>
    );
}

function ProgressBar() {
    return (
        <div className="w-full absolute bottom-0 left-0">
            <div className="h-1.5 w-full bg-black/0 overflow-hidden">
                <div className="animate-progress w-full h-full bg-gradient-to-r 
                    from-transparent via-blue-600/20 to-transparent origin-left-right"></div>
            </div>
        </div>
    );
}
