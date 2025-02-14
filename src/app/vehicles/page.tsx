import { breadBrumbLink, BreadBrumbs } from "@/components/BreadCrumbs";
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Vehicles } from "@/components/Vehicles";
import { VehicleSkeletons } from "@/components/VehicleSkeletons";
import { Suspense } from "react";
import { Sort } from "@/components/Sort";
import { VehicleComparator } from "@/components/VehicleComperator";
import { vehiclesPerPage } from "@/data/data";
import { getVehicleCount } from "@/actions/actions";

const breadBrumbsLinks: breadBrumbLink[] = [
  { name: "Home", url: "/" },
  { name: "Vehicles" },
];

export default function VehiclesPage() {
  return (
    <PaddingWrapper>
      <div className="">
        <div className="flex py-2 border-b border-gray-200 justify-between items-center">
          <BreadBrumbs links={breadBrumbsLinks} />
          <div>
            <Suspense>
              <Sort />
            </Suspense>
          </div>
        </div>
        <div>
          <VehicleComparator />
        </div>
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            <div className="col-span-1 row-span-2">
              <Suspense fallback=<VehicleSkeletons amount={2} />>
                <span className="hidden md:block h-full">
                  <SearchForm cannotCollapse />
                </span>
                <span className="md:hidden">
                  <SearchForm />
                </span>
              </Suspense>
            </div>
            <Suspense fallback=<VehicleSkeletons amount={6} /> >
              <Vehicles />
            </Suspense>
          </div>
          <Suspense>
            <div className="flex items-center justify-between">
              <NumberShowing />
              <Pagination />
            </div>
          </Suspense>
        </div>
      </div>
    </PaddingWrapper>
  )
}

async function NumberShowing() {
  const vehicleCount = await getVehicleCount();
  return (
    <div>
      Showing {vehiclesPerPage} of {vehicleCount} vehicles
    </div>
  );
}
