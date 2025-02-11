"use client"
import { getVehicleById, getVehicles } from "@/actions/actions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SearchParams } from "@/types/types";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 20 // 20 minutes
        },
    }
})

export const prefetchVehicles = async () => {
    await queryClient.prefetchQuery({
        queryKey: ["vehicles", {}],
        queryFn: () => getVehicles({} as SearchParams),
        staleTime: 1000 * 60 * 20,
    })

}

export const prefetchVehicle = async (vehicleID: string) => {
    await queryClient.prefetchQuery({
        queryKey: ["vehicle", vehicleID],
        queryFn: () => getVehicleById(vehicleID),
    });
}

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
}
