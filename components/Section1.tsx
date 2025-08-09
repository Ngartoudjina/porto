"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Flame, Zap, Factory, Thermometer } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function Section1() {
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const slides = [
    {
      title: "Innovative Energy Solutions",
      subtitle: "Sustainable Engineering",
      description: "Developing cutting-edge solutions for renewable energy systems",
      bgColor: "from-blue-200 via-indigo-100 to-cyan-100"
    },
    {
      title: "Process Optimization",
      subtitle: "Engineering Excellence",
      description: "Enhancing efficiency in industrial processes through advanced modeling",
      bgColor: "from-indigo-200 via-blue-100 to-teal-100"
    },
    {
      title: "Sustainable Technologies",
      subtitle: "Future-Ready Designs",
      description: "Pioneering eco-friendly technologies for a greener tomorrow",
      bgColor: "from-cyan-200 via-blue-100 to-indigo-100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) {
    toast.error("Please enter an email address");
    return;
  }

  setIsLoading(true);
  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to subscribe");
    }

    toast.success(`Thank you! You'll receive updates at ${email}`);
    setEmail('');
  } catch (error: unknown) {
    toast.error(error instanceof Error ? error.message : "Failed to subscribe");
  } finally {
    setIsLoading(false);
  }
};

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen relative overflow-hidden px-4 sm:px-6 md:px-8 py-24">
      <Toaster position="top-center" toastOptions={{ className: "text-sm" }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
        />
      </AnimatePresence>

      {/* Floating scientific icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { Icon: Flame, color: "bg-orange-400", position: { top: "20%", left: "15%" }, size: "w-12 h-12" },
          { Icon: Zap, color: "bg-yellow-400", position: { top: "35%", right: "20%" }, size: "w-10 h-10" },
          { Icon: Factory, color: "bg-blue-400", position: { bottom: "30%", left: "10%" }, size: "w-14 h-14" },
          { Icon: Thermometer, color: "bg-red-400", position: { bottom: "15%", right: "15%" }, size: "w-16 h-16" },
        ].map(({ Icon, color, position, size }, i) => (
          <motion.div
            key={i}
            className={`absolute ${size} ${color} rounded-full opacity-70 shadow-lg`}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={position}
          >
            <Icon className="w-full h-full p-2 text-white" aria-hidden="true" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full max-w-5xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-2 text-blue-600"
              >
                <Zap className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">Energy Innovation</span>
              </motion.div>
              
              <motion.h1
                key={slides[currentSlide].title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                {slides[currentSlide].title}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-blue-600 flex items-center gap-2 mt-2"
                >
                  <Flame className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                  {slides[currentSlide].subtitle}
                </motion.div>
              </motion.h1>
              
              <motion.p
                key={slides[currentSlide].description}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md"
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>

            {/* Email Signup Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  required
                  aria-label="Email address"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Stay Updated"
                )}
              </Button>
            </motion.form>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Research-Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Innovative Approach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Collaborative Projects</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 lg:h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-lg">
              {[
                { Icon: Flame, color: "bg-orange-400", position: { top: "16%", left: "16%" }, size: "w-12 h-12" },
                { Icon: Zap, color: "bg-yellow-400", position: { top: "32%", right: "20%" }, size: "w-10 h-10" },
                { Icon: Factory, color: "bg-blue-400", position: { bottom: "32%", left: "8%" }, size: "w-14 h-14" },
                { Icon: Thermometer, color: "bg-red-400", position: { bottom: "16%", right: "16%" }, size: "w-16 h-16" },
              ].map(({ Icon, color, position, size }, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${size} ${color} rounded-full shadow-lg`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  style={position}
                >
                  <Icon className="w-full h-full p-2 text-white" aria-hidden="true" />
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src="/a4.jpg"
                  alt="Scientific Portfolio"
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </motion.button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-500 scale-110' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </motion.button>
      </div>

      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl"></div>
    </div>
  );
}