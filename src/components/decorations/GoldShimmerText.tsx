"use client";

import { motion } from "framer-motion";

interface GoldShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
}

export default function GoldShimmerText({ 
  children, 
  className = "", 
  as: Tag = "h2",
  delay = 0 
}: GoldShimmerTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <Tag className={`gold-gradient-text text-shadow-gold ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
}
