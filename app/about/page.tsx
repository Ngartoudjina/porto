'use client';
import React, { useState, useEffect } from 'react';import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Heart, Star, Zap, Users, Award, Lightbulb, Target, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ServicesSection from '@/components/ServicesSection';
import AboutMeSection from '@/components/AboutMeSection';
import ToolsShowcase from '@/components/ToolsShowcase';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import AcademicProfessionalJourney from '@/components/AcademicProfessionalJourney';

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
     const y2 = useTransform(scrollY, [0, 300], [0, 25]);

     useEffect(() => {
       const handleMouseMove = (e: MouseEvent) => {
         setMousePosition({ x: e.clientX, y: e.clientY });
       };
       window.addEventListener('mousemove', handleMouseMove);
       return () => window.removeEventListener('mousemove', handleMouseMove);
     }, []);

     const containerVariants = {
       hidden: { opacity: 0 },
       visible: {
         opacity: 1,
         transition: {
           staggerChildren: 0.2,
           delayChildren: 0.3,
         },
       },
     };

     const itemVariants = {
       hidden: { opacity: 0, y: 30 },
       visible: {
         opacity: 1,
         y: 0,
         transition: {
           duration: 0.8,
           ease: [0.6, -0.05, 0.01, 0.99],
         },
       },
     };

     const floatingVariants = {
      animate: {
        y: [-10, 10, -10],
        x: [-5, 5, -5],
        rotate: [0, 180, 360],
        transition: {
          duration: 6,
          repeat: 999, // Use a large number instead of Infinity
          ease: 'easeInOut',
        },
      },
    };

     const features = [
       {
         icon: Lightbulb,
         title: 'Solutions Innovantes',
         desc: 'Technologies de pointe pour l\'énergie durable et l\'optimisation des procédés industriels',
         color: 'from-blue-500 to-cyan-500',
       },
       {
         icon: Users,
         title: 'Approche Collaborative',
         desc: 'Collaboration étroite avec équipes académiques et partenaires industriels',
         color: 'from-emerald-500 to-teal-500',
       },
       {
         icon: Target,
         title: 'Résultats Impactants',
         desc: 'Projets concrets avec mesures d\'impact et optimisation prouvée',
         color: 'from-orange-500 to-amber-500',
       },
     ];

     const skills = ['MATLAB', 'Proteus', 'AutoCAD', 'TopSolid'];

     return (
       <>
         <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden relative">
           {/* Dynamic Background Grid */}
           <div className="absolute inset-0 opacity-30">
             <div
               className="absolute inset-0"
               style={{
                 backgroundImage: `radial-gradient(circle at ${mousePosition.x / 20}px ${mousePosition.y / 20}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
               }}
             />
             <div
               className="absolute inset-0"
               style={{
                 backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
               }}
             />
           </div>

           {/* Enhanced Floating Elements */}
           <motion.div
             className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
             style={{ y: y1 }}
             variants={floatingVariants}
             animate="animate"
           />
           <motion.div
             className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
             style={{ y: y2 }}
             variants={floatingVariants}
             animate="animate"
             transition={{ delay: 1 }}
           />
           <motion.div
             className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-lg"
             animate={{
               scale: [1, 1.2, 1],
               opacity: [0.3, 0.6, 0.3],
             }}
             transition={{ duration: 4, repeat: Infinity }}
           />

           <div className="relative z-10">
             {/* Main Content */}
             <motion.main
               className="px-4 sm:px-6 md:px-8 py-16"
               variants={containerVariants}
               initial="hidden"
               animate="visible"
             >
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 {/* Left Content */}
                 <motion.div className="space-y-8" variants={itemVariants}>
                   {/* Badge */}
                   <motion.div
                     className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-sm"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.5 }}
                   >
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                     <span className="text-sm font-medium text-gray-700">Disponible pour nouveaux projets</span>
                   </motion.div>

                   <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" variants={itemVariants}>
                     <span className="text-gray-900">Solutions Énergétiques</span>
                     <br />
                     <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                       Durables
                     </span>
                     <br />
                     <span className="text-gray-700 text-3xl sm:text-4xl lg:text-5xl">avec André SENOU</span>
                   </motion.h1>

                   <motion.p
                     className="text-lg text-gray-600 leading-relaxed max-w-xl"
                     variants={itemVariants}
                   >
                     Étudiant en ingénierie de l'énergie et des procédés, passionné par le développement de solutions innovantes pour une énergie durable et l'optimisation des procédés industriels.
                   </motion.p>

                   {/* Skills Tags */}
                   <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
                     {skills.map((skill, index) => (
                       <motion.span
                         key={skill}
                         className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm font-medium text-gray-700 shadow-sm"
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.8 + index * 0.1 }}
                         whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                       >
                         {skill}
                       </motion.span>
                     ))}
                   </motion.div>

                   {/* CTA Buttons */}
                   <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                     <motion.button
                       className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                       whileHover={{ scale: 1.02, y: -2 }}
                       whileTap={{ scale: 0.98 }}
                     >
                       <Link href="/contact">Contacter</Link>
                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </motion.button>

                     <motion.button
                       className="group border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm"
                       whileHover={{ scale: 1.02, y: -2 }}
                       whileTap={{ scale: 0.98 }}
                     >
                       <Calendar className="w-5 h-5" />
                       <Link href="/projets">Voir Projets</Link>
                     </motion.button>
                   </motion.div>

                   {/* Stats */}
                   <motion.div className="grid grid-cols-3 gap-6 pt-8" variants={itemVariants}>
                     {[
                       { number: '5+', label: 'Projets Réussis' },
                       { number: '100%', label: 'Satisfaction Client' },
                       { number: '3+', label: 'Années d\'Expertise' },
                     ].map((stat, index) => (
                       <motion.div
                         key={index}
                         className="text-center"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 1.2 + index * 0.1 }}
                       >
                         <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                         <div className="text-sm text-gray-600">{stat.label}</div>
                       </motion.div>
                     ))}
                   </motion.div>
                 </motion.div>

                 {/* Right Content - Enhanced Visual */}
                 <motion.div className="relative" variants={itemVariants}>
                   {/* Main Image Container with Glass Effect */}
                   <motion.div
                     className="relative bg-gradient-to-br from-white/40 to-blue-100/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.4 }}
                   >
                     <div className="aspect-[4/5] p-8 flex items-end relative">
                       {/* Placeholder for main image */}
                       <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300 rounded-2xl flex items-center justify-center shadow-inner">
                         <motion.img
                           src="/a2.jpg"
                           alt="Visuel scientifique d'André SENOU"
                           className="w-full h-full object-cover rounded-2xl"
                           initial={{ opacity: 0.8 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 1 }}
                         />
                       </div>

                       {/* Decorative Elements */}
                       <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-lg" />
                       <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-lg" />
                     </div>
                   </motion.div>

                   {/* Enhanced Floating Card */}
                   <motion.div
                     className="absolute -bottom-8 -right-8 z-10"
                     initial={{ opacity: 0, x: 30, y: 30 }}
                     animate={{ opacity: 1, x: 0, y: 0 }}
                     transition={{ delay: 0.8, duration: 0.6 }}
                     whileHover={{ scale: 1.05, y: -10 }}
                   >
                     <div className="w-72 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
                       <motion.div
                         className="flex items-center gap-3 mb-4"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 1 }}
                       >
                         <motion.div
                           className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                           whileHover={{ rotate: 360 }}
                           transition={{ duration: 0.6 }}
                         >
                           <Award className="w-6 h-6 text-white" />
                         </motion.div>
                         <div>
                           <h3 className="font-bold text-gray-900">Expertise Technique</h3>
                           <p className="text-sm text-gray-500">Solutions sur mesure</p>
                         </div>
                       </motion.div>

                       <p className="text-sm text-gray-600 leading-relaxed mb-4">
                         Maîtrise avancée des outils de simulation et modélisation pour des projets énergétiques innovants.
                       </p>

                       {/* Enhanced Success Indicators */}
                       <motion.div
                         className="flex items-center justify-between pt-4 border-t border-gray-100"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 1.2 }}
                       >
                         <div className="flex -space-x-2">
                           {[...Array(5)].map((_, i) => (
                             <motion.div
                               key={i}
                               className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"
                               initial={{ scale: 0, rotate: -180 }}
                               animate={{ scale: 1, rotate: 0 }}
                               transition={{ delay: 1.3 + i * 0.1, type: 'spring' }}
                             >
                               <Star className="w-4 h-4 text-white fill-current" />
                             </motion.div>
                           ))}
                         </div>
                         <span className="text-sm font-medium text-gray-700">Excellence garantie</span>
                       </motion.div>
                     </div>
                   </motion.div>

                   {/* Enhanced Floating Elements */}
                   {[
                     { size: 'w-16 h-16', color: 'from-blue-400/30 to-cyan-400/30', position: 'top-8 -left-8', delay: 0 },
                     { size: 'w-12 h-12', color: 'from-purple-400/30 to-pink-400/30', position: '-top-6 right-20', delay: 0.5 },
                     { size: 'w-10 h-10', color: 'from-emerald-400/30 to-teal-400/30', position: 'top-1/3 -left-4', delay: 1 },
                   ].map((element, index) => (
                     <motion.div
                       key={index}
                       className={`absolute ${element.position} ${element.size} bg-gradient-to-br ${element.color} rounded-full blur-sm`}
                       animate={{
                         y: [-10, 10, -10],
                         x: [-5, 5, -5],
                         scale: [1, 1.1, 1],
                       }}
                       transition={{
                         duration: 3 + index,
                         repeat: Infinity,
                         ease: 'easeInOut',
                         delay: element.delay,
                       }}
                     />
                   ))}
                 </motion.div>
               </div>
             </motion.main>

             {/* Enhanced Features Section */}
             <motion.section
               className="px-4 sm:px-6 md:px-8 py-16"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.4, duration: 0.8 }}
             >
               <div className="max-w-7xl mx-auto">
                 <motion.div
                   className="text-center mb-12"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.6 }}
                 >
                   <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Choisir Mes Services</h2>
                   <p className="text-gray-600 max-w-2xl mx-auto">
                     Une approche méthodique et innovante pour chaque projet énergétique
                   </p>
                 </motion.div>

                 <motion.div
                   className="grid grid-cols-1 md:grid-cols-3 gap-8"
                   variants={containerVariants}
                   initial="hidden"
                   animate="visible"
                 >
                   {features.map((feature, index) => (
                     <motion.div
                       key={index}
                       className="group relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                       variants={itemVariants}
                       whileHover={{ y: -10, scale: 1.02 }}
                     >
                       <motion.div
                         className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                         whileHover={{ rotate: 360, scale: 1.1 }}
                         transition={{ duration: 0.6 }}
                       >
                         <feature.icon className="w-8 h-8 text-white" />
                       </motion.div>
                       <h3 className="font-bold text-xl text-gray-900 mb-3 text-center">{feature.title}</h3>
                       <p className="text-gray-600 text-center leading-relaxed">{feature.desc}</p>

                       {/* Decorative border effect */}
                       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                     </motion.div>
                   ))}
                 </motion.div>
               </div>
             </motion.section>

             {/* Scroll Indicator */}
             <motion.div
               className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                 <motion.div
                   className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                   animate={{ y: [0, 12, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
               </div>
             </motion.div>
           </div>
         </section>

         {/* Existing Sections */}
         <section id="services-section">
           <ServicesSection />
         </section>
         <section id="about-me">
           <AboutMeSection />
         </section>
         <section id="tools-showcase">
           <ToolsShowcase />
         </section>
         <section id="portfolio-showcase">
           <PortfolioShowcase />
         </section>
         <section id="academic-professional-journey">
           <AcademicProfessionalJourney />
         </section>
       </>
     );
   }