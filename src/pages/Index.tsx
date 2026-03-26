import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import AboutStatsSection from "@/components/AboutStatsSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import MultiStepForm from "@/components/MultiStepForm";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState("");

  const openForm = useCallback(() => {
    setPreselectedType("");
    setFormOpen(true);
  }, []);

  const openFormWithType = useCallback((type: string) => {
    setPreselectedType(type);
    setFormOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRequestClick={openForm} />
      <main>
        <HeroSection onRequestClick={openForm} />
        <AboutStatsSection />
        <ProcessSection />
        <ServicesSection onSelectInsurance={openFormWithType} />
        <AboutSection />
      </main>
      <Footer />
      <MultiStepForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        preselectedType={preselectedType}
      />
    </div>
  );
};

export default Index;
