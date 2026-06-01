"use client";

import { motion } from "framer-motion";
import FloralOrnament from "@/components/decorations/FloralOrnament";
import { useEffect } from "react";

export default function VideoPrewedding() {
  useEffect(() => {
    // Memuat YouTube IFrame Player API secara asinkronus jika belum dimuat
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let player: any;

    // Callback global saat API YouTube siap
    (window as any).onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    // Jika API YouTube sudah dimuat sebelumnya
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    }

    function createPlayer() {
      player = new (window as any).YT.Player("youtube-player", {
        events: {
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1
            // YT.PlayerState.PAUSED = 2
            // YT.PlayerState.ENDED = 0
            if (event.data === 1) {
              window.dispatchEvent(new CustomEvent("pauseBackgroundMusic"));
            } else if (event.data === 2 || event.data === 0) {
              window.dispatchEvent(new CustomEvent("playBackgroundMusic"));
            }
          },
        },
      });
    }

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, []);

  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBF7F3 50%, #FFFFFF 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 section-bg-pattern opacity-30" />

      {/* Corner ornaments */}
      <FloralOrnament position="top-left" variant="minimal" size={100} />
      <FloralOrnament position="top-right" variant="minimal" size={100} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-elegant text-[#8B735B] text-xs tracking-[0.4em] uppercase mb-4">
            Our Moments
          </p>
          <h2 className="font-cursive text-4xl md:text-5xl gold-gradient-text mb-6">
            Pre-Wedding Video
          </h2>
          <div className="ornament-line mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Video frame with ornamental border */}
          <div className="relative group">
            {/* Outer gold frame */}
            <div className="absolute -inset-2 rounded-3xl border border-[#D4AF37]/10 pointer-events-none" />
            
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/25 rounded-tl-xl pointer-events-none z-10" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/25 rounded-tr-xl pointer-events-none z-10" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/25 rounded-bl-xl pointer-events-none z-10" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/25 rounded-br-xl pointer-events-none z-10" />

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Iframe YouTube menggunakan embed ID dan parameter enablejsapi=1 */}
              <iframe
                id="youtube-player"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/FlTylDo0DJk?enablejsapi=1&rel=0"
                title="Pre-wedding Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
