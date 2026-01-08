import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
        className={`fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled 
            ? 'bg-midnight-950/70 backdrop-blur-2xl border-b border-black/5 py-4' 
            : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
            
          {/* Mobile Menu */}
          <button onClick={() => setIsOpen(true)} className="md:hidden p-2 text-white hover:text-gold-400 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-[0.15em] relative z-50 text-white group">
            LUMIÈRE
            <span className="block h-[1px] w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-16">
            {['Collections'].map((item) => (
              <Link 
                key={item} 
                to="/shop" 
                className="relative text-[10px] uppercase tracking-[0.25em] font-medium text-white/70 hover:text-gold-400 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-8 text-white">
            
            {user ? (
                <button onClick={logout} className="hover:text-gold-400 transition-colors duration-300">
                    <span className="text-[10px] uppercase tracking-[0.2em]">{user.name.split(' ')[0]}</span>
                </button>
            ) : (
                <Link to="/login">
                    <User className="w-4 h-4 cursor-pointer hover:text-gold-400 transition-colors duration-300" />
                </Link>
            )}

            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-4 h-4 hover:text-gold-400 transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-gold-500 text-midnight-950 text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-midnight-950/98 backdrop-blur-3xl text-white flex flex-col justify-between p-12 md:hidden"
          >
            <div className="flex justify-between items-center">
                <span className="font-serif text-xl tracking-widest">MENU</span>
                <button onClick={() => setIsOpen(false)} className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex flex-col gap-8">
                {['High Jewelry', 'Bridal', 'Collections', 'Maisons'].map((item) => (
                  <Link 
                    key={item}
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif text-white/50 hover:text-white hover:pl-4 transition-all duration-500"
                  >
                    {item}
                  </Link>
                ))}
            </div>

            <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                © 2025 Lumière Jewels
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
