'use client'
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

import { bodyTypes, brands } from "@/data/data";

export function Search() {
    const [searchType, setSearchType] = useState<string>("name");

    return (
        <div className="pt-[20vh]" >
            <div className="h-[86vh] flex flex-col items-center gap-4" id="search" >
                <h1 className="font-serif text-3xl tracking-wide font-semibold">
                    Find what fits you
                </h1>
                <p className="">We help you find a car that fits your <span className="text-green-600 font-semibold">personality, dream and pocket!</span></p>
                <div>
                    <div className="flex gap-8 justify-center">
                        <button
                            className={cn(
                                "daisy-btn daisy-btn-ghost daisy-btn-sm transition-colors",
                                searchType != "name" && "font-normal text-gray-600"

                            )}
                            onClick={() => setSearchType("name")}
                        >
                            Search by Name
                        </button>
                        <button
                            className={cn(
                                "daisy-btn daisy-btn-ghost daisy-btn-sm transition-colors",
                                searchType != "brand" && "font-normal text-gray-600"

                            )}
                            onClick={() => setSearchType("brand")}
                        >
                            Filter by Brand
                        </button>
                        <button
                            className={cn(
                                "daisy-btn daisy-btn-ghost daisy-btn-sm transition-colors",
                                searchType != "body" && "font-normal text-gray-600"

                            )}
                            onClick={() => setSearchType("body")}
                        >
                            Filter by Body Type
                        </button>
                    </div>
                    <div>
                        {searchType == "name" && <SearchByName />}
                        {searchType == "brand" && <FilterByBrand />}
                        {searchType == "body" && <FilterByBobyType />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SearchByName() {
    return (
        <div className="flex flex-col gap-1 py-2">
            <p className="font-semibold">Search vehicle</p>
            <p>Simply write the vehicle name and press the search button (e.g. demio or vitz)</p>
            <form className="py-2 gap-2">
                <label className="daisy-input daisy-input-bordered rounded-none flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search vehicle name" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </form>
        </div>
    );
}

function FilterByBrand() {
    return (
        <div className=" grid grid-cols-4 gap-6 p-4">
            {brands.map(type => (
                <button key={type.name} className="daisy-btn daisy-btn-ghost w-40 h-40 shadow-lg shadow-gray-600/5 rounded-none bg-gray-100">
                    <Image src={type.icon} alt="type.name" priority className="w-24 h-24" />
                </button>
            ))}
        </div>
    );
}

function FilterByBobyType() {
    return (
        <div className=" grid grid-cols-3 gap-4 p-4">
            {bodyTypes.map(type => (
                <button key={type.name} className="py-8 px-16 daisy-btn daisy-btn-ghost w-full h-full shadow-lg shadow-gray-600/5 rounded-none bg-gray-100">
                    <Image src={type.icon} alt={type.name} priority />
                </button>
            ))}
        </div>
    );
}
