
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// City Data
const cityData = [
  { name: "Delhi", students: 250000, venues: 15000, value: 250000 },
  { name: "Mumbai", students: 300000, venues: 18000, value: 300000 },
  { name: "Bangalore", students: 200000, venues: 12000, value: 200000 },
  { name: "Chennai", students: 150000, venues: 8000, value: 150000 },
  { name: "Hyderabad", students: 180000, venues: 10000, value: 180000 },
  { name: "Kolkata", students: 120000, venues: 7000, value: 120000 },
];

// Revenue Data
const revenueData = [
  { name: "Hotels", value: 18000 },
  { name: "Restaurants", value: 15000 },
  { name: "Catering", value: 10000 },
  { name: "Events", value: 7000 },
];

// Growth Data
const growthData = [
  { name: "Year 1", users: 50000, revenue: 15 },
  { name: "Year 2", users: 150000, revenue: 45 },
  { name: "Year 3", users: 350000, revenue: 120 },
  { name: "Year 4", users: 750000, revenue: 250 },
  { name: "Year 5", users: 1500000, revenue: 500 },
];

// Colors
const COLORS = ["#FF9933", "#138808", "#000080", "#9c27b0", "#e91e63", "#03a9f4"];

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
      className={`rounded-lg p-4 cursor-pointer shadow-md transition-colors ${
        isActive ? "bg-india-blue text-white" : "bg-white text-gray-800"
      }`}
      onClick={onClick}
    >
      <h3 className="font-bold text-lg">{city.name}</h3>
    </motion.div>
  );
};

const IndiaMap = ({ activeCity, setActiveCity }: { activeCity: number; setActiveCity: (index: number) => void }) => {
  // This is a simplified representation - in a real project, you'd use a proper SVG map of India
  return (
    <div className="relative h-[400px] md:h-[500px] w-full bg-gray-100 rounded-xl overflow-hidden shadow-inner">
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/India_location_map.svg')] bg-contain bg-center bg-no-repeat opacity-20"></div>
      
      {/* City Markers */}
      <motion.div
        className="absolute top-[30%] left-[45%] h-4 w-4 rounded-full bg-india-saffron cursor-pointer"
        whileHover={{ scale: 1.5 }}
        animate={{ scale: activeCity === 0 ? 1.5 : 1 }}
        onClick={() => setActiveCity(0)}
      >
        {activeCity === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 -left-16 bg-white p-2 rounded-lg shadow-lg w-32"
          >
            <p className="font-bold text-xs">Delhi</p>
            <p className="text-xs">250K students</p>
            <p className="text-xs">15K venues</p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        className="absolute top-[45%] left-[30%] h-4 w-4 rounded-full bg-india-saffron cursor-pointer"
        whileHover={{ scale: 1.5 }}
        animate={{ scale: activeCity === 1 ? 1.5 : 1 }}
        onClick={() => setActiveCity(1)}
      >
        {activeCity === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 -left-16 bg-white p-2 rounded-lg shadow-lg w-32"
          >
            <p className="font-bold text-xs">Mumbai</p>
            <p className="text-xs">300K students</p>
            <p className="text-xs">18K venues</p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        className="absolute top-[60%] left-[40%] h-4 w-4 rounded-full bg-india-saffron cursor-pointer"
        whileHover={{ scale: 1.5 }}
        animate={{ scale: activeCity === 2 ? 1.5 : 1 }}
        onClick={() => setActiveCity(2)}
      >
        {activeCity === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 -left-16 bg-white p-2 rounded-lg shadow-lg w-32"
          >
            <p className="font-bold text-xs">Bangalore</p>
            <p className="text-xs">200K students</p>
            <p className="text-xs">12K venues</p>
          </motion.div>
        )}
      </motion.div>
      
      <div className="absolute bottom-8 right-8 bg-white/80 p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-india-blue">OdcBlR Market</h3>
        <p className="text-india-saffron text-xs font-bold">₹50,000 Cr Industry</p>
        <p className="text-gray-600 text-xs">1M+ hospitality students</p>
        <p className="text-gray-600 text-xs">70K+ venues nationwide</p>
      </div>
    </div>
  );
};

const MarketPotentialSection = () => {
  const [activeCity, setActiveCity] = useState(1); // Mumbai by default
  const [activeTab, setActiveTab] = useState("market"); // market, revenue, growth
  
  return (
    <section id="market-potential" className="py-20 bg-gradient-to-b from-white to-gray-100">
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
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <IndiaMap activeCity={activeCity} setActiveCity={setActiveCity} />
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              {cityData.slice(0, 6).map((city, index) => (
                <CityCard 
                  key={index} 
                  city={city} 
                  isActive={activeCity === index}
                  onClick={() => setActiveCity(index)} 
                />
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-center mb-6">
                <div className="flex rounded-lg overflow-hidden">
                  <button 
                    className={`px-4 py-2 ${activeTab === 'market' ? 'bg-india-saffron text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('market')}
                  >
                    Market Size
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'revenue' ? 'bg-india-green text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('revenue')}
                  >
                    Revenue Sources
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'growth' ? 'bg-india-blue text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('growth')}
                  >
                    Growth Projection
                  </button>
                </div>
              </div>
              
              <div className="h-[300px]">
                {activeTab === 'market' && (
                  <>
                    <h3 className="text-xl font-bold text-center mb-4">
                      Hospitality Students by City
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value.toLocaleString()} students`, 'Students']} />
                        <Bar dataKey="students">
                          {cityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </>
                )}
                
                {activeTab === 'revenue' && (
                  <>
                    <h3 className="text-xl font-bold text-center mb-4">
                      Revenue by Segment (₹ Crore)
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₹${value} Crore`, 'Revenue']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </>
                )}
                
                {activeTab === 'growth' && (
                  <>
                    <h3 className="text-xl font-bold text-center mb-4">
                      Projected Growth
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#FF9933" />
                        <YAxis yAxisId="right" orientation="right" stroke="#000080" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="users" name="Users" fill="#FF9933" />
                        <Bar yAxisId="right" dataKey="revenue" name="Revenue (₹ Crore)" fill="#000080" />
                      </BarChart>
                    </ResponsiveContainer>
                  </>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-india-blue font-bold">Total Addressable Market:</p>
                <p className="text-2xl font-bold text-india-saffron">1M+ Students • 70K+ Venues</p>
                <p className="text-gray-600 text-sm mt-2">Tap into India's growing gig economy with OdcBlR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPotentialSection;
