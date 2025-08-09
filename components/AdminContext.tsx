"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence, Variants  } from "framer-motion";
import { X, Key, Shield, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false); // Initialisé à false

  useEffect(() => {
  // Vérifier que nous sommes côté client
  if (typeof window !== 'undefined') {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }
}, []);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }
}, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function AdminAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsAdmin } = useContext(AdminContext)!;
  const correctAnswer = "iletaitunefois...";

  useEffect(() => {
  // Vérifier si l'utilisateur est admin après le montage
  if (typeof window !== 'undefined') {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      setIsOpen(true);
    }
  }
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  if (answer === correctAnswer) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("isAdmin", "true");
    }
    setIsAdmin(true);
    setIsOpen(false);
    setError("");
  } else {
      setError("Réponse incorrecte. Redirection vers la page d'accueil.");
      setTimeout(() => {
        setIsOpen(false);
        router.push("/");
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md max-w-sm w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Accès Administrateur</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/");
                }}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fermer la modale et retourner à l'accueil"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Si la mécanique est une science, que diras-tu ?
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <motion.input
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Entrez votre réponse"
                  required
                  aria-required="true"
                  aria-label="Réponse pour l'accès administrateur"
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg flex items-center justify-center contrast-125 hover:bg-blue-600"
                aria-label="Valider la réponse"
              >
                <Key className="w-4 h-4 mr-2" />
                Valider
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AdminButton() {
  const router = useRouter();
  const { isAdmin } = useContext(AdminContext)!;
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Indique que le composant est monté côté client
  }, []);

  if (!isMounted || !isAdmin) return null; // Ne rend rien tant que non monté ou non admin

  const buttonVariants: Variants  = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: {
      scale: 0.95,
      y: 0,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants: Variants  = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 15,
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { 
      rotate: -5,
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  const expandedVariants: Variants  = {
    collapsed: { 
      width: 56,
      transition: { 
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1]
      }
    },
    expanded: { 
      width: 140,
      transition: { 
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  };

  const textVariants: Variants  = {
    hidden: { 
      opacity: 0,
      x: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 0.3, 
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] // Using cubic bezier values instead of string
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg"
      />
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => {
          setIsHovered(true);
          setIsExpanded(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setIsExpanded(false);
        }}
        onClick={() => router.push("/admin")}
        className="relative overflow-hidden"
        aria-label="Accéder au tableau de bord administrateur"
      >
        <motion.div
          variants={expandedVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          className="h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-full shadow-xl border border-white/20 backdrop-blur-sm flex items-center justify-start px-4 gap-2"
        >
          <motion.div
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
              transition: {
                duration: 0.6,
                ease: "easeInOut"
              }
            }}
            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
          <motion.div
            variants={iconVariants}
            className="flex-shrink-0 relative z-10"
          >
            <Shield className="w-6 h-6 text-white drop-shadow-sm" />
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex items-center gap-1 text-white font-medium text-sm whitespace-nowrap"
              >
                Admin
                <ChevronRight className="w-4 h-4 opacity-75" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full shadow-sm"
        />
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
          }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full shadow-sm"
        />
      </motion.button>
    </div>
  );
}