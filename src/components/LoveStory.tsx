"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyData } from "@/data/story";
import FloralOrnament from "@/components/decorations/FloralOrnament";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function LoveStory() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex(prev => prev !== null ? (prev + 1) % storyData.length : null);
  const goPrev = () => setSelectedIndex(prev => prev !== null ? (prev - 1 + storyData.length) % storyData.length : null);

  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FCF9F7 0%, #F5EDE4 50%, #FCF9F7 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-40" />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="vine" size={180} />
      <FloralOrnament position="top-right" variant="vine" size={180} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
            Our Journey
          </p>
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-6">
            Our Love Story
          </h2>
          <div className="ornament-line mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line with gradient */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full hidden md:block"
            style={{ background: "linear-gradient(180deg, transparent 0%, #D4AF37 15%, #D4AF37 85%, transparent 100%)", opacity: 0.25 }}
          />

          <div className="space-y-16 md:space-y-28">
            {storyData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    {/* Gold border */}
                    <div className="absolute inset-0 rounded-2xl border border-[#D4AF37]/15 z-10 pointer-events-none" />
                    
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B735B]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                      <span className="text-white text-xs font-elegant tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        View Photo
                      </span>
                    </div>
                    
                    {/* Corner decorations on image */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#D4AF37]/30 rounded-tl-lg" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#D4AF37]/30 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#D4AF37]/30 rounded-bl-lg" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#D4AF37]/30 rounded-tr-lg" />
                  </motion.div>
                </div>

                {/* Timeline dot with glow */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border border-[#D4AF37]/20 animate-pulse-glow">
                    <Heart size={12} className="text-[#D4AF37]" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Text Side */}
                <div className={`w-full md:w-1/2 px-4 md:px-8 text-center ${
                  index % 2 === 1 ? "md:text-right" : "md:text-left"
                }`}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="font-elegant text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-3 block"
                  >
                    {item.date}
                  </motion.span>
                  <h3 className="font-cursive text-2xl md:text-3xl gold-gradient-text mb-4">
                    {item.title}
                  </h3>
                  <div className={`w-12 h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent mb-4 ${
                    index % 2 === 1 ? "md:ml-auto" : ""
                  }`} />
                  <p className="font-elegant text-[#8B735B] leading-relaxed max-w-md mx-auto md:mx-0 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
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

            {/* Content Container */}
            <div className="flex flex-col items-center max-w-[90vw] text-center" onClick={(e) => e.stopPropagation()}>
              {/* Image */}
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={storyData[selectedIndex].image}
                alt={storyData[selectedIndex].title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl mb-6 border border-[#D4AF37]/20"
              />
              
              {/* Title & Description */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-white max-w-xl px-4"
              >
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">
                  {storyData[selectedIndex].date}
                </span>
                <h4 className="font-cursive text-2xl text-[#D4AF37] mb-2 leading-relaxed">
                  {storyData[selectedIndex].title}
                </h4>
                <p className="text-sm text-white/80 font-elegant leading-relaxed">
                  {storyData[selectedIndex].description}
                </p>
              </motion.div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-elegant text-sm tracking-widest">
              {selectedIndex + 1} / {storyData.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
