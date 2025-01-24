import { GetVehicles } from "@/actions/actions"
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { VehicleCard } from "@/components/VehicleCard";

export default async function VehiclesPage() {
  const vehicles = await GetVehicles();

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
      </PaddingWrapper>
    </div>
  )
}

