
import React from "react";
import { motion } from "framer-motion";

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
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-1/2 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-india-blue text-white rounded-t-xl">
                <h3 className="font-bold text-xl">Revenue Streams</h3>
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
