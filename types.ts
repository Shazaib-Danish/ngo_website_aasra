
export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string[];
  image: string;
  homeImage?: string;
  icon: string;
  gallery: string[];
  goalPKR: number;
  raisedPKR: number;
  unitCosts?: { label: string; amountPKR: number }[];
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
  title: string;
}

export interface SliderImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

export interface HeroSlide {
  id: string;
  poster: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  donateUrl: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export interface Achievement {
  id: string;
  title: string;
  text: string;
  image: string;
  date: string;
}

export interface Stats {
  orphans: number;
  waterProjects: number;
  mealsServed: number;
  beneficiaries: number;
}
