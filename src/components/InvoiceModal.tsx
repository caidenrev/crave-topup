import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  Printer, 
  QrCode, 
  Zap, 
  RefreshCw,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { OrderItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface InvoiceModalProps {
  order: OrderItem;
  onClose: () => void;
  onUpdateStatus: (invoiceId: string, status: 'pending' | 'processing' | 'success') => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86399); // 23h 59m 59s
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Countdown timer
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

  // Simulate instant payment confirmation
  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    onUpdateStatus(order.invoiceId, 'processing');
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      onUpdateStatus(order.invoiceId, 'success');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        id="invoice-modal-container"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto relative"
      >
        {/* Navy Header */}
        <div className="bg-[#0F294A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
              INVOICE RESMI POJAN TOPUP
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-white">
              {order.invoiceId}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Status Box */}
          {order.status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950">
                Pembayaran Berhasil & Terverifikasi!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-md mx-auto">
                Diamond / Item pesanan telah berhasil dikirimkan secara otomatis ke akun 
                <span className="font-bold"> {order.userId}</span>. Selamat bermain!
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Menunggu Pembayaran
                  </span>
                  <p className="text-xs text-amber-900 mt-0.5">
                    Selesaikan transaksi sebelum batas waktu berakhir
                  </p>
                </div>
              </div>

              <div className="bg-white/80 px-3.5 py-1.5 rounded-xl border border-amber-200 text-center flex-shrink-0">
                <span className="text-[10px] text-amber-800 font-semibold block">Sisa Waktu:</span>
                <span className="font-mono font-extrabold text-base text-amber-950">
                  {formatTimer(timeLeft)}
                </span>
              </div>
            </div>
          )}

          {/* Payment Details Section */}
          {order.status !== 'success' && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="text-center pb-4 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Total Tagihan:</span>
                <div className="text-2xl sm:text-3xl font-black text-[#0F294A] mt-0.5">
                  {formatRupiah(order.total)}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-xs text-slate-600">
                  <span>Metode:</span>
                  <span className="font-bold text-slate-900">{order.paymentMethod.name}</span>
                </div>
              </div>

              {/* QRIS Code or VA Box */}
              <div className="mt-4">
                {order.paymentMethod.category === 'qris' ? (
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-bold text-slate-700 mb-2">
                      Scan QRIS Menggunakan Aplikasi Favorit Anda:
                    </p>
                    
                    {/* Visual QRIS Card */}
                    <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-md inline-block text-center">
                      <div className="text-xs font-black tracking-widest text-slate-900 mb-2">
                        QRIS STANDAR PEMBAYARAN NASIONAL
                      </div>
                      
                      {/* Generated SVG QR Code pattern */}
                      <div className="w-48 h-48 bg-slate-900 rounded-lg p-2 flex items-center justify-center relative overflow-hidden mx-auto">
                        <div className="w-full h-full bg-white rounded flex items-center justify-center p-2">
                          <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                            {/* SVG QR Code Pattern */}
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

                      <div className="text-[10px] text-slate-500 mt-2">
                        Pojan Topup Official Merchant • Transaksi Instant
                      </div>
                    </div>
                  </div>
                ) : order.paymentMethod.category === 'va' ? (
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Nomor Virtual Account:</span>
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value={order.vaNumber || '880891234567890'}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-mono text-lg font-bold text-slate-900"
                      />
                      <button
                        onClick={() => handleCopy(order.vaNumber || '880891234567890')}
                        className="bg-[#0F294A] hover:bg-[#163A66] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    <p className="font-bold text-slate-900 mb-1">Panduan Pembayaran {order.paymentMethod.name}:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {order.paymentMethod.instructions.map((ins, i) => (
                        <li key={i}>{ins}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Simulation Action: "Simulasi Bayar Sekarang" */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sedang Memverifikasi Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-current" />
                      <span>Simulasi Bayar Sekarang (Uji Coba Flow Sukses)</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-1.5">
                  Klik tombol hijau di atas untuk melihat proses verifikasi otomatis dan pengiriman diamond seketika.
                </p>
              </div>
            </div>
          )}

          {/* Detailed Breakdown Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 text-xs">
            <h4 className="font-extrabold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Rincian Transaksi
            </h4>

            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Nama Game:</span>
                <span className="font-bold text-slate-900">{order.game.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Nominal:</span>
                <span className="font-bold text-slate-900">{order.nominal.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Akun Tujuan:</span>
                <span className="font-bold text-slate-900">
                  {order.userId} {order.zoneId ? `(${order.zoneId})` : ''}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">WhatsApp:</span>
                <span className="font-bold text-slate-900">{order.userWhatsapp}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Waktu Pemesanan:</span>
                <span className="font-semibold text-slate-700">
                  {new Date(order.createdAt).toLocaleString('id-ID')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Status Pesanan:</span>
                <span className={`font-bold inline-block px-2 py-0.5 rounded text-[10px] ${
                  order.status === 'success' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {order.status === 'success' ? 'SUKSES TERKIRIM' : 'MENUNGGU PEMBAYARAN'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Bukti Struk</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-[#0F294A] hover:bg-[#163A66] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Tutup & Belanja Lagi
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
