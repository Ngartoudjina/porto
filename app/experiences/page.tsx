'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Thermometer, Monitor, Settings, Smartphone, Home, Lightbulb, Users, Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';


// Interface for API experience data
interface Experience {
  id: string;
  name: string;
  subject: string;
  image: string;
  verified: boolean;
}

// Interface for enriched experience data
interface DisplayExperience extends Experience {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  color: string;
  bgColor: string;
  textColor: string;
  glowColor: string;
}

export default function ExperiencesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<DisplayExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Styles for icons, categories, and colors
  const experienceStyles = [
    {
      icon: Thermometer,
      category: 'Thermodynamique',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      glowColor: 'shadow-red-500/25',
    },
    {
      icon: Monitor,
      category: 'Développement',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      glowColor: 'shadow-blue-500/25',
    },
    {
      icon: Settings,
      category: 'Automatisation',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      glowColor: 'shadow-green-500/25',
    },
    {
      icon: Smartphone,
      category: 'Télécommunications',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      glowColor: 'shadow-purple-500/25',
    },
    {
      icon: Home,
      category: 'IoT & Domotique',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      glowColor: 'shadow-indigo-500/25',
    },
    {
      icon: Lightbulb,
      category: 'Innovation',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      glowColor: 'shadow-yellow-500/25',
    },
    {
      icon: Users,
      category: 'Management',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      glowColor: 'shadow-teal-500/25',
    },
  ];

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/experiences');
        if (!response.ok) {
          throw new Error('Échec de la récupération des expériences');
        }
        const data = await response.json();
        console.log('API response:', data);
        if (!data.success || !Array.isArray(data.data)) {
          throw new Error('Données invalides reçues de l\'API');
        }

        // Map API data to display format
        const enrichedExperiences = data.data.map((exp: Experience, index: number) => {
          const style = experienceStyles[index % experienceStyles.length];
          return {
            ...exp,
            title: exp.name,
            description: exp.subject,
            icon: style.icon,
            category: style.category,
            color: style.color,
            bgColor: style.bgColor,
            textColor: style.textColor,
            glowColor: style.glowColor,
          };
        });

        console.log('Enriched experiences:', enrichedExperiences);
        setExperiences(enrichedExperiences);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des expériences:', error);
        setError(error.message || 'Une erreur est survenue lors du chargement des expériences');
      } finally {
        setIsLoading(false);
        console.log('isLoading:', false, 'error:', error, 'experiences length:', experiences.length);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148, 163, 184) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-red-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        <div className="relative container mx-auto max-w-5xl">
          
          {/* Badge with enhanced animation */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8 group hover:bg-white/15 transition-all duration-500">
            <Settings className="w-5 h-5 mr-3 text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-blue-300 text-sm font-semibold tracking-wide">EXPERTISE TECHNIQUE</span>
            <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main Title with Gradient Text */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Mes Expériences
          </h1>
          
          {/* Subtitle with typing effect style */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
            Découvrez mon parcours professionnel à travers des projets techniques variés, 
            <span className="text-blue-300 font-medium"> alliant innovation, expertise et excellence opérationnelle</span>
          </p>
          
          {/* Enhanced decorative elements */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Portfolio de Projets</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-600">Chargement des expériences...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : experiences.length === 0 ? (
            <div className="text-center text-gray-600">Aucune expérience à afficher</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience, index) => {
                const IconComponent = experience.icon;
                const isHovered = hoveredCard === experience.id;
                
                return (
                  <div
                    key={experience.id}
                    className="group relative"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                    }}
                    onMouseEnter={() => setHoveredCard(experience.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    
                    {/* Glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${experience.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isHovered ? experience.glowColor + ' shadow-2xl' : ''} h-full flex flex-col`}>
                      
                      {/* Image Container with enhanced effects */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={experience.image || '/placeholder.jpg'}
                          alt={experience.title}
                          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />
                        
                        {/* Dynamic overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${experience.color} transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-0'}`}></div>
                        
                        {/* Floating particles effect */}
                        {isHovered && (
                          <>
                            <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-700"></div>
                          </>
                        )}
                        
                        {/* Category Badge with enhanced styling */}
                        <div className={`absolute top-4 left-4 px-4 py-2 ${experience.bgColor} ${experience.textColor} rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20 transform transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-1' : ''}`}>
                          {experience.category}
                        </div>
                        
                        {/* Icon with rotation effect */}
                        <div className={`absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center ${experience.textColor} shadow-lg transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        {/* View overlay */}
                        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                          <div className="bg-white/90 rounded-full p-3 transform transition-transform duration-300 hover:scale-110">
                            <Eye className="w-6 h-6 text-gray-800" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className={`text-xl font-bold text-gray-900 mb-4 line-clamp-2 transition-colors duration-300 ${isHovered ? experience.textColor : ''}`}>
                          {experience.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                          {experience.description}
                        </p>
                        
                        {/* Enhanced CTA Button */}
                        <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${experience.textColor} border-2 border-current hover:bg-current hover:text-white group/btn flex items-center justify-center space-x-2`}>
                          <span>Découvrir le projet</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '7+', label: 'Domaines d\'expertise', color: 'from-blue-400 to-cyan-400', icon: '🎯' },
              { number: '15+', label: 'Projets réalisés', color: 'from-green-400 to-emerald-400', icon: '🚀' },
              { number: '5+', label: 'Années d\'expérience', color: 'from-purple-400 to-pink-400', icon: '⏱️' },
              { number: '100%', label: 'Satisfaction client', color: 'from-orange-400 to-red-400', icon: '⭐' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.5}s both`
                }}
              >
                <div className="relative mb-4">
                  <div className={`text-5xl md:text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500`}>
                    {stat.number}
                  </div>
                  <div className="text-2xl group-hover:animate-bounce">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-gray-300 text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 text-center bg-gradient-to-br from-white to-blue-50">
        
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden">
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full translate-y-24 -translate-x-24 opacity-50"></div>
            
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Prêt à collaborer sur votre prochain projet ?
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Transformons ensemble vos idées en solutions techniques innovantes et performantes. 
                <span className="text-blue-600 font-semibold"> L'excellence technique vous attend.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center justify-center">
                    <Link href="/contact">
                      Contactez-moi
                    </Link>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                
                <button className="group px-8 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    <Link href="/projets">
                      Voir mes projets
                    </Link>
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}