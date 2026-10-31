import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Wallet,
  Clock,
  Copy,
  Share2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { TEMPLATES_DATA, PRICING_PACKAGES, ADDONS_DATA } from '../data/mockData';

const BCA_ACCOUNT_NUMBER = '7315170460';
const BCA_ACCOUNT_HOLDER = 'Agisyah Rifaji Putra Pratama';

interface OrderWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplateId?: string;
  initialPackageId?: string;
  initialAddOns?: string[];
  onOpenGuestGenerator?: (brideName: string, groomName: string) => void;
}

export const OrderWizardModal: React.FC<OrderWizardModalProps> = ({
  isOpen,
  onClose,
  initialTemplateId,
  initialPackageId,
  initialAddOns,
  onOpenGuestGenerator,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialTemplateId || TEMPLATES_DATA[0].id
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || PRICING_PACKAGES[1].id
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    initialAddOns || ['addon-qr-checkin']
  );
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');

  // Event details
  const [eventType, setEventType] = useState<'pernikahan' | 'tunangan' | 'khitanan' | 'aqiqah'>(
    'pernikahan'
  );
  const [groomName, setGroomName] = useState<string>('Budi Prasetyo, S.Kom');
  const [groomNickname, setGroomNickname] = useState<string>('Budi');
  const [groomParents, setGroomParents] = useState<string>('Putra Bapak Ir. Bambang Supeno & Ibu Siti Aminah');

  const [brideName, setBrideName] = useState<string>('Ayu Lestari, S.Ds');
  const [brideNickname, setBrideNickname] = useState<string>('Ayu');
  const [brideParents, setBrideParents] = useState<string>('Putri Bapak Dr. H. Slamet Riyadi & Ibu Hj. Ratna Dewi');

  const [eventDate, setEventDate] = useState<string>('2026-10-24');
  const [akadTime, setAkadTime] = useState<string>('08:00 - 10:00 WIB');
  const [akadVenue, setAkadVenue] = useState<string>('Masjid Agung Sunda Kelapa');
  const [akadAddress, setAkadAddress] = useState<string>('Jl. Taman Sunda Kelapa No.16, Menteng, Jakarta Pusat');

  const [resepsiTime, setResepsiTime] = useState<string>('11:30 - 14:30 WIB');
  const [resepsiVenue, setResepsiVenue] = useState<string>('Grand Ballroom Hotel Mulia Senayan');
  const [resepsiAddress, setResepsiAddress] = useState<string>('Jl. Asia Afrika Senayan, Jakarta Pusat');
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>('https://maps.app.goo.gl/samplewedding');

  const [bankName, setBankName] = useState<string>('BCA');
  const [accountNumber, setAccountNumber] = useState<string>('8820918234');
  const [accountHolder, setAccountHolder] = useState<string>('Budi Prasetyo');

  // Customer Contact
  const [customerName, setCustomerName] = useState<string>('Budi Prasetyo');
  const [customerWhatsApp, setCustomerWhatsApp] = useState<string>('081234567890');
  const [customerEmail, setCustomerEmail] = useState<string>('budi.ayu@gmail.com');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'bca_transfer' | 'gopay'>('bca_transfer');
  const [uniqueCode] = useState<number>(() => Math.floor(100 + Math.random() * 899));
  const [paymentSecondsLeft, setPaymentSecondsLeft] = useState<number>(900); // 15 mins
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sync props when opening
  useEffect(() => {
    if (initialTemplateId) setSelectedTemplateId(initialTemplateId);
    if (initialPackageId) setSelectedPackageId(initialPackageId);
    if (initialAddOns) setSelectedAddons(initialAddOns);
  }, [initialTemplateId, initialPackageId, initialAddOns]);

  // Payment Countdown
  useEffect(() => {
    if (step === 4 && !isPaid && paymentSecondsLeft > 0) {
      const timer = setInterval(() => {
        setPaymentSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, isPaid, paymentSecondsLeft]);

  if (!isOpen) return null;

  const currentTemplate = TEMPLATES_DATA.find((t) => t.id === selectedTemplateId) || TEMPLATES_DATA[0];
  const currentPackage = PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || PRICING_PACKAGES[1];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = ADDONS_DATA.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const subtotal = currentPackage.price + addonsTotal;
  const grandTotal = Math.max(0, subtotal - couponDiscount) + uniqueCode;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'MOMENBAHAGIA' || code === 'DISKON15') {
      const disc = Math.round(subtotal * 0.15);
      setCouponDiscount(disc);
      setCouponApplied(true);
    } else if (code === 'HEMAT25') {
      setCouponDiscount(25000);
      setCouponApplied(true);
    } else {
      setCouponError('Kode voucher tidak valid atau sudah kadaluarsa.');
      setCouponDiscount(0);
      setCouponApplied(false);
    }
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsPaid(true);
    }, 2200);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const minutes = Math.floor(paymentSecondsLeft / 60);
  const seconds = paymentSecondsLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const generatedSlug = `${groomNickname.toLowerCase().replace(/[^a-z0-9]/g, '')}-${brideNickname.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const invitationUrl = `https://momenkita.id/${generatedSlug}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
          <div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
              Pemesanan & Pembayaran
            </h2>
            <p className="text-xs text-stone-500">
              Pilih desain, lengkapi data, lalu transfer sesuai nominal tagihan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md transition-colors"
            aria-label="Tutup pemesanan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 text-xs text-stone-600 flex items-center justify-between overflow-x-auto gap-2">
          <div
            onClick={() => !isPaid && setStep(1)}
            className={`flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              step === 1 ? 'font-bold text-stone-900' : 'text-stone-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Desain</span>
          </div>
          <span className="text-stone-300">/</span>
          <div
            onClick={() => !isPaid && setStep(2)}
            className={`flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              step === 2 ? 'font-bold text-stone-900' : 'text-stone-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Paket & Fitur</span>
          </div>
          <span className="text-stone-300">/</span>
          <div
            onClick={() => !isPaid && setStep(3)}
            className={`flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              step === 3 ? 'font-bold text-stone-900' : 'text-stone-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Data Acara</span>
          </div>
          <span className="text-stone-300">/</span>
          <div
            className={`flex items-center gap-1.5 whitespace-nowrap ${
              step === 4 ? 'font-bold text-emerald-800' : 'text-stone-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
              4
            </span>
            <span>Pembayaran</span>
          </div>
        </div>

        {/* Step Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: PILIH TEMPLATE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Langkah 1: Pilih Template & Jenis Momen
                </h3>
                <p className="text-xs text-stone-500">
                  Tentukan tema visual undangan digital Anda. Desain ini dapat dipratinjau langsung di smartphone.
                </p>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">Jenis Acara</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'pernikahan', label: 'Pernikahan / Wedding' },
                    { id: 'tunangan', label: 'Lamaran / Engagement' },
                    { id: 'khitanan', label: 'Khitanan Anak' },
                    { id: 'aqiqah', label: 'Aqiqah & Syukuran' },
                  ].map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setEventType(evt.id as any)}
                      className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                        eventType === evt.id
                          ? 'border-stone-900 bg-stone-900 text-white font-medium'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {evt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Selection Grid */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Pilih Template Desain ({TEMPLATES_DATA.length} Tersedia)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TEMPLATES_DATA.map((tpl) => {
                    const isSelected = selectedTemplateId === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplateId(tpl.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-stone-900 bg-amber-50/20 ring-1 ring-stone-900'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-stone-100 relative">
                          <img
                            src={tpl.previewImg}
                            alt={tpl.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900 truncate">{tpl.title}</p>
                          <p className="text-[11px] text-stone-500">{tpl.categoryLabel}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PILIH PAKET & ADD-ONS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Langkah 2: Pilih Paket & Penambahan Fitur (Add-on)
                </h3>
                <p className="text-xs text-stone-500">
                  Pilih paket dasar kemudian sesuaikan dengan fitur tambahan yang Anda perlukan.
                </p>
              </div>

              {/* Package Radio Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRICING_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif-display text-base font-bold text-stone-900">
                            {pkg.name.replace(' (Paling Favorit)', '')}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-stone-900" />}
                        </div>
                        <p className="text-base font-bold text-stone-900 tabular-nums">
                          {formatRupiah(pkg.price)}
                        </p>
                        <p className="text-[11px] text-stone-500 mt-2 line-clamp-2">{pkg.subtitle}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-stone-600">
                        {pkg.activePeriod}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Pilih Add-on Fitur Tambahan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDONS_DATA.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => {
                          setSelectedAddons((prev) =>
                            prev.includes(addon.id)
                              ? prev.filter((id) => id !== addon.id)
                              : [...prev, addon.id]
                          );
                        }}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs ${
                          isChecked
                            ? 'border-stone-900 bg-stone-50'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="pr-2">
                          <p className="font-medium text-stone-900">{addon.name}</p>
                          <p className="text-[10px] text-stone-500">{addon.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-stone-900 block tabular-nums">
                            +{formatRupiah(addon.price)}
                          </span>
                          <span className={`text-[10px] ${isChecked ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                            {isChecked ? 'Terpasang' : '+ Tambah'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Coupon Form */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Punya voucher? (Coba: MOMENBAHAGIA)"
                    className="flex-1 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs uppercase font-medium focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Gunakan
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Kupon berhasil dipasang! Hemat {formatRupiah(couponDiscount)}.
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {couponError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: ISI DATA PENGANTIN & ACARA */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Langkah 3: Lengkapi Data Acara & Mempelai
                </h3>
                <p className="text-xs text-stone-500">
                  Data ini dapat diubah sewaktu-waktu melalui dashboard kapan saja sebelum hari H.
                </p>
              </div>

              {/* Mempelai Pria */}
              <div className="border border-stone-200 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Data Mempelai Pria
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Panggilan</label>
                    <input
                      type="text"
                      value={groomNickname}
                      onChange={(e) => setGroomNickname(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>
                <div className="text-xs">
                  <label className="block text-stone-700 font-medium mb-1">Keterangan Orang Tua</label>
                  <input
                    type="text"
                    value={groomParents}
                    onChange={(e) => setGroomParents(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    placeholder="Contoh: Putra pertama Bapak Bambang & Ibu Siti"
                  />
                </div>
              </div>

              {/* Mempelai Wanita */}
              <div className="border border-stone-200 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Data Mempelai Wanita
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Panggilan</label>
                    <input
                      type="text"
                      value={brideNickname}
                      onChange={(e) => setBrideNickname(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>
                <div className="text-xs">
                  <label className="block text-stone-700 font-medium mb-1">Keterangan Orang Tua</label>
                  <input
                    type="text"
                    value={brideParents}
                    onChange={(e) => setBrideParents(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    placeholder="Contoh: Putri kedua Bapak Slamet & Ibu Ratna"
                  />
                </div>
              </div>

              {/* Waktu & Lokasi Acara */}
              <div className="border border-stone-200 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Waktu & Tempat Acara
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Tanggal Acara</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Link Google Maps</label>
                    <input
                      type="text"
                      value={googleMapsUrl}
                      onChange={(e) => setGoogleMapsUrl(e.target.value)}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Gedung / Tempat Akad</label>
                    <input
                      type="text"
                      value={akadVenue}
                      onChange={(e) => setAkadVenue(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Jam Akad</label>
                    <input
                      type="text"
                      value={akadTime}
                      onChange={(e) => setAkadTime(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Rekening Amplop Digital */}
              <div className="border border-stone-200 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Amplop Digital (Untuk Ditampilkan ke Tamu)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Bank / E-Wallet</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="BCA / Mandiri / GoPay"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nomor Rekening</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Atas Nama</label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Data Kontak Pemesan */}
              <div className="border border-stone-200 p-4 rounded-xl space-y-3 bg-stone-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Kontak Anda (Untuk Pengiriman Dashboard & Notifikasi)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Kontak</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">No WhatsApp Aktif</label>
                    <input
                      type="tel"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PEMBAYARAN */}
          {step === 4 && (
            <div className="space-y-6">
              {!isPaid ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900">
                        Pembayaran
                      </h3>
                      <p className="text-xs text-stone-500">
                        Transfer sesuai nominal tepat, lalu klik tombol konfirmasi di bawah.
                      </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-900 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Selesaikan dalam {formattedTimer}</span>
                    </div>
                  </div>

                  {/* Payment Methods Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-2">
                      Pilih Metode Pembayaran
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bca_transfer')}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentMethod === 'bca_transfer'
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mx-auto mb-1" />
                        <span>Transfer Bank BCA</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('gopay')}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentMethod === 'gopay'
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <Wallet className="w-4 h-4 mx-auto mb-1" />
                        <span>GoPay / ShopeePay</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200 space-y-5">
                    {/* Amount Banner */}
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                      <div>
                        <span className="text-xs text-stone-500">Total Tagihan:</span>
                        <div className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                          {formatRupiah(grandTotal)}
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-stone-500">
                        <span>Kode Unik Verifikasi: </span>
                        <span className="font-mono font-bold text-amber-800">+{uniqueCode}</span>
                        <p className="text-[10px] text-stone-400">Digunakan untuk mencocokkan transfer Anda</p>
                      </div>
                    </div>

                    {/* Method Specific Display */}
                    {paymentMethod === 'bca_transfer' && (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-stone-300 flex items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] text-stone-500 block">
                              Transfer ke Rekening BCA:
                            </span>
                            <span className="text-lg font-mono font-bold text-stone-900">
                              {BCA_ACCOUNT_NUMBER}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              Atas Nama: {BCA_ACCOUNT_HOLDER}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(BCA_ACCOUNT_NUMBER, 'rekening')}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            {copiedText === 'rekening' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedText === 'rekening' ? 'Tersalin' : 'Salin No. Rekening'}</span>
                          </button>
                        </div>

                        <div className="text-xs text-stone-600 space-y-1">
                          <p className="font-semibold text-stone-900">Petunjuk Transfer:</p>
                          <p className="text-[11px]">
                            Transfer sesuai nominal tepat <strong>{formatRupiah(grandTotal)}</strong> (termasuk kode unik {uniqueCode}) via m-Banking, ATM, atau internet banking ke rekening di atas.
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'gopay' && (
                      <div className="bg-white p-4 rounded-xl border border-stone-300 text-center space-y-2 text-xs">
                        <p className="font-semibold text-stone-900">
                          Pembayaran E-Wallet Instant Link
                        </p>
                        <p className="text-[11px] text-stone-500">
                          Sistem akan membuka aplikasi GoPay / ShopeePay Anda secara otomatis untuk menyelesaikan pembayaran.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirmation trigger button */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleSimulatePayment}
                      disabled={isVerifying}
                      className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Mengecek Transaksi Pembayaran...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>Saya Sudah Transfer (Simulasi Verifikasi)</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-stone-500">
                      *Pada sistem live, pembayaran transfer BCA diverifikasi berdasarkan nominal unik (cek mutasi rekening).
                    </p>
                  </div>
                </>
              ) : (
                /* ORDER SUCCESS & INVOICE SCREEN */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                      Pembayaran Berhasil & Terverifikasi
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                      Selamat! Undangan Digital Anda Siap
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Pembayaran sebesar <strong>{formatRupiah(grandTotal)}</strong> telah diterima. Draf undangan Anda telah aktif!
                    </p>
                  </div>

                  {/* Digital Receipt Card */}
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200 text-left space-y-3 max-w-lg mx-auto text-xs">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="font-bold text-stone-900 font-mono">Invoice #MK-202610-8492</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[10px]">
                        LUNAS
                      </span>
                    </div>

                    <div className="space-y-1.5 text-stone-600 text-[11px]">
                      <div className="flex justify-between">
                        <span>Penerima:</span>
                        <strong className="text-stone-900">{customerName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Template:</span>
                        <span className="text-stone-900">{currentTemplate.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paket Terpilih:</span>
                        <span className="text-stone-900">{currentPackage.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Add-on Tambahan:</span>
                        <span className="text-stone-900">{selectedAddons.length} Fitur</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-1.5 font-bold text-stone-900 text-xs">
                        <span>Total Bayar:</span>
                        <span className="tabular-nums font-mono">{formatRupiah(grandTotal)}</span>
                      </div>
                    </div>

                    {/* Invitation Link Box */}
                    <div className="mt-4 p-3 bg-white rounded-xl border border-amber-200/90 flex items-center justify-between">
                      <div className="truncate mr-2">
                        <span className="text-[10px] text-stone-500 block">Link Undangan Anda:</span>
                        <a
                          href={invitationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs text-amber-900 font-semibold hover:underline"
                        >
                          {invitationUrl}
                        </a>
                      </div>
                      <button
                        onClick={() => handleCopy(invitationUrl, 'url')}
                        className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg shrink-0 transition-colors text-xs flex items-center gap-1"
                      >
                        {copiedText === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === 'url' ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions after success */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenGuestGenerator) {
                          onOpenGuestGenerator(brideNickname, groomNickname);
                        }
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-amber-300" />
                      <span>Buat Link Nama Tamu di WhatsApp</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full sm:w-auto px-5 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-medium transition-colors"
                    >
                      Selesai & Tutup
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wizard Bottom Navigation Bar */}
        {!isPaid && (
          <div className="px-6 py-4 border-t border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-stone-500 block">Total Investasi:</span>
                <span className="font-serif-display text-base font-bold text-stone-900 tabular-nums">
                  {formatRupiah(grandTotal)}
                </span>
              </div>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as any)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Langkah Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
