import React from 'react';
import { Boxes, Zap, Star, ChevronRight, ShieldCheck } from 'lucide-react';
import { ROBLOX_ITEMS } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

interface RobloxSectionProps {
  onSelectRoblox: () => void;
}

export const RobloxSection: React.FC<RobloxSectionProps> = ({ onSelectRoblox }) => {
  return (
    <section className="w-full bg-[#0B1E36] py-8 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Boxes className="w-8 h-8 sm:w-9 sm:h-9 text-red-500 flex-shrink-0" />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Solusi Lengkap Kebutuhan Roblox!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Gamepass, Item, Currency Robux, dan Akun — Kirim Instan Tanpa Password
              </p>
            </div>
          </div>

          <button
            onClick={onSelectRoblox}
            className="text-sky-400 hover:text-sky-300 text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Semua Produk Roblox</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Value Promo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {/* Banner 1 */}
          <div 
            onClick={onSelectRoblox}
            className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700 hover:border-sky-500 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Fast Delivery</span>
              <h3 className="font-extrabold text-white text-base mt-0.5 group-hover:text-sky-300">
                Robux 5 Hari Sesudah Pajak
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Mulai dari <span className="text-amber-400 font-bold">Rp 140</span> / 1 Robux
              </p>
            </div>
            <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow">
              Beli
            </button>
          </div>

          {/* Banner 2 */}
          <div 
            onClick={onSelectRoblox}
            className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700 hover:border-amber-500 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Instant Transfer</span>
              <h3 className="font-extrabold text-white text-base mt-0.5 group-hover:text-amber-300">
                Robux 5 Hari Sebelum Pajak
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Mulai dari <span className="text-amber-400 font-bold">Rp 150</span> / 1 Robux
              </p>
            </div>
            <button className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow">
              Beli
            </button>
          </div>

          {/* Banner 3 */}
          <div 
            onClick={onSelectRoblox}
            className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Digital Code</span>
              <h3 className="font-extrabold text-white text-base mt-0.5 group-hover:text-emerald-300">
                Robux Game Card Code
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Mulai dari <span className="text-emerald-400 font-bold">Rp 27.000</span> / 100 Robux
              </p>
            </div>
            <button className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow">
              Beli
            </button>
          </div>
        </div>

        {/* Item Carousel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ROBLOX_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={onSelectRoblox}
              className="bg-slate-900/90 rounded-xl border border-slate-800 hover:border-sky-500 hover:shadow-lg transition-all overflow-hidden cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-sky-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">{item.game}</span>
                  <h3 className="font-bold text-white text-xs line-clamp-2 mt-0.5 group-hover:text-sky-400">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800">
                  <div className="font-bold text-amber-400 text-sm">
                    {formatRupiah(item.price)}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{item.sold}</span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
