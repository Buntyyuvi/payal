import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('adminAuth') === 'true';
  if (!isAuth) return <Navigate to="/admin-login" replace />;
  return children;
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-pink-200 flex flex-col">
          <Routes>
            {/* Admin Login - standalone layout */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Admin Route - protected */}
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            
            {/* Main App Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </ProductProvider>
  );
}
