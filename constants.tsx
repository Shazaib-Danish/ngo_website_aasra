export const COLORS = {
  primary: '#0A7A71',
  secondary: '#08665E',
  accent: '#FF5E36',
  mint: '#2DD4BF',
  gold: '#F59E0B',
  dark: '#021B18',
  white: '#ffffff',
  paper: '#F8FAF9',
  slate: '#f1f5f9'
};

export const CONTACT_INFO = {
  phone: '+92 321 111 2447',
  phone1: '+92 321 111 2448',
  whatsapp: '923211112447',
  whatsappDisplay: '+92 321 111 2447',
  email: 'info@aasra-welfare.org',
  address: '80, Nargis Block, Allama Iqbal Town, Lahore, Pakistan.',
  mapUrl: 'https://maps.app.goo.gl/Zo5XBgNfBs6TmLfE6',
  currency: 'PKR',
  taxExempt: true,
  registrationNumbers: [
    'Govt of Punjab: DO.SW.LHR(R&G)08-1564',
    'Charity Commission: PB-LHR-8081727259287789',
    'FBR (NTN): 4547488'
  ],
};

export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=9105500684535685068';

export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/aasra.welfare.s' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/aasrawelfare_society' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/company/aasra-welfare-society-lahore' },
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', url: 'https://www.tiktok.com/@aasra_welfare_society' },
  { name: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/@aasra_welfare_society' },
];

export const BANK_DETAILS = {
  bankName: 'Bank Makramah Ltd.',
  logo: '/images/branding/bank-logo.webp',
  accountTitle: 'Aasra Welfare Society',
  accountNumber: '01994426001714134112',
  iban: 'PK56SUMB9944207140134112',
  branch_code: '134',
  branch: 'Kashmir Block Allama Iqbal Town Lahore'
};

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  pkrRate: number; // 1 unit in PKR
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', pkrRate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', pkrRate: 279 },
  { code: 'GBP', symbol: '£', name: 'British Pound', pkrRate: 355 },
  { code: 'EUR', symbol: '€', name: 'Euro', pkrRate: 304 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', pkrRate: 74.4 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', pkrRate: 76.0 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', pkrRate: 205 },
];

export interface ImpactTier {
  id: string;
  title: string;
  category: 'Orphan Care' | 'Clean Water' | 'Emergency' | 'Food Support';
  amountPKR: number;
  description: string;
  badge?: string;
  icon: string;
}

export const IMPACT_TIERS: ImpactTier[] = [
  {
    id: 'orphan-month',
    title: 'Sponsor 1 Orphan (Monthly)',
    category: 'Orphan Care',
    amountPKR: 30000,
    description: 'Complete boarding, 3 nutritious meals/day, formal private schooling, healthcare & tutoring.',
    badge: 'Most Needed',
    icon: 'fa-child-reaching',
  },
  {
    id: 'meal-person',
    title: 'Food for 1 Person',
    category: 'Food Support',
    amountPKR: 300,
    description: 'Provides a wholesome nutritious hot meal to a starving child or daily-wage worker.',
    badge: 'Quick Sadaqah',
    icon: 'fa-bowl-food',
  },
  {
    id: 'food-pack',
    title: 'Monthly Food Ration Pack',
    category: 'Food Support',
    amountPKR: 5000,
    description: 'Flour, rice, pulses, cooking oil, and essentials sustaining a family in need for a full month.',
    icon: 'fa-box-open',
  },
  {
    id: 'hand-pump',
    title: 'Dedicated Clean Water Hand Pump',
    category: 'Clean Water',
    amountPKR: 60000,
    description: 'Complete installation of an inscribed heavy-duty hand pump serving 40+ families daily.',
    badge: 'Sadaqah Jariyah',
    icon: 'fa-faucet-drip',
  },
  {
    id: 'solar-pump',
    title: 'Solar Water Pump Project',
    category: 'Clean Water',
    amountPKR: 300000,
    description: 'Deep solar-powered submersible water extraction system serving entire drought-hit villages.',
    badge: 'High Impact',
    icon: 'fa-solar-panel',
  },
  {
    id: 'orphan-year',
    title: 'Sponsor 1 Orphan (1 Year)',
    category: 'Orphan Care',
    amountPKR: 360000,
    description: 'Full 12 months of holistic development, boarding, quality education, medical care, and dignity.',
    badge: 'Transformative',
    icon: 'fa-graduation-cap',
  },
];

export const NISAB_SETTINGS = {
  goldGrams: 87.48,
  silverGrams: 612.36,
  goldRatePKRPerGram: 24600, // estimated current Pakistani gold rate
  silverRatePKRPerGram: 310,   // estimated current Pakistani silver rate
};
