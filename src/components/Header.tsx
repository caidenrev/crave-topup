import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  ReceiptText, 
  User, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Gamepad2,
  Menu,
  X
} from 'lucide-react';
import { GameCategory, GameItem } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  selectedCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  onOpenOrderTracker: () => void;
  onSelectGame: (game: GameItem) => void;
  onHomeClick?: () => void;
  cartCount: number;
  onOpenCart: () => void;
  games: GameItem[];
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  selectedCategory,
  onSelectCategory,
  onOpenOrderTracker,
  onSelectGame,
  onHomeClick,
  cartCount,
  onOpenCart,
  games
}) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredGames = searchQuery.trim() 
    ? games.filter(g => 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleQuickTagClick = (tag: string) => {
    onSearch(tag);
  };

  return (
    <header id="pojan-header" className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Bar - Trust, Support, Currency */}
      <div className="bg-[#0B1E36] text-slate-300 text-[11px] sm:text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <span>★ 4.9/5.0</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 truncate">Trustpilot Verified</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garansi 100% Legal</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-slate-300 flex-shrink-0">
            <button 
              onClick={onOpenOrderTracker}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer text-sky-400 font-semibold"
            >
              <ReceiptText className="w-3.5 h-3.5" />
              <span>Lacak Pesanan</span>
            </button>
            <div className="hidden sm:flex items-center gap-1 hover:text-white cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bantuan 24/7</span>
            </div>
            <div className="flex items-center gap-1 text-white bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px] sm:text-xs border border-slate-700">
              <span>🇮🇩 IDR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navy Header */}
      <div className="bg-[#0F294A] text-white py-2.5 sm:py-3.5 border-b border-[#1A3A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">
          
          {/* Top Row on Mobile: Logo and Action Buttons */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <div 
              onClick={() => {
                onSelectCategory('all');
                onSearch('');
                onHomeClick?.();
              }}
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            >
              <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-sky-400 group-hover:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
                    pojan<span className="text-sky-400">topup</span>
                  </span>
                  <span className="bg-sky-400/20 text-sky-300 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-400/30">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-300 tracking-wider uppercase font-medium mt-0.5">
                  Top Up Game & Voucher Instant
                </p>
              </div>
            </div>

            {/* Mobile Actions Group (Visible on < md) */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={onOpenOrderTracker}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-sky-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Lacak Pesanan"
                aria-label="Lacak Pesanan"
              >
                <ReceiptText className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenCart}
                className="relative w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Keranjang Belanja"
                aria-label="Keranjang Belanja"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0F294A]">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 text-white hover:bg-white/10 rounded-lg flex items-center justify-center cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Box with Autocomplete (Full Width on Mobile, Centered on Desktop) */}
          <div className="flex-1 w-full md:max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                id="search-game-input"
                type="text"
                placeholder="Cari Game, Diamond, Robux, Steam..."
                value={searchQuery}
                onChange={(e) => {
                  onSearch(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-base sm:text-sm rounded-lg pl-9 sm:pl-10 pr-20 sm:pr-24 py-2 sm:py-2.5 outline-none ring-2 ring-transparent focus:ring-sky-400 shadow-inner font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-14 sm:right-16 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label="Hapus teks"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => setShowSearchResults(false)}
                className="absolute right-1.5 bg-[#0F294A] hover:bg-[#163B66] text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                CARI
              </button>
            </div>

            {/* Quick Keyword Pills under Search on Desktop */}
            <div className="hidden lg:flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-300 overflow-hidden">
              {['Robux 5 Hari', 'Mobile Legends', 'Free Fire', 'Genshin Impact', 'Steam Wallet', 'Blood Strike'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Live Search Results Dropdown */}
            {showSearchResults && searchQuery.trim().length > 0 && (
              <div 
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 max-h-80 sm:max-h-96 overflow-y-auto"
                onMouseLeave={() => setShowSearchResults(false)}
              >
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 border-b border-slate-100 flex justify-between items-center">
                  <span>Hasil Pencarian ({filteredGames.length})</span>
                  <button 
                    onClick={() => setShowSearchResults(false)}
                    className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                  >
                    Tutup
                  </button>
                </div>
                {filteredGames.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {filteredGames.map((game) => (
                      <div
                        key={game.id}
                        onClick={() => {
                          onSelectGame(game);
                          setShowSearchResults(false);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-sky-50 rounded-lg cursor-pointer transition-colors text-slate-800"
                      >
                        <img 
                          src={game.coverImage} 
                          alt={game.title} 
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-900 truncate">{game.title}</p>
                          <p className="text-xs text-slate-500">{game.publisher} • Mulai Rp {game.minPrice.toLocaleString('id-ID')}</p>
                        </div>
                        <span className="text-xs bg-sky-100 text-sky-800 font-medium px-2 py-0.5 rounded">
                          Beli
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    Tidak ditemukan game dengan kata kunci "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop-Only Action Buttons */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Cek Transaksi */}
            <button
              id="header-btn-track"
              onClick={onOpenOrderTracker}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all border border-white/10 cursor-pointer"
            >
              <ReceiptText className="w-4 h-4 text-sky-400" />
              <span>Cek Pesanan</span>
            </button>

            {/* Cart Button */}
            <button
              id="header-btn-cart"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Keranjang Belanja"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0F294A]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Login */}
            <button
              id="header-btn-login"
              onClick={() => alert('Fitur akun siap digunakan. Anda dapat langsung melakukan transaksi tanpa wajib login!')}
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md shadow-sky-500/20 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Masuk</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sub-Navigation Categories Bar (Pills) */}
      <div className="bg-[#0A1D36] border-b border-slate-800/80 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium">
          {[
            { id: 'all', label: 'Semua Kategori' },
            { id: 'topup', label: 'Top Up Game' },
            { id: 'giftcard', label: 'Gift Card & Voucher' },
            { id: 'roblox', label: 'Roblox Series' },
            { id: 'key', label: 'Game Key & Steam' },
            { id: 'item', label: 'Item & Akun' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as GameCategory)}
                className={`px-3 py-1.5 rounded-full flex-shrink-0 transition-all font-medium cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/5 hover:bg-white/15 text-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1D36] border-b border-slate-700 px-4 py-3 text-sm text-slate-200 space-y-2 shadow-2xl">
          <div className="font-bold text-white text-xs uppercase tracking-wider pb-1 border-b border-slate-700 flex justify-between items-center">
            <span>Menu Layanan</span>
            <span className="text-[10px] text-sky-400 font-normal">Pojan Topup v1.0</span>
          </div>

          <button 
            onClick={() => {
              onOpenOrderTracker();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left min-h-[44px] px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between hover:text-sky-400 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ReceiptText className="w-4 h-4 text-sky-400" />
              <span className="font-semibold">Lacak Status Pesanan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => {
              onOpenCart();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left min-h-[44px] px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between hover:text-sky-400 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">Keranjang Belanja</span>
            </div>
            <div className="flex items-center gap-1.5">
              {cartCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full">
                  {cartCount} item
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          <button 
            onClick={() => {
              alert('Layanan Customer Support 24/7 kami siap melayani Anda melalui WhatsApp dan Live Chat.');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left min-h-[44px] px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between hover:text-sky-400 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">Bantuan & CS 24 Jam</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-700/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Garansi 100% Legal & Terpercaya</span>
          </div>
        </div>
      )}
    </header>
  );
};
