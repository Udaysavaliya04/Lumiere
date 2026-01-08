import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-midnight-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif tracking-widest text-white">LUMIÈRE</h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs">
            We are not merely a jeweler; we are the custodian of the world's most precious light. We invite you to experience the extraordinary.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gold-500">MAISON</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><Link to="/shop" className="hover:text-white transition-colors">High Jewelry</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Private Client Services</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Bespoke Commissions</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">The Heritage</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gold-500">CLIENT CARE</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><Link to="/" className="hover:text-white transition-colors">Concierge</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Book an Appointment</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Shipping & Security</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Investor Relations</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gold-500">PRIVATE LIST</h4>
          <p className="text-gray-400 text-sm font-light">Join our inner circle for early access to rare acquisitions.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 text-sm"
            />
            <button className="text-xs font-bold uppercase hover:text-gold-500 transition-colors">JOIN</button>
          </div>
          <div className="flex gap-4 pt-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        Made with <span className="text-gold-500 font-bold text-sm">&hearts;</span> by <a href="https://github.com/Udaysavaliya04" className="hover:text-white transition-colors font-semi-bold text-sm">Uday</a>
      </div>
    </footer>
  );
}
