import React from 'react';
import { Flame, Zap, Star, ChevronRight } from 'lucide-react';
import { FLASH_SALE_ITEMS } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';
import { GameItem, NominalItem } from '../types';

interface FlashSaleSectionProps {
  onSelectQuickItem: (gameId: string, nominalId?: string) => void;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  onSelectQuickItem
}) => {
  return (
    <section className="w-full bg-slate-50 py-5 sm:py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 sm:mb-6">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 fill-current animate-pulse flex-shrink-0" />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight">
                  Top Up Hemat, Main Makin Semangat!
                </h2>
                <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                  HOT DEALS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Murah, tanpa ribet, proses kilat, dan 100% aman legal bergaransi!
              </p>
            </div>
          </div>

          <button 
            onClick={() => onSelectQuickItem('mlbb')}
            className="text-sky-700 hover:text-sky-900 text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline self-start sm:self-auto cursor-pointer py-1"
          >
            <span>Lihat Semua Promo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Flash Sale Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {FLASH_SALE_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectQuickItem(item.gameId, item.nominalId)}
              className="bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between group"
            >
              {/* Product Visual */}
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.itemTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-md">
                  -{item.discountPercent}%
                </div>

                {/* Instant Badge */}
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Zap className="w-3 h-3 text-amber-400 fill-current" />
                  <span>Instan</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {item.gameTitle}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 mt-0.5 leading-snug group-hover:text-sky-700">
                    {item.itemTitle}
                  </h3>
                </div>

                <div className="mt-3">
                  {/* Strikethrough Original Price */}
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="line-through text-slate-400">
                      {formatRupiah(item.originalPrice)}
                    </span>
                    <span className="text-red-600 font-bold">Hemat</span>
                  </div>

                  {/* Real Price */}
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base text-red-600">
                    {formatRupiah(item.discountPrice)}
                  </div>

                  {/* Rating & Sold count */}
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{item.soldCount}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.rating}</span>
                    </div>
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
