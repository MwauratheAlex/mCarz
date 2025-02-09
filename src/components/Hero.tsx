'use client'
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import scrollDownSvg from "@/../public/Scrolldown.svg"
import gwagonImg from "@/../public/hero_gwagon.svg"
import Link from "next/link";

export function Hero() {
    const scrollFunc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const search = document.getElementById("search");
        e.preventDefault();
        if (search) {
            search.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    return (
        <div className="flex flex-col overflow-x-clip items-center relative
            z-0 py-16">
            <div className="text-center flex flex-col w-4/5 md:w-3/4 lg:w-2/4 
            mx-auto justify-center">

                <div className="text-3xl md:text-5xl font-serif py-2 md:py-4">
                    The <span className="text-green-600 font-semibold">only safe way</span> to<br /> buy a car in Kenya
                </div>

                <div className="flex flex-col md:flex-row gap-4 
                justify-center py-4 md:py-8 z-[999]">
                    <HeroLink
                        link="/vehicles"
                        text="Explore Vehicles"
                    />
                    <HeroLink
                        link="/sell-car"
                        text="Sell Your Car"
                        outline
                    />
                </div>

                <button onClick={e => scrollFunc(e)}
                    className="w-full scroll-smooth flex flex-col items-center 
                    gap-2 py-4 mt-2 z-[100] ">
                    <Image src={scrollDownSvg}
                        alt="scroll down image"
                        className="md:w-32 w-28"
                    />
                    <ChevronDown className="animate-bounce " />
                </button>

                <div className="z-50">
                    <HeroImage />
                </div>
            </div>
            <div className="absolute -top-0 left-0 w-full h-[80%]
                bg-gray-500/10"></div>
            <div className="absolute bottom-[24%] z-0">
                <FadedText />
            </div>

        </div >
    );
}

function HeroLink({ text, link, outline }: {
    text: string, link: string, outline?: boolean,
}) {
    return (
        <Link
            href={link}
            className={cn(
                "daisy-btn daisy-btn-md rounded-none flex-grow  text-base",
                "daisy-btn-outline",
                { "hover:bg-white hover:text-black": outline },
                { "daisy-btn-active hover:bg-black hover:text-white": !outline }
            )}>
            {text}
        </Link>
    );
}

function HeroImage() {
    return (
        <Image src={gwagonImg} priority alt="image of a gwagon car" />
    );
}

function FadedText() {
    return (
        <div className="text-5xl md:text-9xl font-black tracking-widest
            text-gray-500/5 text-center">
            Only Safe way
        </div>
    );
}
