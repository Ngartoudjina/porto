'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, Award } from 'lucide-react';

interface TimelineItemData {
  period: string;
  institution?: string;
  company?: string;
  degree?: string;
  position?: string;
  icon: React.ReactNode;
  color: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isEducation?: boolean;
}

export default function AcademicProfessionalJourney() {
  const educationData = [
    {
      period: "2024-2025",
      institution: "Ecole Normale Superieure de Genie Energetique et Procedes",
      degree: "Deuxieme année",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#2563eb",
    },
    {
      period: "2023-2024",
      institution: "Ecole Normale Superieure de Genie Energetique et Procedes",
      degree: "Premiere année",
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#4f46e5",
    },
    {
      period: "2022-2023",
      institution: "Institut National de Classe Préparatoire aux Etudes d'Ingenieur (INSPEI)",
      degree: "CP-INSPEI-2",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#0891b2",
    },
    {
      period: "2021-2022",
      institution: "Institut National de Classe Préparatoire aux Etudes d'Ingenieur (INSPEI)",
      degree: "CP-INSPEI-1",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#0891b2",
    },
    {
      period: "2020-2021",
      institution: "Faculté des Sciences Economiques et de Gestion (FASEG)",
      degree: "Licence 1",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#0891b2",
    },
    {
      period: "2019-2020",
      institution: "CEG1 Avrankou",
      degree: "BAC D",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#0891b2",
    },
  ];

  const workData = [
    {
      period: "2023",
      company: "Technicien mobile GSM",
      position: "ST MATHINOS, PORTO-NOVO",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#0e7490",
    },
    {
      period: "2021",
      company: "Graphiste",
      position: "FENAJEEB, CALAVI",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#15803d",
    },
    {
      period: "2020",
      company: "Installateur Solaire",
      position: "H4-SERVICES, AVRANKOU",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#d97706",
    },
    {
      period: "2020",
      company: "Developpement de logiciel",
      position: "H4-SERVICES, AVRANKOU",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#d97706",
    },
    {
      period: "2020",
      company: "Programmation Arduino et Python",
      position: "H4-SERVICES, AVRANKOU",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#d97706",
    },
    {
      period: "2020",
      company: "Projet Iot",
      position: "H4-SERVICES, AVRANKOU",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#d97706",
    },
    {
      period: "2020",
      company: "Formation en dimensionnement et installation solaire photovoltaïque",
      position: "H4-SERVICES, AVRANKOU",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#d97706",
    },
    {
      period: "2020",
      company: "Travaux de chantier",
      position: "H4-SERVICES, AVRANKOU",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#d97706",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const timelineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.5,
      },
    },
  };

  const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isEducation = true }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, x: 5, boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)" }}
      className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 group"
      aria-label={`${isEducation ? 'Education' : 'Work Experience'}: ${item.institution || item.company}`}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.2 + 1, type: "spring", stiffness: 200 }}
        className="absolute left-0 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300"
        style={{ backgroundColor: item.color }}
      />

      {/* Content Card */}
      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-blue-100/50 group-hover:shadow-xl transition-all duration-300"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 1.2 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3"
        >
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
          <span className="font-medium">{item.period}</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 1.4 }}
          className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight"
        >
          {isEducation ? item.institution : item.company}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 1.6 }}
          className="text-gray-600 text-xs sm:text-sm leading-relaxed pr-8 sm:pr-12"
        >
          {isEducation ? item.degree : item.position}
        </motion.p>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.2 + 1.8, type: "spring", stiffness: 200 }}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <div style={{ color: item.color }}>{item.icon}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            — My Journey
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
            My <span className="text-blue-600">Academic and</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-blue-600">Professional</span> Journey
          </h2>
        </motion.div>

        {/* Main Content - Stack on mobile, side by side on larger screens */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* Education Section */}
          <motion.div variants={sectionVariants} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
              >
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </motion.div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Education</h3>
            </motion.div>

            {/* Timeline line - ajustée pour mobile */}
            <motion.div
              variants={timelineVariants}
              className="absolute left-5 sm:left-6 top-16 sm:top-20 w-0.5 bg-gradient-to-b from-blue-200 to-transparent origin-top"
              style={{ height: `${educationData.length * 140}px` }}
            />

            <div className="relative">
              {educationData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} isEducation={true} />
              ))}
            </div>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div variants={sectionVariants} className="relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <motion.div
                whileHover={{ rotate: -15, scale: 1.1 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </motion.div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Work Experience</h3>
            </motion.div>

            {/* Timeline line - ajustée pour mobile */}
            <motion.div
              variants={timelineVariants}
              className="absolute left-5 sm:left-6 top-16 sm:top-20 w-0.5 bg-gradient-to-b from-blue-200 to-transparent origin-top"
              style={{ height: `${workData.length * 140}px` }}
            />

            <div className="relative">
              {workData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} isEducation={false} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Decoration */}
        <motion.div
          className="mt-8 sm:mt-12 lg:mt-20 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
            </motion.div>

            <div className="flex space-x-1 sm:space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements - cachés sur mobile pour éviter le débordement */}
        <div className="hidden sm:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-200 rounded-full opacity-60"
              style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
              animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              aria-hidden="true"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}