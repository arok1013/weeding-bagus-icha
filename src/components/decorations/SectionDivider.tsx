"use client";

import { motion } from "framer-motion";

type DividerVariant = "floral" | "diamond" | "wave" | "ornate" | "hearts";

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
  color?: string;
}

const FloralDivider = ({ color }: { color: string }) => (
  <svg width="300" height="40" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    {/* Left line */}
    <line x1="0" y1="20" x2="110" y2="20" stroke={color} strokeWidth="0.5" opacity="0.4"/>
    {/* Right line */}
    <line x1="190" y1="20" x2="300" y2="20" stroke={color} strokeWidth="0.5" opacity="0.4"/>
    {/* Center flower */}
    <g transform="translate(150, 20)" opacity="0.5">
      <ellipse cx="0" cy="-8" rx="4" ry="7" fill={color} opacity="0.6"/>
      <ellipse cx="8" cy="0" rx="4" ry="7" transform="rotate(72)" fill={color} opacity="0.6"/>
      <ellipse cx="0" cy="8" rx="4" ry="7" transform="rotate(144)" fill={color} opacity="0.6"/>
      <ellipse cx="-8" cy="0" rx="4" ry="7" transform="rotate(216)" fill={color} opacity="0.6"/>
      <ellipse cx="0" cy="0" rx="4" ry="7" transform="rotate(288)" fill={color} opacity="0.6"/>
      <circle cx="0" cy="0" r="3" fill="#D4AF37" opacity="0.5"/>
    </g>
    {/* Side curls */}
    <path d="M110 20C120 12 130 12 135 16C140 20 135 25 130 22" stroke={color} strokeWidth="0.8" opacity="0.4" fill="none"/>
    <path d="M190 20C180 12 170 12 165 16C160 20 165 25 170 22" stroke={color} strokeWidth="0.8" opacity="0.4" fill="none"/>
    {/* Leaves */}
    <ellipse cx="120" cy="18" rx="8" ry="3" transform="rotate(-15 120 18)" fill={color} opacity="0.1"/>
    <ellipse cx="180" cy="18" rx="8" ry="3" transform="rotate(15 180 18)" fill={color} opacity="0.1"/>
  </svg>
);

const DiamondDivider = ({ color }: { color: string }) => (
  <svg width="300" height="30" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <line x1="0" y1="15" x2="120" y2="15" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    <line x1="180" y1="15" x2="300" y2="15" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    {/* Center diamond */}
    <path d="M150 3L162 15L150 27L138 15Z" stroke={color} strokeWidth="1" opacity="0.4" fill={color} fillOpacity="0.1"/>
    {/* Small diamonds */}
    <path d="M125 12L130 15L125 18L120 15Z" fill={color} opacity="0.25"/>
    <path d="M175 12L180 15L175 18L170 15Z" fill={color} opacity="0.25"/>
    {/* Dots */}
    <circle cx="110" cy="15" r="1.5" fill={color} opacity="0.3"/>
    <circle cx="190" cy="15" r="1.5" fill={color} opacity="0.3"/>
  </svg>
);

const WaveDivider = ({ color }: { color: string }) => (
  <svg width="300" height="30" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <path d="M0 15C25 5 50 25 75 15C100 5 125 25 150 15C175 5 200 25 225 15C250 5 275 25 300 15" 
      stroke={color} strokeWidth="1" opacity="0.25" fill="none"/>
    <path d="M0 15C25 8 50 22 75 15C100 8 125 22 150 15C175 8 200 22 225 15C250 8 275 22 300 15" 
      stroke={color} strokeWidth="0.5" opacity="0.15" fill="none"/>
  </svg>
);

const OrnateDivider = ({ color }: { color: string }) => (
  <svg width="400" height="50" viewBox="0 0 400 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    {/* Main horizontal line */}
    <line x1="0" y1="25" x2="150" y2="25" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    <line x1="250" y1="25" x2="400" y2="25" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    {/* Ornate center */}
    <g transform="translate(200, 25)" opacity="0.4">
      <path d="M-40 0C-30 -12 -15 -15 0 -15C15 -15 30 -12 40 0C30 12 15 15 0 15C-15 15 -30 12 -40 0Z" 
        stroke={color} strokeWidth="1" fill={color} fillOpacity="0.05"/>
      <circle cx="0" cy="0" r="4" fill={color} opacity="0.5"/>
      <path d="M-20 0C-10 -6 10 -6 20 0" stroke={color} strokeWidth="0.5" fill="none"/>
      <path d="M-20 0C-10 6 10 6 20 0" stroke={color} strokeWidth="0.5" fill="none"/>
    </g>
    {/* Side ornaments */}
    <circle cx="150" cy="25" r="2" fill={color} opacity="0.3"/>
    <circle cx="250" cy="25" r="2" fill={color} opacity="0.3"/>
    <path d="M145 22C148 20 152 20 155 22" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none"/>
    <path d="M245 22C248 20 252 20 255 22" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none"/>
  </svg>
);

const HeartsDivider = ({ color }: { color: string }) => (
  <svg width="300" height="30" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <line x1="0" y1="15" x2="125" y2="15" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    <line x1="175" y1="15" x2="300" y2="15" stroke={color} strokeWidth="0.5" opacity="0.3"/>
    {/* Center heart */}
    <path d="M150 22C150 22 140 15 140 10C140 7 143 5 146 5C148 5 150 7 150 7C150 7 152 5 154 5C157 5 160 7 160 10C160 15 150 22 150 22Z" 
      fill={color} opacity="0.35"/>
    {/* Small hearts */}
    <path d="M120 17C120 17 117 15 117 13C117 12 118 11 119 11C119.5 11 120 11.5 120 11.5C120 11.5 120.5 11 121 11C122 11 123 12 123 13C123 15 120 17 120 17Z" 
      fill={color} opacity="0.2"/>
    <path d="M180 17C180 17 177 15 177 13C177 12 178 11 179 11C179.5 11 180 11.5 180 11.5C180 11.5 180.5 11 181 11C182 11 183 12 183 13C183 15 180 17 180 17Z" 
      fill={color} opacity="0.2"/>
  </svg>
);

export default function SectionDivider({ 
  variant = "floral", 
  className = "",
  color = "#8B735B" 
}: SectionDividerProps) {
  const DividerComponent = {
    floral: FloralDivider,
    diamond: DiamondDivider,
    wave: WaveDivider,
    ornate: OrnateDivider,
    hearts: HeartsDivider,
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`py-4 ${className}`}
    >
      <DividerComponent color={color} />
    </motion.div>
  );
}
