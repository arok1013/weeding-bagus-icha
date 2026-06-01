"use client";

import { motion } from "framer-motion";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Variant = "vine" | "rose" | "leaf" | "minimal";

interface FloralOrnamentProps {
  position: Position;
  variant?: Variant;
  className?: string;
  color?: string;
  size?: number;
}

const getPositionClasses = (position: Position): string => {
  switch (position) {
    case "top-left": return "top-0 left-0";
    case "top-right": return "top-0 right-0";
    case "bottom-left": return "bottom-0 left-0";
    case "bottom-right": return "bottom-0 right-0";
  }
};

const getRotation = (position: Position): number => {
  switch (position) {
    case "top-left": return 0;
    case "top-right": return 90;
    case "bottom-left": return 270;
    case "bottom-right": return 180;
  }
};

const VineOrnament = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M0 0C0 0 20 40 40 60C60 80 80 70 90 80C100 90 95 110 110 120C125 130 140 115 150 130C160 145 145 160 160 175" 
      stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
    <path d="M40 60C40 60 55 45 70 50C85 55 75 70 90 80" 
      stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3"/>
    <circle cx="40" cy="60" r="3" fill={color} opacity="0.3"/>
    <circle cx="90" cy="80" r="4" fill={color} opacity="0.25"/>
    <circle cx="110" cy="120" r="3" fill={color} opacity="0.3"/>
    <circle cx="150" cy="130" r="5" fill={color} opacity="0.2"/>
    {/* Leaves */}
    <ellipse cx="55" cy="48" rx="12" ry="5" transform="rotate(-30 55 48)" fill={color} opacity="0.15"/>
    <ellipse cx="100" cy="95" rx="14" ry="6" transform="rotate(20 100 95)" fill={color} opacity="0.12"/>
    <ellipse cx="135" cy="118" rx="10" ry="4" transform="rotate(-45 135 118)" fill={color} opacity="0.15"/>
    {/* Small flowers */}
    <g opacity="0.2">
      <circle cx="70" cy="50" r="6" fill={color} opacity="0.3"/>
      <circle cx="67" cy="47" r="3" fill={color}/>
      <circle cx="73" cy="47" r="3" fill={color}/>
      <circle cx="67" cy="53" r="3" fill={color}/>
      <circle cx="73" cy="53" r="3" fill={color}/>
      <circle cx="70" cy="50" r="2" fill="#D4AF37" opacity="0.5"/>
    </g>
  </svg>
);

const RoseOrnament = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Rose petals */}
    <g opacity="0.25" transform="translate(50, 50)">
      <path d="M30 10C30 10 50 0 60 15C70 30 55 40 55 40C55 40 70 35 70 50C70 65 55 60 55 60C55 60 65 70 55 80C45 90 35 75 35 75C35 75 30 90 15 80C0 70 15 55 15 55C15 55 0 55 5 40C10 25 25 30 25 30C25 30 10 20 30 10Z" 
        fill={color}/>
      <circle cx="38" cy="45" r="8" fill="#D4AF37" opacity="0.3"/>
    </g>
    {/* Stem & leaves */}
    <path d="M80 95C80 95 70 120 60 140C50 160 40 170 30 185" stroke={color} strokeWidth="1.5" opacity="0.3" fill="none"/>
    <ellipse cx="65" cy="125" rx="18" ry="7" transform="rotate(-40 65 125)" fill={color} opacity="0.12"/>
    <ellipse cx="48" cy="155" rx="15" ry="6" transform="rotate(30 48 155)" fill={color} opacity="0.12"/>
    {/* Small buds */}
    <circle cx="20" cy="20" r="5" fill={color} opacity="0.15"/>
    <circle cx="150" cy="40" r="3" fill={color} opacity="0.1"/>
    {/* Decorative dots */}
    <circle cx="120" cy="30" r="1.5" fill="#D4AF37" opacity="0.2"/>
    <circle cx="140" cy="60" r="1" fill="#D4AF37" opacity="0.15"/>
    <circle cx="160" cy="20" r="1.5" fill="#D4AF37" opacity="0.2"/>
  </svg>
);

const LeafOrnament = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M10 10C10 10 30 20 50 45C70 70 65 95 80 110" stroke={color} strokeWidth="1.5" opacity="0.3" fill="none"/>
    <ellipse cx="35" cy="28" rx="20" ry="8" transform="rotate(-30 35 28)" fill={color} opacity="0.12"/>
    <ellipse cx="55" cy="55" rx="22" ry="9" transform="rotate(15 55 55)" fill={color} opacity="0.1"/>
    <ellipse cx="70" cy="85" rx="18" ry="7" transform="rotate(-20 70 85)" fill={color} opacity="0.12"/>
    {/* Small branches */}
    <path d="M35 28C50 20 60 25 55 35" stroke={color} strokeWidth="0.8" opacity="0.2" fill="none"/>
    <path d="M55 55C70 45 80 55 70 65" stroke={color} strokeWidth="0.8" opacity="0.2" fill="none"/>
    {/* Dots */}
    <circle cx="25" cy="15" r="2" fill="#D4AF37" opacity="0.2"/>
    <circle cx="45" cy="40" r="1.5" fill="#D4AF37" opacity="0.15"/>
    <circle cx="75" cy="100" r="2" fill="#D4AF37" opacity="0.2"/>
  </svg>
);

const MinimalOrnament = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M0 0L60 0" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    <path d="M0 0L0 60" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    <path d="M0 0C20 20 30 40 50 50" stroke={color} strokeWidth="1" opacity="0.2" fill="none"/>
    <circle cx="50" cy="50" r="3" fill="#D4AF37" opacity="0.2"/>
    <circle cx="25" cy="25" r="1.5" fill={color} opacity="0.15"/>
  </svg>
);

export default function FloralOrnament({ 
  position, 
  variant = "vine", 
  className = "",
  color = "#8B735B",
  size = 180,
}: FloralOrnamentProps) {
  const posClasses = getPositionClasses(position);
  const rotation = getRotation(position);

  const OrnamentSvg = {
    vine: VineOrnament,
    rose: RoseOrnament,
    leaf: LeafOrnament,
    minimal: MinimalOrnament,
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`absolute ${posClasses} pointer-events-none z-[2] ${className}`}
      style={{ 
        width: size, 
        height: size, 
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <OrnamentSvg color={color} />
    </motion.div>
  );
}
