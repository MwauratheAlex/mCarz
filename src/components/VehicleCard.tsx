import { Vehicle } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { MdOutlineCompare, MdOutlineCompareArrows } from "react-icons/md";
import { Currency } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
    return (
        <div className="daisy-card bg-gray-100 shadow-xl">
            <figure>
                <ImageCorousel imgUrls={vehicle.imgUrls} />
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
                        <Badge text="Automatic" />
                        <Badge text="2000 CC" />
                        <Badge text="Used" />
                    </div>
                    <p>
                        With a well crafted interior with wood trimmings and finishing, the{" "}
                        {vehicle.make} {vehicle.model} complements its well designed body style in this
                        metallic {vehicle.color} exterior.
                    </p>
                </div>
                <Separator />
                <div className="daisy-card-actions justify-between items-center">
                    <div className="text-lg">{formatPrice(vehicle.askingPrice)}</div>
                    <div className="daisy-tooltip" data-tip="compare">
                        <button className="daisy-btn daisy-btn-square bg-gray-200">
                            <MdOutlineCompareArrows size={20} className="text-black" />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}


function Badge({ text }: { text: string }) {
    return (
        <div className="daisy-badge bg-gray-300 shadow-xl shadow-black/5 border-none text-black rounded-md">
            {text}
        </div>
    )
}

function ImageCorousel({ imgUrls }: { imgUrls: string[] }) {
    return (
        <div className="mx-auto relative w-full">
            <Carousel className="w-full">
                <CarouselContent>
                    {imgUrls.map((url, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="flex items-center justify-center border p-0">
                                    <img
                                        src={url}
                                        alt="vehicle"
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2" />
                <CarouselNext className="absolute right-2 top-1/2" />
            </Carousel>
        </div>
    );
}
