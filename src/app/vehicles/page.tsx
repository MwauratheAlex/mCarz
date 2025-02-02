import { getVehiclePages, getVehicles } from "@/actions/actions"
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { VehicleCard } from "@/components/VehicleCard";
import { Suspense } from "react";

export default async function VehiclesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const [vehicles, totalPages] = await Promise.all([
    getVehicles(searchParams),
    getVehiclePages(searchParams),
  ])

  return (
    <PaddingWrapper>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="col-span-1 row-span-2">
            <Suspense>
              <SearchForm />
            </Suspense>
          </div>
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
            />
          ))}
        </div>
        <div>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </PaddingWrapper>
  )
}

