'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight, Heart, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import ServicesSection from '@/components/ServicesSection';
import ContactForm from '@/components/ContactForm';
import ClientTestimonials from '@/components/ClientTestimonials';
import FAQ from '@/components/FAQ';

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden relative">
        {/* Decorative Elements - Responsive */}
        <motion.div
          className="absolute top-10 sm:top-20 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-blue-100 rounded-full opacity-60"
          variants={floatingVariants}
          animate="animate"
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-20 sm:bottom-40 left-2 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-blue-200 rounded-full opacity-40"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Main Content */}
          <motion.main
            className="px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <motion.div className="space-y-6 sm:space-y-8 order-2 lg:order-1" variants={itemVariants}>
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center lg:text-left"
                  variants={itemVariants}
                >
                  Solutions Énergétiques
                  <br />
                  <span className="text-blue-500">Durables avec</span>
                  <br />
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">André SENOU</span>
                </motion.h1>

                <motion.p
                  className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-0"
                  variants={itemVariants}
                >
                  Étudiant en ingénierie de l'énergie et des procédés, je me consacre à développer des solutions innovantes pour une énergie durable et une optimisation des procédés industriels à l'aide de MATLAB, Aspen Plus, AutoCAD, et COMSOL.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0"
                  variants={itemVariants}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="contact" aria-label="Contacter André SENOU" className="flex items-center justify-center">
                        Contacter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300"
                    >
                      <Link href="projets" aria-label="Voir les projets d'André SENOU" className="flex items-center justify-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Voir Projets
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Decorative Scientific Wave - Hidden on mobile */}
                <motion.div
                  className="hidden sm:block absolute bottom-0 left-0 opacity-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 text-blue-300">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        d="M10,50 Q30,30 50,50 T90,50"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                      />
                      <circle cx="30" cy="40" r="3" fill="currentColor" />
                      <circle cx="50" cy="50" r="2" fill="currentColor" />
                      <circle cx="70" cy="40" r="3" fill="currentColor" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Image and Card */}
              <motion.div className="relative order-1 lg:order-2" variants={itemVariants}>
                {/* Main Image Container */}
                <motion.div
                  className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl mx-4 sm:mx-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/5] sm:aspect-[4/5] p-4 sm:p-6 md:p-8 flex items-end">
                    <motion.img
                      src="/a1.jpg"
                      alt="Visuel scientifique d'André SENOU"
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </motion.div>

                {/* Floating Project Card - Repositioned for mobile */}
                <motion.div
                  className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 z-10 w-[calc(100%-2rem)] sm:w-64"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="shadow-lg sm:shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6">
                      <motion.div
                        className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <motion.div
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </motion.div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Mes Compétences</h3>
                      </motion.div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Expertise en MATLAB, Aspen Plus, AutoCAD, et COMSOL pour des solutions énergétiques innovantes.
                      </p>

                      {/* Success Indicators */}
                      <motion.div
                        className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <div className="flex -space-x-0.5 sm:-space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-500 rounded-full border-1 sm:border-2 border-white flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.3 + i * 0.1 }}
                            >
                              <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">5+ Projets Réussis</span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Floating Elements - Reduced on mobile */}
                <motion.div
                  className="absolute top-6 sm:top-10 -left-3 sm:-left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-400 rounded-full opacity-60"
                  animate={{
                    y: [-5, 5, -5],
                    x: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute -top-2 sm:-top-4 right-8 sm:right-16 w-6 h-6 sm:w-8 sm:h-8 bg-blue-300 rounded-full opacity-40"
                  animate={{
                    y: [5, -5, 5],
                    x: [2, -2, 2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </motion.main>

          {/* Bottom Features - Optimized for mobile */}
          <motion.section
            className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  {
                    icon: Zap,
                    title: 'Solutions Innovantes',
                    desc: 'Développement de technologies pour l\'énergie durable',
                  },
                  {
                    icon: Heart,
                    title: 'Approche Collaborative',
                    desc: 'Travail avec des équipes académiques et industrielles',
                  },
                  {
                    icon: Star,
                    title: 'Projets Impactants',
                    desc: 'Résultats prouvés dans l\'optimisation des procédés',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md border border-white/20"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base md:text-lg leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </div>
      </section>

      {/* Sections avec espacement mobile optimisé */}
      <section id="contact-form" className="scroll-mt-16">
        <ContactForm />
      </section>
      <section id="client-testimonials" className="scroll-mt-16">
        <ClientTestimonials />
      </section>
      <section id="faq" className="scroll-mt-16">
        <FAQ />
      </section>
    </>
  );
}