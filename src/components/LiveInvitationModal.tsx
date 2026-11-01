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
  Moon,
  Star,
} from 'lucide-react';
import { Template, RSVPItem } from '../types';
import { SAMPLE_RSVPS, TEMPLATES_DATA } from '../data/mockData';
import { ambientAudio } from '../utils/audio';

interface LiveInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  onSelectTemplate: (templateId: string) => void;
  coupleQris?: string;
}

interface ThemeVisualConfig {
  // Screen & surface colors
  screenBg: string;
  screenText: string;
  mutedText: string;
  accentText: string;
  cardBg: string;
  cardBorder: string;
  subCardBg: string;
  buttonBg: string;
  buttonText: string;
  inputBg: string;
  inputBorder: string;
  dividerColor: string;
  giftCardBg: string;
  giftItemBg: string;
  giftBorder: string;
  isDarkTheme: boolean;

  // Content & Copy matching the preview image
  kickerCover: string;
  primaryTitle: string;
  secondaryTitle: string;
  subtitleItalic: string;
  eventDateLabel: string;
  personOneName: string;
  personOneDesc: string;
  personTwoName?: string;
  personTwoDesc?: string;
  ceremonyOneTitle: string;
  ceremonyOneTag: string;
  ceremonyOneTime: string;
  ceremonyOneVenue: string;
  ceremonyTwoTitle: string;
  ceremonyTwoTag: string;
  ceremonyTwoTime: string;
  ceremonyTwoVenue: string;
  quoteText: string;
  bankOneName: string;
  bankOneNumber: string;
  bankOneHolder: string;
  bankTwoName: string;
  bankTwoNumber: string;
  bankTwoHolder: string;
}

const getThemeConfig = (templateId: string): ThemeVisualConfig => {
  switch (templateId) {
    case 'tpl-romantic-rose':
      return {
        screenBg: 'bg-[#FDEFF2]',
        screenText: 'text-[#5A3E36]',
        mutedText: 'text-[#8C6D64]',
        accentText: 'text-[#A67C52]',
        cardBg: 'bg-white/90',
        cardBorder: 'border-[#F3D1DC]',
        subCardBg: 'bg-[#FFF7F9]',
        buttonBg: 'bg-[#B07D62] hover:bg-[#9A6B52]',
        buttonText: 'text-white',
        inputBg: 'bg-[#FFF9FA]',
        inputBorder: 'border-[#F3D1DC]',
        dividerColor: 'border-[#F3D1DC]',
        giftCardBg: 'bg-[#FFF5F7]',
        giftItemBg: 'bg-white',
        giftBorder: 'border-[#F3D1DC]',
        isDarkTheme: false,
        kickerCover: 'Please Join Us To Celebrate Our Marriage',
        primaryTitle: 'Sarah',
        secondaryTitle: 'Benjamin',
        subtitleItalic: 'Are Tying The Knot',
        eventDateLabel: 'Sabtu, 14 Juni 2026',
        personOneName: 'Sarah Amelia Putri, S.Psi',
        personOneDesc: 'Putri pertama dari Bapak H. Hendra Wijaya & Ibu Hj. Diana Sari',
        personTwoName: 'Benjamin Pratama, B.Bus',
        personTwoDesc: 'Putra kedua dari Bapak Robertus Santoso & Ibu Maria Margaretha',
        ceremonyOneTitle: 'Pemberkatan / Akad Nikah',
        ceremonyOneTag: 'Sacred Vows',
        ceremonyOneTime: '16.00 - 17.30 WIB',
        ceremonyOneVenue: 'The Oakwood Rose Gardens, Bandung',
        ceremonyTwoTitle: 'Garden Dinner Reception',
        ceremonyTwoTag: 'Intimate Gala',
        ceremonyTwoTime: '18.30 - 21.30 WIB',
        ceremonyTwoVenue: 'Glasshouse Pavilion Oakwood, Bandung',
        quoteText:
          '"Cinta sejati tumbuh bersama waktu, mekar dengan kesabaran, dan bersemi dalam doa yang tulus."',
        bankOneName: 'Bank BCA',
        bankOneNumber: '7410 8829 10',
        bankOneHolder: 'Sarah Amelia Putri',
        bankTwoName: 'Bank Mandiri',
        bankTwoNumber: '1310 0982 7162 4',
        bankTwoHolder: 'Benjamin Pratama',
      };

    case 'tpl-luxury-emerald':
      return {
        screenBg: 'bg-[#042F24]',
        screenText: 'text-[#F7E7CE]',
        mutedText: 'text-[#B5C9C0]',
        accentText: 'text-[#E5B85B]',
        cardBg: 'bg-[#063E30]/95',
        cardBorder: 'border-[#D4AF37]/50',
        subCardBg: 'bg-[#04281F]',
        buttonBg: 'bg-gradient-to-r from-[#C89B3C] via-[#E5C158] to-[#B88A2D] hover:brightness-105',
        buttonText: 'text-[#03221A] font-bold',
        inputBg: 'bg-[#04281F]',
        inputBorder: 'border-[#D4AF37]/40',
        dividerColor: 'border-[#D4AF37]/30',
        giftCardBg: 'bg-[#03221A]',
        giftItemBg: 'bg-[#063E30]',
        giftBorder: 'border-[#D4AF37]/40',
        isDarkTheme: true,
        kickerCover: 'We Cordially Invite You To Celebrate',
        primaryTitle: 'Fajar Al-Sayed',
        secondaryTitle: 'Nadia Zahra',
        subtitleItalic: 'A Royal Evening of Joy',
        eventDateLabel: 'Sabtu, 18 November 2026',
        personOneName: 'dr. Fajar Khalid Al-Sayed, Sp.JP',
        personOneDesc: 'Putra pertama dari Bapak H. Ahmad Al-Sayed & Ibu Hj. Fatimah Hasan',
        personTwoName: 'drg. Nadia Zahra Shihab',
        personTwoDesc: 'Putri bungsu dari Bapak Prof. Dr. Umar Shihab & Ibu Dra. Khadijah',
        ceremonyOneTitle: 'Akad Nikah Khidmat',
        ceremonyOneTag: 'Sacred Nikah',
        ceremonyOneTime: '09.00 - 11.00 WIB',
        ceremonyOneVenue: 'Masjid Raya Al-Jabbar Ballroom, Bandung',
        ceremonyTwoTitle: 'A Grand Royal Gala Reception',
        ceremonyTwoTag: 'Black Tie & Formal',
        ceremonyTwoTime: '19.00 - 22.00 WIB',
        ceremonyTwoVenue: 'The Palace Grand Ballroom, Hotel Kempinski Jakarta',
        quoteText:
          '"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu agar kamu cenderung dan merasa tenteram kepadanya." (QS. Ar-Rum: 21)',
        bankOneName: 'BankBSI / Syariah',
        bankOneNumber: '7192 8374 65',
        bankOneHolder: 'Fajar Khalid Al-Sayed',
        bankTwoName: 'Bank BCA Prioritas',
        bankTwoNumber: '8891 0293 84',
        bankTwoHolder: 'Nadia Zahra Shihab',
      };

    case 'tpl-botanical-sage':
      return {
        screenBg: 'bg-[#F7F6F0]',
        screenText: 'text-[#344034]',
        mutedText: 'text-[#667364]',
        accentText: 'text-[#6E8268]',
        cardBg: 'bg-white/95',
        cardBorder: 'border-[#D3DDD0]',
        subCardBg: 'bg-[#F1F4EF]',
        buttonBg: 'bg-[#5E7158] hover:bg-[#4C5D47]',
        buttonText: 'text-white',
        inputBg: 'bg-[#F8FAF7]',
        inputBorder: 'border-[#D3DDD0]',
        dividerColor: 'border-[#DCE4D9]',
        giftCardBg: 'bg-[#E9EFE7]',
        giftItemBg: 'bg-white',
        giftBorder: 'border-[#CAD6C6]',
        isDarkTheme: false,
        kickerCover: 'Together With Their Families',
        primaryTitle: 'Chloe',
        secondaryTitle: 'Jonathan',
        subtitleItalic: 'Are Getting Married',
        eventDateLabel: 'Sabtu, 12 Oktober 2026',
        personOneName: 'Chloe Anastasia Kusuma',
        personOneDesc: 'Putri kedua dari Bapak Lukas Kusuma & Ibu Esther Wijaya',
        personTwoName: 'Jonathan Adi Nugroho, S.Ars',
        personTwoDesc: 'Putra pertama dari Bapak Daniel Nugroho & Ibu Martha Salim',
        ceremonyOneTitle: 'Holy Matrimony',
        ceremonyOneTag: 'Olive Grove',
        ceremonyOneTime: '15.30 - 17.00 WITA',
        ceremonyOneVenue: 'The Olive Grove Villa Chapel, Uluwatu Bali',
        ceremonyTwoTitle: 'Outdoor Sunset Reception',
        ceremonyTwoTag: 'Botanical Dinner',
        ceremonyTwoTime: '18.00 - 21.30 WITA',
        ceremonyTwoVenue: 'Cliffside Lawn Olive Grove Villa, Bali',
        quoteText:
          '"Seindah ranting zaitun yang teduh, kiranya kasih dan damai senantiasa menaungi langkah hidup kami berdua."',
        bankOneName: 'Bank BCA',
        bankOneNumber: '5210 9928 31',
        bankOneHolder: 'Jonathan Adi Nugroho',
        bankTwoName: 'Bank Permata / Jenius',
        bankTwoNumber: '9001 2837 465',
        bankTwoHolder: 'Chloe Anastasia',
      };

    case 'tpl-modern-noir':
      return {
        screenBg: 'bg-[#EFECE6]',
        screenText: 'text-[#141414]',
        mutedText: 'text-[#575551]',
        accentText: 'text-[#141414]',
        cardBg: 'bg-[#F8F6F2]',
        cardBorder: 'border-[#141414]/20',
        subCardBg: 'bg-[#EAE6DF]',
        buttonBg: 'bg-[#141414] hover:bg-[#2B2B2B]',
        buttonText: 'text-[#F8F6F2]',
        inputBg: 'bg-white',
        inputBorder: 'border-[#141414]/25',
        dividerColor: 'border-[#141414]/20',
        giftCardBg: 'bg-[#141414]',
        giftItemBg: 'bg-[#242424]',
        giftBorder: 'border-[#3A3A3A]',
        isDarkTheme: false,
        kickerCover: 'CORDIALLY INVITE YOU TO THE WEDDING OF',
        primaryTitle: 'EMMA CLARKE',
        secondaryTitle: 'ALEXANDER SMITH',
        subtitleItalic: 'MR & MRS JOHNSON PRESENT',
        eventDateLabel: 'SABTU, 14 SEPTEMBER 2026',
        personOneName: 'EMMA CLARKE JOHNSON, B.A.',
        personOneDesc: 'Putri dari Bapak Arthur Johnson & Ibu Eleanor Clarke',
        personTwoName: 'ALEXANDER REZA SMITH, M.Sc.',
        personTwoDesc: 'Putra dari Bapak William Smith & Ibu Farah Diba',
        ceremonyOneTitle: 'THE VOW CEREMONY',
        ceremonyOneTag: 'PRIVATE',
        ceremonyOneTime: '16.00 WIB',
        ceremonyOneVenue: 'The Estate Modernist Gallery, Jakarta Selatan',
        ceremonyTwoTitle: 'EVENING COCKTAIL & DINNER',
        ceremonyTwoTag: 'MONOCHROME ATTIRE',
        ceremonyTwoTime: '19.00 WIB',
        ceremonyTwoVenue: 'Rooftop Sculpture Hall, SCBD Jakarta',
        quoteText:
          '"In the simplicity of presence, two paths converge into a timeless editorial chapter."',
        bankOneName: 'BCA',
        bankOneNumber: '0192 8837 41',
        bankOneHolder: 'Alexander Reza Smith',
        bankTwoName: 'MANDIRI',
        bankTwoNumber: '1200 9182 7364 5',
        bankTwoHolder: 'Emma Clarke Johnson',
      };

    case 'tpl-heritage-batik':
      return {
        screenBg: 'bg-[#2B1409]',
        screenText: 'text-[#F5E1B9]',
        mutedText: 'text-[#CCA978]',
        accentText: 'text-[#E3B448]',
        cardBg: 'bg-[#3A1C0D]/95',
        cardBorder: 'border-[#D4AF37]/50',
        subCardBg: 'bg-[#230F06]',
        buttonBg: 'bg-[#D4AF37] hover:bg-[#E5C354]',
        buttonText: 'text-[#230F06] font-bold',
        inputBg: 'bg-[#230F06]',
        inputBorder: 'border-[#D4AF37]/40',
        dividerColor: 'border-[#D4AF37]/30',
        giftCardBg: 'bg-[#1E0D05]',
        giftItemBg: 'bg-[#35190B]',
        giftBorder: 'border-[#D4AF37]/40',
        isDarkTheme: true,
        kickerCover: 'PAWIWAHAN AGENG • THE ROYAL WEDDING',
        primaryTitle: 'Saraswati',
        secondaryTitle: 'Bimo Prakoso',
        subtitleItalic: 'A Celebration of Love, Tradition, and Unity',
        eventDateLabel: 'Sabtu Pon, 12 Oktober 2026',
        personOneName: 'Raden Ajeng Saraswati Kusumaningrum',
        personOneDesc: 'Putri dalem Bapak K.R.T. Hadiwinoto & Ibu R.Ay. Retno Dumilah',
        personTwoName: 'Raden Mas Bimo Prakoso, S.T., M.B.A.',
        personTwoDesc: 'Putra sulung Bapak Ir. Bambang Suryo & Ibu Hj. Sri Lestari',
        ceremonyOneTitle: 'Akad Nikah & Panggih Adat Jawa',
        ceremonyOneTag: 'Sakral Adat',
        ceremonyOneTime: '08.30 - 11.00 WIB',
        ceremonyOneVenue: 'Pendopo Agung Ndalem Ngabean, Surakarta',
        ceremonyTwoTitle: 'Pahargyan Resepsi Agung',
        ceremonyTwoTag: 'Batik / Kebaya',
        ceremonyTwoTime: '13.00 - 15.30 WIB',
        ceremonyTwoVenue: 'Balai Joglo Grand Ballroom, Kraton Surakarta',
        quoteText:
          '"Memayu hayuning kulawarga, manunggal ing tresna suci dumugi kaken-kaken ninen-ninen."',
        bankOneName: 'Bank Mandiri',
        bankOneNumber: '1380 0918 2736 1',
        bankOneHolder: 'R.M. Bimo Prakoso',
        bankTwoName: 'Bank BCA',
        bankTwoNumber: '6019 2837 49',
        bankTwoHolder: 'R.A. Saraswati',
      };

    case 'tpl-little-miracle':
      return {
        screenBg: 'bg-[#F8FBFF]',
        screenText: 'text-[#3A4A5E]',
        mutedText: 'text-[#6E8299]',
        accentText: 'text-[#B5894B]',
        cardBg: 'bg-white',
        cardBorder: 'border-[#CFE4F7]',
        subCardBg: 'bg-[#EFF6FD]',
        buttonBg: 'bg-[#7DA8C9] hover:bg-[#6794B8]',
        buttonText: 'text-white font-semibold',
        inputBg: 'bg-[#F6FAFE]',
        inputBorder: 'border-[#CFE4F7]',
        dividerColor: 'border-[#DCEBF9]',
        giftCardBg: 'bg-[#EBF4FC]',
        giftItemBg: 'bg-white',
        giftBorder: 'border-[#C5DDF5]',
        isDarkTheme: false,
        kickerCover: 'Tasyakuran Aqiqah & Kelahiran Buah Hati',
        primaryTitle: 'Isa Adam Ali',
        secondaryTitle: '',
        subtitleItalic: 'Lahir: 12 Oktober 2026 • Pukul 07.45 WIB',
        eventDateLabel: 'Sabtu, 18 November 2026',
        personOneName: 'Ananda Isa Adam Ali',
        personOneDesc: 'Putra tercinta dari Bapak Muhammad Ali Akbar & Ibu Aisyah Humaira',
        personTwoName: undefined,
        personTwoDesc: 'Berat: 3,35 kg • Panjang: 50 cm • Alhamdulillah sehat walafiat',
        ceremonyOneTitle: 'Pengajian, Tahnik & Potong Rambut',
        ceremonyOneTag: 'Tasyakuran',
        ceremonyOneTime: '10.00 - 11.30 WIB',
        ceremonyOneVenue: 'Kediaman Keluarga Ali, Jl. Taman Maple No. 14, Jakarta Selatan',
        ceremonyTwoTitle: 'Ramah Tamah & Jamuan Aqiqah',
        ceremonyTwoTag: 'Silaturahmi',
        ceremonyTwoTime: '11.30 - 14.30 WIB',
        ceremonyTwoVenue: 'Taman Belakang Kediaman Keluarga Ali, Jakarta Selatan',
        quoteText:
          '"Semoga kelak menjadi anak yang shalih, berbakti kepada kedua orang tua, cerdas, serta membawa keberkahan bagi sesama. Aamiin."',
        bankOneName: 'Bank BCA',
        bankOneNumber: '4820 1928 37',
        bankOneHolder: 'Muhammad Ali Akbar',
        bankTwoName: 'Bank BSI',
        bankTwoNumber: '7129 3847 56',
        bankTwoHolder: 'Aisyah Humaira',
      };

    default:
      return getThemeConfig('tpl-romantic-rose');
  }
};

/* Custom SVG Ornaments matching each template's preview image */
const TemplateTopOrnament: React.FC<{ templateId: string }> = ({ templateId }) => {
  if (templateId === 'tpl-romantic-rose') {
    return (
      <div className="w-full flex flex-col items-center pointer-events-none select-none mb-2">
        <svg viewBox="0 0 320 80" className="w-64 h-16">
          <defs>
            <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5B5C8" />
              <stop offset="100%" stopColor="#E68AA4" />
            </linearGradient>
          </defs>
          {/* Leaves */}
          <path d="M70,50 Q95,25 125,42 Q98,55 70,50 Z" fill="#A9BFA8" opacity="0.75" />
          <path d="M250,50 Q225,25 195,42 Q222,55 250,50 Z" fill="#A9BFA8" opacity="0.75" />
          <path d="M105,28 Q130,10 150,32 Q125,38 105,28 Z" fill="#BACDB8" opacity="0.8" />
          <path d="M215,28 Q190,10 170,32 Q195,38 215,28 Z" fill="#BACDB8" opacity="0.8" />
          {/* Watercolor Blush Roses */}
          <circle cx="135" cy="40" r="16" fill="url(#roseGrad)" opacity="0.85" />
          <circle cx="135" cy="40" r="10" fill="#FDE2E9" opacity="0.7" />
          <circle cx="185" cy="40" r="16" fill="url(#roseGrad)" opacity="0.85" />
          <circle cx="185" cy="40" r="10" fill="#FDE2E9" opacity="0.7" />
          <circle cx="160" cy="34" r="20" fill="#F7C6D4" opacity="0.95" />
          <circle cx="160" cy="34" r="12" fill="#FFF0F4" opacity="0.85" />
          <circle cx="160" cy="34" r="5" fill="#D49B6A" opacity="0.7" />
        </svg>
      </div>
    );
  }

  if (templateId === 'tpl-luxury-emerald') {
    return (
      <div className="w-full flex flex-col items-center pointer-events-none select-none mb-2">
        <svg viewBox="0 0 320 90" className="w-full h-20">
          <defs>
            <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B88A2D" />
              <stop offset="50%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#B88A2D" />
            </linearGradient>
          </defs>
          {/* Arabic Royal Arch Frame */}
          <path
            d="M16,88 L16,35 Q85,35 120,18 Q160,2 160,2 Q160,2 200,18 Q235,35 304,35 L304,88"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="2"
          />
          <path
            d="M24,88 L24,42 Q90,42 125,25 Q160,10 160,10 Q160,10 195,25 Q230,42 296,42 L296,88"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="0.9"
            strokeDasharray="3 2"
          />
          {/* Filigree Crown Center */}
          <circle cx="160" cy="34" r="4" fill="url(#goldFoil)" />
          <path
            d="M135,46 Q160,26 185,46 M145,52 Q160,38 175,52"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="1.4"
          />
        </svg>
      </div>
    );
  }

  if (templateId === 'tpl-botanical-sage') {
    return (
      <div className="w-full flex flex-col items-center pointer-events-none select-none mb-2">
        <svg viewBox="0 0 320 75" className="w-64 h-16">
          {/* Olive Branch Arch */}
          <path
            d="M45,58 Q160,12 275,58"
            fill="none"
            stroke="#7B8C73"
            strokeWidth="1.5"
          />
          {/* Olive Leaves & Olives */}
          <ellipse cx="85" cy="36" rx="12" ry="5" transform="rotate(-25 85 36)" fill="#8DA183" />
          <ellipse cx="115" cy="26" rx="13" ry="5" transform="rotate(-15 115 26)" fill="#6E8268" />
          <ellipse cx="145" cy="22" rx="12" ry="4.5" transform="rotate(-5 145 22)" fill="#9CAF93" />
          <ellipse cx="175" cy="22" rx="12" ry="4.5" transform="rotate(5 175 22)" fill="#6E8268" />
          <ellipse cx="205" cy="26" rx="13" ry="5" transform="rotate(15 205 26)" fill="#8DA183" />
          <ellipse cx="235" cy="36" rx="12" ry="5" transform="rotate(25 235 36)" fill="#6E8268" />
          {/* Olives */}
          <circle cx="102" cy="40" r="3.5" fill="#9A9B68" />
          <circle cx="160" cy="31" r="3.5" fill="#9A9B68" />
          <circle cx="218" cy="40" r="3.5" fill="#9A9B68" />
        </svg>
      </div>
    );
  }

  if (templateId === 'tpl-modern-noir') {
    return (
      <div className="w-full flex flex-col items-center pointer-events-none select-none my-3">
        <div className="flex items-center gap-3 w-48">
          <div className="h-[1px] flex-1 bg-[#141414]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#141414]" />
          <div className="h-[1px] flex-1 bg-[#141414]/40" />
        </div>
      </div>
    );
  }

  if (templateId === 'tpl-heritage-batik') {
    return (
      <div className="w-full flex flex-col items-center pointer-events-none select-none mb-2">
        <svg viewBox="0 0 260 75" className="w-56 h-16">
          {/* Javanese Kraton / Gunungan Crest */}
          <path
            d="M130,8 L158,56 Q130,64 102,56 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.6"
          />
          <path
            d="M130,16 L148,50 Q130,56 112,50 Z"
            fill="#D4AF37"
            fillOpacity="0.2"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <circle cx="130" cy="38" r="6" fill="none" stroke="#F5D77F" strokeWidth="1.2" />
          <path d="M70,56 L190,56" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      </div>
    );
  }

  if (templateId === 'tpl-little-miracle') {
    return (
      <div className="w-full flex flex-col items-center pointer-events-none select-none mb-2">
        <div className="relative flex items-center justify-center w-48 h-20">
          {/* Soft Pastel Clouds & Golden Crescent Moon */}
          <div className="absolute -left-2 top-6 w-16 h-8 bg-[#DCEEFB] rounded-full opacity-80 blur-[1px]" />
          <div className="absolute -right-2 top-8 w-16 h-8 bg-[#DCEEFB] rounded-full opacity-80 blur-[1px]" />
          <div className="w-14 h-14 rounded-full bg-[#FFF6E0] border border-[#E6C88A] flex items-center justify-center shadow-xs relative z-10">
            <Moon className="w-7 h-7 text-[#C79948] fill-[#F5DDA4]" />
          </div>
          <Star className="w-3.5 h-3.5 text-[#D8AD5C] fill-[#F5DDA4] absolute top-2 left-10" />
          <Star className="w-3 h-3 text-[#D8AD5C] fill-[#F5DDA4] absolute top-3 right-9" />
          <Star className="w-2.5 h-2.5 text-[#D8AD5C] fill-[#F5DDA4] absolute bottom-2 left-14" />
        </div>
      </div>
    );
  }

  return null;
};

export const LiveInvitationModal: React.FC<LiveInvitationModalProps> = ({
  isOpen,
  onClose,
  template,
  onSelectTemplate,
  coupleQris,
}) => {
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<Template | null>(template);
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
    setActivePreviewTemplate(template);
  }, [template]);

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

  if (!isOpen || !activePreviewTemplate) return null;

  const theme = getThemeConfig(activePreviewTemplate.id);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-800 my-auto">
        {/* Top Control Bar + Quick Template Switcher */}
        <div className="flex flex-col gap-3 px-5 py-3.5 border-b border-stone-800 bg-stone-950 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Live Interactive Demo
              </span>
              <span className="text-stone-600">·</span>
              <span className="text-sm font-serif-display font-semibold text-stone-100">
                {activePreviewTemplate.title}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  onSelectTemplate(activePreviewTemplate.id);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-md transition-colors cursor-pointer"
              >
                Gunakan Template Ini
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors cursor-pointer"
                aria-label="Tutup preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Theme Switcher Bar so users can compare distinct templates directly */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] text-stone-400 mr-1 shrink-0">Coba Tema Lain:</span>
            {TEMPLATES_DATA.map((tpl) => {
              const active = tpl.id === activePreviewTemplate.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setActivePreviewTemplate(tpl)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-stone-100 text-stone-950 font-semibold'
                      : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {tpl.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body: Center Phone Container */}
        <div className="p-4 sm:p-6 flex justify-center items-center bg-gradient-to-b from-stone-950 to-stone-900 min-h-[650px]">
          {/* Smartphone Frame */}
          <div className="relative w-full max-w-[385px] h-[680px] bg-stone-950 rounded-[42px] shadow-2xl border-[8px] border-stone-800 overflow-hidden flex flex-col">
            {/* Speaker / Dynamic Island notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-900 rounded-full z-30 flex items-center justify-center border border-stone-800">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-950 mr-2" />
              <div className="w-10 h-1 bg-stone-800 rounded-full" />
            </div>

            {/* Side Batik / Gold Frame Borders for Heritage & Luxury Templates */}
            {activePreviewTemplate.id === 'tpl-heritage-batik' && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-3 z-20 bg-gradient-to-b from-[#D4AF37]/60 via-[#92400E]/60 to-[#D4AF37]/60 border-r border-[#D4AF37]/50" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-3 z-20 bg-gradient-to-b from-[#D4AF37]/60 via-[#92400E]/60 to-[#D4AF37]/60 border-l border-[#D4AF37]/50" />
              </>
            )}

            {activePreviewTemplate.id === 'tpl-luxury-emerald' && (
              <div className="pointer-events-none absolute inset-2 z-20 rounded-[30px] border border-[#D4AF37]/45" />
            )}

            {activePreviewTemplate.id === 'tpl-modern-noir' && (
              <div className="pointer-events-none absolute inset-3 z-20 border border-[#141414]/20" />
            )}

            {/* Audio floating action button inside phone */}
            {isOpened && (
              <button
                onClick={handleToggleAudio}
                className="absolute top-9 right-5 z-30 p-2.5 rounded-full bg-stone-900/80 text-amber-300 backdrop-blur-md shadow-md hover:bg-stone-900 transition-transform active:scale-95 cursor-pointer"
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
            <div
              className={`flex-1 overflow-y-auto relative scroll-smooth transition-colors duration-300 ${theme.screenBg} ${theme.screenText}`}
            >
              {!isOpened ? (
                /* COVER / SAMPUL UNDANGAN — Matches each template's preview aesthetic */
                <div className="min-h-full flex flex-col justify-between items-center text-center px-7 pt-14 pb-10 relative">
                  <div className="w-full flex flex-col items-center">
                    <TemplateTopOrnament templateId={activePreviewTemplate.id} />

                    <p
                      className={`text-[10px] uppercase tracking-[0.2em] font-semibold mt-1 ${theme.accentText}`}
                    >
                      {theme.kickerCover}
                    </p>

                    <div className="mt-4 space-y-1">
                      <h2
                        className={`font-serif-display text-3xl sm:text-4xl font-bold leading-tight tracking-tight ${theme.screenText}`}
                      >
                        {theme.primaryTitle}
                      </h2>
                      {theme.secondaryTitle && (
                        <>
                          <span className={`block font-serif-display text-xl italic ${theme.accentText}`}>
                            &amp;
                          </span>
                          <h2
                            className={`font-serif-display text-3xl sm:text-4xl font-bold leading-tight tracking-tight ${theme.screenText}`}
                          >
                            {theme.secondaryTitle}
                          </h2>
                        </>
                      )}
                    </div>

                    <p className={`font-serif-display italic text-sm mt-2 ${theme.mutedText}`}>
                      {theme.subtitleItalic}
                    </p>

                    <p className={`text-[11px] font-medium mt-3 tracking-wider uppercase ${theme.mutedText}`}>
                      {theme.eventDateLabel}
                    </p>
                  </div>

                  {/* Guest Recipient Card & Open Invitation Button */}
                  <div className="space-y-3.5 w-full max-w-[260px] mt-6">
                    <div
                      className={`${theme.cardBg} p-3.5 rounded-xl border ${theme.cardBorder} text-center shadow-xs`}
                    >
                      <p className={`text-[10px] uppercase tracking-wider ${theme.mutedText}`}>
                        Kepada Yth. Bapak/Ibu/Saudara/i
                      </p>
                      <p className={`text-sm font-semibold mt-1 ${theme.screenText}`}>
                        Bapak Hendro &amp; Keluarga
                      </p>
                    </div>

                    <button
                      onClick={handleOpenInvitation}
                      className={`w-full py-3 px-4 ${theme.buttonBg} ${theme.buttonText} text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer`}
                    >
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Buka Undangan</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* FULL OPENED INVITATION — Styled seamlessly in the exact template theme */
                <div className="space-y-7 pb-12 px-5 pt-12">
                  {/* Top Header Section */}
                  <div className={`text-center pb-6 border-b ${theme.dividerColor}`}>
                    <TemplateTopOrnament templateId={activePreviewTemplate.id} />

                    <p className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${theme.accentText}`}>
                      {activePreviewTemplate.categoryLabel}
                    </p>

                    <h1 className="font-serif-display text-3xl font-bold mt-2 leading-tight">
                      {theme.primaryTitle}
                      {theme.secondaryTitle && (
                        <>
                          <span className={`block text-lg italic font-normal ${theme.accentText}`}>
                            &amp;
                          </span>
                          {theme.secondaryTitle}
                        </>
                      )}
                    </h1>

                    <p className={`text-xs italic mt-3 leading-relaxed ${theme.mutedText}`}>
                      {theme.quoteText}
                    </p>
                  </div>

                  {/* Countdown Timer */}
                  <div className={`${theme.cardBg} p-4 rounded-2xl border ${theme.cardBorder} text-center`}>
                    <p className={`text-[11px] uppercase tracking-wider font-semibold mb-3 ${theme.accentText}`}>
                      Menghitung Hari Bahagia
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { val: timeLeft.days, label: 'Hari' },
                        { val: timeLeft.hours, label: 'Jam' },
                        { val: timeLeft.minutes, label: 'Menit' },
                        { val: timeLeft.seconds, label: 'Detik' },
                      ].map((unit, idx) => (
                        <div
                          key={idx}
                          className={`${theme.subCardBg} p-2 rounded-lg border ${theme.cardBorder}`}
                        >
                          <span className="font-serif-display text-lg font-bold tabular-nums block">
                            {unit.val}
                          </span>
                          <span className={`block text-[9px] uppercase ${theme.mutedText}`}>
                            {unit.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile Section (Bride & Groom or Baby Profile) */}
                  <div className="text-center space-y-4 py-1">
                    <div className="space-y-1">
                      <h3 className="font-serif-display text-xl font-bold">{theme.personOneName}</h3>
                      <p className={`text-xs leading-relaxed ${theme.mutedText}`}>
                        {theme.personOneDesc}
                      </p>
                    </div>

                    {theme.personTwoName ? (
                      <>
                        <div className={`font-serif-display text-2xl italic ${theme.accentText}`}>
                          &amp;
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif-display text-xl font-bold">{theme.personTwoName}</h3>
                          <p className={`text-xs leading-relaxed ${theme.mutedText}`}>
                            {theme.personTwoDesc}
                          </p>
                        </div>
                      </>
                    ) : (
                      theme.personTwoDesc && (
                        <div
                          className={`inline-block px-3 py-1.5 rounded-lg text-[11px] font-medium ${theme.subCardBg} border ${theme.cardBorder}`}
                        >
                          {theme.personTwoDesc}
                        </div>
                      )
                    )}
                  </div>

                  {/* Schedule / Event Cards */}
                  <div className="space-y-3.5">
                    {/* Event 1 */}
                    <div className={`${theme.cardBg} p-4 rounded-xl border ${theme.cardBorder} space-y-2.5`}>
                      <div className={`flex items-center justify-between border-b ${theme.dividerColor} pb-2`}>
                        <span className="font-serif-display text-base font-bold">
                          {theme.ceremonyOneTitle}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${theme.accentText}`}>
                          {theme.ceremonyOneTag}
                        </span>
                      </div>
                      <div className={`text-xs space-y-1.5 ${theme.mutedText}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-3.5 h-3.5 shrink-0 ${theme.accentText}`} />
                          <span>{theme.eventDateLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 shrink-0 ${theme.accentText}`} />
                          <span>{theme.ceremonyOneTime}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.accentText}`} />
                          <span>{theme.ceremonyOneVenue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Event 2 */}
                    <div className={`${theme.cardBg} p-4 rounded-xl border ${theme.cardBorder} space-y-2.5`}>
                      <div className={`flex items-center justify-between border-b ${theme.dividerColor} pb-2`}>
                        <span className="font-serif-display text-base font-bold">
                          {theme.ceremonyTwoTitle}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${theme.accentText}`}>
                          {theme.ceremonyTwoTag}
                        </span>
                      </div>
                      <div className={`text-xs space-y-1.5 ${theme.mutedText}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-3.5 h-3.5 shrink-0 ${theme.accentText}`} />
                          <span>{theme.eventDateLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 shrink-0 ${theme.accentText}`} />
                          <span>{theme.ceremonyTwoTime}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.accentText}`} />
                          <span>{theme.ceremonyTwoVenue}</span>
                        </div>
                      </div>

                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 w-full mt-2 py-2 text-xs font-medium rounded-lg transition-colors ${theme.buttonBg} ${theme.buttonText}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Petunjuk Lokasi Google Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Amplop Digital / Cashless Gift */}
                  <div
                    className={`${theme.giftCardBg} p-4 rounded-2xl border ${theme.giftBorder} space-y-3 ${
                      activePreviewTemplate.id === 'tpl-modern-noir' ? 'text-white' : ''
                    }`}
                  >
                    <div className="text-center space-y-1">
                      <p
                        className={`text-[10px] uppercase tracking-wider font-semibold ${
                          activePreviewTemplate.id === 'tpl-modern-noir'
                            ? 'text-stone-300'
                            : theme.accentText
                        }`}
                      >
                        Tanda Kasih
                      </p>
                      <h4 className="font-serif-display text-base font-bold">
                        Amplop Digital &amp; Hadiah
                      </h4>
                      <p
                        className={`text-[11px] ${
                          activePreviewTemplate.id === 'tpl-modern-noir'
                            ? 'text-stone-400'
                            : theme.mutedText
                        }`}
                      >
                        Doa restu Anda merupakan karunia terindah bagi kami.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {/* Bank 1 */}
                      <div
                        className={`${theme.giftItemBg} p-3 rounded-xl flex items-center justify-between border ${theme.giftBorder} text-xs`}
                      >
                        <div>
                          <span className="font-semibold block">{theme.bankOneName}</span>
                          <span className="font-mono text-xs opacity-90">{theme.bankOneNumber}</span>
                          <span className="text-[10px] opacity-75 block">a.n {theme.bankOneHolder}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(theme.bankOneNumber.replace(/\s+/g, ''), 'bank1')}
                          className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${theme.buttonBg} ${theme.buttonText}`}
                        >
                          {copiedBank === 'bank1' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
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
                      <div
                        className={`${theme.giftItemBg} p-3 rounded-xl flex items-center justify-between border ${theme.giftBorder} text-xs`}
                      >
                        <div>
                          <span className="font-semibold block">{theme.bankTwoName}</span>
                          <span className="font-mono text-xs opacity-90">{theme.bankTwoNumber}</span>
                          <span className="text-[10px] opacity-75 block">a.n {theme.bankTwoHolder}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(theme.bankTwoNumber.replace(/\s+/g, ''), 'bank2')}
                          className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${theme.buttonBg} ${theme.buttonText}`}
                        >
                          {copiedBank === 'bank2' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
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

                      {/* Couple Custom QRIS if uploaded */}
                      {coupleQris && (
                        <div className="bg-white p-3 rounded-xl text-center space-y-1.5 border border-stone-200 text-stone-900">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-800 block">
                            Scan QRIS Amplop Digital
                          </span>
                          <div className="w-36 h-36 mx-auto overflow-hidden flex items-center justify-center">
                            <img
                              src={coupleQris}
                              alt="QRIS Amplop Digital Mempelai"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive RSVP Form */}
                  <div className={`${theme.cardBg} p-4 rounded-2xl border ${theme.cardBorder} space-y-3`}>
                    <div className="text-center space-y-0.5">
                      <h4 className="font-serif-display text-base font-bold">
                        Konfirmasi Kehadiran &amp; Doa
                      </h4>
                      <p className={`text-[11px] ${theme.mutedText}`}>
                        Tuliskan doa restu dan konfirmasi kehadiran Anda
                      </p>
                    </div>

                    <form onSubmit={handleSendRsvp} className="space-y-2.5 text-xs">
                      <div>
                        <label className="block font-medium mb-1">Nama Lengkap</label>
                        <input
                          type="text"
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          placeholder="Contoh: dr. Nanda & Keluarga"
                          className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} rounded-lg text-xs focus:outline-none`}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-medium mb-1">Kehadiran</label>
                          <select
                            value={rsvpAttendance}
                            onChange={(e) =>
                              setRsvpAttendance(e.target.value as 'hadir' | 'tidak_hadir' | 'ragu')
                            }
                            className={`w-full px-2 py-2 ${theme.inputBg} border ${theme.inputBorder} rounded-lg text-xs focus:outline-none`}
                          >
                            <option value="hadir">Pasti Hadir</option>
                            <option value="ragu">Masih Ragu</option>
                            <option value="tidak_hadir">Berhalangan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-medium mb-1">Jumlah Tamu</label>
                          <select
                            value={rsvpPax}
                            onChange={(e) => setRsvpPax(e.target.value)}
                            className={`w-full px-2 py-2 ${theme.inputBg} border ${theme.inputBorder} rounded-lg text-xs focus:outline-none`}
                          >
                            <option value="1">1 Orang</option>
                            <option value="2">2 Orang</option>
                            <option value="3">3 Orang</option>
                            <option value="4">4 Orang</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium mb-1">Ucapan &amp; Doa</label>
                        <textarea
                          value={rsvpMsg}
                          onChange={(e) => setRsvpMsg(e.target.value)}
                          rows={2}
                          placeholder="Tulis ucapan selamat dan doa..."
                          className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} rounded-lg text-xs focus:outline-none`}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className={`w-full py-2.5 ${theme.buttonBg} ${theme.buttonText} rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Konfirmasi &amp; Doa</span>
                      </button>

                      {rsvpSent && (
                        <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 text-center rounded-lg font-medium text-[11px]">
                          Terima kasih! Ucapan Anda telah tampil di bawah.
                        </div>
                      )}
                    </form>

                    {/* Live Feed List */}
                    <div className={`border-t ${theme.dividerColor} pt-3 space-y-2 max-h-44 overflow-y-auto`}>
                      <p className={`text-[10px] uppercase font-semibold tracking-wider ${theme.mutedText}`}>
                        Doa &amp; Ucapan ({rsvpList.length})
                      </p>
                      {rsvpList.map((item) => (
                        <div
                          key={item.id}
                          className={`p-2.5 ${theme.subCardBg} rounded-lg border ${theme.cardBorder} text-xs`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">{item.name}</span>
                            <span className={`text-[10px] ${theme.mutedText}`}>{item.timestamp}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${theme.mutedText}`}>
                            {item.message}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[10px]">
                            <span className={`font-medium ${theme.accentText}`}>
                              {item.attendance === 'hadir' ? 'Hadir' : 'Doa Restu'}
                            </span>
                            <button
                              onClick={() => handleLikeRsvp(item.id)}
                              className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
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
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>Audio Latar:</span>
            <span className="text-stone-200 font-medium">{activePreviewTemplate.audioTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md hover:bg-stone-800 text-stone-300 cursor-pointer"
            >
              Kembali ke Katalog
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectTemplate(activePreviewTemplate.id);
              }}
              className="px-5 py-2 rounded-md bg-stone-100 hover:bg-white text-stone-900 font-semibold cursor-pointer"
            >
              Pesan Desain Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
