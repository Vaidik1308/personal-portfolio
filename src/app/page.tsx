import Image from "next/image";
import HeroSection from "./components/Home/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <HeroSection/>
    </main>
  );
}
