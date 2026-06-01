"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "@/services/googleSheets";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import FloralOrnament from "@/components/decorations/FloralOrnament";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    guests: 1,
    status: "hadir" as "hadir" | "tidak_hadir" | "mungkin",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const success = await submitRSVP(formData);
    
    setLoading(false);
    if (success) {
      setSubmitted(true);
      setFormData({ name: "", whatsapp: "", guests: 1, status: "hadir", message: "" });
    } else {
      setError(true);
    }
  };

  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBF7F3 50%, #FFFFFF 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-30" />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="vine" size={160} />
      <FloralOrnament position="top-right" variant="vine" size={160} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
              Confirmation
            </p>
            <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-6">
              RSVP
            </h2>
            <div className="ornament-line mx-auto mb-6" />
            <p className="font-elegant text-[#8B735B] text-sm">
              Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara.
            </p>
          </div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card-gold p-8 md:p-12 relative"
          >
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#D4AF37]/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#D4AF37]/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#D4AF37]/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#D4AF37]/20 rounded-br-lg" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/20"
                    style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))" }}
                  >
                    <CheckCircle2 size={36} className="text-[#D4AF37]" />
                  </motion.div>
                  <h3 className="font-cursive text-3xl gold-gradient-text mb-3">Terima Kasih!</h3>
                  <p className="font-elegant text-[#8B735B] mb-8 text-sm">
                    RSVP Anda telah berhasil dikirim.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#D4AF37] font-elegant text-xs underline tracking-[0.2em] hover:text-[#D4AF37] transition-colors"
                  >
                    KIRIM LAGI
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-elegant text-[10px] uppercase tracking-[0.3em] text-[#8B735B] font-semibold px-1">
                        Nama Lengkap
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-white/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#D4AF37]/15 focus:border-[#D4AF37]/30 transition-all font-elegant text-[#8B735B] placeholder:text-[#8B735B]/60"
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-elegant text-[10px] uppercase tracking-[0.3em] text-[#8B735B] font-semibold px-1">
                        Nomor WhatsApp
                      </label>
                      <input
                        required
                        type="tel"
                        className="w-full bg-white/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#D4AF37]/15 focus:border-[#D4AF37]/30 transition-all font-elegant text-[#8B735B] placeholder:text-[#8B735B]/60"
                        placeholder="Contoh: 08123456789"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-elegant text-[10px] uppercase tracking-[0.3em] text-[#8B735B] font-semibold px-1">
                        Jumlah Tamu
                      </label>
                      <select
                        className="w-full bg-white/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#D4AF37]/15 focus:border-[#D4AF37]/30 transition-all font-elegant text-[#8B735B]"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Orang" : "Orang"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="font-elegant text-[10px] uppercase tracking-[0.3em] text-[#8B735B] font-semibold px-1">
                        Kehadiran
                      </label>
                      <div className="flex gap-3">
                        {[
                          { value: "hadir", label: "Hadir" },
                          { value: "tidak_hadir", label: "Tidak" },
                          { value: "mungkin", label: "Mungkin" },
                        ].map((option) => (
                          <label key={option.value} className="flex-1 cursor-pointer group">
                            <input
                              type="radio"
                              className="sr-only"
                              name="status"
                              checked={formData.status === option.value}
                              onChange={() => setFormData({ ...formData, status: option.value as typeof formData.status })}
                            />
                            <div className={`text-center py-3 rounded-xl border transition-all font-elegant text-xs tracking-wider ${
                              formData.status === option.value 
                                ? "text-white border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20" 
                                : "bg-white/80 text-[#8B735B] border-[#D4AF37]/30 hover:border-[#D4AF37]/30"
                            }`}
                            style={formData.status === option.value ? {
                              background: "linear-gradient(135deg, #8B735B 0%, #A08968 100%)"
                            } : {}}
                            >
                              {option.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-elegant text-[10px] uppercase tracking-[0.3em] text-[#8B735B] font-semibold px-1">
                      Ucapan & Doa
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#D4AF37]/15 focus:border-[#D4AF37]/30 transition-all font-elegant text-[#8B735B] resize-none placeholder:text-[#8B735B]/60"
                      placeholder="Kirimkan ucapan dan doa terbaik Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-xs font-elegant justify-center"
                    >
                      <AlertCircle size={14} />
                      Terjadi kesalahan. Silakan coba lagi.
                    </motion.div>
                  )}

                  <motion.button
                    disabled={loading}
                    type="submit"
                    whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-elegant tracking-[0.25em] text-sm text-white flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 transition-all relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, #8B735B 0%, #A08968 50%, #8B735B 100%)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                    }}
                  >
                    {/* Button shimmer */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="relative z-10">KIRIM RSVP</span>
                        <Send size={16} className="relative z-10" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
