"use client"

import { getVehicleById } from "@/actions/actions";
import { breadBrumbLink, BreadBrumbs } from "./BreadCrumbs";
import { Badge } from "./VehicleCard";
import { useQuery } from "@tanstack/react-query";
import { FaInstagram, FaPhone, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { ReactNode, useEffect, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { Vehicle as VehicleT } from "@prisma/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { SimilarVehicles } from "./SimilarVehicles";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { usePageLoadingStore } from "@/providers/LoadingStoreProvider";
import { ImageViewer } from "./ImageViewer";

export function Vehicle({ id }: { id: string }) {

    const { data: vehicle, isLoading, error } = useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => getVehicleById(id),
    });

    const { setIsPageLoading } = usePageLoadingStore(prev => prev)

    useEffect(() => setIsPageLoading(false), [setIsPageLoading])


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
        <div className="divide-y space-y-8 pb-4">
            <div className="flex flex-col">
                <div className="flex md:gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <div className="sticky top-28">
                            <div className="flex items-center mb-1">
                                <BreadBrumbs links={breadBrumbsLinks} />
                            </div>
                            <VehicleLeft vehicle={vehicle} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="md:h-11 h-4">{/* placeholder for the breadbrumb on the right */}</div>
                        <VehicleRight vehicle={vehicle} />
                    </div>
                </div>
            </div>
            <SimilarVehicles
                price={vehicle.askingPrice}
                id={id}
                vehicleName={`${vehicle.make} ${vehicle.model}`}
            />
        </div>
    );
}

function VehicleLeft({ vehicle }: { vehicle: VehicleT }) {
    return (
        <div className="rounded-lg overflow-hidden flex flex-col gap-1 md:gap-2 sticky top-32">
            <ImageViewer imgUrls={vehicle.imgUrls} />

            <div className="flex justify-between items-center mt-4">
                <div>Price</div>
                <div className="font-semibold">
                    {formatPrice(vehicle.askingPrice)}
                </div>
            </div>
            <div>
                <Rating />
            </div>
            <div className="flex gap-2 md:gap-4 py-3 pb-0">
                <button className="daisy-btn bg-green-600 text-white
                            hover:bg-green-700 flex-1">
                    <FaWhatsapp className="size-5" />
                    Whatsapp us
                </button>
                <button className="daisy-btn text-gray-100 bg-gray-900 hover:bg-gray-950
                            hover:text-white w-auto flex-1">
                    <FaPhone />
                    Call now
                </button>
            </div>
            <div className="flex items-center">
                <div className="font-semibold text-gray-800">Share this vehicle</div>
                <div className="text-sm px-4 text-left font-mono flex
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
    const [lineClamp, setLineClamp] = useState<boolean>(true);

    return (
        <div className="md:px-4 pr-0 flex flex-col gap-2">
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
                { "line-clamp-4": lineClamp },
                ""
            )}>
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

export function VehicleSpecifications({ vehicle }: { vehicle: VehicleT }) {
    return (
        <table className="daisy-table  daisy-table-sm daisy-table-zebra-zebra">
            <tbody>
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
            </tbody>
        </table>
    );
}

function VehicleSpecification({ title, value }: { title: string, value: string }) {
    return (
        <tr className="grid grid-cols-2 gap-[22%]">
            <td className="pl-2">{title}</td>
            <td className="pr-0">
                {value}
            </td>
        </tr>
    );
}

function Rating() {
    const randomRating = Math.floor(Math.random() * 4) + 2;

    return (
        <div className="space-y-2">
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
                <ToolTip />
            </div>
        </div>

    );
}


function ToolTip() {
    const toolTipContent: ReactNode = (
        <div className="space-y-2 md:space-y-4 tracking-wide text-gray-100 text-xs divide-y divide-gray-600">
            <div className="space-y-2">
                <p>5 Star: Excelent condition</p>
                <p>4 Star: Very good</p>
                <p>3 Star: Average</p>
                <p>2 Star: Below average</p>
                <p>1 Star: Accident / Salvaged vehicle</p>
            </div>
            <p className="py-2 md:py-4">The rating has been randomly generated.</p>
        </div>
    );

    return (
        <>
            <span className="hidden md:block">
                <ToolTipDesktop>
                    {toolTipContent}
                </ToolTipDesktop>
            </span>
            <span className="md:hidden">
                <ToolTipMobile>
                    {toolTipContent}
                </ToolTipMobile>
            </span>
        </>
    );
}

function ToolTipMobile({ children }: { children: ReactNode }) {
    return (
        <Popover>
            <PopoverTrigger className="shadow-lg shadow-black/60 rounded-full size-5 
                    text-sm font-semibold"
            >
                ?
            </PopoverTrigger>
            <PopoverContent className="w-72 bg-neutral-900 border-none">
                {children}
            </PopoverContent>
        </Popover>
    )
}


function ToolTipDesktop({ children }: { children: ReactNode }) {
    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger
                    className="shadow-lg shadow-black/60 rounded-full size-5 
                    text-sm font-semibold"
                >
                    ?
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-72 bg-neutral-900 border-none">
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function VehicleLoading() {
    return (
        <div>
            <div className="flex py-2 items-center">
                <div className="daisy-skeleton h-8 w-32 rounded-md"></div>
            </div>
            <div className="flex gap-2 mb-4 flex-col md:flex-row">
                <div className="md:w-1/2 w-full rounded-lg overflow-hidden">
                    <div className="daisy-skeleton h-60 md:h-96 rounded-md"></div>
                </div>
                <div className="md:w-1/2 w-full md:px-4 pr-0 flex gap-2 flex-col">
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
