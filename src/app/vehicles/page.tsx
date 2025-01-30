import { getVehiclePages, GetVehicles } from "@/actions/actions"
import { Pagination } from "@/components/Pagination";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { VehicleCard } from "@/components/VehicleCard";


export default async function VehiclesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const totalPages = await getVehiclePages()
  const vehicles = await GetVehicles(searchParams);

  return (
    <div>
      <PaddingWrapper>
        <div className="grid grid-cols-4 gap-2">
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
      </PaddingWrapper>
    </div>
  )
}


