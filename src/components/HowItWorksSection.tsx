
import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Clock, Wallet } from "lucide-react";

const timelineItems = [
  {
    icon: <Camera className="h-6 w-6 text-white" />,
    title: "Photo Check-In",
    description: "Student arrives and takes a geo-tagged photo to activate the smart contract.",
    color: "bg-india-saffron",
  },
  {
    icon: <MapPin className="h-6 w-6 text-white" />,
    title: "Geo-Fence Verification",
    description: "System verifies student is at the correct location within the geo-fence.",
    color: "bg-india-green",
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Time Tracking",
    description: "Manager starts the shift timer or student can press 'Start Now' if required.",
    color: "bg-india-blue",
  },
  {
    icon: <Wallet className="h-6 w-6 text-white" />,
    title: "Secure Payment",
    description: "Funds automatically transfer from escrow to student's wallet upon completion.",
    color: "bg-purple-600",
  },
];

// Timeline Item Component
const TimelineItem = ({ 
  item, 
  index 
}: { 
  item: typeof timelineItems[0]; 
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-center gap-6 relative"
    >
      {/* Line Connector (for all but last item) */}
      {index < timelineItems.length - 1 && (
        <div className="absolute h-full w-0.5 bg-gray-200 left-8 top-16 md:left-auto md:top-8 md:h-0.5 md:w-full z-0"></div>
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`${item.color} h-16 w-16 rounded-full flex items-center justify-center shadow-lg z-10`}
      >
        {item.icon}
      </motion.div>

      {/* Content */}
      <div className="md:flex-1 pt-4 md:pt-0">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </motion.div>
  );
};

const PaymentClock = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-64 h-64"
    >
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      
      {/* 15-Day Mark */}
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 bg-india-saffron px-3 py-1 rounded-full text-white text-sm"
        animate={{ y: [-10, -15, -10] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        15 Days
      </motion.div>
      
      {/* Clock Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h4 className="font-bold text-xl text-india-blue">Payment Guarantee</h4>
          <p className="text-sm text-gray-600 mt-1">Auto-released after 15 days</p>
        </div>
      </div>
      
      {/* Clock Hand */}
      <motion.div
        className="absolute top-[50%] left-[50%] h-1 w-24 bg-india-blue rounded-full origin-left"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{ transformOrigin: "left center" }}
      ></motion.div>
      
      {/* Warning Zone */}
      <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 text-center w-full">
        <p className="text-red-500 text-xs font-semibold">Auto-withdrawal triggers if unpaid</p>
      </div>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-india-blue">
            How It <span className="text-india-saffron">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From photo to paycheck—secure, fair, fast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Timeline */}
          <div className="space-y-16 md:space-y-8 flex flex-col md:flex-row md:flex-wrap">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Visual Representations */}
          <div className="flex flex-col items-center justify-center space-y-12">
            <PaymentClock />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg max-w-md"
            >
              <h3 className="font-bold text-xl text-india-blue mb-4">Grace Period System</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-800 h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    20d
                  </div>
                  <div>
                    <p className="font-medium">Standard Grace</p>
                    <p className="text-sm text-gray-600">For regular clients</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    25d
                  </div>
                  <div>
                    <p className="font-medium">Extended Grace</p>
                    <p className="text-sm text-gray-600">For premium clients</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-800 h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    30d
                  </div>
                  <div>
                    <p className="font-medium">Enterprise Grace</p>
                    <p className="text-sm text-gray-600">For enterprise partners</p>
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

export default HowItWorksSection;
