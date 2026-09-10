import React from 'react';
import { 
  Gem, 
  KeyRound, 
  UserCheck, 
  Ticket, 
  Boxes, 
  Sword, 
  Coins, 
  Sparkles, 
  Dice5, 
  Compass
} from 'lucide-react';
import { GameCategory } from '../types';

interface CategoryIconsProps {
  activeCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  onSelectTag?: (tag: string) => void;
}

export const CategoryIcons: React.FC<CategoryIconsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const CATEGORIES = [
    {
      id: 'topup',
      label: 'Top Up',
      icon: Gem,
      category: 'topup' as GameCategory,
      badge: null,
      textColor: 'text-sky-500',
      bgLight: 'bg-sky-50/80',
    },
    {
      id: 'key',
      label: 'Game Key',
      icon: KeyRound,
      category: 'key' as GameCategory,
      badge: 'Baru',
      textColor: 'text-amber-500',
      bgLight: 'bg-amber-50/80',
    },
    {
      id: 'akun',
      label: 'Akun Game',
      icon: UserCheck,
      category: 'akun' as GameCategory,
      badge: null,
      textColor: 'text-purple-500',
      bgLight: 'bg-purple-50/80',
    },
    {
      id: 'voucher',
      label: 'Voucher',
      icon: Ticket,
      category: 'giftcard' as GameCategory,
      badge: null,
      textColor: 'text-emerald-500',
      bgLight: 'bg-emerald-50/80',
    },
    {
      id: 'roblox',
      label: 'Roblox Games',
      icon: Boxes,
      category: 'roblox' as GameCategory,
      badge: 'Hot',
      textColor: 'text-rose-500',
      bgLight: 'bg-rose-50/80',
    },
    {
      id: 'item',
      label: 'Item Game',
      icon: Sword,
      category: 'item' as GameCategory,
      badge: null,
      textColor: 'text-blue-500',
      bgLight: 'bg-blue-50/80',
    },
    {
      id: 'koin',
      label: 'Koin Game',
      icon: Coins,
      category: 'topup' as GameCategory,
      badge: null,
      textColor: 'text-amber-500',
      bgLight: 'bg-amber-50/80',
    },
    {
      id: 'rpg',
      label: 'Game RPG',
      icon: Sparkles,
      category: 'topup' as GameCategory,
      badge: null,
      textColor: 'text-violet-500',
      bgLight: 'bg-violet-50/80',
    },
    {
      id: 'steam',
      label: 'Steam Key',
      icon: Dice5,
      category: 'key' as GameCategory,
      badge: null,
      textColor: 'text-slate-700',
      bgLight: 'bg-slate-100',
    },
    {
      id: 'simulasi',
      label: 'Game Simulasi',
      icon: Compass,
      category: 'all' as GameCategory,
      badge: null,
      textColor: 'text-teal-500',
      bgLight: 'bg-teal-50/80',
    },
  ];

  return (
    <section className="w-full bg-white py-4 sm:py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-3">
          {CATEGORIES.map((item) => {
            const Icon = item.icon;
            const isSelected = activeCategory === item.category;

            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.category)}
                className="group flex flex-col items-center text-center p-1 sm:p-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer relative"
              >
                {/* Notification / Promo Badge */}
                {item.badge && (
                  <span className={`absolute -top-1 right-1/2 translate-x-4 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-bold text-white rounded-full uppercase shadow-sm z-10 ${
                    item.badge === 'Baru' ? 'bg-red-500' : 'bg-amber-500'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {/* Div Square Container for Category Icon */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isSelected 
                    ? 'bg-sky-50 border-2 border-sky-500 shadow-sm' 
                    : `${item.bgLight} border border-slate-200/80 group-hover:border-slate-300 group-hover:shadow-xs`
                }`}>
                  <Icon className={`w-6 h-6 sm:w-6.5 sm:h-6.5 transition-transform duration-200 group-hover:scale-110 ${
                    isSelected ? 'text-sky-600 stroke-[2.2]' : item.textColor
                  }`} />
                </div>

                {/* Text Label */}
                <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold leading-tight line-clamp-2 ${
                  isSelected ? 'text-sky-700 font-bold' : 'text-slate-700 group-hover:text-slate-950'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
