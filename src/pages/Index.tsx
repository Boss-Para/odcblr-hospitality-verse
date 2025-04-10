
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HomeScene from "@/components/HomeScene";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MarketPotentialSection from "@/components/MarketPotentialSection";
import BusinessPlanSection from "@/components/BusinessPlanSection";
import InvestorPitchSection from "@/components/InvestorPitchSection";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Index = () => {
  // Welcome toast on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Welcome to OdcBlR", {
        description: "Explore India's revolutionary hospitality gig platform",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section with 3D Scene - reduced to 90vh instead of 100vh (h-screen) */}
      <section className="h-[90vh] relative">
        <HomeScene />
      </section>
      
      {/* Content Sections - start immediately after hero section */}
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="market-potential">
        <MarketPotentialSection />
      </div>
      <div id="business-plan">
        <BusinessPlanSection />
      </div>
      <div id="investor-pitch">
        <InvestorPitchSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
