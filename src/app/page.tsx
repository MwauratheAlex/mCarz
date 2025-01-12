import { Hero } from "@/components/Hero";
import { Search } from "@/components/Search";
import { StepsToOwn } from "@/components/StepsToOwn";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Search />
      <StepsToOwn />
    </div>
  );
}

