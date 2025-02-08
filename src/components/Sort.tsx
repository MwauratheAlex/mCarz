
"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function Sort() {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = new URLSearchParams(useSearchParams())

    const handleValueChange = (value: string) => {
        if (value === "none") {
            searchParams.delete("sort")
        } else {
            searchParams.set("sort", value)
        }

        router.replace(`${pathname}?${searchParams.toString()}`)
    }

    let sortValue = "none";
    const sortSearchParam = searchParams.get("sort")
    if (sortSearchParam === "asc" || sortSearchParam === "desc") {
        sortValue = sortSearchParam;
    }


    return (
        <div className="flex gap-2 items-center border border-gray-100 rounded-2xl py-1 px-4">
            <p className="tracking-wider text-gray-900">sort price</p>
            <SelectInput
                handleValueChange={handleValueChange}
                value={sortValue}
            />
        </div>
    );
}

function SelectInput({ handleValueChange, value }: {
    handleValueChange: (value: string) => void,
    value: string
}) {
    return (
        <Select onValueChange={handleValueChange} value={value}>
            <SelectTrigger className="w-32 border-gray-50 shadow-lg shadow-black/10 bg-gray-100 text-gray-900 tracking-wide">
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent className="">
                <SelectGroup>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="asc">ascending</SelectItem>
                    <SelectItem value="desc">descending</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

