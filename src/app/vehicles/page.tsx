import { getVehiclePages, getVehicles } from "@/actions/actions"
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { VehicleCard } from "@/components/VehicleCard";
import { Suspense } from "react";

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getVehiclePages();
  return Array.from(
    { length: pages },
    (_, idx) => ({ page: String(idx + 1) })
  )
}

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
          {vehicles.length === 0 && (
            <div className="col-span-1 lg:col-span-3 w-full flex-col
              row-span-3 flex items-center justify-center h-full tracking-wide">
              <p className="text-3xl font-semibold text-red-400">
                No vehicles found!
              </p>
              <p className="text-gray-600">
                Please try modifying your filter.
              </p>
            </div>
          )}
        </div>
        <div>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </PaddingWrapper>
  )
}

