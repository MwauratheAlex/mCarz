"use client"

import { getSimilarVehicles } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";
import { VehicleSkeletons } from "./VehicleSkeletons";
import { VehicleCard } from "./VehicleCard";

export function SimilarVehicles({ price, id }: { price: number, id: string }) {
    const { data: vehicles, isLoading, error } = useQuery({
        queryKey: ["similar_vehicles", price, id],
        queryFn: () => getSimilarVehicles(price, id),
    })

    if (isLoading) return <VehicleSkeletons amount={3} />

    if (!vehicles || vehicles.length == 0 || error) return;

    return (
        <div className="py-4 space-y-4 border-t">
            <div className="font-semibold text-3xl">
                Similar vehicles
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {vehicles.map(vehicle => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                    />
                ))}
            </div>
        </div>
    );
}
