"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { weddingData } from "@/data/wedding";
import FloralOrnament from "@/components/decorations/FloralOrnament";

const CountdownItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center px-3 md:px-6">
    <div className="relative glass-card-gold w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-3 animate-pulse-glow overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          background: "linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.1) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-cursive gold-gradient-text relative z-10"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-[#8B735B] font-elegant">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const timeLeft = useCountdown(weddingData.date);

  return (
    <section className="py-24 relative overflow-hidden section-bg-pattern"
      style={{ background: "linear-gradient(180deg, #F8F2EB 0%, #FCF9F7 50%, #F8F2EB 100%)" }}
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-30 bg-damask-pattern" />
      
      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="minimal" size={100} />
      <FloralOrnament position="top-right" variant="minimal" size={100} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4"
            >
              Save The Date
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-cursive gold-gradient-text mb-6"
            >
              Menuju Hari Bahagia
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="ornament-line mx-auto"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center gap-2 md:gap-4"
          >
            <CountdownItem label="Hari" value={timeLeft.days} />
            <span className="text-[#D4AF37]/30 font-cursive text-2xl md:text-3xl mt-[-20px]">:</span>
            <CountdownItem label="Jam" value={timeLeft.hours} />
            <span className="text-[#D4AF37]/30 font-cursive text-2xl md:text-3xl mt-[-20px]">:</span>
            <CountdownItem label="Menit" value={timeLeft.minutes} />
            <span className="text-[#D4AF37]/30 font-cursive text-2xl md:text-3xl mt-[-20px]">:</span>
            <CountdownItem label="Detik" value={timeLeft.seconds} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
