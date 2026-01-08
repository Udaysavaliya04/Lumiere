import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: "HIGH JEWELRY",
    subtitle: "The Pinnacle of Artistry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "BRIDAL",
    subtitle: "Forever Begins Here",
    image: "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "DIAMONDS",
    subtitle: "Everyday Brilliance",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    size: "col-span-1 row-span-1",
  }
];

export default function FeaturedGrid() {
  return (
    <section className="py-32 px-4 bg-midnight-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
        >
            <span className="text-gold-500 tracking-[0.4em] text-xs uppercase font-medium">Curated Collections</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-4">THE EDIT</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[120vh] md:h-[800px]">
          {collections.map((item) => (
            <motion.div
              key={item.id}
              className={`relative group overflow-hidden ${item.size}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link to="/shop" className="block w-full h-full relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                  <span className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {item.subtitle}
                  </span>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-serif text-white italic">{item.title}</h3>
                    <motion.div 
                        className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                        <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
