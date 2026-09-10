import React, { useState } from 'react';
import { X, Search, ReceiptText, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { OrderItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface OrderTrackerModalProps {
  orders: OrderItem[];
  onClose: () => void;
  onSelectOrder: (order: OrderItem) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  orders,
  onClose,
  onSelectOrder
}) => {
  const [searchKey, setSearchKey] = useState('');

  const filteredOrders = searchKey.trim()
    ? orders.filter(
        o => 
          o.invoiceId.toLowerCase().includes(searchKey.toLowerCase()) ||
          o.userWhatsapp.includes(searchKey) ||
          o.userId.toLowerCase().includes(searchKey.toLowerCase())
      )
    : orders;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto relative">
        {/* Navy Header */}
        <div className="bg-[#0F294A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <ReceiptText className="w-7 h-7 text-sky-400 flex-shrink-0" />
            <div>
              <h2 className="text-base font-extrabold text-white">
                Lacak Status Pesanan
              </h2>
              <p className="text-xs text-slate-300">
                Pantau pesanan top up Anda secara real-time
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berdasarkan Nomor Invoice, WhatsApp, atau User ID..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* List of Orders */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Riwayat Transaksi Terakhir ({filteredOrders.length})
            </h3>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6">
                <ReceiptText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-700 text-sm">Belum Ada Transaksi Ditemukan</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Silakan lakukan pembelian top up game terlebih dahulu untuk melihat bukti invoice.
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.invoiceId}
                  onClick={() => {
                    onSelectOrder(order);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-white hover:bg-sky-50/40 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={order.game.coverImage} 
                      alt={order.game.title} 
                      className="w-11 h-11 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900">
                          {order.invoiceId}
                        </span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                          order.status === 'success' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status === 'success' ? 'SUKSES' : 'PENDING'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {order.game.title} • {order.nominal.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <div>
                      <span className="font-extrabold text-xs text-[#0F294A] block">
                        {formatRupiah(order.total)}
                      </span>
                      <span className="text-[10px] text-sky-700 font-semibold">
                        Lihat Struk
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
