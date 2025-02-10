"use client"

import { useComperatorStore } from "@/providers/ComperatorStoreProvider";
import { VehicleCard } from "./VehicleCard";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { VehicleSpecifications } from "./Vehicle";
import { useRouter } from "next/navigation";

export function VehicleComparator() {
    const router = useRouter()

    const { vehicles, clear, remove } = useComperatorStore((state) => state)

    const numberOfVehicles = vehicles.size;

    const [viewFullComparison, setViewFullComparison] = useState<boolean>(false);

    if (numberOfVehicles === 0) return;

    return (
        <div className="rounded-3xl p-8 py-4 space-y-2 bg-gray-200 my-4">
            <div className="font-semibold text-2xl flex items-center justify-between">
                <div>
                    Vehicles to Compare
                </div>
                {numberOfVehicles >= 2 && (
                    <button
                        className="daisy-btn daisy-btn-outline rounded-none border-none"
                        onClick={clear}
                    >
                        Clear All
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {[...vehicles.values()].map(vehicle => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        cannotCompare
                        notClickable
                        removeFromComparator={
                            <button className="daisy-btn daisy-btn-square daisy-btn-outline
                                daisy-btn-sm rounded-none m-4 ml-auto mt-0 border-none
                                hover:text-red-200 text-red-700"
                                onClick={() => remove(vehicle.id)}
                            >
                                <IoMdClose size={20} />
                            </button>
                        }
                        fullComparison={viewFullComparison && (
                            <div >
                                <div className="text-sm font-semibold mt-1 pl-2 tracking-wide">
                                    FEATURES
                                </div>
                                <VehicleSpecifications vehicle={vehicle} />
                                <div className="w-full border-b mt-2"></div>
                                <div className="flex items-center justify-center mt-4">
                                    <ComparitorButton
                                        text="View Vehicle Details"
                                        onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                                    />
                                </div>
                            </div>
                        )}
                    />
                ))}
            </div>
            <div className="flex justify-center pt-2">
                <ComparitorButton
                    text={viewFullComparison ? "Hide Comparison" : "View Full Comparison"}
                    onClick={() => setViewFullComparison(prev => !prev)}
                />
            </div>
        </div>
    );
}

function ComparitorButton({ text, onClick }: {
    text: string,
    onClick: () => void
}) {
    return (
        <button className="daisy-btn rounded-none daisy-btn-outline border-none
                    daisy-btn-active hover:bg-gray-700 daisy-btn-sm"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
