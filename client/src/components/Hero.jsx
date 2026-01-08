import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative h-[120vh] w-full overflow-hidden">
      {/* Cinematic Video Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
        >
            <source src="https://cdn.coverr.co/videos/coverr-putting-on-a-diamond-ring-5847/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-midnight-900/40 mix-blend-multiply" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4 mix-blend-screen">
         <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(15px)", scale: 1.02 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20"
        >
            <h1 className="text-[15vw] leading-[0.85] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400 bg-[length:200%_auto] animate-[shimmer_12s_infinite_linear] tracking-tighter mix-blend-overlay opacity-90">
                LUMIÈRE
            </h1>
            <motion.p
                initial={{ opacity: 0, letterSpacing: "1em" }}
                animate={{ opacity: 1, letterSpacing: "0.8em" }}
                transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gold-100 font-medium whitespace-nowrap mix-blend-hard-light uppercase"
            >
                EST. 1999  
            </motion.p>
         </motion.div>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-6 mix-blend-plus-lighter"
         >
            <span className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-light">Scroll to Discover</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-50 relative overflow-hidden">
                <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent w-full h-1/2 blur-[2px]"
                />
            </div>
         </motion.div>
      </div>
    </div>
  );
}
