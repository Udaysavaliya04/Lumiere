import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalLoupe({ src, alt, children, className = "", imgClassName = "", layoutId }) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: '50%', y: '50%' });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    // Calculate percentage based on current mouse position relative to container
    // We update this in the event handler, not during render
    const xPerc = (x / rect.width) * 100;
    const yPerc = (y / rect.height) * 100;
    setBgPos({ x: `${xPerc}%`, y: `${yPerc}%` });
  };

  return (
    <div 
        ref={containerRef}
        className={`relative overflow-hidden cursor-none ${className}`} // cursor-none hides default cursor
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
    >
        {/* Main Image */}
        <motion.img 
            layoutId={layoutId}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={src} 
            alt={alt} 
            className={`w-full h-full object-cover ${imgClassName}`}
        />
        
        {/* Overlays (like gradients) passed as children */}
        {children}

        {/* The Lens */}
        <AnimatePresence>
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        left: mousePos.x,
                        top: mousePos.y,
                        backgroundImage: `url(${src})`,
                        backgroundPosition: `${bgPos.x} ${bgPos.y}`,
                        backgroundSize: '250%', // 2.5x zoom level
                    }}
                    className="absolute w-48 h-48 -ml-24 -mt-24 rounded-full border border-gold-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 pointer-events-none bg-midnight-950"
                >
                    {/* Glass/Lens Effects */}
                    <div className="absolute inset-0 rounded-full bg-gold-500/10 mix-blend-overlay backdrop-blur-[0.5px]" />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
