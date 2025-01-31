import { GetVehicles } from "@/actions/actions"
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { VehicleCard } from "@/components/VehicleCard";
import { vehiclesPerPage } from "@/data/data";



export default async function VehiclesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const vehicles = await GetVehicles(searchParams);
  const totalPages = Math.floor(vehicles.length / vehiclesPerPage) + 1


  return (
    <PaddingWrapper>
      <div className="py-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1 row-span-2">
            <SearchForm />
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

