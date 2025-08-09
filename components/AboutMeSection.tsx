'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Factory, Thermometer, Flame, Battery, Wind } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SectionÀPropos() {
  const compétences = [
    { name: "Conception d'énergie renouvelable", icon: Zap, color: "bg-emerald-500" },
    { name: "Modélisation de processus", icon: Factory, color: "bg-blue-500" },
    { name: "Analyse thermodynamique", icon: Thermometer, color: "bg-amber-500" },
    { name: "Optimisation énergétique", icon: Flame, color: "bg-orange-500" },
    { name: "Systèmes durables", icon: Battery, color: "bg-green-500" },
    { name: "Solutions d'énergie éolienne", icon: Wind, color: "bg-teal-500" },
  ];

  const statistiques = [
    { number: "10+", label: "Projets de recherche" },
    { number: "5+", label: "Publications" },
    { number: "3+", label: "Années d'études" },
  ];

  // Animation variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.42, 0, 0.58, 1],
        staggerChildren: 0.2 
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const compétenceVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] // Using cubic bezier values instead of string
      } 
    },
  };

  const statistiqueVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Motif de fond - Amélioré pour mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 sm:w-32 h-20 sm:h-32 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-teal-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-12 sm:w-20 h-12 sm:h-20 bg-amber-300 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-screen flex items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Côté gauche - Image de profil et compétences - Optimisé mobile */}
          <motion.div
            className="flex justify-center order-1 lg:order-1"
            variants={imageVariants}
          >
            <div className="relative w-fit">
              {/* Cercle de profil principal - Responsive */}
              <div className="w-56 sm:w-64 md:w-72 lg:w-80 h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                <img
                  src="/s1.jpg"
                  alt="André SENOU"
                  className="w-52 sm:w-60 md:w-68 lg:w-76 h-52 sm:h-60 md:h-68 lg:h-76 object-cover rounded-full border-4 border-white/30"
                />
              </div>

              {/* Étiquettes de compétences flottantes - Version mobile optimisée */}
              <div className="hidden sm:block">
                {compétences.map((compétence, index) => (
                  <motion.div
                    key={compétence.name}
                    className="absolute"
                    variants={compétenceVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 + index * 0.1 }}
                    style={{
                      top: index === 0 ? '-1rem' : index === 1 ? '3rem' : index === 2 ? 'auto' : index === 3 ? 'auto' : index === 4 ? '-2rem' : '5rem',
                      bottom: index === 2 ? '-1rem' : index === 3 ? '4rem' : 'auto',
                      left: index === 0 || index === 2 || index === 4 ? '-2rem' : 'auto',
                      right: index === 1 || index === 3 || index === 5 ? '-3rem' : 'auto',
                    }}
                  >
                    <div className={`${compétence.color} text-white px-3 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 backdrop-blur-sm bg-opacity-90`}>
                      <compétence.icon className="w-4 h-4" aria-hidden="true" />
                      <span className="hidden md:inline">{compétence.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Compétences pour mobile - Version simplifiée */}
              <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                  {compétences.slice(0, 4).map((compétence, index) => (
                    <motion.div
                      key={compétence.name}
                      variants={compétenceVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className={`${compétence.color} text-white p-2 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90`}>
                        <compétence.icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Côté droit - Contenu - Optimisé mobile */}
          <motion.div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-2 mt-12 sm:mt-0" variants={sectionVariants}>
            {/* En-tête */}
            <div className="space-y-4 text-center lg:text-left">
              <motion.div
                className="flex items-center gap-2 justify-center lg:justify-start"
                variants={compétenceVariants}
              >
                <Zap className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                <span className="text-gray-300 text-sm font-medium">— À propos de moi</span>
              </motion.div>
              
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
                variants={compétenceVariants}
              >
                Qui est <span className="text-emerald-400">André SENOU</span> ?
              </motion.h2>
              
              <motion.p
                className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
                variants={compétenceVariants}
              >
                Je suis un étudiant en ingénierie énergétique et des procédés, passionné par le développement de solutions durables grâce à des recherches et des conceptions innovantes. Mon travail se concentre sur les systèmes d'énergie renouvelable, l'optimisation des processus et l'analyse thermodynamique pour répondre aux défis énergétiques mondiaux.
              </motion.p>
            </div>

            {/* Statistiques - Responsive */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto lg:mx-0"
              variants={sectionVariants}
            >
              {statistiques.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10"
                  variants={statistiqueVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Liste des compétences pour mobile - Visible seulement sur mobile */}
            <motion.div className="sm:hidden" variants={compétenceVariants}>
              <h3 className="text-lg font-semibold text-emerald-400 mb-3 text-center">Expertise</h3>
              <div className="grid grid-cols-2 gap-2">
                {compétences.map((compétence, index) => (
                  <div key={compétence.name} className="flex items-center gap-2 bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                    <compétence.icon className={`w-4 h-4 text-emerald-400`} />
                    <span className="text-xs text-gray-200">{compétence.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Boutons d'action - Responsive */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start"
              variants={compétenceVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <Link href="/projets" aria-label="Voir mes recherches">
                    <Zap className="w-5 h-5" />
                    Voir mes projets
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                className="text-emerald-400 font-script text-lg sm:text-xl lg:text-2xl"
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