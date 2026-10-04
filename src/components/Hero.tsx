import React from 'react';
import { ArrowRight, Eye, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onExploreTemplates: () => void;
  onOpenOrder: () => void;
  onLivePreviewSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreTemplates,
  onOpenOrder,
  onLivePreviewSample,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold flex items-center gap-2">
              <span>Studio Undangan Digital Eksklusif</span>
              <span aria-hidden="true">·</span>
              <span>Sistem Pembayaran Instan Terverifikasi</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-semibold tracking-tight leading-[1.12] [text-wrap:balance]">
              Bagikan Momen Bahagia dengan Undangan Digital yang Memikat
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Platform pembuatan undangan online interaktif untuk pernikahan, khitanan, dan tasyakuran. Dilengkapi amplop digital langsung ke rekening Anda, hitung mundur, audio romantis, konfirmasi RSVP WhatsApp, serta pembayaran otomatis tanpa perlu konfirmasi manual.
            </p>

            {/* Micro value proofs - Zero pill, unboxed */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>QRIS & VA Otomatis Aktif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Siap Sebar dalam 15 Menit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Edit Data Bebas Kapan Saja</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={onOpenOrder}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white bg-stone-900 hover:bg-stone-800 transition-all rounded-lg shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>Mulai Buat Undangan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreTemplates}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 transition-colors rounded-lg cursor-pointer whitespace-nowrap"
              >
                <span>Lihat Katalog Template</span>
              </button>

              <button
                onClick={onLivePreviewSample}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold text-amber-800 hover:text-amber-900 underline underline-offset-4 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Coba Demo Interaktif</span>
              </button>
            </div>

            {/* Quantified proof metrics */}
            <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div>
                <p className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  3.400+
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Pasangan Memilih Kami</p>
              </div>
              <div>
                <p className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  99.8%
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Tingkat Kepuasan Tamu</p>
              </div>
              <div>
                <p className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  &lt; 3 Detik
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Verifikasi Pembayaran</p>
              </div>
            </div>
          </div>

          {/* Right Visual Marquee Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-900 group">
                <img
                  src={HERO_IMAGE}
                  alt="Showcase Undangan Digital MomenKita"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Overlaid preview trigger badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-300">Konsep Elegan & Interaktif</p>
                    <p className="font-serif-display text-lg font-semibold">Budi & Ayu • Wedding</p>
                  </div>
                  <button
                    onClick={onLivePreviewSample}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold rounded-md backdrop-blur-sm transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>Buka Demo</span>
                  </button>
                </div>
              </div>

              {/* Floating accent card (single level elevation) */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-lg items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-stone-900">Pembayaran QRIS Otomatis</p>
                  <p className="text-stone-500">Terhubung m-Banking & E-Wallet dengan konfirmasi instan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
