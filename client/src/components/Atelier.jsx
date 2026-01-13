import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Atelier() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="bg-midnight-950 text-white relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left: Sticky Image */}
        <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
                 <img 
                    src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Artisan Craftsmanship" 
                    className="w-full h-full object-cover opacity-80"
                 />
            </motion.div>
            <div className="absolute inset-0 bg-midnight-950/20 mix-blend-overlay" />
        </div>

        {/* Right: Scrolling Content */}
        <div className="flex items-center justify-center p-12 lg:p-24 bg-midnight-950 relative z-10">
            <div className="max-w-md space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="block text-gold-500 text-xs font-bold tracking-[0.4em] uppercase mb-6">The Atelier</span>
                    <h2 className="text-5xl lg:text-7xl font-serif text-white leading-[0.9] mb-8">
                        HANDS THAT SHAPE <span className="italic text-gold-400">LIGHT</span>
                    </h2>
                    <p className="text-white/60 leading-relaxed font-light text-sm tracking-wide">
                        In the heart of Paris, our master artisans dedicate thousands of hours to a single piece. 
                        It is a silent dialogue between the craftsman and the stone—a pursuit of perfection that refuses compromise.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="border-t border-white/10 pt-8">
                         <h3 className="text-2xl font-serif mb-2 text-white">Sourcing</h3>
                         <p className="text-xs text-white/40 uppercase tracking-widest">Ethical & Rare • Beyond Conflict-Free</p>
                    </div>
                    <div className="border-t border-white/10 pt-8">
                         <h3 className="text-2xl font-serif mb-2 text-white">Design</h3>
                         <p className="text-xs text-white/40 uppercase tracking-widest">Avant-Garde • Architectural • Timeless</p>
                    </div>
                    <div className="border-t border-white/10 pt-8">
                         <h3 className="text-2xl font-serif mb-2 text-white">Setting</h3>
                         <p className="text-xs text-white/40 uppercase tracking-widest">Micro-Pavé • Invisible • Tension</p>
                    </div>
                </motion.div>
            </div>
        </div>

      </div>
    </section>
  );
}
