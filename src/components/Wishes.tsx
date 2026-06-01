"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWishes } from "@/services/googleSheets";
import { User, Quote } from "lucide-react";
import FloralOrnament from "@/components/decorations/FloralOrnament";

interface Wish {
  name: string;
  message: string;
  createdAt: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishes = async () => {
    const data = await fetchWishes();
    setWishes(data as Wish[]);
    setLoading(false);
  };

  useEffect(() => {
    loadWishes();

    const handleNewRSVP = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newWish = customEvent.detail;
      
      // Tampilkan ucapan langsung jika isi ucapan tidak kosong
      if (newWish && newWish.message && newWish.message.trim() !== '') {
        const wishItem: Wish = {
          name: newWish.name,
          message: newWish.message,
          createdAt: new Date().toISOString()
        };
        setWishes(prev => [wishItem, ...prev]);
      }
      
      // Tetap tarik ulang data dari sheets di background untuk memastikan sinkronisasi
      loadWishes();
    };

    window.addEventListener("rsvpsubmitted", handleNewRSVP);
    return () => {
      window.removeEventListener("rsvpsubmitted", handleNewRSVP);
    };
  }, []);

  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FCF9F7 0%, #F5EDE4 50%, #FCF9F7 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-40" />

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
            Messages
          </p>
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-6">
            Ucapan & Doa
          </h2>
          <div className="ornament-line mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
            </div>
          ) : wishes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full border border-[#D4AF37]/15 bg-[#D4AF37]/5 flex items-center justify-center mx-auto mb-4">
                <Quote size={24} className="text-[#D4AF37]/40" />
              </div>
              <p className="font-elegant text-[#8B735B] text-sm">
                Belum ada ucapan. Jadilah yang pertama mengirimkan doa!
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-5">
              {wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="glass-card-gold p-6 md:p-8 flex gap-4 md:gap-6 relative group hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Subtle corner accents */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 rounded-tr transition-all duration-500" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 rounded-bl transition-all duration-500" />

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 to-[#8B735B]/10">
                      <User size={20} className="text-[#D4AF37]/50" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <h4 className="font-cursive text-xl text-[#8B735B]">
                        {wish.name}
                      </h4>
                      <span className="font-elegant text-[9px] text-[#8B735B]/60 uppercase tracking-widest">
                        {new Date(wish.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="relative pl-4">
                      {/* Quote line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
                      <p className="font-elegant text-[#8B735B] italic leading-relaxed text-sm">
                        "{wish.message}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
