import React from 'react';
import { ChevronRight, Flame, Zap, Star } from 'lucide-react';
import { GameItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface TopUpGameGridProps {
  games: GameItem[];
  onSelectGame: (game: GameItem) => void;
  onViewAll?: () => void;
}

export const TopUpGameGrid: React.FC<TopUpGameGridProps> = ({
  games,
  onSelectGame,
  onViewAll
}) => {
  return (
    <section className="w-full bg-white py-4 sm:py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-sky-600 fill-current flex-shrink-0" />
            <div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Top Up Game Populer
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Pilihan game terfavorit dengan proses instan 1-3 detik
              </p>
            </div>
          </div>
          
          <button 
            onClick={onViewAll}
            className="text-sky-700 hover:text-sky-900 text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer py-1"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="group relative bg-white rounded-xl border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Badge */}
              {game.badge && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-md bg-[#0F294A] text-white shadow-sm">
                  {game.badge}
                </span>
              )}

              {/* Cover Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-white text-xs font-bold bg-sky-500 px-2 py-1 rounded w-full text-center">
                    Top Up Sekarang
                  </span>
                </div>
              </div>

              {/* Info Details */}
              <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-sky-700 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                    {game.publisher}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block leading-tight">Mulai dari</span>
                    <span className="font-extrabold text-sky-800 text-[11px] sm:text-xs">
                      {formatRupiah(game.minPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 font-semibold text-[10px] sm:text-[11px]">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{game.rating}</span>
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
