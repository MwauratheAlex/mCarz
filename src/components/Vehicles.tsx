"use client"

import { getVehicles } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";
import { VehicleCard } from "./VehicleCard";
import { VehicleSkeletons } from "./VehicleSkeletons";
import { useSearchParams } from "next/navigation";
import { SearchParams } from "@/types/types";


export function Vehicles() {
    const searchParams = Object.fromEntries(
        useSearchParams().entries()
    ) as SearchParams;

    const { data: vehicles, error, isLoading } = useQuery({
        queryKey: ["vehicles", searchParams],
        queryFn: () => getVehicles(searchParams),
        placeholderData: prev => prev,
    })

    if (isLoading) {
        return <VehicleSkeletons amount={6} />
    }

    if (error || !vehicles || vehicles.length === 0) {
        return <VehiclesNotFound />
    }

    return (
        <>
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                />
            ))}
        </>
    );
}


function VehiclesNotFound() {
    return (
        <div className="col-span-1 lg:col-span-3 w-full flex-col
              row-span-3 flex items-center justify-center h-full tracking-wide">
            <p className="text-3xl font-semibold text-red-400">
                No vehicles found!
            </p>
            <p className="text-gray-600">
                Please try modifying your filter.
            </p>
        </div>
    )
}

