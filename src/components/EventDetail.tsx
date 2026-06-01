"use client";

import { motion } from "framer-motion";
import { eventData } from "@/data/event";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import FloralOrnament from "@/components/decorations/FloralOrnament";

export default function EventDetail() {
  const events = [
    { ...eventData.akad, type: "Akad Nikah", icon: "💍" },
    { ...eventData.resepsi, type: "Resepsi", icon: "🎉" },
  ];

  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FCF9F7 0%, #F5EDE4 50%, #FCF9F7 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-40" />
      
      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="vine" size={180} />
      <FloralOrnament position="top-right" variant="vine" size={180} />
      <FloralOrnament position="bottom-left" variant="minimal" size={120} />
      <FloralOrnament position="bottom-right" variant="minimal" size={120} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
            Save The Date
          </p>
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-6">
            Wedding Events
          </h2>
          <div className="ornament-line mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group"
            >
              {/* Outer decorative border */}
              <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.1), transparent, rgba(212,175,55,0.1))" }}
              />
              
              <div className="glass-card-gold p-8 md:p-10 text-center relative overflow-hidden">
                {/* Top gold line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5"
                  style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                />

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D4AF37]/20 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D4AF37]/20 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D4AF37]/20 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D4AF37]/20 rounded-br-lg" />

                {/* Event title */}
                <h3 className="font-cursive text-3xl gold-gradient-text mb-8">
                  {event.title}
                </h3>

                <div className="space-y-6 mb-10">
                  {/* Date */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-[#D4AF37]/60 border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                      <Calendar size={18} />
                    </div>
                    <p className="font-elegant font-medium text-[#8B735B]">{event.date}</p>
                  </motion.div>

                  {/* Time */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-[#D4AF37]/60 border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                      <Clock size={18} />
                    </div>
                    <p className="font-elegant font-medium text-[#8B735B]">{event.time}</p>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-[#D4AF37]/60 border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                      <MapPin size={18} />
                    </div>
                    <p className="font-elegant font-semibold text-[#8B735B] mb-1">{event.location}</p>
                    <p className="font-elegant text-xs text-[#8B735B] max-w-xs">{event.address}</p>
                  </motion.div>
                </div>

                {/* Maps button */}
                <motion.a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(212, 175, 55, 0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-elegant text-sm tracking-[0.2em] transition-all shadow-lg relative overflow-hidden group/btn"
                  style={{
                    background: "linear-gradient(135deg, #8B735B 0%, #A08968 50%, #8B735B 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    color: "white",
                  }}
                >
                  {/* Button shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative z-10">GOOGLE MAPS</span>
                  <ExternalLink size={14} className="relative z-10" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
