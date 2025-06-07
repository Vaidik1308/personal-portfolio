import AboutMe from "@/components/Home/AboutMe/AboutMe";
import Experience from "@/components/Home/experience/Expirience";
import HeroSection from "@/components/Home/HeroSection";
import SkillsSection from "@/components/Home/SkillsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <HeroSection/>
      <AboutMe/>

      <Experience/>
      
      <SkillsSection/>
    </main>
  );
}
