import { getVehicleById } from "@/actions/actions";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { ImageCorousel } from "@/components/VehicleCard";

export default async function VehiclePage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vehicle = await getVehicleById(id)

  if (!vehicle) {
    return (
      <div>Vehicle not found</div>
    );
  }

  return (
    <PaddingWrapper>
      <div className="flex py-4 gap-2">
        <div className="w-1/2 rounded-lg overflow-hidden">
          <ImageCorousel
            imgUrls={vehicle.imgUrls}
            className="h-96"
          />
        </div>
        <div className="w-1/2 px-4 pr-0 flex flex-col gap-2">
          <h1 className="font-semibold text-4xl">
            {`${vehicle.make} ${vehicle.model}`}
          </h1>
          <p className="text-gray-900 tracking-wide">
            {vehicle.description}
          </p>
        </div>
      </div>
    </PaddingWrapper>
  );
}
