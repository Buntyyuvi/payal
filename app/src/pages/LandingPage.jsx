import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  ThumbsUp, 
  Headset, 
  Truck,
  ArrowRight,
  Sparkles,
  Gift,
  Clock,
  ShoppingCart,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const IMAGES = [
  '/images/WhatsApp Image 2026-07-08 at 18.47.01.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.47.17.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.47.29.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.47.41.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.47.52.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.48.06.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.48.17.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.48.30.jpeg',
];

export default function LandingPage() {
  const { products } = useProducts();
  const { toggleCart, cart } = useCart();

  const isInCart = (id) => cart.some(item => item.id === id);
  const findProduct = (title) => products.find(p => p.title === title);

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 bg-white rounded-[2rem] lg:rounded-[3rem] my-4 lg:my-8 shadow-sm border border-pink-50 relative overflow-hidden">
        <div className="w-full lg:w-1/2 z-10 pl-0 lg:pl-8">
          <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-6 lg:mb-8">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-slate-600 font-medium">Handmade with love</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight mb-4">
            <span className="text-slate-800">Cute. Soft.</span><br />
            <span className="text-pink-500">Made to love.</span>
          </h1>
          
          <p className="text-slate-500 text-base lg:text-lg mb-8 lg:mb-10 max-w-md leading-relaxed">
            Adorable flower bouquets with soft toys, perfect for every special moment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 lg:mb-16">
            <Link to="/shop" className="bg-pink-500 hover:bg-pink-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-pink-200">
              Shop now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/shop" className="bg-white border border-slate-200 hover:border-pink-500 hover:text-pink-500 px-6 lg:px-8 py-3 lg:py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all">
              <span className="text-pink-500 w-4 h-4 flex items-center justify-center border border-pink-500 rounded-full text-[10px]">✓</span>
              View collection
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:gap-0 mt-6 lg:mt-8 bg-white shadow-lg shadow-pink-100/50 p-3 lg:p-4 rounded-2xl">
            <div className="flex items-center gap-2 lg:gap-3 pr-2 lg:pr-6 border-r border-pink-100">
              <div className="bg-pink-50 p-1.5 lg:p-2 rounded-full text-pink-500">
                <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <div className="text-[10px] lg:text-sm leading-tight">
                <p className="font-semibold">Handmade</p>
                <p className="text-slate-400 text-[8px] lg:text-xs">with love</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 px-2 lg:px-6 border-r border-pink-100 justify-center">
              <div className="bg-pink-50 p-1.5 lg:p-2 rounded-full text-pink-500">
                <ThumbsUp className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <div className="text-[10px] lg:text-sm leading-tight">
                <p className="font-semibold">Premium</p>
                <p className="text-slate-400 text-[8px] lg:text-xs">quality</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-6 justify-end lg:justify-start">
              <div className="bg-pink-50 p-1.5 lg:p-2 rounded-full text-pink-500">
                <Gift className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <div className="text-[10px] lg:text-sm leading-tight">
                <p className="font-semibold">Perfect for</p>
                <p className="text-slate-400 text-[8px] lg:text-xs">every occasion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-row lg:flex gap-3 lg:gap-4 h-auto lg:h-[500px]">
          <div className="w-1/2 h-full min-h-[250px] lg:min-h-0 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-xl">
            <img src={IMAGES[0]} alt="Hero Bouquet" className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 flex flex-col gap-3 lg:gap-4 h-full">
            <div className="h-1/2 min-h-[120px] lg:min-h-0 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-lg">
              <img src={IMAGES[1]} alt="Bouquet Details 1" className="w-full h-full object-cover" />
            </div>
            <div className="h-1/2 min-h-[120px] lg:min-h-0 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-lg">
              <img src={IMAGES[2]} alt="Bouquet Details 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Decorative background blob */}
        <div className="hidden lg:block absolute -z-10 w-[500px] h-[500px] bg-pink-50/50 rounded-full blur-3xl -top-20 -right-20"></div>
      </div>

      {/* Features Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12 lg:mb-20 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {[
          { icon: <Truck className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Free delivery", subtitle: "On orders above ₹999" },
          { icon: <ThumbsUp className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Premium quality", subtitle: "Best materials & care" },
          { icon: <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Secure payment", subtitle: "100% secure checkout" },
          { icon: <Headset className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Customer support", subtitle: "We're here to help" },
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl flex items-center gap-3 lg:gap-4 shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
            <div className="bg-pink-50 text-pink-500 p-2 lg:p-3 rounded-xl lg:rounded-2xl flex-shrink-0">
              {feature.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 text-xs lg:text-sm truncate">{feature.title}</h3>
              <p className="text-slate-400 text-[10px] lg:text-xs truncate">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Picks Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12 lg:mb-20 text-center">
        <h2 className="text-xl lg:text-2xl font-bold tracking-[0.2em] mb-2 text-slate-800 uppercase">TOP PICKS</h2>
        <div className="flex justify-center mb-8 lg:mb-12">
           <Heart className="w-4 h-4 text-pink-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {[
            { img: IMAGES[3], title: "Hello Kitty Pink Bouquet", price: "₹1,299" },
            { img: IMAGES[4], title: "My Melody Blossom Bouquet", price: "₹1,199" },
            { img: IMAGES[5], title: "Cinnamoroll Blue Bouquet", price: "₹1,299" },
            { img: IMAGES[6], title: "Kuromi Purple Bouquet", price: "₹1,199" },
          ].map((item, idx) => {
            const fullProduct = findProduct(item.title);
            const inCart = fullProduct && isInCart(fullProduct.id);
            return (
            <div key={idx} className="bg-white p-4 rounded-[2rem] shadow-sm border border-pink-50 group hover:shadow-xl transition-all">
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-left px-2 mb-6">
                <h3 className="font-bold text-slate-800 text-sm mb-2 truncate">{item.title}</h3>
                <p className="text-pink-500 font-bold">{item.price}</p>
              </div>
              <button
                onClick={() => fullProduct && toggleCart(fullProduct)}
                disabled={!fullProduct}
                className={`w-full font-medium py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 ${
                  !fullProduct ? 'bg-slate-200 text-slate-400 cursor-not-allowed' :
                  inCart ? 'bg-red-100 text-red-600 hover:bg-red-200' :
                  'bg-pink-500 hover:bg-pink-600 text-white'
                }`}
              >
                {inCart ? <><Check className="w-4 h-4" /> Remove</> : <><ShoppingCart className="w-4 h-4" /> Add to cart</>}
              </button>
            </div>
          )})}
        </div>
      </div>

      {/* About Us & Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12 lg:mb-20 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* About Us */}
        <div className="w-full lg:w-1/2 bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-8 shadow-sm border border-pink-50">
          <div className="w-full lg:w-1/2 h-[250px] lg:h-[400px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden flex-shrink-0">
            <img src={IMAGES[7]} alt="About Us" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-3 lg:mb-4">About Us</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-slate-800 leading-tight">Every bouquet tells a story</h2>
            <p className="text-slate-500 text-sm mb-6 lg:mb-8 leading-relaxed">
              At Pretty Flowers Studio, we create handmade bouquets that bring smiles and warm hearts. Made with love, just for you.
            </p>
            <Link to="/about" className="bg-pink-500 hover:bg-pink-600 text-white px-6 lg:px-8 py-3 rounded-full font-medium w-fit flex items-center gap-2 transition-colors shadow-lg shadow-pink-200 text-sm lg:text-base">
              Know more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="w-full lg:w-1/2 bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-sm border border-pink-50">
          <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-6 lg:mb-8">Why Choose Us?</p>
          <div className="grid grid-cols-2 gap-3 lg:gap-6">
            <div className="bg-pink-50 rounded-3xl p-6 flex flex-col justify-center gap-2 hover:bg-pink-50/50 transition-colors">
              <div className="flex items-center gap-2 text-pink-500 font-bold text-sm mb-1">
                <Sparkles className="w-4 h-4" />
                Unique & cute
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">Adorable designs you'll love</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 flex flex-col justify-center gap-2 hover:bg-pink-50/50 transition-colors">
              <div className="flex items-center gap-2 text-pink-500 font-bold text-sm mb-1">
                <Heart className="w-4 h-4" />
                Handmade
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">Each bouquet is made with love</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 flex flex-col justify-center gap-2 hover:bg-pink-50/50 transition-colors">
              <div className="flex items-center gap-2 text-pink-500 font-bold text-sm mb-1">
                <Gift className="w-4 h-4" />
                Perfect gift
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">Ideal for birthdays & more</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 flex flex-col justify-center gap-2 hover:bg-pink-50/50 transition-colors">
              <div className="flex items-center gap-2 text-pink-500 font-bold text-sm mb-1">
                <Clock className="w-4 h-4" />
                Long lasting
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">High quality materials that last</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
