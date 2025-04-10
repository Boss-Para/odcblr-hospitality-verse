
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-india-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">OdcBlR</h3>
            <p className="text-gray-300 mb-6">
              Revolutionizing India's hospitality gig economy through blockchain technology 
              and innovative mobile solutions.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Linkedin className="h-4 w-4" />} />
              <SocialIcon icon={<Twitter className="h-4 w-4" />} />
              <SocialIcon icon={<Facebook className="h-4 w-4" />} />
              <SocialIcon icon={<Instagram className="h-4 w-4" />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#market-potential">Market Potential</FooterLink>
              <FooterLink href="#business-plan">Business Plan</FooterLink>
              <FooterLink href="#investor-pitch">Investor Pitch</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-india-saffron" />
                <span>starshape2025@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-india-saffron" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-india-saffron" />
                <span>Bangalore<br/>Karnataka, India</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button className="bg-india-saffron hover:bg-india-green text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} OdcBlR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <a href="#" className="h-8 w-8 rounded-full bg-white/10 hover:bg-india-saffron flex items-center justify-center transition-colors">
      {icon}
    </a>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <a 
        href={href}
        className="hover:text-india-saffron transition-colors hover:underline"
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;
