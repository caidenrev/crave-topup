import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck, 
  Printer, 
  Zap, 
  RefreshCw,
  Share2,
  ExternalLink
} from 'lucide-react';
import { OrderItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface InvoicePageProps {
  order: OrderItem;
  onBackToHome: () => void;
  onUpdateStatus: (invoiceId: string, status: 'pending' | 'processing' | 'success') => void;
}

export const InvoicePage: React.FC<InvoicePageProps> = ({
  order,
  onBackToHome,
  onUpdateStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86399); // 23h 59m 59s
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (order.status === 'success') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [order.status]);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    onUpdateStatus(order.invoiceId, 'processing');

    setTimeout(() => {
      setIsProcessingPayment(false);
      onUpdateStatus(order.invoiceId, 'success');
    }, 1500);
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 min-h-screen pb-16">
      
      {/* Breadcrumb / Top Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="text-sky-700 hover:text-sky-900 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Pojan Topup</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Transaksi #{order.invoiceId}
          </span>
        </div>
      </div>

      {/* Invoice Page Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8">
        
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Navy Header Banner */}
          <div className="bg-[#0F294A] text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-sky-400 uppercase tracking-widest block">
                BUKTI TRANSAKSI RESMI
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                {order.invoiceId}
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Waktu Transaksi: {new Date(order.createdAt).toLocaleString('id-ID')}
              </p>
            </div>

            <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <span className="text-[11px] text-slate-300 block">Total Pembayaran:</span>
              <span className="text-xl sm:text-3xl font-black text-sky-400">
                {formatRupiah(order.total)}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            
            {/* Status Alert Box */}
            {order.status === 'success' ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 sm:p-6 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-2.5 sm:mb-3 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                  Pembayaran Berhasil Diverifikasi!
                </h2>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-lg mx-auto">
                  Pesanan untuk <span className="font-bold">{order.game.title} - {order.nominal.title}</span> telah berhasil dikirimkan secara otomatis ke akun <span className="font-bold">{order.userId}</span>.
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-amber-950">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-amber-950">
                      Menunggu Pembayaran
                    </h3>
                    <p className="text-xs text-amber-900 mt-0.5">
                      Silakan selesaikan tagihan pembayaran Anda sebelum waktu habis.
                    </p>
                  </div>
                </div>

                <div className="bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-amber-200 text-center w-full sm:w-auto flex-shrink-0">
                  <span className="text-[10px] text-amber-800 font-semibold block">Batas Waktu:</span>
                  <span className="font-mono font-black text-base sm:text-lg text-amber-950">
                    {formatTimer(timeLeft)}
                  </span>
                </div>
              </div>
            )}

            {/* Payment Interactive Card (QRIS / VA) */}
            {order.status !== 'success' && (
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 space-y-4 sm:space-y-6">
                
                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-500">Metode Pembayaran Dipilih:</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                    {order.paymentMethod.name}
                  </h3>
                </div>

                {/* QRIS / VA Rendering */}
                {order.paymentMethod.category === 'qris' ? (
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-300 shadow-md inline-block text-center w-full max-w-xs sm:max-w-sm">
                      <div className="text-[11px] sm:text-xs font-black tracking-widest text-slate-900 mb-2.5 sm:mb-3">
                        QRIS STANDAR PEMBAYARAN NASIONAL
                      </div>

                      {/* SVG QR Code */}
                      <div className="w-44 h-44 sm:w-52 sm:h-52 bg-slate-900 rounded-xl p-2 flex items-center justify-center mx-auto">
                        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center p-2">
                          <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                            <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                            <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                            <circle cx="50" cy="50" r="10" fill="#0F294A" />
                            <rect x="35" y="10" width="5" height="15" />
                            <rect x="45" y="20" width="10" height="5" />
                            <rect x="60" y="10" width="5" height="10" />
                            <rect x="10" y="35" width="20" height="5" />
                            <rect x="40" y="40" width="5" height="20" />
                            <rect x="70" y="35" width="25" height="5" />
                            <rect x="80" y="50" width="15" height="10" />
                            <rect x="35" y="70" width="15" height="15" />
                            <rect x="60" y="75" width="10" height="5" />
                            <rect x="75" y="70" width="20" height="20" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5 sm:mt-3">
                        Scan dengan GoPay, OVO, DANA, BCA Mobile, atau Livin Mandiri
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Nomor Virtual Account ({order.paymentMethod.name}):
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        readOnly
                        value={order.vaNumber || '880891234567890'}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 font-mono text-lg sm:text-xl font-black text-slate-900 outline-none text-center sm:text-left"
                      />
                      <button
                        onClick={() => handleCopy(order.vaNumber || '880891234567890')}
                        className="bg-[#0F294A] hover:bg-[#163A66] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Tersalin' : 'Salin VA'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Instant Simulation Action */}
                <div className="pt-3 sm:pt-4 border-t border-slate-200 max-w-lg mx-auto text-center">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessingPayment}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sedang Memproses Verifikasi...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-300 fill-current" />
                        <span>Simulasi Bayar Sekarang (Cek Sukses Otomatis)</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5">
                    Klik untuk mensimulasikan sistem auto-approval dan notifikasi pesanan selesai.
                  </p>
                </div>

              </div>
            )}

            {/* Order Details Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-3 sm:space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base pb-2 border-b border-slate-100">
                Rincian Lengkap Pesanan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-[11px]">Nama Produk:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{order.game.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-[11px]">Edisi / Nominal:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{order.nominal.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-[11px]">Akun Tujuan / Email:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {order.userId} {order.zoneId ? `(${order.zoneId})` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-[11px]">Nomor WhatsApp:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{order.userWhatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-[11px]">Jumlah:</span>
                  <span className="font-bold text-slate-900">{order.quantity} Unit</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-[11px]">Status Pengiriman:</span>
                  <span className={`inline-block font-extrabold px-2 py-0.5 rounded text-[10px] uppercase ${
                    order.status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status === 'success' ? 'Selesai / Terkirim' : 'Menunggu Pembayaran'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2 sm:pt-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan Struk PDF</span>
              </button>

              <button
                onClick={onBackToHome}
                className="flex-1 bg-[#0F294A] hover:bg-[#163A66] text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Kembali Belanja Item Lain
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
