"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  swayAmount: number;
  opacity: number;
}

interface PetalFallProps {
  count?: number;
  className?: string;
}

export default function PetalFall({ count = 12, className = "" }: PetalFallProps) {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      swayAmount: Math.random() * 100 + 50,
      opacity: Math.random() * 0.25 + 0.1,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[1] ${className}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.swayAmount, -petal.swayAmount * 0.5, petal.swayAmount * 0.7, 0],
            rotate: [petal.rotation, petal.rotation + 720],
            opacity: [0, petal.opacity, petal.opacity, petal.opacity * 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Petal shape */}
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C10 0 0 8 0 16C0 22 4 28 10 28C16 28 20 22 20 16C20 8 10 0 10 0Z"
              fill="#D4AF37"
              opacity="0.3"
            />
            <path
              d="M10 4C10 4 4 10 4 16C4 20 7 24 10 24"
              stroke="#8B735B"
              strokeWidth="0.3"
              opacity="0.4"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
