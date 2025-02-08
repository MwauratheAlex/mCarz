"use client"

import { getVehiclePages } from "@/actions/actions";
import { cn } from "@/lib/utils";
import { SearchParams } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination() {

    const searchParams = Object.fromEntries(
        useSearchParams().entries()
    ) as SearchParams;

    let currentPage = 1;
    if (searchParams.page) {
        currentPage = Number(searchParams.page)
    }

    const { data: totalPages, error } = useQuery({
        queryKey: ["totalPages", searchParams],
        queryFn: () => getVehiclePages(searchParams),
    })

    if (!totalPages || error) {
        return <PaginationLoading />
    }

    const getPaginationRange = () => {
        let start = currentPage - 4;
        if (start < 2) {
            start = 2;
        }
        let end = currentPage + 4;
        const paginationLen = end - start;
        if (paginationLen < 10) {
            end += 6 - (paginationLen);
        }

        if (end >= totalPages) {
            end = totalPages - 1;
        }

        return [
            start === 2 ? null : "...",
            ...Array.from({ length: end - start + 1 }, (_, idx) => start + idx),
            end !== totalPages - 1 ? "..." : null
        ];
    };

    const middlePages = getPaginationRange();

    return (
        <div className="daisy-join float-end my-4">
            {totalPages > 1 && (
                <PaginationButton
                    page={1}
                    active={currentPage === 1}
                />
            )}

            {middlePages.map((page, idx) => {
                if (!page) return;

                const active = page === currentPage;
                const disabled = page === "..."

                return (
                    <PaginationButton
                        key={`page-${idx}`}
                        page={page}
                        active={active}
                        disabled={disabled}
                    />)
            })}

            <PaginationButton
                page={totalPages}
                active={currentPage === totalPages}
            />
        </div>
    );
}

function PaginationButton({ page, active, disabled }: {
    page: number | string,
    active?: boolean,
    disabled?: boolean,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = new URLSearchParams(useSearchParams());

    const handleClick = () => {
        // deleting page 1 because we aready prefetched /vehicles
        if (page === 1) {
            searchParams.delete("page")
        } else {
            searchParams.set("page", page.toString());
        }
        router.replace(`${pathname}?${searchParams.toString()}`)
    }

    return (
        <button
            className={cn(
                "daisy-join-item daisy-btn disabled:bg-gray-100/75 disabled:text-gray-500",
                "",
                active && "daisy-btn-active",
            )}
            disabled={disabled}
            onClick={handleClick}
        >
            {page}
        </button>
    );
}


function PaginationLoading() {
    return (
        <div className="daisy-join float-end my-4">
            <div className="daisy-skeleton h-12 w-32 "></div>
        </div>
    );
}
