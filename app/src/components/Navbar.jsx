import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  return (
    <nav className="grid grid-cols-3 items-center px-4 lg:px-8 py-4 lg:py-6 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2 lg:gap-8">
        <Link to="/" className="flex items-center gap-1 lg:gap-2 text-pink-600 font-semibold lg:bg-pink-50 lg:px-4 lg:py-2 lg:rounded-full">
          <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
          <span className="text-sm lg:text-base">Home</span>
        </Link>
        <Link to="/shop" className="hidden lg:flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
          <span className="w-2 h-2 border border-slate-400 rounded-full"></span>
          Shop
        </Link>
        <Link to="/about" className="hidden lg:flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
          <span className="w-2 h-2 border border-slate-400 rounded-full"></span>
          About Us
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-xl lg:text-3xl font-bold tracking-widest text-slate-800 leading-none">PRETTY FLOWERS</h1>
        <h2 className="text-base lg:text-2xl font-light tracking-[0.3em] text-slate-600 leading-tight">STUDIO</h2>
        <p className="text-pink-500 text-[10px] lg:text-xs italic mt-0.5 font-serif">handmade with love</p>
      </div>

      <div className="flex items-center justify-end gap-6"><Link to="/cart" className="text-slate-500 hover:text-pink-600 transition-colors relative">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
