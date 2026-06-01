"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import FloralOrnament from "@/components/decorations/FloralOrnament";
import FloatingParticles from "@/components/decorations/FloatingParticles";

export default function Footer() {
  const { bride, groom } = weddingData;

  return (
    <footer className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8F2EB 30%, #F0E8DD 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-30" />

      {/* Floating particles */}
      <FloatingParticles count={10} color="rgba(212, 175, 55, 0.15)" />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="vine" size={200} />
      <FloralOrnament position="top-right" variant="vine" size={200} />
      <FloralOrnament position="bottom-left" variant="rose" size={160} />
      <FloralOrnament position="bottom-right" variant="rose" size={160} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top ornamental border */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="ornament-line-wide mx-auto mb-12"
          />

          {/* Animated heart */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center mb-8"
          >
            <svg width="32" height="32" viewBox="0 0 40 40" className="text-[#D4AF37]/30">
              <path
                d="M20 35C20 35 5 25 5 15C5 10 9 6 13 6C16 6 18 8 20 10C22 8 24 6 27 6C31 6 35 10 35 15C35 25 20 35 20 35Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          {/* Thank you message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-6"
          >
            Thank You
          </motion.p>

          {/* Couple names */}
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-8 leading-relaxed">
            {groom.name} & {bride.name}
          </h2>

          <p className="font-elegant text-[#8B735B] max-w-md mx-auto mb-8 leading-relaxed text-sm">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>

          <div className="separator-ornament mb-8">
            <span className="text-[#D4AF37] text-xs">✦</span>
          </div>

          {/* Wassalam */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <p className="font-elegant text-[#8B735B] text-sm italic">
              Kami yang berbahagia,
            </p>
            <p className="font-cursive text-2xl text-[#8B735B] mt-2">
              {groom.name} & {bride.name}
            </p>
          </motion.div>

          {/* Bottom ornament */}
          <div className="ornament-line-wide mx-auto mb-8" />

          <div className="space-y-3">
            <p className="font-elegant text-[9px] uppercase tracking-[0.4em] text-[#8B735B]">
              Created with ❤️ for
            </p>
            <p className="font-cursive text-lg text-[#D4AF37]">
              The Wedding of {groom.name} & {bride.name}
            </p>
          </div>

          <p className="mt-12 font-elegant text-[9px] text-[#8B735B] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Digital Wedding Invitation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
