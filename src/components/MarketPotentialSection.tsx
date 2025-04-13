
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Building, Shield, Clock, Timer } from "lucide-react";

// City Data
const cityData = [
  { name: "Delhi", students: 250000, venues: 15000, value: 250000, lat: 28.6, lng: 77.2 },
  { name: "Mumbai", students: 300000, venues: 18000, value: 300000, lat: 19.0, lng: 72.8 },
  { name: "Bangalore", students: 200000, venues: 12000, value: 200000, lat: 12.9, lng: 77.6 },
  { name: "Chennai", students: 150000, venues: 8000, value: 150000, lat: 13.0, lng: 80.2 },
  { name: "Hyderabad", students: 180000, venues: 10000, value: 180000, lat: 17.3, lng: 78.4 },
  { name: "Kolkata", students: 120000, venues: 7000, value: 120000, lat: 22.5, lng: 88.3 },
];

const CityCard = ({ 
  city, 
  isActive, 
  onClick 
}: { 
  city: typeof cityData[0]; 
  isActive: boolean; 
  onClick: () => void 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-lg p-3 cursor-pointer shadow-md transition-colors ${
        isActive ? "bg-india-blue text-white" : "bg-white text-gray-800"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4" />
        <h3 className="font-bold text-sm">{city.name}</h3>
      </div>
    </motion.div>
  );
};

const IndiaMap = ({ activeCity, setActiveCity }: { activeCity: number; setActiveCity: (index: number) => void }) => {
  return (
    <div className="relative h-[400px] w-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-inner">
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/India_location_map.svg')] bg-contain bg-center bg-no-repeat opacity-30"></div>
      
      {/* Enhanced 3D effect for the map */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 z-10"
        animate={{
          background: [
            "linear-gradient(to top right, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.3))",
            "linear-gradient(to top right, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.35))",
            "linear-gradient(to top right, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.3))"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* City Markers */}
      {cityData.map((city, index) => (
        <motion.div
          key={city.name}
          className="absolute h-5 w-5 rounded-full cursor-pointer z-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${(1 - (city.lat - 10) / 30) * 90}%`,
            left: `${((city.lng - 70) / 20) * 80 + 10}%`,
            backgroundColor: activeCity === index ? '#FF9933' : '#000080'
          }}
          whileHover={{ scale: 1.5 }}
          animate={{ 
            scale: activeCity === index ? [1.2, 1.5, 1.2] : 1,
            boxShadow: activeCity === index ? '0 0 15px 5px rgba(255, 153, 51, 0.5)' : 'none'
          }}
          transition={{ 
            repeat: activeCity === index ? Infinity : undefined, 
            duration: 1.5 
          }}
          onClick={() => setActiveCity(index)}
        >
          {activeCity === index && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-20 -left-16 bg-white p-2 rounded-lg shadow-lg w-32 z-30"
            >
              <p className="font-bold text-xs text-india-blue">{city.name}</p>
              <div className="flex items-center text-xs text-gray-600">
                <Users className="h-3 w-3 mr-1" />
                <p>{(city.students / 1000).toFixed(0)}K students</p>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Building className="h-3 w-3 mr-1" />
                <p>{(city.venues / 1000).toFixed(0)}K venues</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Enhanced connections between cities - creates a network effect */}
      <svg className="absolute inset-0 z-0 w-full h-full">
        {cityData.map((city, i) => (
          cityData.slice(i + 1).map((otherCity, j) => (
            <motion.line
              key={`${city.name}-${otherCity.name}`}
              x1={`${((city.lng - 70) / 20) * 80 + 10}%`}
              y1={`${(1 - (city.lat - 10) / 30) * 90}%`}
              x2={`${((otherCity.lng - 70) / 20) * 80 + 10}%`}
              y2={`${(1 - (otherCity.lat - 10) / 30) * 90}%`}
              stroke={i === activeCity || i + j + 1 === activeCity ? "#FF9933" : "#ddd"}
              strokeWidth={i === activeCity || i + j + 1 === activeCity ? 2 : 1}
              strokeDasharray="5,5"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          ))
        ))}
      </svg>
      
      <motion.div 
        className="absolute bottom-6 right-6 bg-white/90 p-4 rounded-lg shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-bold text-india-blue">OdcBlR Market</h3>
        <p className="text-india-saffron text-sm font-bold">₹50,000 Cr Industry</p>
        <p className="text-gray-600 text-xs">3.5L+ hospitality students</p>
        <p className="text-gray-600 text-xs">2M+ venues nationwide</p>
      </motion.div>
    </div>
  );
};

// Redesigned Payment Guarantee Component without progress bars
const PaymentGuarantee = () => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-xl p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl font-bold text-india-blue mb-4 flex items-center">
        <Shield className="w-6 h-6 text-india-saffron mr-2" />
        Payment Guarantee System
      </h3>
      
      <div className="flex flex-col space-y-6">
        <div className="flex items-start">
          <div className="bg-india-saffron/20 p-4 rounded-full mr-4 flex-shrink-0 shadow-md">
            <Clock className="h-8 w-8 text-india-saffron" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Real-time Payment Tracking</h4>
            <p className="text-gray-600">Monitor your earnings in real-time with blockchain verification</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-india-green/20 p-4 rounded-full mr-4 flex-shrink-0 shadow-md">
            <Timer className="h-8 w-8 text-india-green" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Automated Escrow Release</h4>
            <p className="text-gray-600">Funds are released automatically based on shift completion verification</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-india-blue/20 p-4 rounded-full mr-4 flex-shrink-0 shadow-md">
            <Shield className="h-8 w-8 text-india-blue" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Dispute Resolution</h4>
            <p className="text-gray-600">Fair and transparent system for resolving payment disputes</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-india-blue font-bold">Average payment processing time: <span className="text-india-saffron">24 hours</span></p>
      </div>
    </motion.div>
  );
};

const MarketPotentialSection = () => {
  const [activeCity, setActiveCity] = useState(1); // Mumbai by default
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-india-blue">
            Market <span className="text-india-saffron">Potential</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tap into India's booming hospitality gig market—untapped, scalable, now.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            {/* Enhanced 3D styled India Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-2xl"
              style={{
                perspectiveOrigin: "center",
                perspective: "1000px"
              }}
            >
              <motion.div
                animate={{ 
                  rotateX: [0, 2, 0], 
                  rotateY: [0, -2, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <IndiaMap activeCity={activeCity} setActiveCity={setActiveCity} />
              </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              {cityData.map((city, index) => (
                <CityCard 
                  key={index} 
                  city={city} 
                  isActive={activeCity === index}
                  onClick={() => setActiveCity(index)} 
                />
              ))}
            </div>
            
            {/* Payment Guarantee Component */}
            <div className="mt-8">
              <PaymentGuarantee />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-6 h-full">
              <h3 className="text-xl font-bold text-india-blue mb-6 text-center">
                Hospitality Market Overview
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-india-saffron">Student Workforce</h4>
                  <p className="text-gray-700 mt-2">Over 3.5 lakh hospitality students graduate yearly, seeking practical experience and income opportunities.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-india-green">Venue Demand</h4>
                  <p className="text-gray-700 mt-2">Our platform connects talent to approximately 1 lakh hotels, 20 lakh restaurants, and 3-5 lakh catering services nationwide.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-india-blue">Market Gap</h4>
                  <p className="text-gray-700 mt-2">The hospitality industry faces a 35% staff shortage during peak seasons, creating a massive opportunity for on-demand staffing.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-600">Growth Trajectory</h4>
                  <p className="text-gray-700 mt-2">With a 32% year-over-year growth in the gig economy and increasing adoption of digital platforms, OdcBlR is positioned for exponential growth.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-india-saffron/10 to-india-blue/10 rounded-lg">
                <div className="text-center">
                  <p className="text-india-blue font-bold">Total Addressable Market:</p>
                  <p className="text-2xl font-bold text-india-saffron">3.5L+ Students • 21L+ Venues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPotentialSection;
