import React, { useState } from 'react';
import { Eye, Check, Sparkles } from 'lucide-react';
import { Template } from '../types';
import { TEMPLATES_DATA } from '../data/mockData';

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
  onPreviewTemplate: (template: Template) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
  onPreviewTemplate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Desain' },
    { id: 'romantic', label: 'Romantic Floral' },
    { id: 'luxury', label: 'Luxury Gold' },
    { id: 'botanical', label: 'Botanical Rustic' },
    { id: 'minimalist', label: 'Modern Minimalist' },
    { id: 'islamic', label: 'Tradisional & Adat' },
    { id: 'aqiqah', label: 'Aqiqah & Syukuran' },
  ];

  const filteredTemplates =
    activeCategory === 'all'
      ? TEMPLATES_DATA
      : TEMPLATES_DATA.filter((t) => t.category === activeCategory);

  return (
    <section id="katalog-template" className="py-16 md:py-24 bg-[#FAF9F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
            Katalog Desain Eksklusif
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-bold tracking-tight">
            Pilih Template Impian Sesuai Karakter Acara Anda
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Setiap desain dirancang responsif, elegan di smartphone, dan dapat disesuaikan sepenuhnya mulai dari nama pengantin, tata letak acara, foto, hingga musik latar.
          </p>
        </div>

        {/* Filter Segmented Control (Interactive functional buttons) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-1.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview with Hover Overlay */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                <img
                  src={template.previewImg}
                  alt={template.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Unboxed Metadata in Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-medium">
                    <span>{template.categoryLabel}</span>
                  </div>
                  {template.popular && (
                    <div className="flex items-center gap-1 bg-amber-500 text-stone-950 px-2.5 py-1 rounded text-[11px] font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>Terfavorit</span>
                    </div>
                  )}
                </div>

                {/* Bottom Overlay Info & Quick Demo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-stone-300 font-medium">Audio Bawaan</p>
                    <p className="text-xs text-white font-medium truncate max-w-[180px]">
                      {template.audioTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => onPreviewTemplate(template)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-stone-900 hover:bg-stone-100 rounded-md text-xs font-semibold shadow transition-transform active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>Demo Live</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-display text-xl font-bold text-stone-900">
                      {template.title}
                    </h3>
                    {/* Color palette preview dots */}
                    <div className="flex items-center gap-1" title="Palet Warna">
                      {template.colorPalette.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-stone-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Key feature checklist */}
                <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-600">
                  {template.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onPreviewTemplate(template)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Lihat Demo
                  </button>
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors text-center shadow-xs cursor-pointer"
                  >
                    Pilih Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
