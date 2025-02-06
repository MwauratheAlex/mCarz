import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Suspense } from "react";


export default function VehiclesLoadingPage() {
  const vehicles = Array.from({ length: 6 });

  return (
    <PaddingWrapper>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="col-span-1 row-span-2">
            <Suspense>
              <SearchForm />
            </Suspense>
          </div>
          {vehicles.map((_, idx) => (
            <VehicleCardLoadingSkeleton key={`loading-vehicles-${idx}`} />
          ))}
        </div>
      </div>
    </PaddingWrapper>
  )
}

function VehicleCardLoadingSkeleton() {
  return (
    <div className="daisy-card bg-gray-100 shadow-xl">
      {/* Image placeholder */}
      <figure>
        <div className="daisy-skeleton h-48 w-full rounded-b-none"></div>
      </figure>
      <div className="daisy-card-body">
        {/* Vehicle year and title */}
        <div className="flex items-center gap-2">
          <div className="daisy-badge daisy-badge-sm bg-gray-200 shadow-xl w-16 h-4"></div>
          <div className="daisy-skeleton h-4 w-40"></div>
        </div>
        <div className="flex flex-col gap-2 py-2">
          {/* Vehicle details like transmission, engine size, etc. */}
          <div className="flex gap-4">
            <div className="daisy-badge bg-gray-300 shadow-xl w-16 h-4"></div>
            <div className="daisy-badge bg-gray-300 shadow-xl w-16 h-4"></div>
            <div className="daisy-badge bg-gray-300 shadow-xl w-16 h-4"></div>
          </div>
          {/* Vehicle description */}
          <div className="daisy-skeleton h-4 w-full"></div>
          <div className="daisy-skeleton h-4 w-full"></div>
          <div className="daisy-skeleton h-4 w-full"></div>
        </div>
        <div className="daisy-divider"></div>
        {/* Asking price and compare button */}
        <div className="daisy-card-actions justify-between items-center">
          <div className="daisy-skeleton h-6 w-24"></div>
          <div className="daisy-skeleton h-10 w-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
