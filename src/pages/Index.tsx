
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
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Hotel, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Welcome to OdcBlR", {
        description: "Explore India's revolutionary hospitality gig platform",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background Image Section */}
      <section className="w-full h-[500px] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/a9a230d3-dfc8-463f-bd51-aaf31e59927d.png')",
            backgroundAttachment: "fixed",
            filter: "brightness(0.7)"
          }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
          >
            OdcBlR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg"
          >
            India's first blockchain-powered hospitality gig platform connecting students to opportunities
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <div className="flex items-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              <Hotel className="w-8 h-8 text-india-saffron mr-3" />
              <div>
                <h3 className="font-bold">1L+ Hotels</h3>
                <p className="text-sm opacity-80">Connected nationwide</p>
              </div>
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              <Star className="w-8 h-8 text-india-saffron mr-3" />
              <div>
                <h3 className="font-bold">5-Star Experience</h3>
                <p className="text-sm opacity-80">Premium opportunities</p>
              </div>
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              <MapPin className="w-8 h-8 text-india-saffron mr-3" />
              <div>
                <h3 className="font-bold">Pan-India</h3>
                <p className="text-sm opacity-80">Jobs across the country</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Hotel Showcase Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Hotel Partners</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {[
                {
                  name: "Grand Hyatt Mumbai",
                  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                  jobs: "12 positions available"
                },
                {
                  name: "Taj Palace New Delhi",
                  image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
                  jobs: "8 positions available"
                },
                {
                  name: "Leela Palace Bangalore",
                  image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
                  jobs: "15 positions available"
                },
                {
                  name: "JW Marriott Kolkata",
                  image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c",
                  jobs: "9 positions available"
                }
              ].map((hotel, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${hotel.image})` }}
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{hotel.name}</h3>
                      <p className="text-india-green">{hotel.jobs}</p>
                      <Button variant="outline" className="w-full mt-4">
                        View Opportunities
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6" />
            <CarouselNext className="-right-4 md:-right-6" />
          </Carousel>
        </div>
      </section>
      
      <section className="h-[80vh] relative">
        <HomeScene />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div 
                className="absolute inset-0 -mx-4 -my-6 md:-my-8 rounded-2xl bg-gradient-to-r from-india-saffron/20 to-india-blue/20 backdrop-blur-sm"
                style={{
                  backgroundImage: "url('/lovable-uploads/a9a230d3-dfc8-463f-bd51-aaf31e59927d.png')",
                  backgroundSize: "180px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  boxShadow: "0 0 50px rgba(255, 153, 51, 0.3), inset 0 0 30px rgba(0, 0, 128, 0.2)",
                  opacity: 0.9,
                  transform: "scale(1.1)",
                  zIndex: -1
                }}
              ></div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                OdcBlR
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
                India's first blockchain-powered hospitality gig platform connecting students to opportunities
              </p>
              <Button 
                onClick={() => scrollToSection("investor-pitch")}
                className="bg-india-saffron hover:bg-india-green text-white text-lg px-8 py-6"
              >
                Invest Now <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => scrollToSection("hero-content")}
        >
          <p className="mb-2 text-sm">Scroll to learn more</p>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      <section id="hero-content" className="py-16 bg-gradient-to-b from-india-blue/10 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-india-blue leading-tight">
                Transforming Hospitality <span className="text-india-saffron">Employment</span> in India
              </h2>
              <p className="text-lg text-gray-700">
                Our platform bridges the gap between hospitality businesses and skilled students, creating 
                a secure, transparent marketplace powered by blockchain technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-india-saffron mr-3 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-lg">Secure Smart Contracts</h3>
                    <p className="text-gray-600">Every gig backed by blockchain for guaranteed payment and verifiable work history</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-india-green mr-3 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-lg">Verified Employers</h3>
                    <p className="text-gray-600">All businesses undergo thorough verification for student safety and reputation management</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-india-blue mr-3 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-lg">Skill Development</h3>
                    <p className="text-gray-600">Students gain valuable experience and build verifiable skill portfolios</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-india-saffron mb-2">3.5L+</div>
                <div className="font-medium text-gray-600">Students Graduated</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-india-green mb-2">1L+</div>
                <div className="font-medium text-gray-600">Hotels</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-india-blue mb-2">20L+</div>
                <div className="font-medium text-gray-600">Restaurants</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-india-saffron mb-2">3L+</div>
                <div className="font-medium text-gray-600">Catering Services</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
      
      <Footer />
    </div>
  );
};

export default Index;
