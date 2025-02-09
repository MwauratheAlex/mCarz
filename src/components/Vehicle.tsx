"use client"

import { getVehicleById } from "@/actions/actions";
import { breadBrumbLink, BreadBrumbs } from "./BreadCrumbs";
import { Badge, ImageCorousel } from "./VehicleCard";
import { useQuery } from "@tanstack/react-query";
import { FaInstagram, FaPhone, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { Vehicle as VehicleT } from "@prisma/client";

export function Vehicle({ id }: { id: string }) {
    const { data: vehicle, isLoading, error } = useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => getVehicleById(id),
    });

    if (isLoading) return <VehicleLoading />

    if (!vehicle || error) {
        return (
            <div>Vehicle not found</div>
        );
    }

    const breadBrumbsLinks: breadBrumbLink[] = [
        { name: "Home", url: "/" },
        { name: "Vehicles", url: "/vehicles" },
        { name: `${vehicle.make} ${vehicle.model}` },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex gap-4">
                <div className="flex-1">
                    <div className="sticky top-28">
                        <div className="flex items-center mb-1">
                            <BreadBrumbs links={breadBrumbsLinks} />
                        </div>
                        <VehicleLeft vehicle={vehicle} />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-11"></div>
                    <VehicleRight vehicle={vehicle} />
                </div>
            </div>
        </div>
    );
}

function VehicleLeft({ vehicle }: { vehicle: VehicleT }) {
    return (
        <div className="rounded-lg overflow-hidden flex flex-col gap-2 sticky top-32">
            <ImageCorousel
                imgUrls={vehicle.imgUrls}
                className="h-[50vh]"
            />
            <div className="flex justify-between items-center mt-4">
                <div>Price</div>
                <div className="font-semibold">
                    {formatPrice(vehicle.askingPrice)}
                </div>
            </div>
            <div>
                <Rating />
            </div>
            <div className="flex gap-4">
                <button className="daisy-btn bg-green-600 text-white
                            hover:bg-green-700 flex-1">
                    <FaWhatsapp className="size-5" />
                    Enquire via whatsapp
                </button>
                <button className="daisy-btn text-gray-100 bg-gray-900 hover:bg-gray-950
                            hover:text-white w-auto flex-1">
                    <FaPhone />
                    Call now
                </button>
            </div>
            <div className="flex items-center">
                <div className="font-semibold text-gray-800">Share this vehicle</div>
                <div className="text-sm px-4 py-2 text-left font-mono flex
                    gap-4">
                    <a className="daisy-btn daisy-btn-sm daisy-btn-circle">
                        <FaWhatsapp size={18} />
                    </a>
                    <a className="daisy-btn daisy-btn-sm daisy-btn-circle">
                        <FaXTwitter size={18} />
                    </a>
                    <a className="daisy-btn daisy-btn-sm daisy-btn-circle">
                        <FaInstagram size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}

function VehicleRight({ vehicle }: { vehicle: VehicleT }) {
    const [lineClamp, setLineClamp] = useState<boolean>(false);

    return (
        <div className="px-4 pr-0 flex flex-col gap-2">
            <h1 className="font-semibold text-4xl">
                {`${vehicle.make} ${vehicle.model}`}
            </h1>
            <div className="flex gap-4">
                <Badge text={vehicle.transmission} />
                <Badge text={`${vehicle.engineSize} CC`} />
                <Badge text={`${vehicle.horsePower} hp`} />
            </div>
            <p className={cn("text-gray-900 tracking-wide",
                "transition-all duration-300",
                { "line-clamp-3": lineClamp },)}>
                {vehicle.description}
            </p>
            <button
                className="daisy-btn daisy-btn-sm w-max font-medium"
                onClick={() => setLineClamp(prev => !prev)}
            >
                {lineClamp ? ("Read more") : ("Hide description")}
            </button>
            <div>
                <div className="font-semibold text-lg">Vehicle Specifications</div>
                <VehicleSpecifications vehicle={vehicle} />
            </div>
        </div>
    );
}

function VehicleSpecifications({ vehicle }: { vehicle: VehicleT }) {
    return (
        <div className="divide-y divide-gray-200">
            <VehicleSpecification
                title="Year of manufacture"
                value={String(vehicle.yearOfManufacture)}
            />
            <VehicleSpecification
                title="Current Location"
                value={String(vehicle.location)}
            />
            <VehicleSpecification
                title="Availability"
                value="Available"
            />
            <VehicleSpecification
                title="Mileage"
                value={`${formatPrice(vehicle.mileage, true)} ${vehicle.mileageUnits}`}
            />
            <VehicleSpecification
                title="Engine Size"
                value={`${vehicle.engineSize} Cc`}
            />
            <VehicleSpecification
                title="Horse Power"
                value={`${vehicle.horsePower} hp`}
            />
            <VehicleSpecification
                title="Transmission"
                value={vehicle.transmission}
            />
            <VehicleSpecification
                title="Color"
                value={vehicle.color}
            />
            <VehicleSpecification
                title="Has accident history"
                value={
                    vehicle.hasAccidentHistory ? "Yes" : "No"
                }
            />
        </div>
    );
}

function VehicleSpecification({ title, value }: { title: string, value: string }) {
    return (
        <div className="flex justify-between text-sm py-4">
            <div className="flex-1">{title}</div>
            <div className="w-1/6 px-3">
                {value}
            </div>
        </div>
    );
}

function Rating() {
    const randomRating = Math.floor(Math.random() * 4) + 2;

    return (
        <div className="">
            <div className="font-semibold">
                Condition score
            </div>
            <div className="flex items-center gap-4">
                <div className="daisy-rating daisy-rating-sm">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <input
                            key={`rating-${idx}`}
                            type="radio"
                            name="rating-2"
                            className="daisy-mask daisy-mask-star bg-orange-500 cursor-default"
                            defaultChecked={idx + 1 === randomRating}
                            disabled
                        />
                    ))}
                </div>
                <div className="daisy-tooltip daisy-tooltip-bottom"
                    data-tip="The rating is random"
                >
                    <button className="text-sm shadow-lg shadow-black/20 rounded-full 
                        size-5 text-center font-semibold border border-gray-200">
                        ?
                    </button>
                </div>
            </div>
        </div>

    );
}

function VehicleLoading() {
    return (
        <div>
            <div className="flex py-2 items-center">
                <div className="daisy-skeleton h-8 w-32 rounded-md"></div>
            </div>
            <div className="flex gap-2 mb-4">
                <div className="w-1/2 rounded-lg overflow-hidden">
                    <div className="daisy-skeleton h-96 rounded-md"></div>
                </div>
                <div className="w-1/2 px-4 pr-0 flex flex-col gap-2">
                    <div>
                        <div className="daisy-skeleton h-16 rounded-md"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="daisy-skeleton h-60 rounded-md"></div>
                        <div className="daisy-skeleton h-14 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div >
    );
}
