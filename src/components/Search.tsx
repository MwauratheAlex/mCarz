'use client'
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Suspense, useState } from "react";
import { brands } from "@/data/data";
import { SearchForm } from "./SearchForm";
import Link from "next/link";

export function Search() {
    const [searchType, setSearchType] = useState<string>("name");

    return (
        <div className="pt-[13vh] md:pt-[15vh] mt-10 pb-16 mx-auto px-8" id="search" >
            <div className=" flex flex-col items-center gap-4" >
                <h1 className="font-serif text-3xl md:text-5xl tracking-wide font-semibold">
                    Find what fits you
                </h1>
                <p className="text-center">
                    We help you find a car that fits your <span className="text-green-600 font-semibold">personality, dream and pocket!</span>
                </p>
                <div className="md:w-2/4 w-full">
                    <div className="flex gap-2 md:gap-4 justify-center border-2 
                    border-gray-100 md:my-2
                    w-max mx-auto rounded-xl p-1">
                        <button
                            className={cn(
                                "daisy-btn text-wrap bg-gray-200 daisy-btn-sm transition-colors whitespace-normal max-w-[90px]",
                                "md:max-w-96",
                                searchType != "name" && "font-normal text-gray-600 bg-gray-50"

                            )}
                            onClick={() => setSearchType("name")}
                        >
                            Search by Name
                        </button>
                        <button
                            className={cn(
                                "daisy-btn bg-gray-200 daisy-btn-sm transition-colors whitespace-normal max-w-[90px] md:max-w-96",
                                searchType != "brand" && "font-normal text-gray-600 bg-gray-50"

                            )}
                            onClick={() => setSearchType("brand")}
                        >
                            Filter by Brand
                        </button>
                    </div>
                    <div className="w-full">
                        {searchType == "name" && (
                            <Suspense>
                                <SearchForm />
                            </Suspense>
                        )}
                        {searchType == "brand" && <FilterByBrand />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FilterByBrand() {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 p-4 
            md:gap-6 md:p-4">
            {brands.map(type => (
                <Link
                    href={`/vehicles?brand=${type.name}`}
                    key={type.name} className="daisy-btn daisy-btn-ghost 
                    md:w-40 md:h-36 w-28 h-24 shadow-lg shadow-gray-600/5 rounded-none bg-gray-100">
                    <Image src={type.icon} alt="type.name" priority
                        className="w-20 h-20" />
                </Link>
            ))}
        </div>
    );
}
