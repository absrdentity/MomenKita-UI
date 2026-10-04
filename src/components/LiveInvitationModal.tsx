import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Template, RSVPItem } from '../types';
import { SAMPLE_RSVPS } from '../data/mockData';
import { ambientAudio } from '../utils/audio';

interface LiveInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  onSelectTemplate: (templateId: string) => void;
}

export const LiveInvitationModal: React.FC<LiveInvitationModalProps> = ({
  isOpen,
  onClose,
  template,
  onSelectTemplate,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [rsvpList, setRsvpList] = useState<RSVPItem[]>(SAMPLE_RSVPS);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpPax, setRsvpPax] = useState('2');
  const [rsvpMsg, setRsvpMsg] = useState('');
  const [rsvpSent, setRsvpSent] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 18,
  });

  useEffect(() => {
    if (!isOpen) {
      setIsOpened(false);
      if (isPlayingAudio) {
        ambientAudio.pause();
        setIsPlayingAudio(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen || !template) return null;

  const handleToggleAudio = () => {
    const state = ambientAudio.toggle();
    setIsPlayingAudio(state);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    ambientAudio.play();
    setIsPlayingAudio(true);
  };

  const handleCopy = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankId);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleSendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMsg.trim()) return;

    const newItem: RSVPItem = {
      id: `rsvp-${Date.now()}`,
      name: rsvpName.trim(),
      attendance: rsvpAttendance,
      pax: parseInt(rsvpPax, 10) || 1,
      message: rsvpMsg.trim(),
      timestamp: 'Baru saja',
      likes: 1,
    };

    setRsvpList([newItem, ...rsvpList]);
    setRsvpName('');
    setRsvpMsg('');
    setRsvpSent(true);
    setTimeout(() => setRsvpSent(false), 3000);
  };

  const handleLikeRsvp = (id: string) => {
    setRsvpList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-800 my-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
              Live Interactive Demo
            </span>
            <span className="text-stone-600">·</span>
            <span className="text-sm font-serif-display font-medium text-stone-200">
              {template.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onSelectTemplate(template.id);
              }}
              className="px-4 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-md transition-colors"
            >
              Gunakan Template Ini
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
              aria-label="Tutup preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Center Phone Container */}
        <div className="p-4 sm:p-8 flex justify-center items-center bg-gradient-to-b from-stone-950 to-stone-900 min-h-[640px]">
          {/* Smartphone Frame */}
          <div className="relative w-full max-w-[380px] h-[680px] bg-white rounded-[40px] shadow-2xl border-[8px] border-stone-800 overflow-hidden flex flex-col">
            {/* Speaker / Dynamic Island notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-800 rounded-full z-30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-stone-900 mr-2" />
              <div className="w-10 h-1.5 bg-stone-700 rounded-full" />
            </div>

            {/* Audio floating action button inside phone */}
            {isOpened && (
              <button
                onClick={handleToggleAudio}
                className="absolute top-8 right-4 z-30 p-2.5 rounded-full bg-stone-900/80 text-amber-300 backdrop-blur-md shadow-md hover:bg-stone-900 transition-transform active:scale-95"
                title={isPlayingAudio ? 'Matikan Musik' : 'Putar Musik'}
              >
                {isPlayingAudio ? (
                  <Volume2 className="w-4 h-4 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Phone Screen Scrollable Area */}
            <div className="flex-1 overflow-y-auto relative scroll-smooth text-stone-800 bg-[#FCFBF9]">
              {!isOpened ? (
                /* Cover / Sampul Undangan */
                <div className="min-h-full flex flex-col justify-between items-center text-center p-6 pt-16 pb-12 relative bg-gradient-to-b from-stone-100 via-amber-50/30 to-stone-100">
                  <div className="space-y-2 mt-4">
                    <p className="text-xs uppercase tracking-widest text-amber-800 font-medium">
                      Undangan Pernikahan
                    </p>
                    <h2 className="font-serif-display text-3xl font-bold text-stone-900 leading-tight">
                      Budi & Ayu
                    </h2>
                    <p className="text-xs text-stone-500">Sabtu, 24 Oktober 2026</p>
                  </div>

                  {/* Template Image Vignette */}
                  <div className="my-6 relative w-44 h-56 rounded-full overflow-hidden border-4 border-amber-100 shadow-md">
                    <img
                      src={template.previewImg}
                      alt={template.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4 w-full max-w-xs">
                    <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80 text-center">
                      <p className="text-[11px] text-stone-500">Kepada Yth. Tamu Undangan</p>
                      <p className="text-sm font-semibold text-stone-900">Bapak Hendro & Rekan</p>
                    </div>

                    <button
                      onClick={handleOpenInvitation}
                      className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                      <span>Buka Undangan</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Full Interactive Invitation Content */
                <div className="space-y-8 pb-12">
                  {/* Hero Cover inside */}
                  <div className="relative pt-14 pb-10 px-6 text-center bg-gradient-to-b from-amber-50/60 to-[#FCFBF9] border-b border-stone-200/60">
                    <p className="text-[11px] uppercase tracking-widest text-amber-800 font-medium">
                      Walimatul 'Urs
                    </p>
                    <h1 className="font-serif-display text-3xl font-bold text-stone-900 mt-1 mb-2">
                      Budi Prasetyo
                      <span className="block font-sans text-lg font-light text-amber-700">&</span>
                      Ayu Lestari
                    </h1>
                    <p className="text-xs text-stone-500 italic max-w-xs mx-auto">
                      "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
                    </p>
                  </div>

                  {/* Countdown Timer */}
                  <div className="px-5">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs text-center">
                      <p className="text-xs font-medium text-stone-600 mb-3">Menghitung Hari Bahagia</p>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                          <span className="font-serif-display text-lg font-bold text-stone-900 tabular-nums">
                            {timeLeft.days}
                          </span>
                          <span className="block text-[10px] text-stone-500 uppercase">Hari</span>
                        </div>
                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                          <span className="font-serif-display text-lg font-bold text-stone-900 tabular-nums">
                            {timeLeft.hours}
                          </span>
                          <span className="block text-[10px] text-stone-500 uppercase">Jam</span>
                        </div>
                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                          <span className="font-serif-display text-lg font-bold text-stone-900 tabular-nums">
                            {timeLeft.minutes}
                          </span>
                          <span className="block text-[10px] text-stone-500 uppercase">Menit</span>
                        </div>
                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                          <span className="font-serif-display text-lg font-bold text-amber-700 tabular-nums">
                            {timeLeft.seconds}
                          </span>
                          <span className="block text-[10px] text-stone-500 uppercase">Detik</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mempelai Profile */}
                  <div className="px-6 text-center space-y-5">
                    <div className="space-y-1">
                      <h3 className="font-serif-display text-xl font-bold text-stone-900">
                        Budi Prasetyo, S.Kom
                      </h3>
                      <p className="text-xs text-stone-600">
                        Putra pertama dari Bapak Ir. Bambang Supeno & Ibu Siti Aminah
                      </p>
                    </div>

                    <div className="font-serif-display text-2xl text-amber-700 italic">&</div>

                    <div className="space-y-1">
                      <h3 className="font-serif-display text-xl font-bold text-stone-900">
                        Ayu Lestari, S.Ds
                      </h3>
                      <p className="text-xs text-stone-600">
                        Putri kedua dari Bapak Dr. H. Slamet Riyadi & Ibu Hj. Ratna Dewi
                      </p>
                    </div>
                  </div>

                  {/* Acara & Waktu */}
                  <div className="px-5 space-y-4">
                    {/* Akad */}
                    <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="font-serif-display text-base font-bold text-stone-900">
                          Akad Nikah
                        </span>
                        <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">
                          Khidmat
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>Sabtu, 24 Oktober 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>08.00 - 10.00 WIB</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span>Masjid Agung Sunda Kelapa, Menteng, Jakarta Pusat</span>
                        </div>
                      </div>
                    </div>

                    {/* Resepsi */}
                    <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="font-serif-display text-base font-bold text-stone-900">
                          Resepsi Pernikahan
                        </span>
                        <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          Celebration
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>Sabtu, 24 Oktober 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>11.30 - 14.30 WIB</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span>Grand Ballroom Hotel Mulia Senayan, Jakarta</span>
                        </div>
                      </div>

                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full mt-2 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Buka Petunjuk Arah Google Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Amplop Digital / Cashless Gift */}
                  <div className="px-5">
                    <div className="bg-gradient-to-b from-stone-900 to-stone-950 p-4 rounded-2xl text-white space-y-3">
                      <div className="text-center space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                          Tanda Kasih
                        </p>
                        <h4 className="font-serif-display text-base font-bold">
                          Amplop Digital & Kado Cashless
                        </h4>
                        <p className="text-[11px] text-stone-300">
                          Doa restu Anda adalah karunia terindah bagi kami.
                        </p>
                      </div>

                      <div className="space-y-2">
                        {/* Bank 1 */}
                        <div className="bg-stone-800/80 p-3 rounded-xl flex items-center justify-between border border-stone-700 text-xs">
                          <div>
                            <span className="font-semibold text-white block">Bank BCA</span>
                            <span className="text-stone-300 font-mono">8820 9182 34</span>
                            <span className="text-[10px] text-stone-400 block">a.n Budi Prasetyo</span>
                          </div>
                          <button
                            onClick={() => handleCopy('8820918234', 'bca')}
                            className="p-2 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors flex items-center gap-1 text-[11px]"
                          >
                            {copiedBank === 'bca' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Bank 2 */}
                        <div className="bg-stone-800/80 p-3 rounded-xl flex items-center justify-between border border-stone-700 text-xs">
                          <div>
                            <span className="font-semibold text-white block">Bank Mandiri</span>
                            <span className="text-stone-300 font-mono">1320 0192 8374 1</span>
                            <span className="text-[10px] text-stone-400 block">a.n Ayu Lestari</span>
                          </div>
                          <button
                            onClick={() => handleCopy('1320019283741', 'mandiri')}
                            className="p-2 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors flex items-center gap-1 text-[11px]"
                          >
                            {copiedBank === 'mandiri' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive RSVP Form */}
                  <div className="px-5 space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
                      <div className="text-center space-y-0.5">
                        <h4 className="font-serif-display text-base font-bold text-stone-900">
                          Konfirmasi Kehadiran & Doa
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          Mohon konfirmasi agar kami dapat mempersiapkan jamuan terbaik
                        </p>
                      </div>

                      <form onSubmit={handleSendRsvp} className="space-y-3 text-xs">
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={rsvpName}
                            onChange={(e) => setRsvpName(e.target.value)}
                            placeholder="Contoh: dr. Nanda & Keluarga"
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-stone-700 font-medium mb-1">Status Kehadiran</label>
                            <select
                              value={rsvpAttendance}
                              onChange={(e) => setRsvpAttendance(e.target.value as 'hadir' | 'tidak_hadir' | 'ragu')}
                              className="w-full px-2 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                            >
                              <option value="hadir">Pasti Hadir</option>
                              <option value="ragu">Masih Ragu</option>
                              <option value="tidak_hadir">Berhalangan</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-stone-700 font-medium mb-1">Jumlah Orang</label>
                            <select
                              value={rsvpPax}
                              onChange={(e) => setRsvpPax(e.target.value)}
                              className="w-full px-2 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                            >
                              <option value="1">1 Orang</option>
                              <option value="2">2 Orang</option>
                              <option value="3">3 Orang</option>
                              <option value="4">4 Orang</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Ucapan & Doa Restu</label>
                          <textarea
                            value={rsvpMsg}
                            onChange={(e) => setRsvpMsg(e.target.value)}
                            rows={2}
                            placeholder="Tulis ucapan selamat dan doa untuk mempelai..."
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5 text-amber-300" />
                          <span>Kirim Konfirmasi & Doa</span>
                        </button>

                        {rsvpSent && (
                          <div className="p-2 bg-emerald-50 text-emerald-800 text-center rounded-lg font-medium text-[11px]">
                            Terima kasih! Doa Anda telah tercatat secara langsung.
                          </div>
                        )}
                      </form>

                      {/* Live Feed List */}
                      <div className="border-t border-stone-100 pt-3 space-y-2.5 max-h-48 overflow-y-auto">
                        <p className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                          Ucapan Tamu ({rsvpList.length})
                        </p>
                        {rsvpList.map((item) => (
                          <div key={item.id} className="p-2.5 bg-stone-50/70 rounded-lg border border-stone-100 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-stone-900">{item.name}</span>
                              <span className="text-[10px] text-stone-400">{item.timestamp}</span>
                            </div>
                            <p className="text-stone-600 text-[11px] leading-relaxed">{item.message}</p>
                            <div className="mt-1.5 flex items-center justify-between text-[10px]">
                              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                {item.attendance === 'hadir' ? 'Hadir' : 'Doa Restu'}
                              </span>
                              <button
                                onClick={() => handleLikeRsvp(item.id)}
                                className="flex items-center gap-1 text-stone-500 hover:text-rose-600 transition-colors"
                              >
                                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                                <span>{item.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>Audio Latar:</span>
            <span className="text-stone-200 font-medium">{template.audioTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md hover:bg-stone-800 text-stone-300"
            >
              Kembali ke Web
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectTemplate(template.id);
              }}
              className="px-5 py-2 rounded-md bg-stone-100 hover:bg-white text-stone-900 font-semibold"
            >
              Pesan Desain Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
