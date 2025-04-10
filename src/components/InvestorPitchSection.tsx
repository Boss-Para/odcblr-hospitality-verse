
import React, { useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Rocket, ArrowRight, Coins, TrendingUp, ArrowUpRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Vault = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coinsDragged, setCoinsDragged] = useState(0);
  const controls = useAnimation();
  
  const handleOpenVault = () => {
    setIsOpen(true);
    controls.start({
      rotateY: [0, -110],
      transition: { duration: 1.5 }
    });
    
    setTimeout(() => {
      // Animate coins spilling out
      const coinElements = document.querySelectorAll('.vault-coin');
      coinElements.forEach((coin, i) => {
        const coinEl = coin as HTMLElement;
        coinEl.style.transform = `translate(${Math.random() * 120 - 60}px, ${Math.random() * 80 + 20}px) rotate(${Math.random() * 360}deg)`;
        coinEl.style.opacity = '1';
        coinEl.style.transition = `all 0.5s ease ${i * 0.1}s`;
      });
    }, 1000);
  };
  
  const handleDragCoin = () => {
    setCoinsDragged(prev => prev + 1);
    if (coinsDragged === 9) {
      toast.success("You've explored all ROI projections!", {
        description: "Contact us to learn more about investment opportunities."
      });
    }
  };
  
  return (
    <div className="relative h-[400px] w-full max-w-md mx-auto">
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-3xl"
        style={{ originY: 1, zIndex: 10 }}
        animate={controls}
      >
        <div className="absolute inset-2 bg-gray-800 rounded-t-2xl border-t-4 border-x-4 border-yellow-500 flex items-center justify-center">
          {!isOpen && (
            <div className="text-center">
              <h3 className="text-white font-bold text-xl mb-2">Investment Vault</h3>
              <p className="text-yellow-500 text-sm">Click to unlock opportunities</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-64 w-64 h-64 bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden rounded-b-3xl border-b-4 border-x-4 border-yellow-500">
        <div className="relative h-full w-full flex flex-col items-center justify-center p-6">
          {isOpen ? (
            <>
              <div className="mb-4 text-center">
                <h3 className="text-white font-bold text-xl">Seed Round</h3>
                <p className="text-yellow-500 font-bold">₹10L = 10% equity</p>
              </div>
              
              {/* Coins */}
              <div className="relative h-24 w-full">
                {[...Array(10)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="vault-coin absolute top-0 left-1/2 transform -translate-x-1/2 h-10 w-10 bg-yellow-500 rounded-full opacity-0 flex items-center justify-center cursor-grab"
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -50, bottom: 100 }}
                    onDragEnd={handleDragCoin}
                  >
                    <div className="h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">ROI</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <Rocket className="w-5 h-5 text-yellow-500" />
                <p className="text-white text-sm font-medium">Projected 5x ROI in 3 years</p>
              </motion.div>
            </>
          ) : (
            <button 
              onClick={handleOpenVault} 
              className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center z-20"
            >
              <span className="sr-only">Open Vault</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InvestorForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Investment inquiry sent!", {
      description: "Our team will contact you shortly with more details."
    });
    setIsOpen(false);
  };
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-india-saffron hover:bg-india-green text-white px-8 py-6 text-lg rounded-full shadow-lg flex items-center gap-2 group"
      >
        Unlock the Vault—Invest Today
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-india-blue">Connect With Our Investment Team</DialogTitle>
            <DialogDescription className="text-center">
              Take the first step towards joining the OdcBlR revolution
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" ref={nameRef} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" ref={emailRef} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="investment">Investment Interest</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant="outline" className="border-india-saffron text-india-saffron">₹5-10 lakhs</Button>
                <Button type="button" variant="outline" className="border-india-green text-india-green">₹10-50 lakhs</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea id="message" placeholder="Tell us about your investment goals..." ref={messageRef} />
            </div>
            
            <DialogFooter>
              <Button type="submit" className="w-full bg-india-blue hover:bg-india-saffron">
                Submit Inquiry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ROICard = ({ 
  title, 
  value, 
  description 
}: { 
  title: string; 
  value: string; 
  description: string 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-india-saffron"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-india-saffron" />
        {title}
      </h3>
      <p className="text-3xl font-bold text-india-blue mb-2">{value}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

const FeatureCheck = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-green-100 p-1">
        <Check className="w-4 h-4 text-green-600" />
      </div>
      <span className="text-gray-600">{text}</span>
    </div>
  );
};

const InvestorPitchSection = () => {
  return (
    <section id="investor-pitch" className="py-20 bg-gradient-to-b from-gray-100 to-india-blue/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-india-blue">
            Investor <span className="text-india-saffron">Opportunity</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the gig revolution—secure your stake in India's hospitality future.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-india-blue">Your Investment, Our Growth</h3>
            <Vault />
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ROICard 
                title="Year 3 Projection"
                value="₹50L"
                description="Estimated return on ₹10L investment"
              />
              <ROICard 
                title="Market Growth"
                value="20%+"
                description="Annual hospitality gig market growth rate"
              />
            </div>
            
            <div className="mt-10 flex justify-center">
              <InvestorForm />
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-india-blue flex items-center gap-2">
                <Coins className="w-6 h-6 text-india-saffron" />
                Investment Highlights
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <span className="bg-india-saffron/20 text-india-saffron rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    First-Mover Advantage
                  </h4>
                  <div className="space-y-2 ml-8">
                    <FeatureCheck text="India's first blockchain-based hospitality gig platform" />
                    <FeatureCheck text="Untapped market of 1M+ hospitality students" />
                    <FeatureCheck text="No direct competitors with our feature set" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <span className="bg-india-green/20 text-india-green rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Sustainable Revenue Model
                  </h4>
                  <div className="space-y-2 ml-8">
                    <FeatureCheck text="Multiple subscription tiers with high margins" />
                    <FeatureCheck text="Recurring revenue from both sides of marketplace" />
                    <FeatureCheck text="Transaction fees from successful placements" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <span className="bg-india-blue/20 text-india-blue rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Scalability Path
                  </h4>
                  <div className="space-y-2 ml-8">
                    <FeatureCheck text="Minimal marginal costs for additional users" />
                    <FeatureCheck text="Expansion to additional Indian cities without infrastructure costs" />
                    <FeatureCheck text="Technology stack supports millions of users" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <span className="bg-purple-600/20 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Exit Strategy Options
                  </h4>
                  <div className="space-y-2 ml-8">
                    <FeatureCheck text="Acquisition by hospitality groups or job platforms" />
                    <FeatureCheck text="Series A+ funding in 18-24 months" />
                    <FeatureCheck text="Potential IPO pathway after significant market penetration" />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-india-saffron/20 p-2 rounded-full">
                    <ArrowUpRight className="w-5 h-5 text-india-saffron" />
                  </div>
                  <div>
                    <h4 className="font-bold">Current Fundraising Round</h4>
                    <p className="text-gray-600 text-sm">Seeking ₹10L-₹50L in seed funding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorPitchSection;
