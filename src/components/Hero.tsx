"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { eventData } from "@/data/event";
import FloralOrnament from "@/components/decorations/FloralOrnament";
import FloatingParticles from "@/components/decorations/FloatingParticles";

export default function Hero() {
  const weddingDate = new Date(weddingData.date);
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Quran verse
  const quranVerse = "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.";
  const quranRef = "QS. Ar-Rum: 21";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 section-bg-pattern"
      style={{ background: "linear-gradient(180deg, #FCF9F7 0%, #F8F2EB 50%, #FCF9F7 100%)" }}
    >
      {/* Floating particles */}
      <FloatingParticles count={15} color="rgba(212, 175, 55, 0.2)" />

      {/* Decorative blurred circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#D4AF37] to-[#8B735B] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#D4AF37] to-[#8B735B] rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"
      />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="vine" size={220} />
      <FloralOrnament position="top-right" variant="vine" size={220} />
      <FloralOrnament position="bottom-left" variant="minimal" size={120} />
      <FloralOrnament position="bottom-right" variant="minimal" size={120} />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Bismillah */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="text-[#8B735B] text-lg md:text-xl mb-8 font-elegant"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </motion.p>

          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block uppercase tracking-[0.5em] text-[10px] md:text-xs text-[#8B735B] mb-8 font-elegant font-light"
          >
            The Wedding of
          </motion.span>

          {/* Ornamental line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="ornament-line mb-8 mx-auto"
          />
          
          {/* Names with cursive font */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-cursive gold-gradient-text mb-4 leading-relaxed text-shadow-gold"
          >
            {weddingData.groom.name}
          </motion.h1>
          
          {/* Ampersand with ornamental styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
            <span className="text-3xl md:text-4xl font-cursive text-[#D4AF37]">&</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
          </motion.div>
 
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-cursive gold-gradient-text mb-10 leading-relaxed text-shadow-gold"
          >
            {weddingData.bride.name}
          </motion.h1>

          {/* Ornamental line below names */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="ornament-line mb-8 mx-auto"
          />

          {/* Date & Location */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl font-elegant text-[#8B735B] mb-2 tracking-wider"
          >
            {formattedDate}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-[#8B735B] tracking-[0.3em] uppercase text-[10px] md:text-xs font-elegant mb-14"
          >
            {eventData.akad.location}
          </motion.p>

          {/* Quran Verse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-2xl mx-auto glass-card-gold p-8 md:p-10 relative"
          >
            {/* Quote marks */}
            <span className="absolute top-3 left-4 text-4xl font-serif text-[#D4AF37]/15 leading-none">"</span>
            <span className="absolute bottom-3 right-4 text-4xl font-serif text-[#D4AF37]/15 leading-none rotate-180">"</span>
            
            <p className="font-elegant text-[#8B735B] text-sm md:text-base leading-relaxed italic px-4">
              {quranVerse}
            </p>
            <div className="separator-ornament mt-4 mb-2">
              <span className="text-[#D4AF37] text-[8px]">✦</span>
            </div>
            <p className="font-elegant text-[#D4AF37] text-xs tracking-[0.2em] uppercase">
              {quranRef}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-6 hidden lg:block"
      >
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-6 hidden lg:block"
      >
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      </motion.div>
    </section>
  );
}
