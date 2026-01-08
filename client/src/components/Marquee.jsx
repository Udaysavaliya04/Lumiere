import { motion } from 'framer-motion';

export default function Marquee() {
  return (
    <div className="relative py-12 bg-gold-500 overflow-hidden text-midnight-900 z-10">
      <div className="absolute inset-0 bg-noise mix-blend-soft-light opacity-50" />
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex items-center gap-12 text-6xl font-serif font-black tracking-tighter uppercase"
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
           {Array(4).fill("CRAFTSMANSHIP  •  LEGACY  •  ELEGANCE  •  LUMIÈRE  •  ").map((text, i) => (
             <span key={i}>{text}</span>
           ))}
        </motion.div>
      </div>
    </div>
  );
}
