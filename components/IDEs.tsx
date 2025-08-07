'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microchip, Code, Smartphone, Code2, Wind, MousePointer } from 'lucide-react';

export default function IDEs() {
  const ides = [
    {
      name: 'IDE Arduino',
      percentage: '90%',
      color: '#2563eb',
      bgColor: '#eff6ff',
      icon: <Microchip className="w-8 h-8 text-blue-600" />,
    },
    {
      name: 'VS Code',
      percentage: '95%',
      color: '#4f46e5',
      bgColor: '#eef2ff',
      icon: <Code className="w-8 h-8 text-indigo-600" />,
    },
    {
      name: 'Android Studio',
      percentage: '85%',
      color: '#0891b2',
      bgColor: '#ecfeff',
      icon: <Smartphone className="w-8 h-8 text-cyan-600" />,
    },
    {
      name: 'Code::Blocks',
      percentage: '88%',
      color: '#d97706',
      bgColor: '#fff7ed',
      icon: <Code2 className="w-8 h-8 text-amber-600" />,
    },
    {
      name: 'Thonny',
      percentage: '90%',
      color: '#15803d',
      bgColor: '#f0fdf4',
      icon: <Code2 className="w-8 h-8 text-green-600" />,
    },
    {
      name: 'Windsurf',
      percentage: '85%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <Wind className="w-8 h-8 text-teal-600" />,
    },
    {
      name: 'Cursor',
      percentage: '90%',
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: <MousePointer className="w-8 h-8 text-teal-600" />,
    },
  ];

  const containerVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const hoverVariants = {
    scale: 1.05,
    y: -5,
    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
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
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            — Mes Éditeurs & IDE
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600">Environnements pour</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Mes Développements
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {ides.map((ide, index) => (
            <motion.div
              key={ide.name}
              variants={itemVariants}
              whileHover={hoverVariants}
              className="group cursor-pointer"
              aria-label={`Maîtrise de ${ide.name}`}
            >
              <div
                className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-blue-100/50 transition-all duration-300 group-hover:shadow-xl"
                style={{ backgroundColor: ide.bgColor }}
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    className="p-3 rounded-2xl bg-blue-50 shadow-sm"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ide.icon}
                  </motion.div>
                </div>

                <div className="text-center mb-3">
                  <motion.div
                    className="text-xl sm:text-2xl font-bold text-gray-900 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 200 }}
                  >
                    {ide.percentage}
                  </motion.div>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: ide.color }}
                      initial={{ width: 0 }}
                      animate={{ width: ide.percentage }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">
                    {ide.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 sm:mt-16 flex justify-center" variants={itemVariants}>
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