'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  initials: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Armand Noukpo",
    role: "Professor of Chemical Engineering",
    rating: 5.0,
    text: "André's work on solar energy system optimization was exceptional. His proficiency in MATLAB and attention to detail ensured accurate simulations, significantly contributing to our research group's findings.",
    avatar: "/c5.jpg",
    initials: "AO",
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    name: "Engr. Tounde Kounde",
    role: "Renewable Energy Supervisor",
    rating: 4.8,
    text: "During his internship, André demonstrated strong skills in process simulation using Aspen Plus. His ability to model complex chemical processes was impressive and added value to our team.",
    avatar: "/i1.png",
    initials: "TA",
    bgColor: "bg-indigo-600",
  },
  {
    id: 3,
    name: "Dr. Jeremie ASSOGBA",
    role: "Research Collaborator",
    rating: 5.0,
    text: "André's contributions to our wind turbine design analysis were outstanding. His AutoCAD expertise and analytical approach helped refine our designs, exceeding project expectations.",
    avatar: "/q3.jpg",
    initials: "CE",
    bgColor: "bg-cyan-600",
  },
  {
    id: 4,
    name: "Mrs. Kemi Seba",
    role: "Industry Mentor",
    rating: 4.9,
    text: "André's thermodynamic modeling using COMSOL was meticulous and insightful. His dedication to research and collaborative spirit make him a valuable asset to any engineering project.",
    avatar: "/s1.jpg",
    initials: "FO",
    bgColor: "bg-teal-600",
  },
];

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
  setCurrentIndex(index);
};

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-gray-600 mb-4 tracking-wide uppercase">
            — Feedback
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Testimonials on
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
            My Work
          </h2>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100/50"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)" }}
                aria-label={`Testimonial by ${testimonials[currentIndex].name}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">{renderStars(testimonials[currentIndex].rating)}</div>
                  <span className="text-sm font-semibold text-gray-700">
                    {testimonials[currentIndex].rating}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                  {testimonials[currentIndex].text}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={`${testimonials[currentIndex].name}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="hidden md:block bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100/50 opacity-90"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)" }}
              aria-label={`Testimonial by ${testimonials[(currentIndex + 1) % testimonials.length].name}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {renderStars(testimonials[(currentIndex + 1) % testimonials.length].rating)}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {testimonials[(currentIndex + 1) % testimonials.length].rating}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {testimonials[(currentIndex + 1) % testimonials.length].text}
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonials[(currentIndex + 1) % testimonials.length].avatar}
                  alt={`${testimonials[(currentIndex + 1) % testimonials.length].name}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[(currentIndex + 1) % testimonials.length].name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonials[(currentIndex + 1) % testimonials.length].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <motion.div
          className="mt-12 sm:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}