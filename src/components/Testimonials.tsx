import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F2EB] border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
            Kisah Nyata Pasangan Bahagia
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Dipercaya Ribuan Pasangan di Seluruh Indonesia
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Pengalaman nyata pengantin yang merasakan kemudahan proses pemesanan, sistem pembayaran otomatis, dan respons hangat dari para tamu undangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-amber-700/40" />
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="border-t border-stone-100 pt-4">
                <p className="font-serif-display text-base font-bold text-stone-900">
                  {item.couple}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                  <span>{item.city}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.eventDate}</span>
                </div>
                <div className="text-[11px] text-amber-800 font-medium mt-2">
                  Template: {item.templateName} ({item.package})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
