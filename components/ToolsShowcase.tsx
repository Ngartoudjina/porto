'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FunctionSquare,
  CircuitBoard,
  DraftingCompass,
  Microchip,
  Waves,
  Wrench,
  Box,
  Signal,
  Building,
  Sun,
  BarChart2,
  Thermometer,
  Sunrise,
} from 'lucide-react';

export default function ToolsShowcase() {
  const tools = [
    {
      name: 'Simulink & MATLAB',
      percentage: '95%',
      color: '#2563eb',
      bgColor: '#eff6ff',
      icon: <FunctionSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
    },
    {
      name: 'Proteus',
      percentage: '90%',
      color: '#4f46e5',
      bgColor: '#eef2ff',
      icon: <CircuitBoard className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />,
    },
    {
      name: 'FreeCAD & AutoCAD',
      percentage: '88%',
      color: '#0891b2',
      bgColor: '#ecfeff',
      icon: <DraftingCompass className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />,
    },
    {
      name: 'SimuIIDE',
      percentage: '92%',
      color: '#d97706',
      bgColor: '#fff7ed',
      icon: <Microchip className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />,
    },
    {
      name: 'COMSOL Multiphysics',
      percentage: '85%',
      color: '#15803d',
      bgColor: '#f0fdf4',
      icon: <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
    },
    {
      name: 'TopSolid',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'Fusion 360',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Box className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'LTspice',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Signal className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'TRNBuild',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'TRNSYS',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'RETScreen Expert',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'Bitzer Software',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'PVsyst',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Sunrise className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
    {
      name: 'EasyEDA',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <CircuitBoard className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />,
    },
  ];

  const containerVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl w-full"
      >
        <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
          <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            — Mes Outils d'Ingénierie
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600">Outils pour</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Mes Recherches & Conceptions
          </h2>
        </motion.div>

        {/* Grille responsive améliorée */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
          variants={containerVariants}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
              aria-label={`Maîtrise de ${tool.name}`}
            >
              <div
                className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-md border border-blue-100/50 transition-all duration-300 group-hover:shadow-xl h-full"
                style={{ backgroundColor: tool.bgColor }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <motion.div
                    className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-50 shadow-sm"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tool.icon}
                  </motion.div>
                </div>

                <div className="text-center mb-2 sm:mb-3">
                  <motion.div
                    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 200 }}
                  >
                    {tool.percentage}
                  </motion.div>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tool.color }}
                      initial={{ width: 0 }}
                      animate={{ width: tool.percentage }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-600 leading-tight block">
                    {tool.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-8 sm:mt-12 md:mt-16 flex justify-center" variants={itemVariants}>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}