import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
            Pusat Informasi
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Semua yang perlu Anda ketahui tentang sistem pembayaran otomatis, revisi data, dan fitur amplop digital.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                >
                  <span className="font-medium text-stone-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
          <p className="text-sm font-semibold text-stone-900">
            Masih ada pertanyaan seputar acara khusus atau custom request?
          </p>
          <p className="text-xs text-stone-500">
            Konsultasikan secara gratis bersama wedding specialist kami via WhatsApp.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6281234567890?text=Halo%20MomenKita,%20saya%20ingin%20konsultasi%20undangan%20digital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Chat Tim Support WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
