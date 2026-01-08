import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ShopToolbar from '../components/ShopToolbar';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Shop State
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [filterCat, setFilterCat] = useState('All Collections');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter & Sort Logic
  useEffect(() => {
    let result = [...products];

    if (filterCat !== 'All Collections') {
        result = result.filter(p => p.category === filterCat);
    }

    if (sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(result);
  }, [products, filterCat, sortBy]);

  return (
    <div className="min-h-screen bg-midnight-950 pt-32 pb-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
        >
            <span className="text-gold-500 tracking-[0.4em] text-xs uppercase font-medium">Curated Rarities</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-6">THE PRIVATE COLLECTION</h1>
            <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                Access an exclusive world of uncompromising beauty. Each piece is a solitary masterpiece, sourced from the furthest corners of the globe and crafted for the discerning few.
            </p>
        </motion.div>

        <ShopToolbar 
            viewMode={viewMode} setViewMode={setViewMode}
            sortBy={sortBy} setSortBy={setSortBy}
            filterCat={filterCat} setFilterCat={setFilterCat}
        />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16" : "space-y-4"}>
          <AnimatePresence mode='wait'>
            {filteredProducts.map((product) => (
                viewMode === 'grid' ? (
                     <ProductCard key={product._id} product={product} />
                ) : (
                    // List View Card (Archive Style)
                    <motion.div 
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
                    >
                         <div className="flex items-center gap-8">
                             <div className="w-24 h-24 overflow-hidden bg-black/20">
                                 <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                             </div>
                             <div>
                                 <p className="text-[10px] text-gold-500 uppercase tracking-[0.2em] mb-1">{product.category}</p>
                                 <h3 className="text-xl font-serif text-white group-hover:text-gold-200 transition-colors">{product.name}</h3>
                                 <p className="text-xs text-white/40 font-light mt-1 max-w-md line-clamp-1">{product.description}</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-12">
                             <p className="text-lg font-medium text-white/80 font-serif">${product.price.toLocaleString()}</p>
                             <Link to={`/product/${product._id}`} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-midnight-950 group-hover:border-gold-500 transition-all duration-300">
                                 <ArrowRight className="w-4 h-4" />
                             </Link>
                         </div>
                    </motion.div>
                )
            ))}
          </AnimatePresence>
        </div>
      )}
      </div>
    </div>
  );
}
