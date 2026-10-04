import React, { useState } from 'react';
import { Copy, Check, Send, Sparkles, Users, MessageSquare, Download } from 'lucide-react';

interface GuestLinkGeneratorProps {
  customSlug?: string;
}

export const GuestLinkGenerator: React.FC<GuestLinkGeneratorProps> = ({
  customSlug = 'budi-ayu',
}) => {
  const [slug, setSlug] = useState<string>(customSlug);
  const [guestName, setGuestName] = useState<string>('Bapak Hendro & Keluarga');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  // Batch generator state
  const [batchNames, setBatchNames] = useState<string>(
    'Bapak Hendro & Keluarga\ndr. Sarah Nabila\nDimas & Partner\nKeluarga Besar Om Joko'
  );

  const baseUrl = `https://momenkita.id/${slug}`;
  const encodedTo = encodeURIComponent(guestName.trim());
  const finalGuestUrl = `${baseUrl}?to=${encodedTo}`;

  const messageTemplate = `Kepada Yth.
Bapak/Ibu/Saudara/i: *${guestName}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*Budi Prasetyo & Ayu Lestari*

Info lengkap mengenai waktu, lokasi, protokol, dan konfirmasi kehadiran dapat diakses melalui tautan undangan digital berikut:
${finalGuestUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
Salam hangat,
Budi & Ayu`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(finalGuestUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageTemplate);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageTemplate)}`;
    window.open(waUrl, '_blank');
  };

  const batchList = batchNames
    .split('\n')
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({
      name,
      url: `${baseUrl}?to=${encodeURIComponent(name)}`,
    }));

  return (
    <section id="generator-tamu" className="py-16 md:py-24 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
            Fitur Praktis Mempelai
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-bold tracking-tight">
            Generator Link Nama Tamu & Broadcast WhatsApp
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Buat tautan personal secara instan dengan nama tamu tertera di sampul undangan. Lengkap dengan template kata sambutan yang santun dan siap dikirim ke WhatsApp dalam sekali klik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Generator Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Alamat URL Undangan
              </label>
              <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs">
                <span className="text-stone-500 font-mono">https://momenkita.id/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent font-mono font-semibold text-stone-900 focus:outline-none flex-1 ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nama Tamu yang Diundang
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Bapak H. Hendro & Keluarga"
                className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-stone-900 focus:outline-none"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                Nama ini akan muncul otomatis di sampul depan undangan digital tamu Anda.
              </p>
            </div>

            {/* Generated Link Result Bar */}
            <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200 space-y-2">
              <span className="text-[11px] text-stone-500 font-medium block">Hasil Tautan Khusus:</span>
              <div className="flex items-center justify-between gap-2 overflow-hidden bg-white p-2 rounded-lg border border-stone-200">
                <span className="font-mono text-xs text-amber-900 truncate font-medium">
                  {finalGuestUrl}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Tersalin' : 'Salin Link'}</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Ready Message Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700">
                  Teks Undangan Siap Kirim WhatsApp
                </label>
                <button
                  onClick={handleCopyMessage}
                  className="text-xs text-amber-800 hover:text-amber-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  {copiedMessage ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedMessage ? 'Teks Tersalin!' : 'Salin Semua Teks'}</span>
                </button>
              </div>
              <textarea
                value={messageTemplate}
                readOnly
                rows={7}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700 leading-relaxed focus:outline-none resize-none"
              />
            </div>

            {/* WhatsApp Send Action Button */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Buka & Kirim Langsung ke WhatsApp</span>
            </button>
          </div>

          {/* Right Column: Batch Guest Generator Tool */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-800" />
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Mode Batch (Banyak Tamu Sekaligus)
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">
                {batchList.length} Tamu Terdaftar
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Punya ratusan nama tamu dari spreadsheet atau buku catatan? Tempelkan nama tamu di bawah ini (1 nama per baris), sistem akan otomatis membuatkan tautan unik untuk masing-masing tamu.
            </p>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Daftar Nama Tamu (Satu Nama per Baris)
              </label>
              <textarea
                value={batchNames}
                onChange={(e) => setBatchNames(e.target.value)}
                rows={5}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-1 focus:ring-stone-900 focus:outline-none leading-relaxed"
                placeholder="Bapak Ahmad & Istri&#10;Ibu Diana&#10;Keluarga Pak RT"
              />
            </div>

            {/* Batch Table Output */}
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="bg-stone-100 px-3 py-2 text-[11px] font-semibold text-stone-700 flex justify-between">
                <span>Nama Tamu</span>
                <span>Tautan Personal</span>
              </div>
              <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto text-xs">
                {batchList.map((item, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between gap-2 hover:bg-stone-50">
                    <span className="font-medium text-stone-900 truncate max-w-[160px]">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-stone-400 truncate max-w-[140px]">
                        ?to={encodeURIComponent(item.name)}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          alert(`Tautan untuk ${item.name} berhasil disalin!`);
                        }}
                        className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded cursor-pointer"
                        title="Salin tautan tamu ini"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-[11px] text-amber-900">
              💡 <strong>Tips Efisiensi:</strong> Dengan fitur generator nama ini, undangan Anda terasa jauh lebih personal dan eksklusif di mata tamu keluarga maupun rekan kantor Anda.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
