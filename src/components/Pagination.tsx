"use client"

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Pagination({ totalPages, currentPage }: {
    totalPages: number, currentPage: number
}) {
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
    const router = useRouter()

    return (
        <button
            className={cn(
                "daisy-join-item daisy-btn disabled:bg-gray-100/75 disabled:text-gray-500",
                active && "daisy-btn-active",
            )}
            disabled={disabled}
            onClick={() => router.push(`/vehicles/page/${page}`)}
        >
            {page}
        </button>
    );
}

