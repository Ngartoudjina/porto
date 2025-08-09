'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Zap, Factory, Thermometer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: Zap,
      title: "Renewable Energy Solutions",
      description: "Designing innovative systems for solar, wind, and bioenergy to drive sustainable energy production.",
    },
    {
      id: 2,
      icon: Factory,
      title: "Process Optimization",
      description: "Enhancing industrial processes through advanced modeling and energy-efficient technologies.",
    },
    {
      id: 3,
      icon: Thermometer,
      title: "Sustainable System Design",
      description: "Developing eco-friendly designs for energy systems and process engineering applications.",
    },
  ];

  // Animation variants
  const containerVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } },
  };

  const headerVariants : Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
  };

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-gray-50 to-blue-50/50">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          variants={headerVariants}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <span className="text-gray-600 text-sm font-medium">— Expertise</span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Explore all expertise"
            >
              <ArrowRight className="w-4 h-4" />
              <Link href="/projets">
                <span className="text-sm font-medium">Explore My Expertise</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="mb-12"
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-blue-600">Expertise</span>
            <span className="text-gray-900"> I Offer</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(37, 99, 235, 0.1)" }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/50"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <Link href="/experiences">
                    Learn more
                  </Link>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}