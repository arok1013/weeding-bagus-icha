"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData } from "@/data/gallery";
import FloralOrnament from "@/components/decorations/FloralOrnament";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex(prev => prev !== null ? (prev + 1) % galleryData.length : null);
  const goPrev = () => setSelectedIndex(prev => prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null);

  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBF7F3 50%, #FFFFFF 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-30" />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="rose" size={160} />
      <FloralOrnament position="top-right" variant="rose" size={160} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
            Gallery
          </p>
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-4">
            Our Moments
          </h2>
          <p className="font-elegant text-[#8B735B] text-sm italic mb-6">
            Potret Cerita Kami dalam 1 Frame
          </p>
          <div className="ornament-line mx-auto" />
        </motion.div>

        {/* Masonry gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 max-w-6xl mx-auto">
          {galleryData.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid"
              onClick={() => openLightbox(index)}
            >
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 transition-all duration-500 z-10 pointer-events-none" />
              
              {/* Corner decorations on hover */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-tl transition-all duration-500 z-10" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-tr transition-all duration-500 z-10" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-bl transition-all duration-500 z-10" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-br transition-all duration-500 z-10" />
              
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover overlay with gold gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B735B]/40 via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                <span className="text-white text-xs font-elegant tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  View Photo
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={20} />
            </motion.button>

            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={20} />
            </motion.button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={galleryData[selectedIndex]}
              alt={`Gallery ${selectedIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-elegant text-sm tracking-widest">
              {selectedIndex + 1} / {galleryData.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
