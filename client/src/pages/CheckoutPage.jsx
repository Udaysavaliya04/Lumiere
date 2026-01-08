import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Lock, Truck, ChevronRight } from 'lucide-react';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const { cartItems } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Payment
  
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 0; // Complimentary
  const grandTotal = total + shipping;

  return (
    <div className="min-h-screen bg-midnight-950 pt-32 pb-20 text-white">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-16">
            <div className="flex items-center gap-4 text-xs tracking-[0.2em] font-medium text-white/30 uppercase">
                <span className={step >= 1 ? "text-gold-500" : ""}>Information</span>
                <ChevronRight className="w-3 h-3" />
                <span className={step >= 2 ? "text-gold-500" : ""}>Shipping</span>
                <ChevronRight className="w-3 h-3" />
                <span className={step >= 3 ? "text-gold-500" : ""}>Payment</span>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div>
                    <h2 className="text-3xl font-serif text-white mb-8">Contact Information</h2>
                    <div className="space-y-6">
                        <InputGroup label="Email Address" type="email" placeholder="email@example.com" />
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 rounded-sm border-white/20 bg-transparent checked:bg-gold-500 focus:ring-0" />
                            <label className="text-sm text-white/60 font-light">Email me with news and offers</label>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-serif text-white mb-8">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <InputGroup label="First Name" />
                        <InputGroup label="Last Name" />
                        <div className="col-span-2">
                             <InputGroup label="Address" />
                        </div>
                        <div className="col-span-2">
                             <InputGroup label="Apartment, suite, etc. (optional)" />
                        </div>
                        <InputGroup label="City" />
                        <InputGroup label="Postal Code" />
                        <div className="col-span-2">
                             <InputGroup label="Phone" type="tel" />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-serif text-white mb-8">Shipping Method</h2>
                    <div className="border border-white/10 p-6 flex justify-between items-center bg-white/5 cursor-pointer hover:border-gold-500/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <Truck className="w-5 h-5 text-gold-500" />
                            <div>
                                <h4 className="text-sm font-medium uppercase tracking-widest">Private Armored Transport</h4>
                                <p className="text-xs text-white/50 mt-1">Insured & Tracked via Ferrari Express</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold">INCLUDED</span>
                    </div>
                </div>

                <div>
                     <h2 className="text-3xl font-serif text-white mb-8">Payment</h2>
                     <div className="bg-white/5 border border-white/10 p-8 text-center space-y-4">
                         <Lock className="w-8 h-8 mx-auto text-white/20" />
                         <h3 className="text-sm uppercase tracking-widest text-white/50">Encrypted Transaction</h3>
                         <p className="text-xs text-white/30 max-w-xs mx-auto">
                             Your payment details are processed via a Military-Grade Encrypted Server. No data is stored locally.
                         </p>
                     </div>
                </div>

                <button className="w-full bg-gold-500 text-midnight-950 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-500">
                    Finalize Acquisition
                </button>
            </motion.div>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
            <div className="bg-midnight-900/50 backdrop-blur-md border border-white/5 p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none" />
                
                <h3 className="text-xl font-serif text-white mb-8 relative z-10">Your Collection</h3>
                
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex gap-6 items-center">
                            <div className="w-20 h-20 bg-white/5 relative flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 text-midnight-950 text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {item.qty}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-serif text-white">{item.name}</h4>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{item.category}</p>
                            </div>
                            <span className="text-sm font-medium">${(item.price * item.qty).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="h-[1px] w-full bg-white/10 mb-8" />

                <div className="space-y-4 text-sm font-light">
                    <div className="flex justify-between text-white/60">
                        <span>Subtotal</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                         <span>Shipping</span>
                         <span className="text-gold-500">Computed at next step</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif text-white pt-4">
                        <span>Total</span>
                        <span><span className="text-xs text-white/40 mr-2 uppercase tracking-wide">USD</span>${grandTotal.toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="mt-8 flex items-center gap-3 justify-center text-[10px] text-white/20 uppercase tracking-widest">
                    <Lock className="w-3 h-3" />
                    Secure SSL Encryption
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function InputGroup({ label, type = "text", placeholder }) {
    return (
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 block">
                {label}
            </label>
            <input 
                type={type} 
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors placeholder-white/10"
                placeholder={placeholder || label}
            />
        </div>
    );
}
