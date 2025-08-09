'use client';

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Zap, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experiences", href: "/experiences" },
    { name: "Media", href: "/media" },
    { name: "Contact", href: "/contact" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect with enhanced smoothness
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click and escape key
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Enhanced animation variants
  const navVariants = {
    hidden: { y: -120, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.7, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.2,
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    },
    hover: { 
      scale: 1.08, 
      rotate: 2,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.320, 1],
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.320, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileItemVariants = {
    open: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.23, 1, 0.320, 1] 
      } 
    },
    closed: { 
      opacity: 0, 
      x: 50, 
      y: -10,
      transition: { 
        duration: 0.3, 
        ease: [0.23, 1, 0.320, 1] 
      } 
    }
  };

  const desktopItemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4 + index * 0.1,
        ease: [0.23, 1, 0.320, 1]
      }
    }),
    hover: { 
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, x: 30, scale: 0.9 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: [0.23, 1, 0.320, 1]
      }
    },
    hover: { 
      scale: 1.05,
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    tap: { scale: 0.95 }
  };

  // Enhanced hamburger animations
  const hamburgerLineVariants = {
    top: {
      open: { 
        rotate: 45, 
        y: 8, 
        backgroundColor: "#dc2626",
        transition: { duration: 0.3, ease: [0.23, 1, 0.320, 1] }
      },
      closed: { 
        rotate: 0, 
        y: 0, 
        backgroundColor: "#374151",
        transition: { duration: 0.3, ease: [0.23, 1, 0.320, 1] }
      }
    },
    middle: {
      open: { 
        opacity: 0, 
        scale: 0,
        transition: { duration: 0.2, ease: "easeOut" }
      },
      closed: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.2, delay: 0.1, ease: "easeOut" }
      }
    },
    bottom: {
      open: { 
        rotate: -45, 
        y: -8, 
        backgroundColor: "#dc2626",
        transition: { duration: 0.3, ease: [0.23, 1, 0.320, 1] }
      },
      closed: { 
        rotate: 0, 
        y: 0, 
        backgroundColor: "#374151",
        transition: { duration: 0.3, ease: [0.23, 1, 0.320, 1] }
      }
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed w-full top-0 z-50 transition-all duration-700 ${
          isScrolled || isMenuOpen
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-100/50'
            : 'bg-white/90 backdrop-blur-lg shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Enhanced Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Zap className="w-7 h-7 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  <motion.div 
                    className="absolute inset-0 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-md"
                    whileHover={{ scale: 1.5, opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="text-xl sm:text-2xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <span className="hidden xs:inline tracking-tight">André SENOU</span>
                  <span className="xs:hidden tracking-tight">SENOU</span>
                </div>
              </Link>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={desktopItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 text-base font-semibold relative group transition-all duration-300"
                  >
                    {item.name}
                    <motion.span 
                      className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-blue-50 rounded-lg opacity-0"
                      whileHover={{ opacity: 1, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      style={{ zIndex: -1 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Desktop Button */}
            <div className="hidden md:flex items-center">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-sm px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 border-0">
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Contact for Collaboration
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Enhanced Mobile Hamburger */}
            <motion.button
              className="lg:hidden p-3 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 relative overflow-hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-100 rounded-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="w-7 h-7 flex flex-col justify-center items-center gap-1.5 relative z-10">
                <motion.span
                  variants={hamburgerLineVariants.top}
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-7 h-0.5 bg-gray-700 rounded-full"
                />
                <motion.span
                  variants={hamburgerLineVariants.middle}
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-7 h-0.5 bg-gray-700 rounded-full"
                />
                <motion.span
                  variants={hamburgerLineVariants.bottom}
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-7 h-0.5 bg-gray-700 rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed top-16 sm:top-20 right-0 w-5/6 max-w-sm bg-gradient-to-br from-white via-blue-50/65 to-indigo-50/95 backdrop-blur-2xl shadow-2xl border-l border-blue-200/50 rounded-l-3xl overflow-hidden"
            >
              {/* Close button for mobile */}
              <div className="absolute top-4 right-4">
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              <div className="py-8 px-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={mobileItemVariants}
                    custom={index}
                    whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-5 py-4 text-gray-800 hover:text-blue-600 rounded-xl transition-all duration-300 text-lg font-semibold relative overflow-hidden group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className="absolute left-0 top-1/2 w-1 h-0 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"
                        initial={{ height: 0 }}
                        whileHover={{ height: "60%" }}
                        style={{ y: "-50%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={mobileItemVariants} className="pt-6">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        Contact for Collaboration
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full -ml-12 -mb-12" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  );
}