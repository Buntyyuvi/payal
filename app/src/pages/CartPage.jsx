import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const formatPrice = (num) => '₹' + num.toLocaleString();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-slate-50 max-w-lg mx-auto">
          <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added any bouquets yet.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all">
            <ArrowLeft className="w-4 h-4" />
            Browse Bouquets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="bg-white rounded-[3rem] p-12 mb-8 shadow-sm border border-slate-50">
        <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full mb-6">
          <Heart className="w-4 h-4 text-pink-500" />
          <span className="text-sm text-pink-600 font-medium">{cartCount} items in cart</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Cart</h1>
            <p className="text-slate-500">Review and manage your selected bouquets before checkout.</p>
          </div>
          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 font-medium flex items-center gap-1 transition-colors">
            <Trash2 className="w-4 h-4" />
            Clear cart
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          {cart.map((item) => {
            const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
            return (
              <div key={item.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 flex gap-6 items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 mb-1 truncate">{item.title}</h3>
                  <p className="text-pink-500 font-bold">{item.price}</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-full">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-slate-800 text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-bold text-slate-800 w-24 text-right">{formatPrice(itemPrice * item.quantity)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-80">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50 sticky top-28">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {cart.map((item) => {
                const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-500 truncate mr-4">{item.title} × {item.quantity}</span>
                    <span className="font-medium text-slate-800">{formatPrice(itemPrice * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Total</span>
                <span className="text-xl font-bold text-pink-500">{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-4 rounded-2xl transition-colors mb-3 text-center">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="w-full block text-center text-sm text-slate-500 hover:text-pink-500 font-medium transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
