import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Thermometer, Monitor, Settings, Smartphone, Home, Lightbulb, Users } from 'lucide-react';

// Interface pour les projets (basée sur votre type Project)
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  softwares: string[];
  createdAt: string;
  updatedAt: string;
}

// Interface pour les projets enrichis avec les propriétés d'affichage
interface DisplayProject extends Project {
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export default function ExperiencePage() {
  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] // Utilisation d'une chaîne prédéfinie
    },
  },
};

const cardHoverVariants: Variants = {
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1]
    },
  },
};

const imageVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1]
    },
  },
};

  // Liste des icônes et styles pour les projets
  const projectStyles = [
    { icon: Thermometer, category: 'Thermodynamique', color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50', textColor: 'text-red-600' },
    { icon: Monitor, category: 'Développement', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { icon: Settings, category: 'Automatisation', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { icon: Smartphone, category: 'Télécommunications', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { icon: Home, category: 'IoT & Domotique', color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { icon: Lightbulb, category: 'Innovation', color: 'from-yellow-500 to-amber-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { icon: Users, category: 'Management', color: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-50', textColor: 'text-teal-600' },
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
        if (!data.success || !Array.isArray(data.data)) {
          throw new Error('Données invalides reçues de l\'API');
        }

        // Mapper les projets et ajouter les propriétés d'affichage
        const enrichedProjects = data.data.slice(0, 4).map((project: Project, index: number) => {
          const style = projectStyles[index % projectStyles.length]; // Réutiliser les styles en boucle
          return {
            ...project,
            icon: style.icon,
            category: project.softwares?.[0] || style.category, // Utiliser le premier logiciel comme catégorie ou un style par défaut
            color: style.color,
            bgColor: style.bgColor,
            textColor: style.textColor,
          };
        });

        setProjects(enrichedProjects);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des projets:', error);
        setError(error.message || 'Une erreur est survenue lors du chargement des projets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 md:px-8 text-center bg-gradient-to-r from-slate-900 to-slate-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Settings className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Expertise Technique</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Mes Projets
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Découvrez mes projets les plus récents, alliant innovation, expertise et excellence technique
          </motion.p>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-8 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        className="py-20 px-4 sm:px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <div className="text-center text-gray-600">Chargement des projets...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {projects.map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="group"
                  >
                    <motion.div
                      variants={cardHoverVariants}
                      className="h-full"
                    >
                      <Card className="bg-white border-gray-200 shadow-lg h-full flex flex-col overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="p-0 relative overflow-hidden">
                          <div className="relative h-48 overflow-hidden">
                            <motion.img
                              src={project.image || '/placeholder.jpg'} // Image par défaut si aucune image
                              alt={project.title}
                              className="w-full h-full object-cover"
                              variants={imageVariants}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                            <motion.div
                              className={`absolute top-4 left-4 px-3 py-1 ${project.bgColor} ${project.textColor} rounded-full text-xs font-medium shadow-lg`}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                              {project.category}
                            </motion.div>
                            <motion.div
                              className={`absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center ${project.textColor} shadow-lg`}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <IconComponent className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <CardTitle className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                            {project.title}
                          </CardTitle>
                          <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                            {project.description}
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className={`w-full border-2 ${project.textColor} border-current hover:bg-current hover:text-white transition-all duration-300 group/btn`}
                            >
                              <span className="flex items-center justify-center">
                                En savoir plus
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </span>
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-slate-900 to-slate-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '7+', label: 'Domaines d\'expertise', color: 'text-blue-400' },
              { number: '15+', label: 'Projets réalisés', color: 'text-green-400' },
              { number: '5+', label: 'Années d\'expérience', color: 'text-purple-400' },
              { number: '100%', label: 'Satisfaction client', color: 'text-orange-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 md:px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Prêt à collaborer sur votre prochain projet ?
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Transformons ensemble vos idées en solutions techniques innovantes et performantes
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Contactez-moi
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}