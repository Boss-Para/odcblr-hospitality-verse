import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, BadgeDollarSign, DollarSign } from "lucide-react";

// Revenue Stream Data
const revenueStreams = [
  { name: "Student Subscriptions", value: 6000000, color: "#FF9933", id: "students" },
  { name: "Client Subscriptions", value: 6000000, color: "#138808", id: "clients" },
  { name: "Posting Fees", value: 6000000, color: "#000080", id: "posting" },
  { name: "Hiring Fees", value: 4800000, color: "#9c27b0", id: "hiring" },
];

// Financial Projection Data
const projectionData = [
  { month: "Month 1", revenue: 100000, expenses: 250000 },
  { month: "Month 3", revenue: 500000, expenses: 350000 },
  { month: "Month 6", revenue: 1200000, expenses: 500000 },
  { month: "Month 9", revenue: 2500000, expenses: 750000 },
  { month: "Month 12", revenue: 4000000, expenses: 1000000 },
  { month: "Month 18", revenue: 12000000, expenses: 1500000 },
];

// Subscription Plans
const studentPlans = [
  { name: "Basic", price: 100, features: ["5 gigs per month", "Basic profile", "Chat support"] },
  { name: "Premium", price: 250, features: ["20 gigs per month", "Featured profile", "Priority support", "Skill badges"] },
  { name: "Enterprise", price: 500, features: ["Unlimited gigs", "Top profile listing", "24/7 support", "Training access"] },
];

const clientPlans = [
  { name: "Basic", price: 2000, features: ["5 job posts per month", "Basic dashboard", "Email support"] },
  { name: "Premium", price: 5000, features: ["15 job posts", "Advanced filters", "Priority listing", "Phone support"] },
  { name: "Enterprise", price: 10000, features: ["Unlimited posts", "Analytics", "Account manager", "API access"] },
];

const FinancialSphere = ({ selectedSegment, setSelectedSegment }: { selectedSegment: string; setSelectedSegment: (id: string) => void }) => {
  const RADIAN = Math.PI / 180;
  
  // Calculate total value
  const total = revenueStreams.reduce((sum, item) => sum + item.value, 0);
  
  // Custom label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show percentages of significant size
    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  return (
    <div className="relative h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={revenueStreams}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onClick={(data) => setSelectedSegment(data.id)}
          >
            {revenueStreams.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke={entry.id === selectedSegment ? "#fff" : "none"}
                strokeWidth={entry.id === selectedSegment ? 3 : 0}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`₹${(value/1000000).toFixed(1)}M`, 'Annual Revenue']}
            labelFormatter={(name) => `${name}`}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full h-40 w-40 flex items-center justify-center text-center p-4 shadow-lg"
      >
        <div>
          <p className="text-gray-600 text-xs">Total Annual Revenue</p>
          <p className="text-2xl font-bold text-india-blue">₹22.8M</p>
          <p className="text-xs text-india-saffron mt-1">Click segments for details</p>
        </div>
      </motion.div>
    </div>
  );
};

const PlanCard = ({ plan, type }: { plan: typeof studentPlans[0]; type: "student" | "client" }) => {
  const bgColor = type === "student" ? "bg-india-saffron/10" : "bg-india-green/10";
  const buttonColor = type === "student" ? "bg-india-saffron" : "bg-india-green";
  const borderColor = type === "student" ? "border-india-saffron" : "border-india-green";
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${bgColor} rounded-xl p-6 border ${borderColor} shadow-md`}
    >
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <p className="text-3xl font-bold mb-4">
        ₹{plan.price}<span className="text-sm font-normal text-gray-500">/month</span>
      </p>
      <ul className="mb-6 space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-2"></div>
            {feature}
          </li>
        ))}
      </ul>
      <Button className={`w-full ${buttonColor} hover:opacity-90 text-white`}>
        Select Plan
      </Button>
    </motion.div>
  );
};

const BusinessPlanSection = () => {
  const [selectedSegment, setSelectedSegment] = useState("students");
  
  return (
    <section id="business-plan" className="py-20 bg-white">
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
            Scalable revenue, low overhead—your investment, multiplied.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-india-blue">Revenue Streams</h3>
            <FinancialSphere selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} />
            
            <div className="mt-8">
              <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: revenueStreams.find(stream => stream.id === selectedSegment)?.color }}>
                    {selectedSegment === "students" && <Users className="h-6 w-6 text-white" />}
                    {selectedSegment === "clients" && <Building2 className="h-6 w-6 text-white" />}
                    {selectedSegment === "posting" && <BadgeDollarSign className="h-6 w-6 text-white" />}
                    {selectedSegment === "hiring" && <DollarSign className="h-6 w-6 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold">
                    {revenueStreams.find(stream => stream.id === selectedSegment)?.name}
                  </h3>
                </div>
                
                {selectedSegment === "students" && (
                  <div>
                    <p className="mb-4">
                      Monthly subscriptions for students ranging from ₹100-₹500 per month, providing access to gig listings, 
                      profile features, and app functionality.
                    </p>
                    <p className="font-bold">Projection: <span className="text-india-saffron">₹1.2M-₹6M/year</span></p>
                  </div>
                )}
                
                {selectedSegment === "clients" && (
                  <div>
                    <p className="mb-4">
                      Monthly subscriptions for hospitality venues ranging from ₹2,000-₹10,000 per month, 
                      with tiered access to posting capabilities, candidate filtering, and analytics.
                    </p>
                    <p className="font-bold">Projection: <span className="text-india-green">₹1.2M-₹6M/year</span></p>
                  </div>
                )}
                
                {selectedSegment === "posting" && (
                  <div>
                    <p className="mb-4">
                      Per-gig posting fees ranging from ₹500-₹1,000 per gig posting.
                      Estimated 50 gigs per month across all client tiers.
                    </p>
                    <p className="font-bold">Projection: <span className="text-india-blue">₹3L-₹6L/year</span></p>
                  </div>
                )}
                
                {selectedSegment === "hiring" && (
                  <div>
                    <p className="mb-4">
                      One-time fees for permanent role hires at ₹2,000 per successful placement.
                      Estimated 20 permanent roles filled per month.
                    </p>
                    <p className="font-bold">Projection: <span className="text-purple-600">₹4.8L/year</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-india-blue">Financial Projections</h3>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h4 className="font-bold mb-4">Break-Even Analysis</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `₹${(value/1000000).toFixed(2)}M`} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue" 
                      stroke="#FF9933" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      name="Expenses" 
                      stroke="#000080" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-800">Initial Investment</h5>
                  <p className="text-xl font-bold text-india-blue">₹25L</p>
                  <p className="text-xs text-gray-600">App development, marketing, operations</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-800">Recurring Costs</h5>
                  <p className="text-xl font-bold text-india-blue">₹10L/year</p>
                  <p className="text-xs text-gray-600">Cloud infrastructure, support, maintenance</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-800">Profit (After Year 1)</h5>
                  <p className="text-xl font-bold text-green-600">₹15L-₹40L/year</p>
                  <p className="text-xs text-gray-600">Scalable with minimal additional costs</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-800">Break-Even Timeline</h5>
                  <p className="text-xl font-bold text-india-saffron">12-18 months</p>
                  <p className="text-xs text-gray-600">Based on conservative growth models</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-india-blue">Subscription Model</h3>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">Student Plans</TabsTrigger>
                  <TabsTrigger value="client">Client Plans</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {studentPlans.map((plan, index) => (
                      <PlanCard key={index} plan={plan} type="student" />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="client" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {clientPlans.map((plan, index) => (
                      <PlanCard key={index} plan={plan} type="client" />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlanSection;
