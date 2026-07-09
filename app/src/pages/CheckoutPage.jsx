import React, { useState } from 'react';
import { Heart, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, clearCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const formatPrice = (num) => '₹' + num.toLocaleString();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('https://flower-backend-eight.vercel.app/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: cart.map(({ id, title, price, img, quantity }) => ({ id, title, price, img, quantity })),
          total
        })
      });
      if (!res.ok) throw new Error('Server responded with ' + res.status);
      clearCart();
      setSubmitted(true);
    } catch (error) {
      alert('Failed to place order. Make sure the backend server is running.\n\n' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.length && !submitted) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-pink-50 max-w-lg mx-auto">
          <ShoppingBag className="w-10 h-10 text-pink-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Nothing to checkout</h2>
          <p className="text-slate-500 mb-8">Add some bouquets to your cart first.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all">
            <ArrowLeft className="w-4 h-4" /> Browse Bouquets
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-pink-50 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Order Successful!</h2>
          <p className="text-slate-500 mb-8">Thank you for your order. We'll deliver your bouquets soon!</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="bg-white rounded-[3rem] p-12 mb-8 shadow-sm border border-pink-50">
        <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full mb-6">
          <Heart className="w-4 h-4 text-pink-500" />
          <span className="text-sm text-pink-600 font-medium">{cartCount} items</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Checkout</h1>
        <p className="text-slate-500">Fill in your details to complete the order.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-8">
          <div className="flex-1 bg-white rounded-[2rem] p-10 shadow-sm border border-pink-50">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Shipping Details</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input required name="name" value={form.name} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Delivery Address</label>
                <textarea required name="address" value={form.address} onChange={handleChange} rows={3} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm resize-none" placeholder="Street, city, pincode..." />
              </div>
            </div>
          </div>

          <div className="w-96">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-pink-50 sticky top-28">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-pink-100 flex-shrink-0">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{item.title}</p>
                      <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                      <p className="text-pink-500 font-bold text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-pink-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-xl font-bold text-pink-500">{formatPrice(total)}</span>
                </div>
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-medium py-4 rounded-2xl transition-colors">
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
