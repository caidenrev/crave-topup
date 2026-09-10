import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Key, 
  ShieldCheck, 
  Globe, 
  Laptop, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart, 
  Zap, 
  Plus, 
  Minus, 
  HelpCircle, 
  Info, 
  MessageSquare, 
  Tag, 
  CheckCircle2, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { GameItem, NominalItem, PaymentMethod, OrderItem } from '../types';
import { getNominalsForGame, PAYMENT_METHODS, AVAILABLE_PROMOS } from '../data/mockData';
import { formatRupiah, generateInvoiceId, generateVANumber } from '../utils/formatters';

interface ProductPageProps {
  game: GameItem;
  initialNominalId?: string;
  onBackToHome: () => void;
  onProceedToInvoice: (order: OrderItem) => void;
  onAddToCart: (order: OrderItem) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  game,
  initialNominalId,
  onBackToHome,
  onProceedToInvoice,
  onAddToCart,
}) => {
  const nominals = useMemo(() => getNominalsForGame(game.id), [game.id]);

  // Active Variant / Nominal Selection
  const [selectedNominal, setSelectedNominal] = useState<NominalItem>(() => {
    if (initialNominalId) {
      const found = nominals.find((n) => n.id === initialNominalId);
      if (found) return found;
    }
    return nominals[0] || {
      id: `${game.id}-default`,
      gameId: game.id,
      title: game.title,
      amount: '1 Unit',
      price: game.minPrice
    };
  });

  // Quantity Stepper
  const [quantity, setQuantity] = useState<number>(1);

  // Gallery active image
  const galleryImages = useMemo(() => {
    if (game.galleryImages && game.galleryImages.length > 0) {
      return game.galleryImages;
    }
    return [
      game.bannerImage || game.coverImage,
      game.coverImage,
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    ];
  }, [game]);

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);

  // Form Inputs
  const [userId, setUserId] = useState<string>('');
  const [zoneId, setZoneId] = useState<string>('');
  const [userWhatsapp, setUserWhatsapp] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [sellerNote, setSellerNote] = useState<string>('');
  const [showNoteField, setShowNoteField] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);

  // Expandable sections
  const [showMoreDescription, setShowMoreDescription] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'sellers' | 'about' | 'specs' | 'faq'>('sellers');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Promo Code
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Calculations
  const subtotal = selectedNominal ? selectedNominal.price * quantity : 0;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const paymentFee = useMemo(() => {
    if (!selectedPayment) return 0;
    const flat = selectedPayment.feeFlat;
    const percent = Math.round((subtotal * selectedPayment.feePercent) / 100);
    return flat + percent;
  }, [selectedPayment, subtotal]);

  const totalAmount = Math.max(0, subtotal - discountAmount + paymentFee);

  // Apply promo
  const handleApplyPromo = () => {
    setPromoError('');
    const codeClean = promoCodeInput.trim().toUpperCase();
    if (!codeClean) {
      setPromoError('Masukkan kode voucher');
      return;
    }

    const promo = AVAILABLE_PROMOS.find((p) => p.code === codeClean);
    if (!promo) {
      setPromoError('Kode promo tidak valid atau telah berakhir');
      return;
    }

    if (subtotal < promo.minOrder) {
      setPromoError(`Minimal pembelian untuk promo ini adalah ${formatRupiah(promo.minOrder)}`);
      return;
    }

    let calculatedDiscount = 0;
    if (promo.discountType === 'fixed') {
      calculatedDiscount = promo.value;
    } else {
      calculatedDiscount = Math.round((subtotal * promo.value) / 100);
      if (promo.maxDiscount) {
        calculatedDiscount = Math.min(calculatedDiscount, promo.maxDiscount);
      }
    }

    setAppliedPromo({
      code: promo.code,
      discount: calculatedDiscount,
    });
  };

  const handleValidateForm = (): boolean => {
    if (!userId.trim()) {
      setValidationError(`Silakan isi ${game.idFormat.userIdLabel} terlebih dahulu.`);
      return false;
    }
    if (game.idFormat.requiresZoneId && !zoneId.trim()) {
      setValidationError(`Silakan isi ${game.idFormat.zoneIdLabel || 'Zone / Server ID'}.`);
      return false;
    }
    if (!userWhatsapp.trim() && !userEmail.trim()) {
      setValidationError('Silakan isi Nomor WhatsApp atau Email untuk pengiriman invoice.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleCheckoutNow = () => {
    if (!handleValidateForm()) {
      // scroll smoothly to the user id input field
      const inputEl = document.getElementById('product-input-user-id');
      if (inputEl) {
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputEl.focus();
      } else {
        window.scrollTo({ top: 350, behavior: 'smooth' });
      }
      return;
    }

    const order: OrderItem = {
      invoiceId: generateInvoiceId(),
      game,
      nominal: selectedNominal,
      quantity,
      userId: userId.trim(),
      zoneId: zoneId.trim() || undefined,
      userWhatsapp: userWhatsapp.trim() || '081234567890',
      userEmail: userEmail.trim() || 'customer@pojantopup.com',
      paymentMethod: selectedPayment,
      subtotal,
      discount: discountAmount,
      promoCode: appliedPromo?.code,
      paymentFee,
      total: totalAmount,
      createdAt: new Date().toISOString(),
      status: 'pending',
      vaNumber: selectedPayment.category === 'va' ? generateVANumber(selectedPayment.id) : undefined,
    };

    onProceedToInvoice(order);
  };

  const handleAddToCartClick = () => {
    if (!handleValidateForm()) {
      const inputEl = document.getElementById('product-input-user-id');
      if (inputEl) {
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputEl.focus();
      }
      return;
    }

    const order: OrderItem = {
      invoiceId: generateInvoiceId(),
      game,
      nominal: selectedNominal,
      quantity,
      userId: userId.trim(),
      zoneId: zoneId.trim() || undefined,
      userWhatsapp: userWhatsapp.trim() || '081234567890',
      userEmail: userEmail.trim() || 'customer@pojantopup.com',
      paymentMethod: selectedPayment,
      subtotal,
      discount: discountAmount,
      promoCode: appliedPromo?.code,
      paymentFee,
      total: totalAmount,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    onAddToCart(order);
  };

  const activeSeller = game.sellers?.[0] || {
    id: 'pojan-official',
    name: 'Pojan Official Store',
    rating: 4.9,
    reviewCount: '151.3rb',
    soldCount: 183,
    price: selectedNominal.price,
    originalPrice: selectedNominal.originalPrice,
    isOnline: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 min-h-screen pb-28 lg:pb-16">
      
      {/* Breadcrumb Navigation Bar matching the image */}
      <div className="bg-white border-b border-slate-200 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar whitespace-nowrap py-0.5">
            <button 
              onClick={onBackToHome}
              className="text-sky-700 hover:text-sky-900 font-semibold hover:underline flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="capitalize flex-shrink-0 text-slate-600">
              {game.category === 'key' ? 'Game Key' : game.category === 'giftcard' ? 'Gift Card' : 'Top Up Game'}
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800 truncate max-w-[140px] sm:max-w-xs">
              {game.title}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 truncate max-w-[120px] sm:max-w-[180px]">
              {selectedNominal.title}
            </span>
          </div>

          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: game.title, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(window.location.href);
                alert('Tautan produk berhasil disalin!');
              }
            }}
            className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
            title="Bagikan Produk"
            aria-label="Bagikan Produk"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Layout (Left Column & Right Column) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        
        {/* Title Header with Rating & Badges */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {game.title} - {selectedNominal.title}
            </h1>
          </div>

          {/* Rating, Reviews, and Badges Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span>{game.rating}</span>
              <span className="text-slate-400 font-normal">
                ({game.reviewsCount || `${game.soldCount} ulasan`})
              </span>
            </div>

            <span className="text-slate-300">|</span>

            <div className="flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Key className="w-3.5 h-3.5" />
              <span>{game.badge || 'Resmi & Terverifikasi'}</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Terverifikasi oleh Pojan Topup</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Media, Variants, Info, Sellers, Tabs (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Media & Metadata Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual Media Gallery (5 cols) */}
                <div className="md:col-span-6 space-y-3">
                  <div className="relative aspect-video sm:aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                    <img
                      src={activeImage}
                      alt={game.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#0F294A]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded">
                      {game.platform || 'Multiplatform'}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImage === img ? 'border-sky-600 ring-2 ring-sky-500/20 shadow' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metadata Specifications Grid (7 cols) */}
                <div className="md:col-span-6 flex flex-col justify-between space-y-3 text-xs">
                  <div className="divide-y divide-slate-100 space-y-2.5">
                    
                    {/* Region */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Region:</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span>{game.region || 'Southeast-Asia / Indonesia'}</span>
                      </div>
                    </div>

                    {/* Platform */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Platform:</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Laptop className="w-4 h-4 text-sky-600" />
                        <span>{game.platform || 'PC & Mobile'}</span>
                      </div>
                    </div>

                    {/* Tipe */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Tipe:</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {game.typeLabel || 'Top-up Otomatis'}
                      </span>
                    </div>

                    {/* Aktivasi */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Aktivasi:</span>
                      <div className="flex items-center gap-1 font-bold text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersedia di Indonesia</span>
                      </div>
                    </div>
                  </div>

                  {/* Note Alert Box */}
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-[11px] leading-relaxed">
                    <p className="font-bold">Catatan Pengiriman:</p>
                    <p className="text-slate-700 mt-0.5">
                      {game.activationNote || 'Item akan langsung diproses dan dikirimkan otomatis ke akun game Anda dalam 1-3 detik setelah pembayaran diverifikasi.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Variant / Nominal Selection Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span>Pilihan Edisi & Nominal</span>
                  <span className="text-xs text-slate-400 font-normal">
                    ({nominals.length} pilihan)
                  </span>
                </h3>
              </div>

              {/* Variant Pills / Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nominals.map((item) => {
                  const isSelected = selectedNominal?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedNominal(item)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/50 shadow-md ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                            {item.title}
                          </h4>
                          {item.isPopular && (
                            <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                              HOT
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.amount}</p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-black text-sm text-[#0F294A]">
                            {formatRupiah(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through">
                              {formatRupiah(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Blue Checkmark Circle as in Screenshot */}
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 text-transparent'
                      }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Input Data Akun / Recipient Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0F294A] text-white text-xs font-bold flex items-center justify-center">
                    ID
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Masukkan Data Akun Tujuan
                  </h3>
                </div>

                <div className="text-xs text-sky-700 font-semibold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>{game.idFormat.guideTip || 'Pastikan ID benar'}</span>
                </div>
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {validationError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {game.idFormat.userIdLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="product-input-user-id"
                    type="text"
                    placeholder={game.idFormat.userIdPlaceholder}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 outline-none transition-all"
                  />
                </div>

                {game.idFormat.requiresZoneId && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {game.idFormat.zoneIdLabel || 'Zone ID / Server'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="product-input-zone-id"
                      type="text"
                      placeholder={game.idFormat.zoneIdPlaceholder || 'Contoh: 2024'}
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Detail Edisi / Deskripsi Produk as seen in screenshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base mb-2">
                Detail Edisi & Deskripsi Produk
              </h3>
              
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-800">
                  {game.editionDetail || 'Produk digital original terverifikasi langsung dari publisher resmi.'}
                </p>
                <p>
                  {game.description || 'Pengiriman otomatis kilat 24 jam nonstop. Cukup masukkan data akun Anda dan selesaikan pembayaran, item langsung dikirimkan ke akun secara instan.'}
                </p>

                {/* Banner inside Detail Edisi */}
                <div className="relative rounded-xl overflow-hidden my-3 aspect-21/9 bg-slate-900 border border-slate-200">
                  <img
                    src={game.bannerImage || game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-sm sm:text-base font-extrabold">
                      {game.title}
                    </span>
                  </div>
                </div>

                {showMoreDescription && (
                  <div className="pt-2 text-slate-600 space-y-2 border-t border-slate-100">
                    <p>
                      <strong>Keamanan Terjamin:</strong> Transaksi dilindungi enkripsi SSL 256-Bit dan sistem pengiriman resmi tanpa menggunakan bot ilegal.
                    </p>
                    <p>
                      <strong>Garansi Penuh:</strong> Jika terdapat kendala pada serial key atau item tidak terkirim dalam 5 menit, tim Customer Support kami siap membantu penyelesaian atau pengembalian dana 100%.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowMoreDescription(!showMoreDescription)}
                className="mt-3 text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{showMoreDescription ? 'Tampilkan lebih sedikit' : 'Tampilkan lebih banyak'}</span>
                {showMoreDescription ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Sub-Tabs Nav: Semua Penjual, Tentang Game, Persyaratan Sistem, FAQ */}
            <div className="border-b border-slate-200 flex gap-6 text-xs sm:text-sm font-bold text-slate-500 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('sellers')}
                className={`pb-3 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'sellers'
                    ? 'text-sky-700 border-b-2 border-sky-600 font-extrabold'
                    : 'hover:text-slate-900'
                }`}
              >
                Semua Penjual ({game.sellers?.length || 2})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('about')}
                className={`pb-3 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'about'
                    ? 'text-sky-700 border-b-2 border-sky-600 font-extrabold'
                    : 'hover:text-slate-900'
                }`}
              >
                Tentang Game
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-3 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'text-sky-700 border-b-2 border-sky-600 font-extrabold'
                    : 'hover:text-slate-900'
                }`}
              >
                Persyaratan Sistem
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`pb-3 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'faq'
                    ? 'text-sky-700 border-b-2 border-sky-600 font-extrabold'
                    : 'hover:text-slate-900'
                }`}
              >
                Game FAQ
              </button>
            </div>

            {/* Tab 1: Semua Penjual (as seen in screenshot) */}
            {activeTab === 'sellers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-800">
                    Daftar Penjual Terverifikasi
                  </span>
                  <div className="flex items-center gap-2">
                    <span>Urutkan:</span>
                    <select className="bg-white border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-800 outline-none text-xs">
                      <option>Harga: Rendah ke Tinggi</option>
                      <option>Rating Tertinggi</option>
                      <option>Paling Banyak Terjual</option>
                    </select>
                  </div>
                </div>

                {/* Seller Cards */}
                <div className="space-y-3">
                  {(game.sellers || [
                    {
                      id: 'seller-dnt',
                      name: 'dntStore Official',
                      rating: 4.9,
                      reviewCount: '151.3rb',
                      soldCount: 183,
                      price: selectedNominal.price,
                      originalPrice: selectedNominal.originalPrice,
                      isOnline: true,
                      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
                    },
                    {
                      id: 'seller-firefly',
                      name: 'firefly Gaming',
                      rating: 4.9,
                      reviewCount: '147.7rb',
                      soldCount: 39,
                      price: selectedNominal.price + 2000,
                      originalPrice: selectedNominal.originalPrice,
                      isOnline: true,
                      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
                    }
                  ]).map((seller) => (
                    <div
                      key={seller.id}
                      className="bg-white rounded-xl p-4 border border-slate-200 hover:border-sky-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={seller.avatar}
                            alt={seller.name}
                            className="w-12 h-12 rounded-full object-cover border border-slate-200"
                          />
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">
                            {seller.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              {seller.rating} ({seller.reviewCount})
                            </span>
                            <span>•</span>
                            <span>Terjual: {seller.soldCount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          {seller.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through block">
                              {formatRupiah(seller.originalPrice)}
                            </span>
                          )}
                          <span className="font-black text-base text-[#0F294A]">
                            {formatRupiah(seller.price)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleCheckoutNow}
                          className="bg-[#0F294A] hover:bg-[#163A66] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Beli Sekarang</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Tentang Game */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs text-xs text-slate-700 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Tentang {game.title}</h3>
                <p className="leading-relaxed">
                  {game.description || 'Pengalaman bermain game dengan grafik memukau dan gameplay aksi petualangan mendebarkan.'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Publisher:</span>
                    <span className="font-bold text-slate-800">{game.publisher}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Developers:</span>
                    <span className="font-bold text-slate-800">{game.developers || game.publisher}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Release Date:</span>
                    <span className="font-bold text-slate-800">{game.releaseDate || '2026'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Genres:</span>
                    <span className="font-bold text-slate-800">{game.genres || 'Action, Multiplayer'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Persyaratan Sistem (as in screenshot) */}
            {activeTab === 'specs' && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="font-extrabold text-slate-900 text-base">Persyaratan Sistem (Windows)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Minimum */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-200">
                      Minimum:
                    </h4>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>OS:</strong> {game.systemRequirements?.min.os || 'Windows 10/11 (64bit)'}</li>
                      <li>• <strong>Processor:</strong> {game.systemRequirements?.min.processor || 'Intel Core i5-8400 / AMD Ryzen 5 2600'}</li>
                      <li>• <strong>Memory:</strong> {game.systemRequirements?.min.memory || '12 GB RAM'}</li>
                      <li>• <strong>Graphics:</strong> {game.systemRequirements?.min.graphics || 'GeForce GTX 1060 / Radeon RX 580'}</li>
                      <li>• <strong>DirectX:</strong> Version 12</li>
                    </ul>
                  </div>

                  {/* Recommended */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-200">
                      Recommended:
                    </h4>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>OS:</strong> {game.systemRequirements?.rec.os || 'Windows 11 (64bit)'}</li>
                      <li>• <strong>Processor:</strong> {game.systemRequirements?.rec.processor || 'Intel Core i7-10700 / AMD Ryzen 7 3700X'}</li>
                      <li>• <strong>Memory:</strong> {game.systemRequirements?.rec.memory || '16 GB RAM'}</li>
                      <li>• <strong>Graphics:</strong> {game.systemRequirements?.rec.graphics || 'GeForce RTX 2060 Super / Radeon RX 6600'}</li>
                      <li>• <strong>DirectX:</strong> Version 12</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Game FAQ (as in screenshot) */}
            {activeTab === 'faq' && (
              <div className="space-y-2">
                {(game.faqs || [
                  {
                    question: `Kenapa harus beli ${game.title} di Pojan Topup?`,
                    answer: 'Pojan Topup memberikan jaminan produk 100% original bergaransi resmi langsung dari publisher dengan harga bersaing dan proses instan 24 jam nonstop.'
                  },
                  {
                    question: 'Apakah aman bertransaksi di Pojan Topup?',
                    answer: 'Sangat aman! Seluruh transaksi dilindungi enkripsi SSL 256-bit dan pembayaran terhubung langsung ke gerbang pembayaran bank resmi.'
                  },
                  {
                    question: 'Berapa lama waktu pengiriman?',
                    answer: 'Pengiriman pesanan diproses secara otomatis oleh sistem kami dan masuk ke akun Anda dalam hitungan 1 hingga 3 detik.'
                  },
                  {
                    question: 'Bagaimana cara menghubungi Customer Service?',
                    answer: 'Tim Customer Support kami siap siaga 24/7 melalui live chat WhatsApp di pojok kanan bawah atau email support@pojantopup.com.'
                  }
                ]).map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-sky-700 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-sky-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Purchase / Checkout Card (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xl sticky top-20 space-y-4">
              
              {/* Seller / Store Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={activeSeller.avatar}
                      alt={activeSeller.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {activeSeller.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-current" />
                        {activeSeller.rating} / 5.0
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div>
                <span className="text-xs text-slate-500 block">Tawaran dari penjual:</span>
                <div className="text-2xl sm:text-3xl font-black text-[#0F294A] mt-0.5">
                  {formatRupiah(selectedNominal.price)}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>Harga belum final (sebelum admin)</span>
                  <span className="text-sky-700 font-semibold cursor-pointer">
                    Stok: 999+
                  </span>
                </div>
              </div>

              {/* Quantity Stepper (as in screenshot) */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Jumlah Beli:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-extrabold text-slate-900 text-sm px-1">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tambah Catatan untuk Penjual (as in screenshot) */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowNoteField(!showNoteField)}
                  className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{showNoteField ? 'Tutup catatan' : '+ Tambah catatan untuk penjual'}</span>
                </button>
                {showNoteField && (
                  <textarea
                    rows={2}
                    placeholder="Tulis pesan khusus untuk penjual..."
                    value={sellerNote}
                    onChange={(e) => setSellerNote(e.target.value)}
                    className="w-full mt-2 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 outline-none focus:bg-white"
                  />
                )}
              </div>

              {/* Metode Pembayaran Selection */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Metode Pembayaran:
                </label>
                <select
                  value={selectedPayment.id}
                  onChange={(e) => {
                    const found = PAYMENT_METHODS.find((p) => p.id === e.target.value);
                    if (found) setSelectedPayment(found);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 rounded-xl px-3 py-2 text-base sm:text-xs font-bold text-slate-800 outline-none"
                >
                  {PAYMENT_METHODS.map((pm) => (
                    <option key={pm.id} value={pm.id}>
                      {pm.name} ({pm.feeFlat === 0 ? 'Bebas Admin' : `+${formatRupiah(pm.feeFlat)}`})
                    </option>
                  ))}
                </select>
              </div>

              {/* Nomor WhatsApp Pengiriman Struk */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Nomor WhatsApp Penerima Invoice: <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="081234567890"
                  value={userWhatsapp}
                  onChange={(e) => setUserWhatsapp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-xl px-3 py-2 text-base sm:text-xs text-slate-900 outline-none"
                />
              </div>

              {/* Kupon Promo Accordion */}
              <div className="pt-2 border-t border-slate-100">
                {appliedPromo ? (
                  <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between text-xs text-emerald-900">
                    <span className="font-bold">Kupon: {appliedPromo.code} (-{formatRupiah(appliedPromo.discount)})</span>
                    <button onClick={() => setAppliedPromo(null)} className="text-red-600 font-bold underline cursor-pointer">Hapus</button>
                  </div>
                ) : (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Kode Promo (POJANHEMAT)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-base sm:text-xs uppercase font-semibold outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      Pakai
                    </button>
                  </div>
                )}
                {promoError && <p className="text-[11px] text-red-500 mt-1">{promoError}</p>}
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({quantity}x):</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Potongan Promo:</span>
                    <span>-{formatRupiah(appliedPromo.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Biaya Layanan:</span>
                  <span>{paymentFee === 0 ? 'Bebas Admin' : formatRupiah(paymentFee)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Total Bayar:</span>
                  <span className="font-black text-xl text-[#0F294A]">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Big CTA Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  id="btn-buy-now-page"
                  type="button"
                  onClick={handleCheckoutNow}
                  className="w-full bg-[#0F294A] hover:bg-[#163A66] text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Beli Sekarang</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garansi 100% Uang Kembali Jika Gagal Kirim</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Mobile Sticky Bottom Checkout Bar (iPhone 13 friendly) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 sm:px-6 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] safe-area-bottom flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Total Bayar ({quantity}x)
          </span>
          <span className="font-black text-base sm:text-lg text-[#0F294A] truncate block leading-tight">
            {formatRupiah(totalAmount)}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleAddToCartClick}
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
            title="Tambah ke Keranjang"
            aria-label="Tambah ke Keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleCheckoutNow}
            className="h-11 px-4 sm:px-5 rounded-xl bg-[#0F294A] hover:bg-[#163A66] active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-sky-950/20 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-current" />
            <span>Beli Sekarang</span>
          </button>
        </div>
      </div>

    </div>
  );
};
