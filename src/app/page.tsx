import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Search } from "@/components/Search";
import { StepsToOwn } from "@/components/StepsToOwn";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Search />
      <StepsToOwn />
      <Footer />
    </div>
  );
}

