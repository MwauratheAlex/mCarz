
import Image from "next/image";
import logoImg from "@/../public/logo.svg"
import { FaMoon } from "react-icons/fa";

import { ChevronDown } from "lucide-react";

export function Header() {
    return (
        <header className="bg-white/75 backdrop-blur-lg px-4 fixed z-[999] w-full">
            <div className="flex justify-between items-center shadow-black">
                <Logo />
                <ul className="flex gap-4">
                    <li><NavDropDown text="Vehicles" /></li>
                    <li><NavDropDown text="Bikes" /></li>
                    <li><NavLink text="Sell Your Car" /></li>
                    <li><NavLink text="About" /></li>
                    <li><NavLink text="Contact" /></li>
                    <li><NavLink text="FAQ" /></li>
                    <li><ThemeChangeBtn /></li>
                </ul>
            </div>
        </header>
    );
}

function Logo() {
    return (
        <div className="text-center">
            <Image src={logoImg} alt="logo image" className="w-20" />
            <div className="text-sm font-mono tracking-wider font-semibold">
                <span className="text-green-600 text-base">m</span>Carz
            </div>
        </div>
    );
}

function NavDropDown(props: { text: string }) {
    return (
        <div className="daisy-dropdown">
            <div tabIndex={0} role="button" className="daisy-btn daisy-btn-ghost daisy-btn-sm">
                <div className="flex gap-1 items-center font-normal">
                    <span>
                        {props.text}
                    </span>
                    <ChevronDown className="font-normal w-4" />
                </div>
            </div>
            <ul tabIndex={0} className="daisy-dropdown-content daisy-menu bg-base-100 rounded-box z-[1] p-2 w-max shadow">
                <li><a>All {props.text}</a></li>
                <li><a>Available in Kenya</a></li>
                <li><a>Direct Import/International</a></li>
            </ul>
        </div>

    );
}


function NavLink(props: { text: string }) {
    return (
        <a className="daisy-btn daisy-btn-ghost daisy-btn-sm font-normal">{props.text}</a>
    )
}


function ThemeChangeBtn() {
    return (
        <button className="daisy-btn daisy-btn-sm daisy-btn-square daisy-btn-ghost">
            <FaMoon />
        </button>
    );
}
