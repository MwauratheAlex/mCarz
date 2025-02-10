"use client"

import { getSimilarVehicles } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";
import { VehicleSkeletons } from "./VehicleSkeletons";
import { VehicleCard } from "./VehicleCard";
import { ReactNode } from "react";

export function SimilarVehicles({ price, id, vehicleName }: {
    price: number, id: string, vehicleName: string
}) {
    const { data: vehicles, isLoading, error } = useQuery({
        queryKey: ["similar_vehicles", price, id],
        queryFn: () => getSimilarVehicles(price, id),
    })

    if (isLoading) return <SimilarVehiclesLoading vehicleName={vehicleName} />

    if (!vehicles || vehicles.length == 0 || error) return;

    return (
        <SimilarVehiclesWrapper vehicleName={vehicleName}>
            {vehicles.map(vehicle => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                />
            ))}
        </SimilarVehiclesWrapper>
    );
}

function SimilarVehiclesLoading({ vehicleName }: { vehicleName: string }) {
    return (
        <SimilarVehiclesWrapper vehicleName={vehicleName}>
            <VehicleSkeletons amount={4} />
        </SimilarVehiclesWrapper>
    );
}

function SimilarVehiclesWrapper({ children, vehicleName }: {
    children: ReactNode, vehicleName: string
}) {
    return (
        <div className="py-4 space-y-4 border-t">
            <div className="text-center">
                <p className="font-semibold text-3xl">
                    Similar vehicles
                </p>
                <p className="tracking-wide">
                    Peope who viewed the {vehicleName} also considered
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {children}
            </div>
        </div>
    );
}
