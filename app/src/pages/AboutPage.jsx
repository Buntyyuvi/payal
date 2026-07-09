import React from 'react';
import { Heart, Sparkles, Gift, Clock, Camera, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const IMAGES = [
  '/images/WhatsApp Image 2026-07-08 at 18.47.01.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.47.17.jpeg',
  '/images/WhatsApp Image 2026-07-08 at 18.47.29.jpeg',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES[1]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-12 max-w-7xl mx-auto">
          <p className="text-pink-300 font-bold text-xs tracking-widest uppercase mb-3">About Us</p>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3">Every bouquet<br />tells a story</h1>
          <p className="text-slate-200 text-base lg:text-lg max-w-xl">Handcrafted with love, designed to bring smiles.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-12 shadow-xl border border-pink-100 mb-8 lg:mb-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg mx-auto">
                <img src={IMAGES[0]} alt="Pretty Flowers Studio" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-3">Founder & Creator</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Payal Mohite</h2>
              <p className="text-slate-400 text-sm mb-6">Influencer & Flower Artist</p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every petal, every ribbon, every wrap — Payal pours her heart into each bouquet.
                What started as a small passion for creating beautiful things has blossomed into
                Pretty Flowers Studio, where every arrangement tells a unique story.
              </p>
              <a
                href="https://instagram.com/Payal_sanap_mohite"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <Camera className="w-5 h-5" />
                @Payal_sanap_mohite
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-10 shadow-sm border border-pink-50 flex flex-col justify-center">
            <Quote className="w-8 h-8 text-pink-300 mb-4" />
            <p className="text-slate-600 text-lg leading-relaxed italic mb-6">
              "I believe flowers are nature's way of smiling at us. Each bouquet I create
              is a little piece of joy, wrapped with care and tied with love. Whether it's
              a birthday, a celebration, or just because — there's a flower for every feeling."
            </p>
            <p className="font-bold text-slate-800">— Payal Mohite</p>
          </div>
          <div className="h-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-sm">
            <img src={IMAGES[2]} alt="Bouquet" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-12 shadow-sm border border-pink-50 mb-8 lg:mb-12">
          <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-2 text-center">Why Choose Us</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-slate-800 mb-8 lg:mb-10">Made with love,<br />made just for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
            <div className="bg-pink-50 rounded-3xl p-6 text-center hover:bg-pink-100/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Unique Designs</h3>
              <p className="text-slate-400 text-sm">Every bouquet is one-of-a-kind</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 text-center hover:bg-pink-100/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Handmade</h3>
              <p className="text-slate-400 text-sm">Crafted with love and care</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 text-center hover:bg-pink-100/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Perfect Gift</h3>
              <p className="text-slate-400 text-sm">Ideal for every occasion</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 text-center hover:bg-pink-100/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Long Lasting</h3>
              <p className="text-slate-400 text-sm">Premium quality that lasts</p>
            </div>
          </div>
        </div>

        <div className="text-center pb-12 lg:pb-20">
          <p className="text-slate-500 mb-6">Ready to find the perfect bouquet?</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-medium transition-all shadow-lg shadow-pink-200"
          >
            Visit Our Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
