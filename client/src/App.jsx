import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Marquee from './components/Marquee';
import FeaturedGrid from './components/FeaturedGrid';
import Atelier from './components/Atelier';
import Privilege from './components/Privilege';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-midnight-950 text-white cursor-none selection:bg-gold-500 selection:text-midnight-900">
            <CustomCursor />
            <NoiseOverlay />
            <Navbar />
            <main>
                <Routes>
                <Route path="/" element={<>
                    <Hero />
                    <Marquee />
                    <FeaturedGrid />
                    <Atelier />
                    <Privilege />
                </>} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:category" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </main>
            <Footer />
            </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
