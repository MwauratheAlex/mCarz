"use client"
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Vehicles } from "@/components/Vehicles";
import { VehicleSkeletons } from "@/components/VehicleSkeletons";
import { Suspense } from "react";

export default function VehiclesPage() {
  return (
    <PaddingWrapper>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="col-span-1 row-span-2">
            <Suspense fallback=<VehicleSkeletons amount={2} />>
              <SearchForm />
            </Suspense>
          </div>
          <Suspense fallback=<VehicleSkeletons amount={6} /> >
            <Vehicles />
          </Suspense>
        </div>
        <div>
          <Suspense
            fallback=<span className="daisy-loading daisy-loading-dots" />
          >
            <Pagination />

          </Suspense>
        </div>
      </div>
    </PaddingWrapper>
  )
}
