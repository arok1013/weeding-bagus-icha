"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { weddingData } from "@/data/wedding";
import FloralOrnament from "@/components/decorations/FloralOrnament";

const ProfileCard = ({ 
  data, 
  side,
  label,
}: { 
  data: typeof weddingData.bride; 
  side: "left" | "right";
  label: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex flex-col items-center text-center p-6"
  >
    {/* Photo with decorative ring */}
    <div className="relative w-52 h-52 md:w-64 md:h-64 mb-8 group">
      {/* Animated golden ring */}
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-3"
      >
        <svg className="w-full h-full" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="72" stroke="url(#goldGrad)" strokeWidth="0.8" fill="none" 
            strokeDasharray="4,6" opacity="0.4"/>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F5E7A3" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Outer decorative border */}
      <div className="absolute -inset-1 rounded-full border border-[#D4AF37]/15" />
      
      {/* Photo */}
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl relative group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-shadow duration-500">
        <img
          src={data.image}
          alt={data.fullName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#8B735B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>

    {/* Label */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-elegant mb-2"
    >
      {label}
    </motion.p>

    {/* Name */}
    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-cursive gold-gradient-text mb-3 whitespace-nowrap">
      {data.fullName}
    </h3>
    
    {/* Parents */}
    <div className="mb-5">
      <p className="text-[10px] text-[#8B735B] font-elegant uppercase tracking-[0.3em] mb-1">
        {label === "The Groom" ? "Putra dari" : "Putri dari"}
      </p>
      <p className="text-[#8B735B] font-elegant text-sm">
        Bapak {data.fatherName}
      </p>
      <p className="text-[#8B735B] text-xs">&</p>
      <p className="text-[#8B735B] font-elegant text-sm">
        Ibu {data.motherName}
      </p>
    </div>

    {/* Instagram */}
    <motion.a
      href={`https://instagram.com/${data.instagram}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 text-[#8B735B] hover:text-[#D4AF37] transition-colors duration-300 group/ig"
    >
      <Instagram size={16} className="group-hover/ig:rotate-12 transition-transform" />
      <span className="text-xs font-elegant tracking-wider">@{data.instagram}</span>
    </motion.a>
  </motion.div>
);

export default function BrideGroom() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBF7F3 50%, #FFFFFF 100%)" }}
    >
      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="rose" size={180} />
      <FloralOrnament position="top-right" variant="rose" size={180} />
      <FloralOrnament position="bottom-left" variant="leaf" size={140} />
      <FloralOrnament position="bottom-right" variant="leaf" size={140} />

      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
            Bride & Groom
          </p>
          <h2 className="text-4xl md:text-5xl font-cursive gold-gradient-text mb-6">
            Mempelai
          </h2>
          <div className="ornament-line mx-auto mb-8" />
          <p className="text-[#8B735B] font-elegant italic max-w-lg mx-auto text-sm leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-center max-w-5xl mx-auto">
          <ProfileCard data={weddingData.groom} side="left" label="The Groom" />
          
          {/* Center ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col items-center justify-center py-8 lg:py-0"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden lg:block mb-4" />
            {/* Heart icon */}
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#D4AF37]/30">
              <motion.path
                d="M20 35C20 35 5 25 5 15C5 10 9 6 13 6C16 6 18 8 20 10C22 8 24 6 27 6C31 6 35 10 35 15C35 25 20 35 20 35Z"
                fill="currentColor"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden lg:block mt-4" />
          </motion.div>
 
          <ProfileCard data={weddingData.bride} side="right" label="The Bride" />
        </div>
      </div>
    </section>
  );
}
