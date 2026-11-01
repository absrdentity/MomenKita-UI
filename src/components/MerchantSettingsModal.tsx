import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, Check, QrCode, Building2, ShieldCheck } from 'lucide-react';
import { MerchantPaymentSettings } from '../types';

interface MerchantSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: MerchantPaymentSettings;
  onSave: (newSettings: MerchantPaymentSettings) => void;
}

export const MerchantSettingsModal: React.FC<MerchantSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<MerchantPaymentSettings>(settings);
  const [savedNotice, setSavedNotice] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, qrisImageUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, qrisImageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900">
                Pengaturan QRIS & Rekening Toko
              </h2>
              <p className="text-[11px] text-stone-500">
                Atur QR Code pembayaran jasa undangan Anda agar muncul saat pelanggan checkout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md transition-colors cursor-pointer"
            aria-label="Tutup pengaturan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Upload QRIS Image Section */}
          <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-900 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-amber-800" />
                <span>Gambar QR Code / QRIS Pembayaran Anda</span>
              </label>
              {formData.qrisImageUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus QR</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview Box */}
              <div className="w-36 h-36 rounded-xl border-2 border-dashed border-stone-300 bg-white flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                {formData.qrisImageUrl ? (
                  <img
                    src={formData.qrisImageUrl}
                    alt="QRIS Toko"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center p-2 text-stone-400 space-y-1">
                    <QrCode className="w-8 h-8 mx-auto opacity-50" />
                    <span className="block text-[10px]">Belum ada QR diunggah</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-2.5 w-full">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-300" />
                  <span>Upload Gambar QR Code (JPG/PNG)</span>
                </button>

                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">
                    Atau tempel URL gambar QR Code langsung:
                  </label>
                  <input
                    type="text"
                    value={formData.qrisImageUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, qrisImageUrl: e.target.value }))
                    }
                    placeholder="https://contoh.com/qris-saya.jpg"
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Merchant Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Nama Merchant / Bisnis di QRIS
              </label>
              <input
                type="text"
                value={formData.merchantName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, merchantName: e.target.value }))
                }
                placeholder="Contoh: MOMENKITA DIGITAL STUDIO"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Nomor NMID QRIS (Opsional)
              </label>
              <input
                type="text"
                value={formData.nmid}
                onChange={(e) => setFormData((prev) => ({ ...prev, nmid: e.target.value }))}
                placeholder="ID1020268849182"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs font-mono focus:ring-1 focus:ring-stone-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Bank / VA Accounts */}
          <div className="border border-stone-200 p-4 rounded-xl space-y-3">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-800" />
              <span>Nomor Rekening / Virtual Account Toko</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 mb-1">Rekening / VA BCA</label>
                <input
                  type="text"
                  value={formData.vaBcaNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vaBcaNumber: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1">Rekening / VA Mandiri</label>
                <input
                  type="text"
                  value={formData.vaMandiriNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vaMandiriNumber: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              Pengaturan ini tersimpan otomatis di browser Anda. Begitu disimpan, halaman checkout pelanggan pada <strong>Langkah 4 (Bayar Otomatis)</strong> akan langsung menampilkan gambar QR Code Anda.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <span>Simpan Pengaturan QR</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
