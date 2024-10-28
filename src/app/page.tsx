import AboutMe from "@/components/Home/AboutMe/AboutMe";
import Experience from "@/components/Home/experience/Expirience";
import HeroSection from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <HeroSection/>
      <AboutMe/>
      <Experience/>
    </main>
  );
}
