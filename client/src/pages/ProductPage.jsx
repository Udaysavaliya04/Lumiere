import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck, Shield } from 'lucide-react';
import CartContext from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="min-h-screen bg-cream-50 flex items-center justify-center text-midnight-900 tracking-widest font-serif">LOADING MASTERPIECE...</div>;

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <Link to="/shop" className="fixed top-24 left-8 z-20 flex items-center gap-2 text-xs tracking-widest text-white/50 hover:text-gold-400 transition-colors uppercase mix-blend-difference">
        <ArrowLeft className="w-3 h-3" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Image (Sticky) */}
        <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 bg-midnight-900 overflow-hidden">
             <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 to-transparent pointer-events-none" />
        </div>

        {/* Right: Details (Scrollable) */}
        <div className="flex flex-col justify-center px-6 lg:px-24 py-20 lg:py-0 bg-midnight-950 text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-gold-500/50" />
                    <span className="text-gold-500 text-xs font-bold tracking-[0.3em] uppercase">
                        {product.category || 'Fine Jewelry'}
                    </span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-serif text-white mb-6 leading-[1.1]">
                    {product.name}
                </h1>
                <p className="text-3xl text-white/90 font-light mb-8 font-serif italic">
                    ${product.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>

                <div className="h-[1px] w-full bg-white/10 mb-10" />

                <p className="text-white/60 leading-7 font-light mb-12 max-w-lg text-sm tracking-wide">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="space-y-8 max-w-md">
                    <div className="flex items-center justify-between border border-white/20 p-1">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-4 hover:bg-white/5 transition-colors text-white">
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-serif text-lg w-12 text-center text-white">{qty}</span>
                        <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="p-4 hover:bg-white/5 transition-colors text-white">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        disabled={product.countInStock === 0}
                        className="w-full bg-white text-midnight-950 py-5 px-8 flex items-center justify-center gap-3 hover:bg-gold-400 hover:text-midnight-950 transition-all duration-300 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed group"
                    >
                        {product.countInStock > 0 ? (
                            <>
                                <span className="tracking-[0.25em] text-xs font-bold uppercase">Acquire Masterpiece</span>
                                <ShoppingBag className="w-4 h-4" />
                            </>
                        ) : (
                            <span className="tracking-[0.2em] text-xs uppercase">Allocated</span>
                        )}
                    </button>
                    
                    {added && (
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gold-500/10 border border-gold-500/30 p-3 text-center text-gold-400 text-xs tracking-widest uppercase"
                         >
                            Vault Allocation Confirmed
                         </motion.div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="mt-16 space-y-8 border-t border-white/10 pt-12">
                    <div className="flex items-start gap-6 text-white/40 group">
                        <Truck className="w-5 h-5 mt-1 text-gold-500 group-hover:text-white transition-colors" />
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-2">Armored Transport</h4>
                            <p className="text-xs font-light leading-relaxed">Complimentary white-glove delivery via private courier.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 text-white/40 group">
                        <Shield className="w-5 h-5 mt-1 text-gold-500 group-hover:text-white transition-colors" />
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-2">Heritage Guarantee</h4>
                            <p className="text-xs font-light leading-relaxed">Protected by our lifetime authenticity & restoration pledge.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
