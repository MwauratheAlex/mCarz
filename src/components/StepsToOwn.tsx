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
        <div className="relative
      flex-col min-h-screen">
            <div className="absolute bg-gray-500/10 top-24 h-1/2 border w-full z-0 
        flex">
                <Image src={logoImg} alt="logo image" className="h-full 
           -ml-96 opacity-5" />
                <div className="absolute top-[36%] left-[16%] w-full">
                    <FadedText />
                </div>
            </div>
            <div className="flex relative items-center justify-center
      flex-col min-h-screen z-50">
                <h1 className="font-serif text-5xl tracking-wide text-center">
                    Owning a car is as simple as<br />
                    <span className="font-semibold text-green-600">
                        One, Two, Three
                    </span>
                </h1>
                <div className="grid grid-cols-3 w-3/4 px-8 py-16 gap-4">
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
