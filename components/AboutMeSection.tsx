'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Factory, Thermometer, Flame, Battery, Wind } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutMeSection() {
  const skills = [
    { name: "Renewable Energy Design", icon: Zap, color: "bg-blue-500" },
    { name: "Process Modeling", icon: Factory, color: "bg-indigo-500" },
    { name: "Thermodynamic Analysis", icon: Thermometer, color: "bg-cyan-500" },
    { name: "Energy Optimization", icon: Flame, color: "bg-orange-500" },
    { name: "Sustainable Systems", icon: Battery, color: "bg-green-500" },
    { name: "Wind Energy Solutions", icon: Wind, color: "bg-teal-500" },
  ];

  const stats = [
    { number: "10+", label: "Research Projects" },
    { number: "5+", label: "Publications" },
    { number: "3+", label: "Years of Study" },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-300 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-16 h-full flex items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left Side - Profile Image and Skills */}
          <motion.div
            className="flex justify-center lg:justify-start"
            variants={imageVariants}
          >
            <div className="relative">
              {/* Main Profile Circle */}
              <div className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                <img
                  src="/s1.jpg"
                  alt="André SENOU"
                  className="w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 object-cover rounded-full"
                />
              </div>

              {/* Floating Skills Tags */}
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`absolute ${index % 2 === 0 ? '-top-8 -left-8' : 'top-16 -right-12'}`}
                  variants={skillVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 + index * 0.1 }}
                  style={{
                    top: index === 0 ? '-2rem' : index === 1 ? '4rem' : index === 2 ? 'auto' : index === 3 ? 'auto' : index === 4 ? '-4rem' : '6rem',
                    bottom: index === 2 ? '-2rem' : index === 3 ? '5rem' : 'auto',
                    left: index === 0 || index === 2 || index === 4 ? '-3rem' : 'auto',
                    right: index === 1 || index === 3 || index === 5 ? '-4rem' : 'auto',
                  }}
                >
                  <div className={`${skill.color} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg flex items-center gap-2`}>
                    <skill.icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    {skill.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div className="text-white space-y-6 sm:space-y-8" variants={sectionVariants}>
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-2"
                variants={skillVariants}
              >
                <Zap className="w-5 h-5 text-blue-400" aria-hidden="true" />
                <span className="text-gray-300 text-sm font-medium">— About Me</span>
              </motion.div>
              
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold"
                variants={skillVariants}
              >
                Who is <span className="text-blue-400">André SENOU</span>?
              </motion.h2>
              
              <motion.p
                className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-lg"
                variants={skillVariants}
              >
                I am an energy and process engineering student passionate about developing sustainable solutions through innovative research and design. My work focuses on renewable energy systems, process optimization, and thermodynamic analysis to address global energy challenges.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 sm:gap-6"
              variants={sectionVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left"
                  variants={statVariants}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View Research Button and Signature */}
            <motion.div
              className="flex items-center gap-4 sm:gap-6"
              variants={skillVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/projets" aria-label="View my research">
                    <Zap className="w-5 h-5" />
                    Voir mes projets
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                className="text-blue-400 font-script text-xl sm:text-2xl"
                whileHover={{ scale: 1.1 }}
              >
                André SENOU
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}