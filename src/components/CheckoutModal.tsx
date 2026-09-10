import React, { useState, useMemo } from 'react';
import { 
  X, 
  HelpCircle, 
  Check, 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  Tag, 
  Phone, 
  Mail, 
  CreditCard, 
  Info,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { GameItem, NominalItem, PaymentMethod, OrderItem } from '../types';
import { getNominalsForGame, PAYMENT_METHODS, AVAILABLE_PROMOS } from '../data/mockData';
import { formatRupiah, generateInvoiceId, generateVANumber } from '../utils/formatters';

interface CheckoutModalProps {
  game: GameItem;
  initialNominalId?: string;
  onClose: () => void;
  onCompleteOrder: (order: OrderItem) => void;
  onAddToCart: (order: OrderItem) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  game,
  initialNominalId,
  onClose,
  onCompleteOrder,
  onAddToCart
}) => {
  const nominals = useMemo(() => getNominalsForGame(game.id), [game.id]);

  // States
  const [selectedNominal, setSelectedNominal] = useState<NominalItem>(() => {
    if (initialNominalId) {
      const found = nominals.find(n => n.id === initialNominalId);
      if (found) return found;
    }
    return nominals[0];
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [userId, setUserId] = useState<string>('');
  const [zoneId, setZoneId] = useState<string>('');
  const [userWhatsapp, setUserWhatsapp] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [showIdGuide, setShowIdGuide] = useState<boolean>(false);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  const [nominalCategory, setNominalCategory] = useState<string>('all');
  const [validationError, setValidationError] = useState<string>('');

  // Filter nominals by category
  const filteredNominals = useMemo(() => {
    if (nominalCategory === 'all') return nominals;
    return nominals.filter(n => n.categoryTag === nominalCategory);
  }, [nominals, nominalCategory]);

  // Calculate pricing
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
      setPromoError('Masukkan kode promo terlebih dahulu.');
      return;
    }

    const promo = AVAILABLE_PROMOS.find(p => p.code === codeClean);
    if (!promo) {
      setPromoError('Kode promo tidak valid atau telah kadaluarsa.');
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
      discount: calculatedDiscount
    });
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError('');
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!userId.trim()) {
      setValidationError(`Silakan isi ${game.idFormat.userIdLabel} terlebih dahulu.`);
      return false;
    }
    if (game.idFormat.requiresZoneId && !zoneId.trim()) {
      setValidationError(`Silakan isi ${game.idFormat.zoneIdLabel || 'Zone / Server ID'}.`);
      return false;
    }
    if (!selectedNominal) {
      setValidationError('Silakan pilih nominal top up.');
      return false;
    }
    if (!userWhatsapp.trim() && !userEmail.trim()) {
      setValidationError('Masukkan Nomor WhatsApp atau Email untuk pengiriman invoice.');
      return false;
    }
    setValidationError('');
    return true;
  };

  // Process order
  const handleCheckout = () => {
    if (!validateForm()) return;

    const newOrder: OrderItem = {
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

    onCompleteOrder(newOrder);
  };

  const handleAddCartClick = () => {
    if (!validateForm()) return;

    const cartOrder: OrderItem = {
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
      status: 'pending'
    };

    onAddToCart(cartOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        id="checkout-modal-container"
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto relative max-h-[92vh]"
      >
        {/* Modal Top Header with Navy Theme */}
        <div className="bg-[#0F294A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <img 
                src={game.coverImage} 
                alt={game.title}
                className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-md"
              />
              <div>
                <h1 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                  Top Up {game.title}
                  <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-400/30">
                    Proses 1-3 Detik
                  </span>
                </h1>
                <p className="text-xs text-slate-300">
                  {game.publisher} • Resmi & Terverifikasi
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body - 2 Columns (Form & Summary) */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50">
          
          {/* Left Column: Interactive Top-Up Form (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Data Akun */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0F294A] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Masukkan Data Akun
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowIdGuide(!showIdGuide)}
                  className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Petunjuk ID</span>
                </button>
              </div>

              {/* ID Guide Drawer */}
              {showIdGuide && (
                <div className="mb-4 p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-950 flex items-start gap-2">
                  <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Cara Menemukan {game.idFormat.userIdLabel}:</p>
                    <p className="text-slate-700 mt-1">{game.idFormat.guideTip}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {game.idFormat.userIdLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-user-id"
                    type="text"
                    placeholder={game.idFormat.userIdPlaceholder}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>

                {game.idFormat.requiresZoneId && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {game.idFormat.zoneIdLabel || 'Zone ID / Server'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-zone-id"
                      type="text"
                      placeholder={game.idFormat.zoneIdPlaceholder || 'Contoh: 2024'}
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Pastikan data ID yang Anda masukkan sudah benar untuk mencegah kesalahan pengiriman.
              </p>
            </div>

            {/* Step 2: Pilih Nominal Top Up */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0F294A] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Pilih Nominal Item
                  </h2>
                </div>

                {/* Subcategory Pills */}
                <div className="flex items-center gap-1.5 text-xs">
                  {['all', 'Diamonds', 'Pass', 'Promo'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setNominalCategory(tag)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        nominalCategory === tag
                          ? 'bg-[#0F294A] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tag === 'all' ? 'Semua' : tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nominal Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {filteredNominals.map((nom) => {
                  const isSelected = selectedNominal?.id === nom.id;
                  return (
                    <div
                      key={nom.id}
                      onClick={() => setSelectedNominal(nom)}
                      className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-sky-600 bg-sky-50/50 shadow-md ring-2 ring-sky-500/20' 
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {/* Popular / Badge */}
                      {nom.isPopular && (
                        <span className="absolute -top-2 -right-1 bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow-xs uppercase">
                          Best Seller
                        </span>
                      )}

                      <div className="pr-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                            {nom.title}
                          </h4>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {nom.amount}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100">
                        {nom.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through block">
                            {formatRupiah(nom.originalPrice)}
                          </span>
                        )}
                        <span className="font-extrabold text-sm text-[#0F294A]">
                          {formatRupiah(nom.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Jumlah Pembelian (Quantity) */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0F294A] text-white text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Jumlah Pembelian
                  </h2>
                  <p className="text-xs text-slate-500">Tentukan kuantiti pesanan</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="font-extrabold text-slate-900 text-sm px-2">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Step 4: Pilih Metode Pembayaran */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#0F294A] text-white text-xs font-bold flex items-center justify-center">
                  4
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Pilih Metode Pembayaran
                  </h2>
                  <p className="text-xs text-slate-500">
                    Semua pembayaran terverifikasi otomatis 24 jam nonstop
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {PAYMENT_METHODS.map((payment) => {
                  const isSelected = selectedPayment.id === payment.id;
                  const fee = payment.feeFlat + Math.round((subtotal * payment.feePercent) / 100);
                  const totalWithPayment = subtotal + fee;

                  return (
                    <div
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {payment.name}
                            </span>
                            {payment.promoBadge && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                {payment.promoBadge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {payment.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-extrabold text-slate-900 block">
                          {formatRupiah(totalWithPayment)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {fee === 0 ? 'Bebas Admin' : `Biaya +${formatRupiah(fee)}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Kontak / WhatsApp untuk Pengiriman Invoice */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#0F294A] text-white text-xs font-bold flex items-center justify-center">
                  5
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Informasi Kontak
                  </h2>
                  <p className="text-xs text-slate-500">
                    Bukti transaksi & invoice resmi dikirim otomatis ke nomor ini
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nomor WhatsApp Aktif</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-contact-wa"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={userWhatsapp}
                    onChange={(e) => setUserWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    <span>Email (Opsional untuk struk PDF)</span>
                  </label>
                  <input
                    id="input-contact-email"
                    type="email"
                    placeholder="emailkamu@gmail.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 6: Kode Promo */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-amber-500" />
                <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Punya Kode Promo?
                </h2>
              </div>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="font-bold text-xs">Kupon Terpasang: {appliedPromo.code}</span>
                      <p className="text-[11px] text-emerald-700">
                        Hemat {formatRupiah(appliedPromo.discount)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-xs text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      id="input-promo-code"
                      type="text"
                      placeholder="Masukkan kode promo (contoh: POJANHEMAT)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-lg px-3.5 py-2 text-sm text-slate-900 uppercase font-semibold outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-[#0F294A] hover:bg-[#163A66] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Gunakan
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">{promoError}</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2">
                    Coba gunakan kode voucher: <button onClick={() => setPromoCodeInput('POJANHEMAT')} className="text-sky-600 font-semibold underline">POJANHEMAT</button> atau <button onClick={() => setPromoCodeInput('POJANBARU')} className="text-sky-600 font-semibold underline">POJANBARU</button>
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Checkout Summary Box (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg sticky top-24">
              <h3 className="font-black text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                <span>Ringkasan Pesanan</span>
              </h3>

              {/* Validation Warning Notice */}
              {validationError && (
                <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {validationError}
                </div>
              )}

              {/* Order Info */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Game:</span>
                  <span className="font-bold text-slate-900">{game.title}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Item / Nominal:</span>
                  <span className="font-bold text-slate-900">{selectedNominal?.title}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Jumlah:</span>
                  <span className="font-bold text-slate-900">{quantity}x</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Data Akun:</span>
                  <span className="font-bold text-slate-900">
                    {userId ? (zoneId ? `${userId} (${zoneId})` : userId) : '-'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Pembayaran:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[180px]">
                    {selectedPayment.name}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Diskon ({appliedPromo.code}):</span>
                      <span>-{formatRupiah(appliedPromo.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>Biaya Layanan:</span>
                    <span>{paymentFee === 0 ? 'Gratis' : formatRupiah(paymentFee)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Total Bayar:</span>
                  <span className="font-black text-xl text-[#0F294A]">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  id="btn-checkout-now"
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-[#0F294A] hover:bg-[#163A66] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Bayar Sekarang</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddCartClick}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran 100% Aman & Bergaransi</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
