export interface ShowcaseCase {
  id: string;
  title: string;
  subtitle: string;
  category: 'birthday18_21' | 'baby' | 'elder';
  categoryLabel: string;
  tag?: string;
  description: string;
  features: string[];
  suitableFor: string;
  image: string;
  images?: string[];
  palette: string[];
  dimensions?: string;
  includedItems: string[];
}

export interface PackageAddon {
  id: string;
  name: string;
  price: number;
  unit: string;
  maxQuantity?: number;
  description?: string;
}

export interface DecorationPackage {
  id: string;
  code: string;
  name: string;
  chineseTitle: string;
  highlight: string;
  basePrice: number;
  specs: string[];
  includedList: string[];
  addons: PackageAddon[];
  tag: string;
  popular?: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  packageId: string;
  eventType: string;
  venueType: string;
  guestCount: string;
  selectedAddons: { [addonId: string]: number };
  notes: string;
}
