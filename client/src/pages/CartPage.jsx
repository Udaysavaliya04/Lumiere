import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import CartContext from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-midnight-950 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 tracking-wide">Shopping Bag</h1>
        <p className="text-white/50 mb-12 text-sm tracking-widest uppercase">{cartItems.length} Items</p>
        
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-32 border-t border-b border-white/5"
          >
            <p className="text-2xl font-serif text-white/30 mb-8 italic">Your personal vault awaits its first treasure.</p>
            <Link to="/shop" className="inline-flex items-center text-gold-400 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-medium gap-2">
              Browse the Private Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    key={item._id} 
                    className="flex items-center gap-8 py-8 border-b border-white/5 group"
                  >
                    <div className="w-32 h-32 bg-white/5 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif text-white tracking-wide">{item.name}</h3>
                          <p className="text-lg font-medium text-white/90">${item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-[10px] text-gold-500/80 uppercase tracking-[0.2em] mb-6">{item.category}</p>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-white/50 text-sm">
                            <span>QTY</span>
                            <span className="text-white">{item.qty}</span>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-xs uppercase tracking-widest text-white/30 hover:text-red-400 transition-colors"
                        >
                            Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/5">
                <h2 className="text-lg font-serif text-white mb-8 tracking-wide">Acquisition Summary</h2>
                <div className="space-y-4 mb-8 text-white/60 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-white">${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>White-Glove Delivery</span>
                        <span className="text-white">Complimentary</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between text-base text-white font-medium">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                </div>
                <Link to="/checkout" className="block w-full text-center bg-white text-midnight-950 py-4 hover:bg-gold-400 hover:text-midnight-950 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold">
                    Secure Acquisition
                </Link>
                 <div className="mt-8 text-center">
                     <Link to="/shop" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Continue Browsing</Link>
                </div>
              </div>
              
              <div className="mt-8 text-center text-white/20 text-[10px] leading-relaxed uppercase tracking-widest">
                256-Bit SSL Security • Insured Transport • Global Concierge
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
