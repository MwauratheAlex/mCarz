import Image from "next/image";
import logoImg from "@/../public/logo.svg"
import { MdOutgoingMail } from "react-icons/md";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function Footer() {
    return (
        <div>
            <footer className="daisy-footer bg-base-200 
            text-base-content py-10 px-5">
                <aside>
                    <div className="text-center">
                        <Image src={logoImg} alt="logo image" className="w-20" />
                        <div className="text-sm text-left font-mono tracking-wider font-semibold">
                            <div className="px-4 pt-2">
                                <span
                                    className="text-green-600 text-base"
                                >m</span>Carz<br />
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-4 py-2 text-left font-mono 
                        tracking-wider">
                        &copy;{new Date(Date.now()).getFullYear()} mCarz
                        All rights reserved.
                    </div>
                    <div className="text-sm px-4 py-2 text-left font-mono flex
                    gap-8">
                        <a className="daisy-btn daisy-btn-sm daisy-btn-circle">
                            <FaXTwitter size={18} />
                        </a>
                        <a className="daisy-btn daisy-btn-sm daisy-btn-circle">
                            <FaYoutube size={18} />
                        </a>
                        <a className="daisy-btn daisy-btn-sm daisy-btn-circle">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                    <div className="px-4 py-2 flex flex-col gap-2">
                        <p className="font-semibold">Stay upto date</p>
                        <div className="flex justify-center items-center gap-2">
                            <label className="rounded-none daisy-input 
                            daisy-input-sm flex 
                            items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow"
                                    placeholder="Email" />
                            </label>
                            <button className="daisy-btn daisy-btn-square 
                            daisy-btn-sm daisy-btn-outline rounded-none border-gray-400">
                                <MdOutgoingMail size={20} />
                            </button>
                        </div>
                    </div>
                </aside>
                <nav>
                    <h6 className="daisy-footer-title">Services</h6>
                    <a className="daisy-link daisy-link-hover">Buy a car</a>
                    <a className="daisy-link daisy-link-hover">Sell a car</a>
                    <a className="daisy-link daisy-link-hover">Marketing</a>
                </nav>
                <nav>
                    <h6 className="daisy-footer-title">Company</h6>
                    <a className="daisy-link daisy-link-hover">About us</a>
                    <a className="daisy-link daisy-link-hover">
                        Frequently Asked Questions
                    </a>
                    <a className="daisy-link daisy-link-hover">Contact</a>
                </nav>
                <nav>
                    <h6 className="daisy-footer-title">Legal</h6>
                    <a className="daisy-link daisy-link-hover">Terms of use</a>
                    <a className="daisy-link daisy-link-hover">Privacy policy</a>
                    <a className="daisy-link daisy-link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
}
