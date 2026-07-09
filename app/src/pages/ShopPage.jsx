import React from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function ShopPage() {
  const { products } = useProducts();
  const { toggleCart, cart } = useCart();

  const isInCart = (id) => cart.some(item => item.id === id);

  const categories = [
    { title: "Character Favorites", filter: "Character Favorites" },
    { title: "Seasonal Delights", filter: "Seasonal Delights" },
    { title: "All Time Classics", filter: "All Time Classics" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-12 mb-10 lg:mb-16 shadow-sm border border-pink-50">
        <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full mb-6">
          <Heart className="w-4 h-4 text-pink-500" />
          <span className="text-sm text-pink-600 font-medium">Handmade with love</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3 lg:mb-4">Shop All Bouquets</h1>
        <p className="text-slate-500 text-base lg:text-lg max-w-2xl">
          Discover handcrafted floral bouquets designed to brighten birthdays, celebrations, and everyday moments with soft rose toned charm.
        </p>
      </div>

      {/* Categories */}
      {categories.map((category, idx) => {
        const catProducts = products.filter(p => p.category === category.filter);
        if (catProducts.length === 0) return null;
        return (
          <div key={idx} className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{category.title}</h2>
              <span className="text-xs text-slate-400 font-semibold tracking-widest uppercase cursor-pointer hover:text-pink-500 transition-colors">
                SWIPE FOR MORE →
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {catProducts.map((product, pIdx) => (
                <div key={product.id || pIdx} className="bg-white p-4 rounded-[2rem] shadow-sm border border-pink-50 group hover:shadow-xl transition-all flex flex-col h-full">
                  <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-pink-100 flex-shrink-0">
                    <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="text-left px-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm mb-2">{product.title}</h3>
                      <p className="text-pink-500 font-bold mb-4">{product.price}</p>
                    </div>
                    <button
                      onClick={() => toggleCart(product)}
                      className={`w-full font-medium py-3 rounded-2xl transition-colors mt-auto flex items-center justify-center gap-2 ${
                        isInCart(product.id)
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-pink-500 hover:bg-pink-600 text-white'
                      }`}
                    >
                      {isInCart(product.id) ? <><Check className="w-4 h-4" /> Remove</> : <><ShoppingCart className="w-4 h-4" /> Add to cart</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
}
