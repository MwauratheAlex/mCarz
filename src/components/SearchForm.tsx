'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { SearchBar } from "./SearchBar";

const searchBrands = [
    'Audi', 'Porsche',
    'Toyota', 'Mazda',
    'Subaru', 'Volkswagen',
    'Mercedes', 'Lexus',
    'Nissan', 'Suzuki',
    'Bmw', 'Land rover'
];

const budgets = [
    { content: "All budgets", value: "all" },
    { content: "0-500K", value: "priceGte=0&priceLte=500000" },
    { content: "500K-1M", value: "priceGte=500000&priceLte=1000000" },
    { content: "1M-2M", value: "priceGte=1000000&priceLte=2000000" },
    { content: "2M-3M", value: "priceGte=2000000&priceLte=3000000" },
    { content: "3M-5M", value: "priceGte=3000000&priceLte=5000000" },
    { content: "5M-10M", value: "priceGte=5000000&priceLte=10000000" },
    { content: "Above 10M", value: "priceGte=10000000" },
];

interface searchFormInput {
    budget: string
    brand: string
    minYear: string
    maxYear: string
}

export function SearchForm() {
    const {
        register, handleSubmit
    } = useForm<searchFormInput>()

    const searchParams = useSearchParams()
    const router = useRouter();

    const handleSearch = (data: searchFormInput) => {
        const params = new URLSearchParams(searchParams);
        params.delete("query")

        if (data.budget && data.budget !== "all") {
            const [gte, lte] = data.budget.split("&")
            if (gte) {
                const [key, value] = gte.split("=")
                params.set(key, value)
            } else {
                params.delete("priceGte")
            }
            if (lte) {
                const [key, value] = lte.split("=")
                params.set(key, value)
            } else {
                params.delete("priceLte")
            }
        } else {
            params.delete("priceLte")
            params.delete("priceGte")
        }

        Object.entries(data).map(([key, value]) => {
            if (value) {
                if (key !== "budget") {
                    params.set(key, value)
                }
            } else {
                params.delete(key)
            }
        })
        router.replace(`/vehicles/search?${params.toString()}`)
    }

    return (
        <form
            className="flex flex-col gap-4 pr-2 sticky top-32"
            onSubmit={handleSubmit(handleSearch)}
        >
            <SearchBar />
            <div className="gap-2 flex flex-col">
                <p className="font-semibold">Filter by budget</p>
                <div className="grid grid-cols-3 gap-2">
                    {budgets.map((budget, idx) => (
                        <RadioInputBtn
                            key={`budget-radio-${idx}`}
                            content={budget.content}
                            value={budget.value}
                            register={register("budget")}
                        />
                    ))}
                </div>
            </div>

            <div className="gap-2 flex flex-col">
                <p className="font-semibold">
                    Brand & Model
                </p>
                <select
                    className="daisy-select w-full daisy-select-bordered rounded-none"
                    {...register("brand")}
                >
                    <option value="">All brands</option>
                    {searchBrands.map((brand, idx) => (
                        <option key={`$search-${brand}-${idx}`}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <div className="gap-2 flex flex-col">
                <p className="font-semibold">
                    Year of Manufacture
                </p>
                <div className="flex gap-2 w-full overflow-hidden">
                    <label className="daisy-input daisy-input-bordered outline-red-500 
                           rounded-none flex items-center w-1/2">
                        <input
                            type="number"
                            className="w-full"
                            placeholder="min year"
                            {...register("minYear")}
                        />
                    </label>
                    <label className="daisy-input daisy-input-bordered outline-red-500 
                          rounded-none flex items-center w-1/2">
                        <input
                            type="number"
                            className="w-full"
                            placeholder="max year"
                            {...register("maxYear")} />
                    </label>
                </div>
            </div>

            <button className="daisy-btn bg-gray-900 text-gray-50 hover:bg-gray-950 
        hover:text-white daisy-btn-md md:daisy-btn-lg rounded-none my-4">
                Search
            </button>
        </form>
    );
}

function RadioInputBtn({ content, value, register }: {
    content: string,
    value: string,
    register: UseFormRegisterReturn
}) {
    return (
        <label className="cursor-pointer hover:bg-gray-100 min-w-[30%] grow">
            <input
                type="radio"
                className="sr-only peer"
                {...register}
                value={value}
            />
            <div className="border border-gray-200 w-full flex items-center py-2 px-4 text-sm 
            peer-checked:border-gray-800 peer-checked:bg-gray-200 justify-center">
                {content}
            </div>
        </label>
    );
}

