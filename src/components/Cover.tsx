"use client";

import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { weddingData } from "@/data/wedding";
import FloatingParticles from "@/components/decorations/FloatingParticles";
import PetalFall from "@/components/decorations/PetalFall";
import FloralOrnament from "@/components/decorations/FloralOrnament";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const guestName = searchParams.get("to") || "Tamu Undangan";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FCF9F7 0%, #F5EDE4 50%, #E8DDD0 100%)" }}
    >
      {/* Background Image with parallax overlay */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FCF9F7]/80 via-transparent to-[#FCF9F7]/90" />

      {/* Floating particles */}
      <FloatingParticles count={30} color="rgba(212, 175, 55, 0.35)" />
      
      {/* Petal fall */}
      <PetalFall count={8} />

      {/* Corner floral ornaments */}
      <FloralOrnament position="top-left" variant="rose" size={200} />
      <FloralOrnament position="top-right" variant="leaf" size={160} />
      <FloralOrnament position="bottom-left" variant="leaf" size={160} />
      <FloralOrnament position="bottom-right" variant="rose" size={200} />

      {/* Decorative frame */}
      <div className="absolute inset-8 md:inset-16 border border-[#D4AF37]/10 rounded-3xl pointer-events-none z-[3]" />
      <div className="absolute inset-10 md:inset-20 border border-[#8B735B]/5 rounded-2xl pointer-events-none z-[3]" />

      {/* Main content */}
      <div className="z-10 text-center px-4 relative">
        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-[#8B735B] text-sm font-elegant tracking-widest mb-6"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[0.4em] text-xs md:text-sm mb-3 font-elegant text-[#8B735B] font-light"
        >
          The Wedding of
        </motion.p>

        {/* Ornamental line above names */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="ornament-line-wide mb-6 mx-auto"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-cursive mb-2 gold-gradient-text text-shadow-gold leading-relaxed"
        >
          {weddingData.groom.name} <span className="text-3xl md:text-5xl">&</span> {weddingData.bride.name}
        </motion.h1>

        {/* Date with ornamental frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-10"
        >
          <div className="separator-ornament mb-4">
            <span className="text-[#D4AF37] text-xs">✦</span>
          </div>
          <p className="text-sm font-elegant text-[#8B735B] tracking-[0.2em]">
            {new Date(weddingData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Guest section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs italic mb-2 font-elegant text-[#8B735B] tracking-wider">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#8B735B]">{guestName}</h2>
        </motion.div>

        {/* Open button with glow */}
        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.8 }}
          className="relative flex items-center gap-3 px-10 py-4 rounded-full shadow-xl transition-all duration-300 mx-auto overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #8B735B 0%, #A08968 50%, #8B735B 100%)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          {/* Button shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <MailOpen size={18} className="text-white relative z-10" />
          <span className="font-elegant font-medium text-white relative z-10 tracking-widest text-sm">
            Buka Undangan
          </span>
        </motion.button>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]/40 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-elegant">Scroll Down</p>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-40">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#D4AF37" strokeWidth="1"/>
          <motion.circle 
            cx="8" cy="8" r="2" fill="#D4AF37"
            animate={{ cy: [8, 16, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
