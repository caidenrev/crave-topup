import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Gamepad2, 
  ShieldCheck, 
  Headphones, 
  Mail, 
  Phone,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const FAQS = [
    {
      title: 'Marketplace Game Terbesar dan Terlengkap di Indonesia',
      content: 'Pojan Topup menyediakan layanan top up game, voucher digital, steam key, serta item game terlengkap dengan jaminan 100% legal, aman, dan bergaransi resmi. Kami bekerja sama dengan payment gateway terpercaya untuk memproses pesanan Anda secara otomatis 24 jam nonstop dalam 1-3 detik.'
    },
    {
      title: 'Apa itu Pojan Topup?',
      content: 'Pojan Topup adalah platform e-commerce gaming modern yang dirancang untuk memudahkan para gamer melakukan pembelian diamond game, pass mingguan/bulanan, koin, serta gift card dengan harga paling miring dan metode pembayaran terlengkap seperti QRIS, BCA, Mandiri, BRI, DANA, ShopeePay, hingga gerai Indomaret & Alfamart.'
    },
    {
      title: 'Bagaimana Cara Melakukan Top-Up di Pojan Topup?',
      content: 'Cukup pilih game yang ingin Anda top up, masukkan User ID dan Zone ID akun game Anda, pilih nominal item atau pass yang diinginkan, pilih metode pembayaran favorit Anda, masukkan nomor WhatsApp untuk penerimaan invoice, dan selesaikan pembayaran. Item akan langsung terkirim otomatis detik itu juga!'
    },
    {
      title: 'Voucher Digital untuk Berbagai Kebutuhan Hiburan',
      content: 'Selain game mobile dan PC, kami juga menyediakan Steam Wallet IDR resmi, Google Play Gift Card, PlayStation Network, Nintendo eShop, hingga voucher game key AAA original untuk kebutuhan gaming Anda tanpa ribet.'
    }
  ];

  return (
    <footer className="w-full bg-[#081729] text-slate-400 text-xs border-t border-slate-800 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
        
        {/* Accordions Section as seen in screenshot */}
        <div className="space-y-2 border-b border-slate-800/80 pb-8">
          {FAQS.map((faq, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div 
                key={idx} 
                className="bg-[#0B1E36] rounded-xl border border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm">{faq.title}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-slate-400 text-xs leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Directory SEO Tags */}
        <div className="space-y-4 border-b border-slate-800/80 pb-8 text-[11px] text-slate-400">
          <div>
            <span className="font-bold text-slate-200 block mb-1">Top Up Game Populer:</span>
            <p className="leading-relaxed">
              Top Up ML, Top Up FF, Top Up Genshin Impact, Top Up Roblox Robux Murah, Top Up PUBG Mobile UC, Steam Wallet IDR, Honkai Star Rail, Blood Strike, Honor of Kings, Free Fire MAX, Valorant Points.
            </p>
          </div>
          <div>
            <span className="font-bold text-slate-200 block mb-1">Produk Populer Lainnya:</span>
            <p className="leading-relaxed">
              Robux 5 Hari Sesudah Pajak, Fisch Rare Enchant, Blox Fruits Perm Fruit, Murder Mystery 2 Icewing, Grow A Garden Mutation, Steam Random Mystery Key, ExitLag 30 Hari.
            </p>
          </div>
        </div>

        {/* 4 Columns Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-white">
                pojan<span className="text-sky-400">topup</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform top up game tercepat, termurah, dan terpercaya di Indonesia dengan transaksi otomatis 24 jam.
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs">Sertifikasi Keamanan SSL 256-Bit</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-extrabold text-white text-xs sm:text-sm mb-3 uppercase tracking-wider">
              Bantuan & Layanan
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#pojan-header" className="hover:text-sky-400 transition-colors">Pusat Bantuan</a></li>
              <li><a href="#pojan-header" className="hover:text-sky-400 transition-colors">Cek Status Pesanan</a></li>
              <li><a href="#pojan-header" className="hover:text-sky-400 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#pojan-header" className="hover:text-sky-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#pojan-header" className="hover:text-sky-400 transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-extrabold text-white text-xs sm:text-sm mb-3 uppercase tracking-wider">
              Metode Pembayaran
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['QRIS', 'BCA VA', 'Mandiri', 'BRI', 'BNI', 'DANA', 'ShopeePay', 'GoPay', 'OVO', 'Indomaret', 'Alfamart'].map((p) => (
                <span 
                  key={p} 
                  className="px-2 py-1 bg-[#0F294A] text-slate-200 rounded text-[11px] font-semibold border border-slate-700"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Proses instan tanpa verifikasi manual.
            </p>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-extrabold text-white text-xs sm:text-sm mb-3 uppercase tracking-wider">
              Kontak & Pengaduan
            </h3>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>support@pojantopup.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: 0853-1111-1010</span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Layanan Pengaduan Konsumen Direktorat Jenderal PKTN Kemendag RI
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 Pojan Topup. Hak cipta dilindungi undang-undang. Seluruh aset gambar dan nama game adalah milik penerbit masing-masing.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-red-500 fill-current" /> untuk gamer Indonesia
          </p>
        </div>

      </div>
    </footer>
  );
};
