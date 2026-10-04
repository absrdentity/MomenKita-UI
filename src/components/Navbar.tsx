import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: (templateId?: string, packageId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 transition-colors hover:text-amber-800"
          >
            MomenKita
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => scrollToSection('katalog-template')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Koleksi Template
            </button>
            <button
              onClick={() => scrollToSection('paket-harga')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Paket & Add-on
            </button>
            <button
              onClick={() => scrollToSection('kalkulator-pesan')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Kalkulator Harga
            </button>
            <button
              onClick={() => scrollToSection('generator-tamu')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Generator Tamu
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Bantuan & FAQ
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenOrder()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all shadow-sm hover:shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Buat Undangan</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950"
              aria-label="Buka navigasi menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF9F5] px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('katalog-template')}
            className="block w-full text-left py-2 text-base font-medium text-stone-700 hover:text-stone-900"
          >
            Koleksi Template
          </button>
          <button
            onClick={() => scrollToSection('paket-harga')}
            className="block w-full text-left py-2 text-base font-medium text-stone-700 hover:text-stone-900"
          >
            Paket & Add-on
          </button>
          <button
            onClick={() => scrollToSection('kalkulator-pesan')}
            className="block w-full text-left py-2 text-base font-medium text-stone-700 hover:text-stone-900"
          >
            Kalkulator Harga
          </button>
          <button
            onClick={() => scrollToSection('generator-tamu')}
            className="block w-full text-left py-2 text-base font-medium text-stone-700 hover:text-stone-900"
          >
            Generator Link Tamu
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-base font-medium text-stone-700 hover:text-stone-900"
          >
            Bantuan & FAQ
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800"
            >
              Buat Undangan Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
