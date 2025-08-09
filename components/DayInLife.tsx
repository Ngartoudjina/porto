'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, BookOpen, Music, Search, Sun } from 'lucide-react';

export default function DayInLife() {
  const activities = [
    {
      name: 'Développement de Projets',
      percentage: '25%',
      color: '#2563eb',
      bgColor: '#eff6ff',
      icon: <Zap className="w-8 h-8 text-blue-600" />,
    },
    {
      name: 'Cours et Études',
      percentage: '30%',
      color: '#4f46e5',
      bgColor: '#eef2ff',
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
    },
    {
      name: 'Sport et Musique',
      percentage: '10%',
      color: '#0891b2',
      bgColor: '#ecfeff',
      icon: <Music className="w-8 h-8 text-cyan-600" />,
    },
    {
      name: 'Veille Technologique',
      percentage: '15%',
      color: '#d97706',
      bgColor: '#fff7ed',
      icon: <Search className="w-8 h-8 text-amber-600" />,
    },
    {
      name: 'Efficacité Énergétique',
      percentage: '20%',
      color: '#15803d',
      bgColor: '#f0fdf4',
      icon: <Sun className="w-8 h-8 text-green-600" />,
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
        ease: 'easeOut',
      },
    },
  };

  const hoverVariants: Variants = {
  hover: {
    scale: 1.05,
    y: -5,
    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
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
            — Un Jour dans ma Vie
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600">Ma Routine</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            d'Ingénieur en Énergie
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.name}
              variants={itemVariants}
              whileHover={hover}
              className="group cursor-pointer"
              aria-label={`Temps consacré à ${activity.name}`}
            >
              <div
                className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-blue-100/50 transition-all duration-300 group-hover:shadow-xl"
                style={{ backgroundColor: activity.bgColor }}
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    className="p-3 rounded-2xl bg-blue-50 shadow-sm"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activity.icon}
                  </motion.div>
                </div>

                <div className="text-center mb-3">
                  <motion.div
                    className="text-xl sm:text-2xl font-bold text-gray-900 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 200 }}
                  >
                    {activity.percentage}
                  </motion.div>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: activity.color }}
                      initial={{ width: 0 }}
                      animate={{ width: activity.percentage }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">
                    {activity.name}
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