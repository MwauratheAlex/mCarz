import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Vehicle } from "@/components/Vehicle";

export default async function VehiclePage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PaddingWrapper>
      <Vehicle id={id} />
    </PaddingWrapper>
  );
}

