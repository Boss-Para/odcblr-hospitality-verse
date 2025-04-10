
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// Revenue Streams Data
const revenueStreams = [
  { name: "Student Subscriptions", value: 6000000, description: "₹100-₹500/month" },
  { name: "Client Subscriptions", value: 6000000, description: "₹2,000-₹10,000/month" },
  { name: "Posting Fees", value: 600000, description: "₹500-₹1,000/gig" },
  { name: "Hiring Fees", value: 480000, description: "₹2,000/role" },
];

// Projections Data
const projections = [
  { name: "Q1", users: 10000, revenue: 1500000 },
  { name: "Q2", users: 25000, revenue: 3500000 },
  { name: "Q3", users: 45000, revenue: 6000000 },
  { name: "Q4", users: 70000, revenue: 10000000 },
  { name: "Q5", users: 100000, revenue: 15000000 },
  { name: "Q6", users: 150000, revenue: 25000000 },
  { name: "Q7", users: 225000, revenue: 40000000 },
  { name: "Q8", users: 350000, revenue: 65000000 },
];

// Colors
const COLORS = ["#FF9933", "#138808", "#000080", "#9c27b0", "#e91e63", "#03a9f4"];
const RADIAN = Math.PI / 180;

const RevenueCard = ({ 
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
      className="bg-white rounded-xl shadow-lg p-4 text-center"
    >
      <h3 className="text-india-blue font-bold mb-2">{title}</h3>
      <p className="text-2xl text-india-saffron font-bold">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

const BusinessPlanSection = () => {
  const [activeTab, setActiveTab] = useState("revenue"); // revenue, projections
  const total = revenueStreams.reduce((sum, item) => sum + item.value, 0);
  
  // Custom label with properly typed parameters
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index?: number;
    name?: string;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section id="business-plan" className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-india-blue">
            Business <span className="text-india-saffron">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scalable revenue streams, sustainable growth, and profitable returns for investors.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
              <div className="flex justify-center mb-6">
                <div className="flex rounded-lg overflow-hidden">
                  <button 
                    className={`px-4 py-2 ${activeTab === 'revenue' ? 'bg-india-saffron text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('revenue')}
                  >
                    Revenue Streams
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'projections' ? 'bg-india-blue text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('projections')}
                  >
                    Projections
                  </button>
                </div>
              </div>
              
              {activeTab === 'revenue' && (
                <div className="h-[300px]">
                  <h3 className="text-xl font-bold text-center mb-4">
                    Revenue Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueStreams}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueStreams.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${(Number(value)/1000000).toFixed(1)}M`, 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {activeTab === 'projections' && (
                <div className="h-[300px]">
                  <h3 className="text-xl font-bold text-center mb-4">
                    Revenue Growth
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#FF9933" />
                      <YAxis yAxisId="right" orientation="right" stroke="#000080" />
                      <Tooltip formatter={(value, name) => {
                        if (name === 'revenue') return [`₹${(Number(value)/1000000).toFixed(1)}M`, 'Revenue'];
                        return [value, 'Users'];
                      }} />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="users" 
                        stroke="#FF9933" 
                        strokeWidth={2}
                        name="Users"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#000080" 
                        strokeWidth={2}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-india-blue text-white rounded-t-xl">
                <h3 className="font-bold text-xl">Revenue Breakdown</h3>
              </div>
              
              <div className="bg-white rounded-b-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RevenueCard 
                    title="Student Subscriptions" 
                    value="₹1.2M-₹6M/year" 
                    description="1,000 students at ₹100-₹500/month" 
                  />
                  <RevenueCard 
                    title="Client Subscriptions" 
                    value="₹1.2M-₹6M/year" 
                    description="50 clients at ₹2,000-₹10,000/month" 
                  />
                  <RevenueCard 
                    title="Posting Fees" 
                    value="₹3L-₹6L/year" 
                    description="50 gigs/month at ₹500-₹1,000/gig" 
                  />
                  <RevenueCard 
                    title="Hiring Fees" 
                    value="₹4.8L/year" 
                    description="20 roles/month at ₹2,000/role" 
                  />
                </div>
                
                <div className="mt-6 p-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Initial Investment:</span>
                    <span className="text-india-blue">₹25 Lakhs</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Recurring Costs:</span>
                    <span className="text-india-blue">₹10 Lakhs/year</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Year 1 Profit:</span>
                    <span className="text-india-saffron">₹15-40 Lakhs</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Break-even:</span>
                    <span className="text-india-green">12-18 months</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlanSection;
