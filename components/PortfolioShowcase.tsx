'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Interface pour les projets
interface Project {
  id: string;
  title: string;
  description: string;
  image: string | undefined;
  softwares: string[];
  createdAt: string | null;
  updatedAt: string | null;
}

// Interface pour les projets enrichis
interface DisplayProject extends Project {
  tags: string[];
  mockups: string[];
  color: string;
  bgGradient: string;
}

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Styles par défaut pour les projets
  const projectStyles = [
    { color: '#2563eb', bgGradient: 'from-blue-50 to-indigo-50', mockups: ['/c5.jpg', '/i1.png', '/q3.jpg', '/s1.jpg'] },
    { color: '#4f46e5', bgGradient: 'from-blue-50 to-cyan-50', mockups: ['/i1.png', '/q3.jpg', '/s1.jpg'] },
    { color: '#0891b2', bgGradient: 'from-blue-50 to-teal-50', mockups: ['/q3.jpg', '/s1.jpg', '/c5.jpg', '/i1.png'] },
    { color: '#0e7490', bgGradient: 'from-blue-50 to-sky-50', mockups: ['/s1.jpg', '/c5.jpg', '/i1.png'] },
  ];

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
        console.log("API response:", data);
        if (!data.success || !Array.isArray(data.data)) {
          throw new Error('Données invalides reçues de l\'API');
        }

        // Mapper les projets et ajouter les propriétés d'affichage
        const enrichedProjects = data.data.slice(0, 4).map((project: Project, index: number) => {
          const style = projectStyles[index % projectStyles.length];
          return {
            ...project,
            tags: project.softwares.length > 0 ? project.softwares : ['Projet', 'Technologie'],
            mockups: style.mockups,
            color: style.color,
            bgGradient: style.bgGradient,
          };
        });

        console.log("Enriched projects:", enrichedProjects); // Journal pour vérifier les projets enrichis
        setProjects(enrichedProjects);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des projets:', error);
        setError(error.message || 'Une erreur est survenue lors du chargement des projets');
      } finally {
        setIsLoading(false);
        console.log("isLoading:", false, "error:", error, "projects length:", projects.length); // Journal final
      }
    };

    fetchProjects();
  }, []);

  // Variantes pour les animations (simplifiées pour le débogage)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Changé de whileInView à animate pour forcer l'affichage
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={headerVariants}
          className="flex items-center justify-between mb-10 sm:mb-12"
        >
          <div>
            <div className="text-sm text-gray-500 font-medium mb-2">
              — Mes Projets
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Mes Derniers <span className="text-blue-600">Projets de Recherche</span>
            </h1>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
            <Button
              asChild
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/projets" aria-label="Explore all research projects">
                Explorer mes projets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center text-gray-600">Chargement des projets...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-600">Aucun projet à afficher</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${project.bgGradient} rounded-3xl p-4 sm:p-6 shadow-lg border border-blue-100/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl`}
                >
                  {/* Project Image */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl bg-blue-50/70 backdrop-blur-sm p-4">
                    <motion.img
                      src={project.image || '/placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
                      variants={mockupVariants}
                    />
                    <motion.div
                      animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 right-4 w-8 h-8 bg-blue-100/80 rounded-full shadow-md flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" aria-hidden="true" />
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            tagIndex === 0
                              ? 'bg-blue-100 text-blue-600'
                              : tagIndex === 1
                              ? 'bg-indigo-100 text-indigo-600'
                              : 'bg-cyan-100 text-cyan-600'
                          }`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Title and Action */}
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
                          style={{ backgroundColor: project.color }}
                        >
                          <Link href="/projets">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <motion.div variants={cardVariants} className="md:hidden mt-8 text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-lg mx-auto"
            >
              <Link href="/projets" aria-label="Explore all research projects">
                Explorer tous les projets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-12 sm:mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}