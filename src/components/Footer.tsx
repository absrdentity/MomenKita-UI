import React from 'react';
import { Heart, QrCode } from 'lucide-react';

interface FooterProps {
  onOpenOrder: () => void;
  onOpenMerchantSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrder, onOpenMerchantSettings }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif-display text-2xl font-bold text-white tracking-tight">
              MomenKita
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Platform pembuatan undangan digital elegan untuk pernikahan, khitanan, dan tasyakuran dengan sistem pembayaran otomatis instan, amplop digital terintegrasi, dan kemudahan RSVP para tamu.
            </p>
            <p className="text-[11px] text-stone-500">
              Operasional Layanan: Senin – Minggu, 08.00 – 22.00 WIB
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Navigasi Layanan
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => scrollTo('katalog-template')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Koleksi Template Desain
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('paket-harga')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daftar Paket & Add-on
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('kalkulator-pesan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kalkulator Estimasi Harga
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('generator-tamu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Generator Link Tamu Undangan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bantuan & Tanya Jawab (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Actions & payments */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Siap Bagikan Momen Bahagia?
            </h4>
            <p className="text-xs text-stone-400">
              Pilih tema sekarang, selesaikan data mempelai, dan undang tamu Anda hari ini juga.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenOrder}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Pesan Undangan Sekarang
              </button>
              <button
                onClick={onOpenMerchantSettings}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Pengaturan QRIS Toko</span>
              </button>
            </div>
            <div className="pt-2 text-[11px] text-stone-500">
              Dukungan Pembayaran Otomatis: QRIS, BCA, Mandiri, BRI, BNI, GoPay, ShopeePay.
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} MomenKita Studio. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Dibuat dengan penuh kehangatan untuk setiap momen suci</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
