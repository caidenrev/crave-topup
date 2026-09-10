import React from 'react';
import { Ticket, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import { GameItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface GiftCardSectionProps {
  games: GameItem[];
  onSelectGame: (game: GameItem) => void;
}

export const GiftCardSection: React.FC<GiftCardSectionProps> = ({
  games,
  onSelectGame
}) => {
  const giftCards = games.filter(g => g.category === 'giftcard');

  return (
    <section className="w-full bg-white py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Gift Card & Voucher Digital Resmi
              </h2>
              <p className="text-xs text-slate-500">
                Kode langsung terkirim detik itu juga via WhatsApp & Email
              </p>
            </div>
          </div>

          <button 
            onClick={() => giftCards[0] && onSelectGame(giftCards[0])}
            className="text-sky-700 hover:text-sky-900 text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Lihat Semua Voucher</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gift Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {giftCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectGame(card)}
              className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all p-3 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                  <img
                    src={card.coverImage}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Resmi 100%
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-emerald-700">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{card.publisher}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Mulai</span>
                  <span className="font-extrabold text-slate-900">
                    {formatRupiah(card.minPrice)}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Beli
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
