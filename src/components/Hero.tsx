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
        <div className="flex flex-col py-[22vh] items-center relative bg-gray-500/10 h-[calc(85vh)] z-0">
            <div className="text-center flex flex-col w-2/4 mx-auto">
                <div className="text-5xl font-serif py-4">
                    The <span className="text-green-600 font-semibold">only safe way</span> to<br /> buy a car in Kenya
                </div>
                <div className="flex gap-4 justify-center py-8">
                    <HeroDropDown text="Explore Vehicles" active />
                    <HeroDropDown text="Buy a Bike" />
                    <HeroButton text="Sell Your Car" />
                </div>
                <button onClick={e => scrollFunc(e)} className="w-full scroll-smooth flex flex-col items-center gap-2 py-4 ">
                    <Image src={scrollDownSvg} alt="scroll down image" className="w-32" />
                    <ChevronDown />
                </button>
            </div>
            <div className="absolute -bottom-[20vh] z-50">
                <HeroImage />
            </div>
            <div className="absolute bottom-0 z-0">
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
        <Image src={gwagonImg} alt="image of a gwagon car" />
    );
}

function FadedText() {
    return (
        <div className="text-9xl font-black tracking-widest text-gray-400/5">
            Only Safe way
        </div>
    );
}
