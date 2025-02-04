"use client"

import { searchVehicles } from "@/actions/actions";
import { Vehicle } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce"
import { cn, formatPrice } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const { data, isLoading } = useQuery({
        queryKey: ["vehicles_search", searchTerm],
        queryFn: () => searchVehicles(searchTerm),
        enabled: searchTerm.trim().length > 0,
    })

    const searchInputRef = useRef<HTMLInputElement>(null)

    const handleSearch = useDebouncedCallback((term) => {
        setSearchTerm(term)
    }, 300)

    return (
        <div className="gap-2 flex flex-col">
            <p className="font-semibold">Search Vehicle</p>
            <p className="text-sm">Simply write the vehicle name and press the search button (i.e demio or vitz)</p>
            <label className="daisy-input daisy-input-bordered outline-red-500 rounded-none flex items-center gap-2">
                <IoSearch className="text-gray-600" />
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    className="grow"
                    placeholder="Search vehicle name"
                    ref={searchInputRef}
                />
                {isLoading && (
                    <span className="daisy-loading daisy-loading-ring daisy-loading-sm"></span>
                )}
                {data && (
                    <button className={cn(
                        "daisy-btn daisy-btn-circle daisy-btn-sm daisy-btn-ghost bg-red-50",
                    )}
                        onClick={() => {
                            if (searchInputRef.current) {
                                searchInputRef.current.value = "";
                            }
                            setSearchTerm("")
                        }}
                    >
                        <IoMdClose />
                    </button>
                )}
            </label>
            {data && (
                <div className="relative">
                    <SearchResult vehicles={data} query={searchTerm} />
                </div>
            )}
        </div >
    );
}

function SearchResult({ vehicles, query }: { vehicles: Vehicle[], query: string }) {
    const router = useRouter()

    if (vehicles.length === 0) {
        return (
            <div className="rounded-md py-2 px-4 absolute bg-red-50 w-full text-sm">
                No result found. Please try again.
            </div>
        );
    }
    return (
        <div className="absolute w-full bg-gray-50 shadow-2xl">
            <div className="flex w-full flex-col gap-1 px-4 h-96 overflow-y-scroll
                overscroll-contain">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                        className="flex gap-2 cursor-pointer hover:bg-gray-200 
                        rounded-md transition-colors">
                        <div className="min-w-32 w-32 h-20 overflow-hidden rounded-md">
                            <img
                                className="w-full h-20 object-cover"
                                src={vehicle.imgUrls[0]}
                                alt={`vehicle-${vehicle.make}-${vehicle.model}`}
                                loading="lazy"
                            />
                        </div>
                        <div className="flex flex-col text-sm gap-2 w-full p-2">
                            <p className="font-semibold">
                                {`${vehicle.make} ${vehicle.model}`}
                            </p>
                            <p>
                                {formatPrice(vehicle.askingPrice)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4">
                <Separator className="" />
                <Link className="daisy-btn daisy-btn-sm w-full mt-4 
                    daisy-btn-outline"
                    href={`/vehicles?query=${query}`}
                >
                    View All
                </Link>
            </div>
        </div>
    );
}
