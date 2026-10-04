export interface Template {
  id: string;
  title: string;
  category: 'romantic' | 'luxury' | 'botanical' | 'minimalist' | 'islamic' | 'aqiqah';
  categoryLabel: string;
  theme: string;
  colorPalette: string[];
  previewImg: string;
  audioTitle: string;
  description: string;
  popular?: boolean;
  features: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
  features: string[];
  activePeriod: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface OrderData {
  orderId: string;
  templateId: string;
  packageId: string;
  selectedAddOns: string[];
  discountCode: string;
  discountAmount: number;
  uniquePaymentCode: number;
  
  // Event details
  eventType: 'pernikahan' | 'tunangan' | 'khitanan' | 'aqiqah' | 'ulang_tahun';
  groomName: string;
  groomNickname: string;
  groomParents: string;
  brideName: string;
  brideNickname: string;
  brideParents: string;
  
  // Date & Venue
  eventDate: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;
  resepsiTime: string;
  resepsiVenue: string;
  resepsiAddress: string;
  googleMapsUrl: string;
  loveStoryTitle: string;
  loveStoryText: string;
  
  // Amplop digital
  bankAccounts: BankAccount[];
  
  // Customer contact
  customerName: string;
  customerWhatsApp: string;
  customerEmail: string;
  
  // Payment
  paymentMethod: 'qris' | 'va_bca' | 'va_mandiri' | 'va_bri' | 'gopay' | 'shopeepay';
  paymentStatus: 'pending' | 'verifying' | 'paid';
  createdAt: string;
}

export interface RSVPItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  pax: number;
  message: string;
  timestamp: string;
  likes: number;
}
