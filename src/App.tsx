import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { CategoryIcons } from './components/CategoryIcons';
import { TopUpGameGrid } from './components/TopUpGameGrid';
import { FlashSaleSection } from './components/FlashSaleSection';
import { RobloxSection } from './components/RobloxSection';
import { GiftCardSection } from './components/GiftCardSection';
import { ProductPage } from './components/ProductPage';
import { InvoicePage } from './components/InvoicePage';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

import { POPULAR_GAMES } from './data/mockData';
import { GameCategory, GameItem, OrderItem } from './types';

type PageView = 'home' | 'product' | 'invoice';

export default function App() {
  // Page View State: 'home' | 'product' | 'invoice'
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');

  // Active Product / Game State
  const [selectedGame, setSelectedGame] = useState<GameItem>(POPULAR_GAMES[0]);
  const [selectedNominalId, setSelectedNominalId] = useState<string | undefined>(undefined);

  // Active Invoice State
  const [activeInvoice, setActiveInvoice] = useState<OrderItem | null>(null);

  // Cart & Order Tracker
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Cart & Orders State with localStorage persistence
  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('pojan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('pojan_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        invoiceId: 'PJN-20260908-72910',
        game: POPULAR_GAMES[0], // Resident Evil Requiem or MLBB
        nominal: {
          id: 're-deluxe',
          gameId: 're-requiem',
          title: 'Resident Evil Requiem Deluxe Edition (PC) Steam Key Southeast-Asia',
          amount: 'Deluxe Edition + Grace Costume Apocalypse',
          price: 883200,
          categoryTag: 'Key'
        },
        quantity: 1,
        userId: 'gamer_pojan@gmail.com',
        userWhatsapp: '081298765432',
        userEmail: 'gamer_pojan@gmail.com',
        paymentMethod: {
          id: 'qris',
          name: 'QRIS Realtime (GoPay, OVO, DANA)',
          category: 'qris',
          groupName: 'Pembayaran Instan',
          logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=80&q=80',
          feePercent: 0,
          feeFlat: 0,
          description: 'Scan & bayar langsung',
          instructions: ['Buka aplikasi e-wallet Anda', 'Scan QRIS yang tertera', 'Konfirmasi bayar']
        },
        subtotal: 883200,
        discount: 0,
        paymentFee: 0,
        total: 883200,
        createdAt: new Date(Date.now() - 3600 * 24 * 1000).toISOString(),
        status: 'success'
      }
    ];
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('pojan_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('pojan_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Switch to Product Dedicated Page
  const handleOpenProductPage = (game: GameItem, nominalId?: string) => {
    setSelectedGame(game);
    setSelectedNominalId(nominalId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGameBySlug = (slug: string) => {
    const found = POPULAR_GAMES.find(g => g.slug === slug || g.id === slug);
    if (found) {
      handleOpenProductPage(found);
    }
  };

  const handleQuickDeal = (gameId: string, nominalId?: string) => {
    const found = POPULAR_GAMES.find(g => g.id === gameId);
    if (found) {
      handleOpenProductPage(found, nominalId);
    }
  };

  // Proceed to dedicated Invoice Page
  const handleProceedToInvoice = (order: OrderItem) => {
    setOrders(prev => [order, ...prev]);
    setActiveInvoice(order);
    setCurrentPage('invoice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Invoice ${order.invoiceId} berhasil dibuat!`);
  };

  const handleAddToCart = (order: OrderItem) => {
    setCartItems(prev => [...prev, order]);
    showToast(`${order.game.title} berhasil ditambahkan ke keranjang!`);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutAllFromCart = () => {
    if (cartItems.length === 0) return;
    const firstItem = cartItems[0];
    handleOpenProductPage(firstItem.game, firstItem.nominal.id);
    setIsCartOpen(false);
  };

  const handleUpdateOrderStatus = (invoiceId: string, status: 'pending' | 'processing' | 'success') => {
    setOrders(prev => 
      prev.map(o => o.invoiceId === invoiceId ? { ...o, status } : o)
    );
    if (activeInvoice && activeInvoice.invoiceId === invoiceId) {
      setActiveInvoice(prev => prev ? { ...prev, status } : null);
    }
    if (status === 'success') {
      showToast('Pembayaran berhasil diverifikasi! Item Anda telah aktif.');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter games based on selected category or search query
  const displayedGames = POPULAR_GAMES.filter(game => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        game.title.toLowerCase().includes(q) ||
        game.publisher.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory === 'all') return true;
    return game.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F294A] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl border border-sky-400 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        onSearch={(query) => {
          setSearchQuery(query);
          if (currentPage !== 'home') setCurrentPage('home');
        }}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentPage !== 'home') setCurrentPage('home');
        }}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onSelectGame={(g) => handleOpenProductPage(g)}
        onHomeClick={handleBackToHome}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        games={POPULAR_GAMES}
      />

      {/* Conditional Rendering of Pages (NO POPUPS for purchase flow!) */}
      {currentPage === 'home' && (
        <main className="flex-1 w-full">
          {/* Banner Carousel & Guarantee Bar */}
          <BannerCarousel
            onSelectGameBySlug={handleSelectGameBySlug}
          />

          {/* Category Icons Navigation */}
          <CategoryIcons
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Flash Sale / Hemat Section */}
          <FlashSaleSection
            onSelectQuickItem={handleQuickDeal}
          />

          {/* Roblox Special Section */}
          <RobloxSection
            onSelectRoblox={() => handleSelectGameBySlug('roblox')}
          />

          {/* Top Up Game Grid (Primary catalog) */}
          <TopUpGameGrid
            games={displayedGames}
            onSelectGame={(g) => handleOpenProductPage(g)}
            onViewAll={() => setSelectedCategory('topup')}
          />

          {/* Gift Card & Voucher Section */}
          <GiftCardSection
            games={POPULAR_GAMES}
            onSelectGame={(g) => handleOpenProductPage(g)}
          />
        </main>
      )}

      {currentPage === 'product' && selectedGame && (
        <main className="flex-1 w-full">
          <ProductPage
            game={selectedGame}
            initialNominalId={selectedNominalId}
            onBackToHome={handleBackToHome}
            onProceedToInvoice={handleProceedToInvoice}
            onAddToCart={handleAddToCart}
          />
        </main>
      )}

      {currentPage === 'invoice' && activeInvoice && (
        <main className="flex-1 w-full">
          <InvoicePage
            order={activeInvoice}
            onBackToHome={handleBackToHome}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </main>
      )}

      {/* Global Footer */}
      <Footer />

      {/* Order Tracker Modal (Header utility only) */}
      {isOrderTrackerOpen && (
        <OrderTrackerModal
          orders={orders}
          onClose={() => setIsOrderTrackerOpen(false)}
          onSelectOrder={(order) => {
            setActiveInvoice(order);
            setCurrentPage('invoice');
            setIsOrderTrackerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutAll={handleCheckoutAllFromCart}
      />
    </div>
  );
}
