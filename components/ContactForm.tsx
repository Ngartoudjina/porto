"use client"
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Phone, Mail, Globe, MapPin, Send, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  country: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    country: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      value: "+229 01 96 32 23 49",
      color: "#2563eb",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      value: "andresenou03@gmail.com",
      color: "#4f46e5",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      value: "mahunan-andré-senou-5843062a1",
      color: "#0891b2",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      value: "Porto-Novo, Benin",
      color: "#0e7490",
    },
  ];

  const interestOptions  = [
    "Renewable Energy Consulting",
    "Process Simulation",
    "Research Collaboration",
    "CAD Modeling",
    "Thermodynamic Analysis",
    "Other",
  ];

  const budgetOptions = [
    "Academic Collaboration",
    "Pro Bono",
    "$500 - $2,000",
    "$2,000 - $5,000",
    "$5,000+",
  ];

  const countryOptions = [
    "Nigeria",
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "Other",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.interest || !formData.budget || !formData.country || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        budget: '',
        country: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants : Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <Toaster position="top-center" toastOptions={{ className: "text-sm" }} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left Section - Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <div className="text-sm text-gray-500 font-medium mb-4">
                — Connect With Me
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Connect for <span className="text-blue-600">Your</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
                Next Project
              </h2>
              <p className="text-gray-600 mt-6 leading-relaxed max-w-md">
                Interested in collaborating on energy and process engineering projects? Reach out to discuss research, simulations, or academic partnerships.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02, boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)" }}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-blue-100/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  aria-label={`Contact: ${item.value}`}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="hidden lg:block"
              animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-30 blur-xl" />
            </motion.div>
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div
            variants={formVariants}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100/50"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name <span className="text-blue-500">*</span>
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Ex: John Doe"
                      required
                      className={`w-full ${focusedField === 'name' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                      aria-label="Your Name"
                      disabled={isLoading}
                    />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-blue-500">*</span>
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="example@gmail.com"
                      required
                      className={`w-full ${focusedField === 'email' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                      aria-label="Email"
                      disabled={isLoading}
                    />
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone <span className="text-blue-500">*</span>
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter Phone Number"
                      required
                      className={`w-full ${focusedField === 'phone' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                      aria-label="Phone"
                      disabled={isLoading}
                    />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    I'm Interested in <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Select
                        value={formData.interest}
                        onValueChange={(value) => handleInputChange('interest', value)}
                        onOpenChange={(open) => setFocusedField(open ? 'interest' : null)}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          className={`w-full ${focusedField === 'interest' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                          aria-label="Select Interest"
                        >
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent>
                          {interestOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Budget Range <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange('budget', value)}
                        onOpenChange={(open) => setFocusedField(open ? 'budget' : null)}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          className={`w-full ${focusedField === 'budget' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                          aria-label="Select Budget"
                        >
                          <SelectValue placeholder="Select Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Country <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange('country', value)}
                        onOpenChange={(open) => setFocusedField(open ? 'country' : null)}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          className={`w-full ${focusedField === 'country' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                          aria-label="Select Country"
                        >
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Your Message <span className="text-blue-500">*</span>
                </label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your message here"
                    rows={4}
                    className={`w-full resize-none ${focusedField === 'message' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                    aria-label="Your Message"
                    disabled={isLoading}
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)" }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      Submit
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center"
                      >
                        <Send className="w-3 h-3 text-white" aria-hidden="true" />
                      </motion.div>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 sm:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex space-x-2">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}