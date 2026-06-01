"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Play } from "lucide-react";
import { useMusic } from "@/hooks/useMusic";
import { musicData } from "@/data/music";
import { useEffect } from "react";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { isPlaying, toggle, play } = useMusic(musicData.url);

  useEffect(() => {
    if (autoPlay) {
      play();
    }
  }, [autoPlay, play]);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Main Audio Toggle Button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #8B735B 0%, #A08968 50%, #8B735B 100%)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
        }}
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-white"
            >
              <Music size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-white"
            >
              <Play size={20} className="ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing rings when playing */}
        {isPlaying && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full -z-10"
              style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.3 }}
              className="absolute inset-0 rounded-full -z-10"
              style={{ border: "1px solid rgba(212, 175, 55, 0.2)" }}
            />
          </>
        )}
      </motion.button>
    </div>
  );
}
