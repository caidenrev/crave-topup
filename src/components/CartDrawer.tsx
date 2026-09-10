import React from 'react';
import { X, ShoppingCart, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { OrderItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: OrderItem[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onCheckoutAll: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  onClose,
  onRemoveItem,
  onCheckoutAll
}) => {
  if (!isOpen) return null;

  const totalCart = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        {/* Navy Header */}
        <div className="bg-[#0F294A] text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-sky-400" />
            <h2 className="font-extrabold text-sm sm:text-base">
              Keranjang Belanja ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingCart className="w-12 h-12 stroke-1 mb-2 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">Keranjang Anda Kosong</p>
              <p className="text-xs text-slate-400 mt-1">
                Pilih game atau item top up favorit Anda untuk ditambahkan ke sini.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.invoiceId}-${idx}`}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
              >
                <img
                  src={item.game.coverImage}
                  alt={item.game.title}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-extrabold text-slate-900 truncate">
                    {item.game.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] truncate">
                    {item.nominal.title} ({item.quantity}x)
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    ID: {item.userId}
                  </p>
                  <span className="font-extrabold text-sky-800 text-xs mt-1 block">
                    {formatRupiah(item.total)}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                  title="Hapus Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Pembayaran:</span>
              <span className="font-black text-lg text-[#0F294A]">
                {formatRupiah(totalCart)}
              </span>
            </div>

            <button
              onClick={onCheckoutAll}
              className="w-full bg-[#0F294A] hover:bg-[#163A66] text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Lanjut Bayar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Checkout Aman & Terenkripsi</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
