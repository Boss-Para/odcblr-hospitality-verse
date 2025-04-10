
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80, // Offset for navbar height
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-black/40 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? "text-india-blue" : "text-white"}`}>
              OdcBlR
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink onClick={() => scrollToSection("features")} isScrolled={isScrolled}>
              Features
            </NavLink>
            <NavLink onClick={() => scrollToSection("how-it-works")} isScrolled={isScrolled}>
              How It Works
            </NavLink>
            <NavLink onClick={() => scrollToSection("market-potential")} isScrolled={isScrolled}>
              Market Potential
            </NavLink>
            <NavLink onClick={() => scrollToSection("business-plan")} isScrolled={isScrolled}>
              Business Plan
            </NavLink>
            <Button
              onClick={() => scrollToSection("investor-pitch")}
              className="bg-india-saffron hover:bg-india-green text-white"
            >
              Invest Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? "text-india-blue" : "text-white"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? "text-india-blue" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced visibility */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4 flex flex-col space-y-4">
          <MobileNavLink onClick={() => scrollToSection("features")}>
            Features
          </MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection("how-it-works")}>
            How It Works
          </MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection("market-potential")}>
            Market Potential
          </MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection("business-plan")}>
            Business Plan
          </MobileNavLink>
          <Button
            onClick={() => scrollToSection("investor-pitch")}
            className="bg-india-saffron hover:bg-india-green text-white w-full"
          >
            Invest Now
          </Button>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ 
  children, 
  onClick, 
  isScrolled 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  isScrolled: boolean 
}) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium transition-colors hover:text-india-saffron ${
        isScrolled ? "text-india-blue" : "text-white"
      }`}
    >
      {children}
    </button>
  );
};

const MobileNavLink = ({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="font-medium text-india-blue hover:text-india-saffron py-2 w-full text-left"
    >
      {children}
    </button>
  );
};

export default Navbar;
