'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';

interface Vitae {
  id: string;
  name: string;
  file: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  data?: Vitae[];
  error?: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set([1])); // Deuxième item (CV) ouvert par défaut
  const [isDownloading, setIsDownloading] = useState(false);
  const [vitae, setVitae] = useState<Vitae[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer les CVs depuis l'API
  useEffect(() => {
    const fetchVitae = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/vitae');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const response: ApiResponse = await res.json();
        
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch CVs');
        }
        
        setVitae(response.data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des CVs:', error);
        toast.error('Impossible de charger les CVs');
        setVitae([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVitae();
  }, []);

  const faqItems = [
    {
      id: 0,
      question: "Quelles compétences apportez-vous aux projets d'ingénierie énergétique et des procédés ?",
      answer: "J'ai une expertise en MATLAB, Aspen Plus, AutoCAD et COMSOL pour les simulations, la modélisation et l'analyse. Mes projets académiques se concentrent sur les systèmes d'énergie renouvelable, l'optimisation des procédés et l'analyse thermodynamique, complétés par une expérience pratique en stage.",
    },
    {
      id: 1,
      question: "Puis-je télécharger votre CV pour plus de détails ?",
      answer: "Oui ! Vous pouvez télécharger mon CV directement depuis cette page. Il détaille ma formation, mes stages et mes projets clés en ingénierie énergétique et des procédés.",
      isHighlighted: true,
    },
    {
      id: 2,
      question: "Êtes-vous disponible pour des opportunités de recherche ou de stage ?",
      answer: "En tant qu'étudiant, je suis ouvert aux collaborations de recherche, aux stages ou aux projets académiques en ingénierie énergétique et des procédés. N'hésitez pas à me contacter via le formulaire de contact pour discuter d'opportunités potentielles.",
    },
    {
      id: 3,
      question: "Quels outils utilisez-vous pour votre travail d'ingénierie ?",
      answer: "J'utilise principalement MATLAB pour l'analyse de données, Aspen Plus pour la simulation de procédés, AutoCAD pour la modélisation CAO, et COMSOL pour les simulations thermodynamiques. J'utilise aussi Python pour les scripts et Excel pour le traitement des données.",
    },
    {
      id: 4,
      question: "Comment puis-je en savoir plus sur vos projets académiques ?",
      answer: "Ma section portfolio présente mes projets, incluant des études de cas sur les systèmes d'énergie renouvelable et l'optimisation des procédés. Vous pouvez les parcourir chronologiquement ou les filtrer par sujet, avec des explications détaillées de ma méthodologie et des résultats obtenus.",
    },
  ];

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getLatestVitae = (): Vitae | null => {
    if (vitae.length === 0) return null;
    
    return vitae.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    })[0];
  };

  const handleDownload = async () => {
    if (vitae.length === 0) {
      toast.error('Aucun CV disponible pour le téléchargement');
      return;
    }

    const latestVitae = getLatestVitae();
    if (!latestVitae) {
      toast.error('Aucun CV disponible');
      return;
    }

    setIsDownloading(true);

    try {
      // Utiliser l'URL Cloudinary directement
      let downloadUrl = latestVitae.file;
      
      // Pour forcer le téléchargement sur Cloudinary, ajouter fl_attachment
      if (downloadUrl.includes('cloudinary.com') && downloadUrl.includes('/raw/upload/')) {
        // Ajouter fl_attachment pour forcer le téléchargement
        downloadUrl = downloadUrl.replace('/raw/upload/', '/raw/upload/fl_attachment/');
      }

      // Méthode 1: Téléchargement via fetch avec gestion CORS
      try {
        const response = await fetch(downloadUrl, {
          method: 'GET',
          mode: 'cors', // Important pour Cloudinary
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${latestVitae.name.replace(/[^a-z0-9_\-]/gi, '_')}.pdf`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success('CV téléchargé avec succès');
          return;
        }
      } catch (fetchError) {
        console.log('Fetch download failed:', fetchError);
      }

      // Méthode 2: Téléchargement direct via lien
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${latestVitae.name.replace(/[^a-z0-9_\-]/gi, '_')}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Attendre un peu pour voir si le téléchargement a commencé
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('CV téléchargé avec succès');

    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      
      // Méthode 3: Fallback - ouvrir dans un nouvel onglet
      try {
        window.open(latestVitae.file, '_blank', 'noopener,noreferrer');
        toast.success('CV ouvert dans un nouvel onglet');
      } catch (fallbackError) {
        console.error('Erreur fallback:', fallbackError);
        toast.error('Impossible d\'ouvrir le CV. Veuillez réessayer.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const getLastUpdateDate = (): string => {
    const latestVitae = getLatestVitae();
    if (!latestVitae) return 'Août 2025';
    
    const date = new Date(latestVitae.updatedAt || latestVitae.createdAt || Date.now());
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 p-4 sm:p-6 md:p-8 flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-center" toastOptions={{ className: "text-sm" }} />
      
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* En-tête amélioré */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
            className="flex items-center justify-center gap-2 text-blue-600 text-sm font-semibold mb-6 tracking-wider uppercase"
          >
            <FileText className="w-4 h-4" />
            Questions Fréquemment Posées
            <FileText className="w-4 h-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 leading-tight"
          >
            Questions{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fréquentes
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Découvrez tout ce que vous devez savoir sur mon parcours et mes compétences en ingénierie
          </motion.p>
        </div>

        {/* Items FAQ améliorés */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.320, 1]
              }}
              className={`rounded-2xl overflow-hidden transition-all duration-500 border-2 ${
                item.isHighlighted
                  ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-transparent shadow-2xl'
                  : 'bg-white/80 backdrop-blur-sm border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-xl'
              }`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: item.isHighlighted 
                  ? "0 25px 50px rgba(59, 130, 246, 0.4)" 
                  : "0 20px 40px rgba(59, 130, 246, 0.15)"
              }}
              layout
            >
              <motion.button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between group focus:outline-none relative overflow-hidden"
                aria-expanded={openItems.has(item.id)}
                aria-controls={`faq-answer-${item.id}`}
                whileHover={!item.isHighlighted ? { backgroundColor: "rgba(59, 130, 246, 0.05)" } : {}}
                whileTap={{ scale: 0.98 }}
              >
                {/* Effet de ripple au hover */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span
                  className={`font-bold text-lg sm:text-xl relative z-10 pr-4 ${
                    item.isHighlighted ? 'text-white' : 'text-gray-800 group-hover:text-blue-700'
                  }`}
                >
                  {item.question}
                </span>
                
                <motion.div
                  animate={{ rotate: openItems.has(item.id) ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.320, 1] }}
                  className={`flex-shrink-0 ml-4 p-2 rounded-full relative z-10 ${
                    item.isHighlighted 
                      ? 'text-white bg-white/20' 
                      : 'text-blue-600 bg-blue-50 group-hover:bg-blue-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {openItems.has(item.id) ? <Minus size={20} /> : <Plus size={20} />}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openItems.has(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.320, 1] }}
                    className="overflow-hidden"
                    id={`faq-answer-${item.id}`}
                  >
                    <div
                      className={`px-6 sm:px-8 pb-6 text-base sm:text-lg leading-relaxed ${
                        item.isHighlighted ? 'text-white/90' : 'text-gray-700'
                      }`}
                    >
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-4"
                      >
                        {item.answer}
                      </motion.p>
                      
                      {item.isHighlighted && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          {isLoading ? (
                            <div className="bg-white/20 text-white/70 px-6 py-3 rounded-xl text-base font-bold flex items-center gap-3">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Chargement...
                            </div>
                          ) : (
                            <Button
                              onClick={handleDownload}
                              disabled={isDownloading || vitae.length === 0}
                              className={`bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl text-base font-bold flex items-center gap-3 transition-all duration-300 border-2 border-transparent hover:border-blue-200 shadow-lg hover:shadow-xl ${
                                isDownloading || vitae.length === 0 ? 'opacity-75 cursor-not-allowed' : ''
                              }`}
                              aria-label="Télécharger le CV"
                            >
                              <motion.div
                                animate={isDownloading ? { rotate: 360 } : { rotate: 0 }}
                                transition={isDownloading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                              >
                                <Download size={20} />
                              </motion.div>
                              {isDownloading ? 'Téléchargement...' : 
                               vitae.length === 0 ? 'CV non disponible' : 'Télécharger le CV'}
                            </Button>
                          )}
                          
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-sm text-white/70 mt-2"
                          >
                            Format PDF • Dernière mise à jour : {getLastUpdateDate()}
                          </motion.p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Section contact en bas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Une autre question ?
            </h3>
            <p className="text-gray-600 mb-4">
              N'hésitez pas à me contacter pour toute question supplémentaire
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-6 py-3 rounded-xl font-semibold"
            >
              <motion.a 
                href="/contact" 
                aria-label="Aller à la page de contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me Contacter
              </motion.a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}