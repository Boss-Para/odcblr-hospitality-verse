
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from "recharts";
import { MapPin, TrendingUp, Users, Building } from "lucide-react";

// City Data
const cityData = [
  { name: "Delhi", students: 250000, venues: 15000, value: 250000, lat: 28.6, lng: 77.2 },
  { name: "Mumbai", students: 300000, venues: 18000, value: 300000, lat: 19.0, lng: 72.8 },
  { name: "Bangalore", students: 200000, venues: 12000, value: 200000, lat: 12.9, lng: 77.6 },
  { name: "Chennai", students: 150000, venues: 8000, value: 150000, lat: 13.0, lng: 80.2 },
  { name: "Hyderabad", students: 180000, venues: 10000, value: 180000, lat: 17.3, lng: 78.4 },
  { name: "Kolkata", students: 120000, venues: 7000, value: 120000, lat: 22.5, lng: 88.3 },
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

// New market trends data
const trendsData = [
  { year: "2021", demand: 30, supply: 45 },
  { year: "2022", demand: 40, supply: 43 },
  { year: "2023", demand: 55, supply: 40 },
  { year: "2024", demand: 75, supply: 37 },
  { year: "2025", demand: 90, supply: 35 },
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
      
      {/* 3D effect for the map */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 z-10"></div>
      
      {/* City Markers */}
      {cityData.map((city, index) => (
        <motion.div
          key={city.name}
          className={`absolute h-4 w-4 rounded-full cursor-pointer z-20 transform -translate-x-1/2 -translate-y-1/2`}
          style={{
            top: `${(1 - (city.lat - 10) / 30) * 90}%`,
            left: `${((city.lng - 70) / 20) * 80 + 10}%`,
            backgroundColor: activeCity === index ? '#FF9933' : '#000080'
          }}
          whileHover={{ scale: 1.5 }}
          animate={{ 
            scale: activeCity === index ? 1.5 : 1,
            boxShadow: activeCity === index ? '0 0 15px 5px rgba(255, 153, 51, 0.5)' : 'none'
          }}
          onClick={() => setActiveCity(index)}
        >
          {activeCity === index && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-16 -left-16 bg-white p-2 rounded-lg shadow-lg w-32 z-30"
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
      
      {/* Connections between cities - creates a network effect */}
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
      
      <div className="absolute bottom-6 right-6 bg-white/90 p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-india-blue">OdcBlR Market</h3>
        <p className="text-india-saffron text-sm font-bold">₹50,000 Cr Industry</p>
        <p className="text-gray-600 text-xs">1M+ hospitality students</p>
        <p className="text-gray-600 text-xs">70K+ venues nationwide</p>
      </div>
    </div>
  );
};

const MarketPotentialSection = () => {
  const [activeCity, setActiveCity] = useState(1); // Mumbai by default
  const [activeTab, setActiveTab] = useState("market"); // market, revenue, growth, trends
  
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
            {/* 3D styled India Map */}
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
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-6 h-full">
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
                    className={`px-4 py-2 ${activeTab === 'trends' ? 'bg-india-blue text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('trends')}
                  >
                    Market Trends
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'growth' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('growth')}
                  >
                    Growth
                  </button>
                </div>
              </div>
              
              <div className="h-[350px]">
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
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index === activeCity ? '#FF9933' : COLORS[index % COLORS.length]} 
                            />
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
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
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
                
                {activeTab === 'trends' && (
                  <>
                    <h3 className="text-xl font-bold text-center mb-4">
                      Labor Market Trends
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={trendsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <defs>
                          <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#000080" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#000080" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="demand" stroke="#FF9933" fillOpacity={1} fill="url(#colorDemand)" name="Labor Demand" />
                        <Area type="monotone" dataKey="supply" stroke="#000080" fillOpacity={1} fill="url(#colorSupply)" name="Labor Supply" />
                      </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-center mt-2 text-sm text-gray-600">
                      Growing gap between labor demand and supply presents massive opportunity
                    </p>
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
                        <Bar yAxisId="left" dataKey="users" name="Users" fill="#FF9933">
                          {growthData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`rgba(255, 153, 51, ${0.4 + index * 0.1})`} 
                            />
                          ))}
                        </Bar>
                        <Bar yAxisId="right" dataKey="revenue" name="Revenue (₹ Crore)" fill="#000080">
                          {growthData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`rgba(0, 0, 128, ${0.4 + index * 0.1})`} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-india-saffron/10 to-india-blue/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-india-blue font-bold">Total Addressable Market:</p>
                    <p className="text-2xl font-bold text-india-saffron">1M+ Students • 70K+ Venues</p>
                  </div>
                  <div className="flex items-center bg-white/80 p-3 rounded-lg shadow-md">
                    <TrendingUp className="h-8 w-8 text-india-green mr-2" />
                    <div>
                      <p className="text-sm font-bold text-india-blue">YoY Growth</p>
                      <p className="text-xl font-bold text-india-green">32%</p>
                    </div>
                  </div>
                </div>
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
