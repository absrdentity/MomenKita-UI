import React, { useState } from 'react';
import { Check, Plus, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { PRICING_PACKAGES, ADDONS_DATA } from '../data/mockData';

interface PricingSectionProps {
  onSelectPackage: (packageId: string, addOns: string[]) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-gold');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon-qr-checkin']);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const selectedPkg = PRICING_PACKAGES.find((p) => p.id === selectedPkgId) || PRICING_PACKAGES[1];
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const item = ADDONS_DATA.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const grandTotal = selectedPkg.price + addonsTotal;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="paket-harga" className="py-16 md:py-24 bg-[#F5F2EB] border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
            Transparan & Fleksibel
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-bold tracking-tight">
            Paket Harga & Penambahan Fitur Sesuai Kebutuhan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Mulai dari paket esensial hingga paket VIP all-in-one. Anda bebas menambahkan fitur tambahan (add-on) satu per satu secara instan tanpa biaya tersembunyi.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          {PRICING_PACKAGES.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-stone-900 text-white shadow-xl scale-[1.02] border-2 border-amber-500/80 z-10'
                    : 'bg-white text-stone-900 border border-stone-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 font-semibold text-xs px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Paling Banyak Dipilih</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-display text-2xl font-bold">{pkg.name}</h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                        pkg.popular ? 'bg-stone-800 text-amber-400' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {pkg.activePeriod}
                    </span>
                  </div>

                  <p className={`text-xs mt-2 ${pkg.popular ? 'text-stone-300' : 'text-stone-500'}`}>
                    {pkg.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6 mb-6 pb-6 border-b border-stone-200/30">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-serif-display font-bold tabular-nums">
                        {formatRupiah(pkg.price)}
                      </span>
                      <span
                        className={`text-xs line-through tabular-nums ${
                          pkg.popular ? 'text-stone-500' : 'text-stone-400'
                        }`}
                      >
                        {formatRupiah(pkg.originalPrice)}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-500 font-medium mt-1 block">
                      Diskon Promo Terbatas • Sekali Bayar
                    </span>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 text-xs">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.popular ? 'text-amber-400' : 'text-amber-700'
                          }`}
                        />
                        <span className={pkg.popular ? 'text-stone-200' : 'text-stone-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => {
                      setSelectedPkgId(pkg.id);
                      onSelectPackage(pkg.id, selectedAddonIds);
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                        : 'bg-stone-900 hover:bg-stone-800 text-white'
                    }`}
                  >
                    <span>Pilih {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons & Interactive Calculator Section */}
        <div id="kalkulator-pesan" className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/90 shadow-sm">
          <div className="border-b border-stone-100 pb-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-800">
                  Kustomisasi Fleksibel
                </p>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  Katalog Penambahan Fitur (Add-on)
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Centang fitur ekstra yang Anda inginkan di bawah ini untuk melihat kalkulasi harga otomatis seketika.
                </p>
              </div>

              {/* Package selector switcher inside calculator */}
              <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-xl">
                {PRICING_PACKAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPkgId(p.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      selectedPkgId === p.id
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {p.name.replace(' (Paling Favorit)', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Addons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {ADDONS_DATA.map((addon) => {
              const isChecked = selectedAddonIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isChecked
                      ? 'border-stone-900 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200/80 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm text-stone-900">{addon.name}</h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-stone-900 text-white'
                          : 'border border-stone-300 bg-white'
                      }`}
                    >
                      {isChecked ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3 h-3 text-stone-400" />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-serif-display text-base font-bold text-amber-900 tabular-nums">
                      +{formatRupiah(addon.price)}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {isChecked ? 'Sudah Ditambahkan' : 'Klik Tambahkan'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time Order Summary Bar */}
          <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-xl border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-600">
                <span>Paket Terpilih: <strong>{selectedPkg.name}</strong></span>
                <span>•</span>
                <span>{selectedAddonIds.length} Fitur Ekstra</span>
              </div>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-xs text-stone-500">Estimasi Total Investasi:</span>
                <span className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  {formatRupiah(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectPackage(selectedPkgId, selectedAddonIds)}
              className="w-full md:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
            >
              <span>Lanjut ke Pembayaran Otomatis</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
