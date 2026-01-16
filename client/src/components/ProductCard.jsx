import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-transparent"
    >
      <Link to={`/product/${product._id}`} className="block overflow-hidden relative aspect-[4/5] overflow-hidden">
        <motion.img 
          layoutId={`product-image-${product._id}`}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        
        {/* Quick Add Button */}
        <button 
            onClick={handleQuickAdd}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-white text-midnight-900 px-6 py-3 min-w-[160px] text-xs tracking-widest font-medium shadow-xl hover:bg-gold-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
            <ShoppingBag className="w-3 h-3" />
            QUICK ADD
        </button>
      </Link>
      
      <div className="pt-6 text-center space-y-2">
        <p className="text-[10px] text-gold-500 uppercase tracking-[0.2em]">{product.category}</p>
        <Link to={`/product/${product._id}`}>
            <h3 className="text-xl font-serif text-white font-medium group-hover:text-gold-400 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm font-light tracking-wide">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
