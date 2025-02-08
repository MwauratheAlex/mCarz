"use client"
import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Vehicles } from "@/components/Vehicles";

export default function VehiclesPage() {
  return (
    <PaddingWrapper>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="col-span-1 row-span-2">
            <SearchForm />
          </div>
          <Vehicles />
        </div>
        <div>
          {/*
          <Suspense
            fallback=<span className="daisy-loading daisy-loading-dots" />
          >
            <Paginator currentPage={1} />
          </Suspense>
          */}
        </div>
      </div>
    </PaddingWrapper>
  )
}
