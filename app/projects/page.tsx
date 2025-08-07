'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Code, Zap } from 'lucide-react';
import Link from 'next/link';

// Interface pour les projets de l'API
interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  softwares: string[];
  createdAt: string | null;
  updatedAt: string | null;
}

// Interface pour les projets enrichis
interface DisplayProject extends Project {
  technologies: string[];
  gradient: string;
  icon: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Styles par défaut pour gradient et icon
  const projectStyles = [
    { gradient: 'from-amber-400 to-orange-500', icon: '☀️' },
    { gradient: 'from-emerald-400 to-teal-500', icon: '⚗️' },
    { gradient: 'from-sky-400 to-blue-500', icon: '🌪️' },
    { gradient: 'from-red-400 to-pink-500', icon: '🔥' },
  ];

  // Variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      boxShadow: '0 25px 50px rgba(37, 99, 235, 0.25)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const glowVariants = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      x: [-8, 8, -8],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Récupérer les projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Échec de la récupération des projets');
        }
        const data = await response.json();
        console.log('API response:', data);
        if (!data.success || !Array.isArray(data.data)) {
          throw new Error('Données invalides reçues de l\'API');
        }

        // Mapper les projets et ajouter les propriétés d'affichage
        const enrichedProjects = data.data.slice(0, 4).map((project: Project, index: number) => {
          const style = projectStyles[index % projectStyles.length];
          return {
            ...project,
            technologies: project.softwares.length > 0 ? project.softwares : ['Projet', 'Technologie'],
            gradient: style.gradient,
            icon: style.icon,
          };
        });

        console.log('Enriched projects:', enrichedProjects);
        setProjects(enrichedProjects);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des projets:', error);
        setError(error.message || 'Une erreur est survenue lors du chargement des projets');
      } finally {
        setIsLoading(false);
        console.log('isLoading:', false, 'error:', error, 'projects length:', projects.length);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 pt-20 pb-12 px-4 sm:px-6 md:px-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Zap className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Projets d'Excellence</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Innovations Techniques
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Découvrez mes projets d'ingénierie alliant créativité, technologie et performance
          </motion.p>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        className="relative z-10 py-12 px-4 sm:px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12"
            variants={containerVariants}
          >
            {isLoading ? (
              <div className="col-span-2 text-center text-blue-200">Chargement des projets...</div>
            ) : error ? (
              <div className="col-span-2 text-center text-red-400">{error}</div>
            ) : projects.length === 0 ? (
              <div className="col-span-2 text-center text-blue-200">Aucun projet à afficher</div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group perspective-1000"
                >
                  <motion.div
                    variants={cardHoverVariants}
                    className="relative h-full"
                  >
                    <Card className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl h-full flex flex-col overflow-hidden group-hover:border-white/20 transition-all duration-500">
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`} />
                      
                      {/* Image Container */}
                      <CardHeader className="p-0 relative overflow-hidden">
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={project.image || '/placeholder.jpg'}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            variants={imageVariants}
                          />
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {/* Project Icon */}
                          <motion.div
                            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-xl opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0, rotate: -180 }}
                            whileHover={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          >
                            {project.icon}
                          </motion.div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6 flex flex-col flex-grow relative">
                        {/* Title with animated underline */}
                        <div className="relative mb-4">
                          <CardTitle className="text-xl font-bold text-white mb-2 relative">
                            {project.title}
                            <motion.div
                              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${project.gradient} origin-left`}
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.8 }}
                            />
                          </CardTitle>
                        </div>
                        
                        <p className="text-blue-100 text-sm mb-6 flex-grow leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs rounded-full font-medium shadow-lg`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + techIndex * 0.1, duration: 0.5 }}
                              whileHover={{ scale: 1.1 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        
                        {/* CTA Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group/btn"
                            asChild
                          >
                            <Link
                              href="/contact"
                              aria-label={`Contacter André SENOU pour discuter du projet ${project.title}`}
                            >
                              <Code className="mr-2 h-4 w-4" />
                              En savoir plus
                              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Decorative Elements */}
      {[
        { id: 1, size: 'w-16 h-16', gradient: 'from-blue-400 to-cyan-400', delay: 0, top: '20%', left: '5%' },
        { id: 2, size: 'w-12 h-12', gradient: 'from-purple-400 to-pink-400', delay: 1, top: '70%', left: '10%' },
        { id: 3, size: 'w-20 h-20', gradient: 'from-emerald-400 to-teal-400', delay: 0.5, top: '40%', left: '85%' },
        { id: 4, size: 'w-8 h-8', gradient: 'from-orange-400 to-red-400', delay: 1.5, top: '15%', left: '90%' },
        { id: 5, size: 'w-14 h-14', gradient: 'from-indigo-400 to-blue-400', delay: 2, top: '80%', left: '80%' },
      ].map((element) => (
        <motion.div
          key={element.id}
          className={`fixed ${element.size} bg-gradient-to-br ${element.gradient} rounded-full opacity-20 blur-sm`}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: element.delay }}
          style={{ top: element.top, left: element.left }}
          aria-hidden="true"
        />
      ))}

      {/* Enhanced CTA Section */}
      <motion.section
        className="relative z-10 py-24 mt-12"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 text-center">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"
            variants={glowVariants}
            animate="animate"
          />
          
          <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <ExternalLink className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Collaborons Ensemble</span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Intéressé par une Collaboration ?
              </h2>
              
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Transformons vos idées en solutions innovantes. Discutons de votre prochain projet d'ingénierie.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
                >
                  <Link href="/contact" aria-label="Contacter André SENOU" className="flex items-center">
                    Contacter
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}