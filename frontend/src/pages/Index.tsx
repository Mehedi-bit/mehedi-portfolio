import { Hero } from "@/components/Hero";
import { LimitedAvailability } from "@/components/LimitedAvailability";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Stats } from "@/components/Stats";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <LimitedAvailability />
      <Projects />
      <Skills />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
