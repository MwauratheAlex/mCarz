import { GiCargoShip } from "react-icons/gi";

export default function Home() {
  return (
    <div className="px-4">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header className="flex justify-between border border-red-500 py-4">
      <Logo />
      <ul className="flex gap-4">
        <li>Vehicles</li>
        <li>Bikes</li>
        <li>Sell Your Car</li>
        <li>About</li>
        <li>Contact</li>
        <li>FAQ</li>
        <li><ThemeChangeBtn /></li>
      </ul>
    </header>
  );
}

function Logo() {
  return (
    <div className="font-semibold text-xl font-mono">
      <GiCargoShip size={70} />
      mCarz
    </div>
  );
}

function ThemeChangeBtn() {
  return (
    <button>Themes</button>
  );
}
