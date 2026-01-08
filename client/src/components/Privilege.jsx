import { motion } from 'framer-motion';
import { Diamond, Globe, Key } from 'lucide-react';

const services = [
    {
        icon: Diamond,
        title: "Bespoke Commissions",
        description: "Collaborate directly with our Head of Design to birth a creation that exists only for you."
    },
    {
        icon: Key,
        title: "The Vault",
        description: "Access to unlisted, high-investment grade stones reserved for our private clientele."
    },
    {
        icon: Globe,
        title: "Global Concierge",
        description: "From private viewings in your suite to secured international transport, we handle every detail."
    }
];

export default function Privilege() {
  return (
    <section className="py-32 px-6 bg-midnight-950 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24"
            >
                <span className="text-gold-500 tracking-[0.4em] text-xs uppercase font-medium">Beyond Jewelry</span>
                <h2 className="text-4xl md:text-5xl font-serif mt-6">THE PRIVILEGE</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
                {/* Vertical Dividers for Desktop */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="hidden md:block absolute top-0 bottom-0 right-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {services.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="text-center group p-8"
                    >
                        <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-500/50 group-hover:bg-gold-500/5 transition-all duration-500">
                            <item.icon className="w-6 h-6 text-gold-400" />
                        </div>
                        <h3 className="text-xl font-serif mb-4 tracking-wide">{item.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed font-light">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
