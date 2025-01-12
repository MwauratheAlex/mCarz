'use client'
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import scrollDownSvg from "@/../public/Scrolldown.svg"
import gwagonImg from "@/../public/hero_gwagon.svg"

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
                    <HeroDropDown text="Explore Vehicles" active />
                    <HeroDropDown text="Buy a Bike" />
                    <HeroButton text="Sell Your Car" />
                </div>

                <button onClick={e => scrollFunc(e)} className="w-full scroll-smooth flex flex-col items-center gap-2 py-4 mt-2 z-[100] ">
                    <Image src={scrollDownSvg} alt="scroll down image"
                        className="md:w-32 w-28" />
                    <ChevronDown />
                </button>

                <div className="z-50">
                    <HeroImage />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-[80%]
                bg-gray-500/10"></div>
            <div className="absolute bottom-[24%] z-0">
                <FadedText />
            </div>

        </div >
    );
}

function HeroButton(props: { text: string }) {
    return (
        <button className={cn(
            "daisy-btn daisy-btn-outline daisy-btn-md rounded-none flex-grow  text-base hover:bg-white hover:text-black",
        )}>
            {props.text}
        </button>
    );
}

function HeroDropDown(props: { text: string, active?: boolean }) {
    return (
        <div className="daisy-dropdown flex-grow border relative">
            <div tabIndex={0} role="button" className={cn(
                "daisy-btn daisy-btn-outline daisy-btn-md text-base rounded-none w-full",
                props.active ? "daisy-btn-active hover:bg-black hover:text-white" : "hover:bg-white hover:text-black"
            )}>
                <div className="flex justify-center  items-center">
                    <span >
                        {props.text}
                    </span>
                    <ChevronDown className="font-normal w-4 absolute right-4" />
                </div>
            </div>
            <ul tabIndex={0} className="daisy-dropdown-content daisy-menu bg-base-100 rounded-box z-[1] p-2 w-full shadow">
                <li><a>Available in Kenya</a></li>
                <li><a>Direct Import/International</a></li>
            </ul>
        </div>

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
