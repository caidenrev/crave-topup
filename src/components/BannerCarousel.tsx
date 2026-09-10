import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCcw, 
  Headphones, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  Gift,
  Trophy,
  Sparkles
} from 'lucide-react';
import { GameItem } from '../types';

interface BannerCarouselProps {
  onSelectGameBySlug?: (slug: string) => void;
  onOpenPromo?: () => void;
}

const BANNERS = [
  {
    id: 1,
    title: 'Quest Mingguan!',
    subtitle: 'Kumpulkan Poin Hadiah',
    description: 'VOUCHER DISKON S.D 30% DI SETIAP TOP UP',
    tag: 'Giveaway Promo',
    gradient: 'from-amber-700 via-stone-800 to-slate-950',
    buttonText: 'Klaim Promo',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    targetSlug: 'mobile-legends',
    accentColor: 'border-amber-500/40 text-amber-300'
  },
  {
    id: 2,
    title: '10TH ANNIVERSARY MLBB',
    subtitle: 'Mobile Legends Special Event',
    description: 'Weekly Diamond Pass Hanya Rp 27.500 Instant Kirim!',
    tag: 'Special Event',
    gradient: 'from-blue-900 via-slate-900 to-indigo-950',
    buttonText: 'Top Up Sekarang',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80',
    targetSlug: 'mobile-legends',
    accentColor: 'border-blue-500/40 text-sky-300'
  },
  {
    id: 3,
    title: 'ROBLOX SPECIAL 25% MORE',
    subtitle: 'Robux & Gift Card Instant',
    description: 'Tanpa Login Password, Cukup Masukkan Username',
    tag: 'Beli Robux',
    gradient: 'from-red-950 via-slate-900 to-zinc-900',
    buttonText: 'Beli Robux',
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=800&q=80',
    targetSlug: 'roblox',
    accentColor: 'border-red-500/40 text-red-300'
  },
  {
    id: 4,
    title: 'DEEP SEA EXPLORER',
    subtitle: 'Fisch It! New Update',
    description: 'Enchant Stone & Rods Rare Siap Kirim 1 Menit',
    tag: 'Hot Games',
    gradient: 'from-cyan-950 via-sky-950 to-slate-900',
    buttonText: 'Jelajahi Item',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    targetSlug: 'roblox',
    accentColor: 'border-cyan-500/40 text-cyan-300'
  }
];

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ 
  onSelectGameBySlug 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <section className="w-full bg-[#071629] pt-4 pb-2 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900">
          <div className="relative min-h-[230px] h-60 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden">
            {BANNERS.map((banner, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Background Gradient & Photo Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-35 filter brightness-110"
                  />

                  {/* Banner Content */}
                  <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-12 max-w-2xl text-white">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/40 border border-white/20 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2.5 w-fit">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{banner.tag}</span>
                    </div>

                    <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
                      {banner.title}
                    </h2>

                    <p className="text-xs sm:text-base text-sky-200 font-semibold mt-0.5 sm:mt-1">
                      {banner.subtitle}
                    </p>

                    <p className="text-[11px] sm:text-sm text-slate-300 mt-1 sm:mt-2 line-clamp-2 max-w-lg">
                      {banner.description}
                    </p>

                    <div className="mt-3 sm:mt-6 flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => onSelectGameBySlug?.(banner.targetSlug)}
                        className="bg-white hover:bg-sky-50 text-slate-950 font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer min-h-[40px] flex items-center justify-center"
                      >
                        {banner.buttonText}
                      </button>
                      <span className="text-[11px] sm:text-xs text-slate-300 hidden xs:inline-flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> Pengiriman Kilat
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Carousel Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous banner"
            className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next banner"
            className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Indicators / Dots */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-6 bg-sky-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4 Feature Trust Bar */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-slate-300 py-2.5 sm:py-3 px-2.5 sm:px-6 rounded-xl bg-[#0D233F] border border-slate-800 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-bold text-white text-[11px] sm:text-sm truncate">Transaksi Aman</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">256-Bit SSL</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-bold text-white text-[11px] sm:text-sm truncate">Garansi 100%</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">Uang Kembali</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-bold text-white text-[11px] sm:text-sm truncate">Proses Kilat</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">1-3 Menit</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-bold text-white text-[11px] sm:text-sm truncate">Bantuan 24/7</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">Respon Cepat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
