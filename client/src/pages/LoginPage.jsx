import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 flex items-center justify-center bg-midnight-950 px-4 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-white mb-2">Welcome Back</h2>
            <p className="text-white/40 text-sm tracking-widest uppercase">Sign in to your account</p>
        </div>

        {error && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 mb-8 text-center text-sm"
            >
                {error}
            </motion.div>
        )}

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 block">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors placeholder-white/10"
                      placeholder="Enter your email"
                      required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 block">Password</label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors placeholder-white/10"
                      placeholder="Enter your password"
                      required
                    />
                </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-500 text-midnight-950 py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-12 text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Don't have an account?</p>
            <Link to="/register" className="text-white border-b border-white/30 pb-1 hover:text-gold-400 hover:border-gold-400 transition-all text-sm">
                Create Account
            </Link>
        </div>
      </motion.div>
    </div>
  );
}
