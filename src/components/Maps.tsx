"use client";

import { motion } from "framer-motion";
import FloralOrnament from "@/components/decorations/FloralOrnament";
import { ExternalLink } from "lucide-react";

export default function Maps() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FCF9F7 0%, #F5EDE4 50%, #FCF9F7 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-40" />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="leaf" size={140} />
      <FloralOrnament position="top-right" variant="leaf" size={140} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
            Location
          </p>
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-6">
            Peta Acara
          </h2>
          <div className="ornament-line mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Map frame with ornamental border */}
          <div className="relative group">
            {/* Outer gold frame */}
            <div className="absolute -inset-2 rounded-3xl border border-[#D4AF37]/10 pointer-events-none" />
            
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/25 rounded-tl-xl pointer-events-none z-10" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/25 rounded-tr-xl pointer-events-none z-10" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/25 rounded-bl-xl pointer-events-none z-10" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/25 rounded-br-xl pointer-events-none z-10" />

            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://maps.google.com/maps?q=New%20Sari%20Utama%20Convention%20Hall%20Jember&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
              ></iframe>
            </div>
          </div>
 
          {/* Open maps button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <motion.a
              href="https://maps.app.goo.gl/3TVHWtjc7ngPWbAP8"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(212, 175, 55, 0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-elegant text-sm tracking-[0.2em] text-white shadow-lg transition-all relative overflow-hidden group/btn"
              style={{
                background: "linear-gradient(135deg, #8B735B 0%, #A08968 50%, #8B735B 100%)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">BUKA DI GOOGLE MAPS</span>
              <ExternalLink size={14} className="relative z-10" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
