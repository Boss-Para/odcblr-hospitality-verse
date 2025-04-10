import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Phone, MessageSquareText, Briefcase, Clock } from "lucide-react";

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 flex flex-col items-center text-center"
    >
      <div className="bg-india-saffron/20 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-india-blue mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const BlockchainCube = () => {
  const [isRotated, setIsRotated] = useState(false);
  
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotateY: isRotated ? 180 : 0 }}
      transition={{ duration: 0.8 }}
      onClick={() => setIsRotated(!isRotated)}
      className="w-64 h-64 cursor-pointer perspective-1000"
    >
      <div className="w-full h-full relative preserve-3d">
        <div className="absolute w-full h-full backface-hidden bg-india-saffron rounded-xl flex flex-col justify-center items-center p-6">
          <div className="text-white text-center">
            <h3 className="font-bold text-2xl mb-4">Smart Contract</h3>
            <p>Secure, transparent blockchain technology powers every gig.</p>
            <p className="mt-4 text-sm">Click to see contract details</p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotateY-180 bg-india-green rounded-xl flex flex-col justify-center items-center p-6">
          <div className="text-white text-center">
            <h3 className="font-bold text-xl mb-2">Contract Clauses</h3>
            <ul className="text-sm text-left space-y-2">
              <li>• Overtime: +50% after 8 hours</li>
              <li>• Cancellation: 4hr notice required</li>
              <li>• Dispute Resolution: 24hr response</li>
              <li>• Payment: 15-day guarantee</li>
            </ul>
            <p className="mt-4 text-xs">Click to flip back</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WalletDemo = () => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <motion.div 
      className="relative w-80 h-80"
      animate={{ rotateY: isActive ? 360 : 0 }}
      transition={{ duration: 1.5 }}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6">
        <div className="h-40 w-40 rounded-full bg-gradient-to-r from-india-saffron to-india-green flex items-center justify-center mb-6">
          <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-india-blue">
            Wallet
          </div>
        </div>
        
        <div className="space-y-2 text-center">
          <p className="font-bold text-xl">Dual Wallet System</p>
          <p className="text-sm text-gray-600">Escrow + Personal Wallet</p>
          <p className="text-xs text-india-saffron">Click to see payment flow</p>
        </div>
      </div>
      
      {isActive && (
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative w-full h-40 mb-6">
            <motion.div 
              className="absolute top-0 left-10 h-12 w-24 rounded-lg bg-india-blue text-white flex items-center justify-center"
              animate={{ y: [0, 20, 40] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Client
            </motion.div>
            
            <motion.div 
              className="absolute top-12 left-1/2 transform -translate-x-1/2 h-12 w-32 rounded-lg bg-india-saffron text-white flex items-center justify-center"
            >
              Escrow
            </motion.div>
            
            <motion.div 
              className="absolute bottom-0 right-10 h-12 w-24 rounded-lg bg-india-green text-white flex items-center justify-center"
              animate={{ y: [40, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              Student
            </motion.div>
            
            <motion.div 
              className="absolute h-2 w-2 rounded-full bg-india-saffron"
              initial={{ x: 22, y: 6 }}
              animate={{ 
                x: [22, 120, 220],
                y: [6, 26, 46],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          
          <div className="text-center">
            <p className="font-bold">Secure Payment Flow</p>
            <p className="text-xs text-gray-600">Funds held in escrow until job completion</p>
            <p className="text-xs text-india-saffron mt-4">Click to see wallet</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-india-blue">
            Revolutionary <span className="text-india-saffron">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Blockchain-secured gigs, instant payments, AI-powered support—OdcBlR redefines hospitality work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-india-saffron" />}
            title="On-Demand Gigs"
            description="Connect with hospitality venues for per-day gigs or temporary shifts with secure contracts and guaranteed payments."
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8 text-india-saffron" />}
            title="Permanent Roles"
            description="Discover and secure permanent positions through our verified employer network and digital CV showcase."
          />
          <FeatureCard
            icon={<MessageSquareText className="h-8 w-8 text-india-saffron" />}
            title="Multilingual AI Support"
            description="Get help in 7 Indian languages with our AI chatbot assistant, available 24/7 for students and clients."
          />
        </div>

        <Tabs defaultValue="blockchain" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="blockchain" className="data-[state=active]:bg-india-saffron data-[state=active]:text-white">
                Blockchain Security
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-india-saffron data-[state=active]:text-white">
                Payment System
              </TabsTrigger>
              <TabsTrigger value="app" className="data-[state=active]:bg-india-saffron data-[state=active]:text-white">
                App Experience
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="blockchain" className="mt-0">
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h3 className="text-2xl font-bold mb-4 text-india-blue">Smart Contract Security</h3>
                <p className="mb-4 text-gray-600">
                  Every gig is secured by blockchain technology, ensuring transparent terms, 
                  fair payments, and protection for both students and employers.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-saffron mr-2"></div>
                    <span>Immutable work records</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-saffron mr-2"></div>
                    <span>Automated payment releases</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-saffron mr-2"></div>
                    <span>Dispute resolution protocols</span>
                  </li>
                </ul>
                <Button className="bg-india-blue hover:bg-india-green text-white">
                  Learn More
                </Button>
              </div>
              <BlockchainCube />
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h3 className="text-2xl font-bold mb-4 text-india-blue">Dual Wallet System</h3>
                <p className="mb-4 text-gray-600">
                  Our innovative payment structure ensures security and timely payments through an escrow system 
                  and personal wallet for all users.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-green mr-2"></div>
                    <span>Escrow protection for clients</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-green mr-2"></div>
                    <span>15-day payment guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-green mr-2"></div>
                    <span>Instant withdrawals to bank accounts</span>
                  </li>
                </ul>
                <Button className="bg-india-blue hover:bg-india-green text-white">
                  How It Works
                </Button>
              </div>
              <WalletDemo />
            </div>
          </TabsContent>

          <TabsContent value="app" className="mt-0">
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h3 className="text-2xl font-bold mb-4 text-india-blue">Intuitive Mobile Experience</h3>
                <p className="mb-4 text-gray-600">
                  Our mobile app provides a seamless experience for both students and clients, 
                  with real-time notifications, geofencing, and AI-powered matching.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-blue mr-2"></div>
                    <span>Geo-fenced check-ins</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-blue mr-2"></div>
                    <span>7 language support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-india-blue mr-2"></div>
                    <span>Personalized job matching</span>
                  </li>
                </ul>
                <Button className="bg-india-saffron hover:bg-india-green text-white">
                  View Demo
                </Button>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-[500px] w-[250px]"
              >
                <div className="absolute inset-0 bg-black rounded-[40px] shadow-xl overflow-hidden border-[10px] border-gray-800">
                  <div className="relative h-full w-full bg-gradient-to-b from-india-saffron to-india-blue p-2">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-b-xl"></div>
                    <div className="h-full w-full bg-white rounded-lg overflow-hidden flex flex-col mt-6">
                      <div className="bg-india-blue text-white p-4 text-center">
                        <h4 className="font-bold">OdcBlR</h4>
                      </div>
                      <div className="p-4">
                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                          <div className="font-bold text-india-blue">Today's Top Gigs</div>
                          <div className="text-xs text-gray-600">3 new opportunities</div>
                        </div>
                        
                        <div className="space-y-3">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
                              <div className="font-bold text-sm">Taj Mumbai</div>
                              <div className="text-xs text-gray-500">Waitstaff • ₹200/hr</div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">7km away</span>
                                <Button size="sm" className="bg-india-saffron h-7 text-xs">Apply</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
