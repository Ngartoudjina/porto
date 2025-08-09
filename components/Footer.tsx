'use client';

import React, { useState } from 'react';
import { motion, Variants } from "framer-motion";
import { Mail, Linkedin, Github, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const footerVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const sectionVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de l'inscription");
      }

      toast.success('Merci de vous être abonné à mes mises à jour de recherche !');
      setEmail(''); // Réinitialiser le champ email
    } catch (error) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error);
      let errorMessage = 'Échec de l\'inscription. Veuillez réessayer.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.footer
      className="bg-gradient-to-b from-gray-900 to-blue-950 text-white py-12 px-4 sm:px-6 md:px-8"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Toaster position="top-center" toastOptions={{ className: "text-sm" }} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {/* About Section */}
        <motion.div variants={sectionVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" aria-hidden="true" />
            <h3 className="text-lg sm:text-xl font-semibold">André SENOU</h3>
          </div>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Faire progresser les solutions énergétiques durables grâce à l'ingénierie des procédés innovante et à la recherche.
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div variants={sectionVariants} className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold">Liens Rapides</h3>
          <ul className="space-y-2 text-sm sm:text-base text-gray-300">
            {[
              { name: "Accueil", href: "/" },
              { name: "À Propos", href: "/about" },
              { name: "Projets", href: "/projects" },
              { name: "Parcours", href: "/parcours" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ x: 5, color: "#93c5fd" }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="hover:text-blue-300 transition-colors duration-200"
                  aria-label={`Aller à la section ${item.name}`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div variants={sectionVariants} className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold">Restez Informé</h3>
          <p className="text-sm sm:text-base text-gray-300">
            Abonnez-vous pour recevoir des mises à jour sur mes recherches et projets.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3" aria-label="Formulaire d'inscription à la newsletter">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex-1"
            >
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-900 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                required
                disabled={isSubmitting}
                aria-label="Adresse email pour la newsletter"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                aria-label="S'abonner à la newsletter"
              >
                {isSubmitting ? 'Envoi...' : 'S\'abonner'}
              </Button>
            </motion.div>
          </form>
          <div className="flex items-center gap-4 pt-4">
            <motion.a
              href="https://www.linkedin.com/in/mahunan-andr%C3%A9-senou-5843062a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-300 hover:text-blue-300 transition-colors duration-200"
              aria-label="Profil LinkedIn d'André SENOU"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://andresenou.github.io/Profile/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-300 hover:text-blue-300 transition-colors duration-200"
              aria-label="Profil GitHub d'André SENOU"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        variants={sectionVariants}
        className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400"
      >
        <p>&copy; {new Date().getFullYear()} André SENOU. Tous droits réservés.</p>
      </motion.div>
    </motion.footer>
  );
}