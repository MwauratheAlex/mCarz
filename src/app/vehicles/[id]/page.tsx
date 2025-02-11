import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Vehicle } from "@/components/Vehicle";

export const dynamic = "force-static"

export default function VehiclePage() {
  return (
    <PaddingWrapper>
      <Vehicle />
    </PaddingWrapper>
  );
}

