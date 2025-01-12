import Image from "next/image";
import { IconType } from "react-icons";
import { IoBagCheckOutline, IoCarSport, IoMailOutline } from "react-icons/io5";
import logoImg from "@/../public/logo.svg"

export function StepsToOwn() {
    const steps = [
        { heading: "one", subheading: "Select Vehicle", icon: IoCarSport },
        { heading: "two", subheading: "Enquire", icon: IoMailOutline },
        { heading: "three", subheading: "Pay", icon: IoBagCheckOutline },
    ];
    return (
        <div className="relative overflow-hidden
      flex-col min-h-screen py-16 px-1">
            <div className="absolute bg-gray-500/10 top-0 h-1/2 
                w-full z-0 flex py-28">
                <Image src={logoImg} alt="logo image" className="h-full 
           md:-ml-96 -mt-28 md:-mt-0  opacity-5" />
                <div className="absolute top-[36%] left-[16%] w-full">
                    <FadedText />
                </div>
            </div>
            <div className="flex relative items-center justify-center
      flex-col min-h-screen z-50">
                <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-center">
                    Owning a car is as simple as<br />
                    <span className="font-semibold text-green-600">
                        One, Two, Three
                    </span>
                </h1>
                <div className="grid w-full grid-cols-1 md:grid-cols-3 md:w-3/4 px-8 py-16 gap-4">
                    {steps.map(step => (
                        <Step
                            key={step.heading}
                            heading={step.heading}
                            subheading={step.subheading}
                            icon={step.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Step(props: {
    heading: string,
    subheading: string,
    icon: IconType
}) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center
      text-nowrap rounded-lg shadow-lg shadow-black/20 bg-gray-100
      text-lg px-16 py-8">
            <div className="bg-gray-200 p-6 rounded-full">
                {<props.icon size={40} />}
            </div>
            <p className="text-gray-400 uppercase">
                {props.heading}
            </p>
            <p>{props.subheading}</p>
        </div>
    );
}

function FadedText() {
    return (
        <div className="text-9xl font-black tracking-widest text-gray-400/5">
            Only Safe way
        </div>
    );
}
