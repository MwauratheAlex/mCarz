"use client"

import { Vehicle } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { MdOutlineCompareArrows } from "react-icons/md";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useComperatorStore } from "@/providers/ComperatorStoreProvider";
import { ReactNode } from "react";
import { queryClient } from "./Providers";
import { useToast } from "@/hooks/use-toast";
import { usePageLoadingStore } from "@/providers/LoadingStoreProvider";

export function VehicleCard({
    vehicle,
    cannotCompare,
    removeFromComparator,
    fullComparison,
    notClickable,
}: {
    vehicle: Vehicle,
    cannotCompare?: boolean,
    removeFromComparator?: ReactNode,
    fullComparison?: ReactNode,
    notClickable?: boolean
}) {
    const router = useRouter();

    const { setIsPageLoading } = usePageLoadingStore(state => state)

    const handleClick = () => {
        if (notClickable) return;
        setIsPageLoading(true)
        const queryKey = ["vehicle", vehicle.id]
        queryClient.setQueryData(queryKey, () => vehicle);
        router.push(`/vehicles/${vehicle.id}`)
    }

    router.prefetch(`/vehicles/${vehicle.id}`)

    return (
        <div
            className={cn("daisy-card bg-gray-100 shadow-xl cursor-pointer group",
                { "cursor-default": notClickable }
            )}
            onClick={handleClick}
        >
            {removeFromComparator && removeFromComparator}
            <figure>
                <ImageCorousel imgUrls={vehicle.imgUrls} zoomHover={!cannotCompare} />
            </figure>
            <div className="daisy-card-body">
                <div className="flex items-center gap-2">
                    <div className="daisy-badge daisy-badge-sm font-semibold bg-gray-200 shadow-xl">
                        {vehicle.yearOfManufacture}
                    </div>
                    <h2 className="daisy-card-title">{vehicle.make} {vehicle.model}</h2>
                </div>
                <div className="flex flex-col gap-2 py-2">
                    <div className="flex gap-4">
                        <Badge text={vehicle.transmission} />
                        <Badge text={`${vehicle.engineSize} CC`} />
                        <Badge text={`${vehicle.horsePower} hp`} />
                    </div>
                    <p className="line-clamp-3">{vehicle.description}</p>
                </div>
                <Separator />
                <div className="daisy-card-actions justify-between items-center">
                    <div className="text-lg">{formatPrice(vehicle.askingPrice)}</div>
                    {!cannotCompare && <CompareButton vehicle={vehicle} />}
                </div>
                {fullComparison && fullComparison}
            </div>
        </div >
    );
}

function CompareButton({ vehicle }: { vehicle: Vehicle }) {
    const { add } = useComperatorStore((state) => state)
    const { toast } = useToast();


    const handleClick = () => {
        toast({
            title: `${vehicle.make} ${vehicle.model} added for comparison`,
            description: "Scroll to the top of the page to view the vehicles.",
            subheading: "You can compare upto 3 vehicles."
        })
        add(vehicle);
    }

    return (
        <div className="daisy-tooltip" data-tip="compare">
            <button
                className="daisy-btn daisy-btn-square bg-gray-200"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
            >
                <MdOutlineCompareArrows size={20} className="text-black" />
            </button>
        </div>
    );
}

export function ImageCorousel({ imgUrls, className, zoomHover }: {
    imgUrls: string[], className?: string, zoomHover?: boolean,
}) {
    return (
        <div className="mx-auto relative w-full">
            <Carousel className="w-full">
                <CarouselContent>
                    {imgUrls.map((url, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className={cn(
                                    "flex items-center justify-center p-0 h-48 w-full relative",
                                    className,
                                )} >
                                    <Image
                                        src={url}
                                        alt="vehicle"
                                        className={cn(
                                            "object-cover transition-all duration-300",
                                            { "group-hover:scale-105": zoomHover }
                                        )}
                                        fill
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2" />
                <CarouselNext className="absolute right-2 top-1/2" />
            </Carousel>
        </div >
    );
}

export function Badge({ text }: { text: string }) {
    return (
        <div className="daisy-badge bg-gray-300 shadow-xl shadow-black/5 border-none text-black rounded-md
            text-nowrap">
            {text}
        </div>
    )
}
