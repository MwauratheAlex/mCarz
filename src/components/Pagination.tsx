"use client"

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1
    const { replace } = useRouter()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

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
                    onClick={createPageURL}
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
                        onClick={createPageURL}
                        page={page}
                        active={active}
                        disabled={disabled}
                    />)
            })}

            <PaginationButton
                onClick={createPageURL}
                page={totalPages}
                active={currentPage === totalPages}
            />
        </div>
    );
}

function PaginationButton({ page, active, disabled, onClick }: {
    page: number | string,
    active?: boolean,
    disabled?: boolean,
    onClick: (pageNumber: number | string) => void
}) {
    return (
        <button
            className={cn(
                "daisy-join-item daisy-btn disabled:bg-gray-100/75 disabled:text-gray-500",
                active && "daisy-btn-active",
            )}
            disabled={disabled}
            onClick={() => onClick(page)}
        >
            {page}
        </button>
    );
}
