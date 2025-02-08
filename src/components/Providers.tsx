"use client"
import { getVehicles } from "@/actions/actions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

export const prefetchVehicles = async () => {
    const vehicleSearchParams = {
        page: null,
        query: null,
        brand: null,
        minYear: null,
        maxYear: null,
        priceGte: null,
        priceLte: null
    }
    await client.prefetchQuery({
        queryKey: ["vehicles", vehicleSearchParams],
        queryFn: () => getVehicles(vehicleSearchParams),
    })

}

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
}
