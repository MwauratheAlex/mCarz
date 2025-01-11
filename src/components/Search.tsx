'use client'
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

import { bodyTypes, brands, priceRanges } from "@/data/data";
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function Search() {
    const [searchType, setSearchType] = useState<string>("name");

    return (
        <div className="pt-[15vh] mt-10 pb-16 mx-auto" id="search" >
            <div className=" flex flex-col items-center gap-4" >
                <h1 className="font-serif text-5xl tracking-wide font-semibold">
                    Find what fits you
                </h1>
                <p className="">We help you find a car that fits your <span className="text-green-600 font-semibold">personality, dream and pocket!</span></p>
                <div>
                    <div className="flex gap-4 justify-center border-2 
                    border-gray-100 my-2
                    w-max mx-auto rounded-xl p-1">
                        <button
                            className={cn(
                                "daisy-btn bg-gray-200 daisy-btn-sm transition-colors",
                                searchType != "name" && "font-normal text-gray-600 bg-gray-50"

                            )}
                            onClick={() => setSearchType("name")}
                        >
                            Search by Name
                        </button>
                        <button
                            className={cn(
                                "daisy-btn bg-gray-200 daisy-btn-sm transition-colors",
                                searchType != "brand" && "font-normal text-gray-600 bg-gray-50"

                            )}
                            onClick={() => setSearchType("brand")}
                        >
                            Filter by Brand
                        </button>
                        <button
                            className={cn(
                                "daisy-btn bg-gray-200 daisy-btn-sm transition-colors",
                                searchType != "body" && "font-normal text-gray-600 bg-gray-50"

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
    const [
        selectedRange, setSelectedRange,
    ] = useState<string>(priceRanges[0].range);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1 py-2 w-full">
                <p className="font-semibold">Search vehicle</p>
                <p>Simply write the vehicle name and press the search button (e.g. demio or vitz)</p>
                <label className="daisy-input daisy-input-lg daisy-input-bordered w-full rounded-none flex items-center gap-2">
                    <input type="text" className="grow py-4" placeholder="Search vehicle name" />
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
            </div>

            <div className="flex flex-col gap-1 py-2">
                <p className="font-semibold">Filter by budget</p>
                <div className={`grid grid-rows-1 grid-cols-8 gap-2`}>
                    {priceRanges.map(priceRange => (
                        <div
                            key={priceRange.range}
                            className={cn(
                                "border p-4 w-full text-center hover:bg-blue-600/5",
                                "cursor-pointer",
                                selectedRange == priceRange.range &&
                                "border-gray-500 bg-gray-600/10"
                            )}
                            onClick={() => setSelectedRange(priceRange.range)}
                        >
                            {priceRange.range}
                        </div>
                    ))}
                    {selectedRange != "" && (
                        <div
                            className={cn(
                                "border py-4 text-center w-full bg-blue-600/5",
                                "hover:bg-blue-600/10 cursor-pointer"
                            )}
                            onClick={() => setSelectedRange("")}
                        >
                            Clear
                        </div>
                    )}
                </div>
            </div>


            <div className="daisy-collapse rounded-none
                py-2 ">
                <input type="checkbox" />
                <div className="daisy-collapse-title flex text-sm text-gray-950
                    font-semibold border-gray-100 border-b-2 px-0 shadow-black/5 shadow-lg
                    flex-row items-center justify-between">
                    <span>
                        Click here for more Advanced search
                    </span>
                    <Filter className="w-4 h-4" />
                </div>
                <div className="daisy-collapse-content block overflow-auto px-0">
                    <form className="py-4 flex flex-col gap-2">
                        <FormInputSelect title="Brand & Model" />
                        <FormInputSelect title="Year of Manufacture" />
                        <FormInputSelect title="Price" />
                        <FormInputSelect title="Location" />
                    </form>
                </div>
            </div>


            <div className="flex flex-col gap-1 py-2">
                <button
                    className="daisy-btn bg-gray-900 text-gray-50 hover:bg-gray-950 hover:text-white daisy-btn-lg rounded-none"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

function FormInputSelect(props: { title: string }) {
    return (
        <div className="flex flex-col gap-1 py-2 w-full">
            <p className="font-semibold">{props.title}</p>
            <div className="flex gap-4">
                <Select>
                    <SelectTrigger className="w-full h-16 rounded-none">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full h-16 rounded-none">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

function FilterByBrand() {
    return (
        <div className=" grid grid-cols-4 gap-6 p-4">
            {brands.map(type => (
                <button key={type.name} className="daisy-btn daisy-btn-ghost 
                    w-40 h-36 shadow-lg shadow-gray-600/5 rounded-none bg-gray-100">
                    <Image src={type.icon} alt="type.name" priority
                        className="w-20 h-20" />
                </button>
            ))}
        </div>
    );
}

function FilterByBobyType() {
    return (
        <div className=" grid grid-cols-3 gap-4 p-4">
            {bodyTypes.map(type => (
                <button key={type.name} className="py-8 px-16 daisy-btn 
                    daisy-btn-ghost w-full h-full shadow-lg shadow-gray-600/5 
                    rounded-none bg-gray-100">
                    <Image src={type.icon} alt={type.name} priority />
                </button>
            ))}
        </div>
    );
}
