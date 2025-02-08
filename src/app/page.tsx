import { Hero } from "@/components/Hero";
import { prefetchVehicles } from "@/components/Providers";
import { Search } from "@/components/Search";
import { StepsToOwn } from "@/components/StepsToOwn";

export default function Home() {
  return (
    <div className="relative" onMouseEnter={prefetchVehicles}>
      <Hero />
      <Search />
      <StepsToOwn />
    </div>
  );
}

