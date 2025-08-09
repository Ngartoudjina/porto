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
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-60"
          variants={floatingVariants}
          animate="animate"
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-40 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-40"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          aria-hidden="true"
        />

        <div className="relative z-10">

          {/* Main Content */}
          <motion.main
            className="px-4 sm:px-6 md:px-8 py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Content */}
              <motion.div className="space-y-8" variants={itemVariants}>
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                  variants={itemVariants}
                >
                  Solutions Énergétiques
                  <br />
                  <span className="text-blue-500">Durables avec</span>
                  <br />
                  André SENOU
                </motion.h1>

                <motion.p
                  className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md"
                  variants={itemVariants}
                >
                  Étudiant en ingénierie de l'énergie et des procédés, je me consacre à développer des solutions innovantes pour une énergie durable et une optimisation des procédés industriels à l'aide de MATLAB, Aspen Plus, AutoCAD, et COMSOL.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={itemVariants}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="contact" aria-label="Contacter André SENOU">
                        Contacter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base font-medium rounded-lg transition-all duration-300"
                    >
                      <Link href="projets" aria-label="Voir les projets d'André SENOU">
                        <Calendar className="mr-2 h-4 w-4" />
                        Voir Projets
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Decorative Scientific Wave */}
                <motion.div
                  className="absolute bottom-0 left-0 opacity-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <div className="w-32 h-32 text-blue-300">
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
              <motion.div className="relative" variants={itemVariants}>
                {/* Main Image Container */}
                <motion.div
                  className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/5] p-8 flex items-end">
                    <motion.img
                      src="/a1.jpg"
                      alt="Visuel scientifique d'André SENOU"
                      className="w-full h-full object-cover rounded-2xl"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </motion.div>

                {/* Floating Project Card */}
                <motion.div
                  className="absolute -bottom-6 -right-6 z-10"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="w-64 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-center gap-3 mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <motion.div
                          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Heart className="w-5 h-5 text-white" />
                        </motion.div>
                        <h3 className="font-semibold text-gray-900">Mes Compétences</h3>
                      </motion.div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Expertise en MATLAB, Aspen Plus, AutoCAD, et COMSOL pour des solutions énergétiques innovantes.
                      </p>

                      {/* Success Indicators */}
                      <motion.div
                        className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <div className="flex -space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.3 + i * 0.1 }}
                            >
                              <Star className="w-3 h-3 text-white fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">5+ Projets Réussis</span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-10 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-60"
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
                  className="absolute -top-4 right-16 w-8 h-8 bg-blue-300 rounded-full opacity-40"
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

          {/* Bottom Features */}
          <motion.section
            className="px-4 sm:px-6 md:px-8 py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </div>
      </section>
      <section id="contact-form">
        <ContactForm />
      </section>
      <section id="client-testimonials">
        <ClientTestimonials />
      </section>
      <section id="faq">
        <FAQ />
      </section>
    </>
  );
}