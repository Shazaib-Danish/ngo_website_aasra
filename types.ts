
export interface Program {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  icon: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
  title: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface SliderImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

export interface Campaign {
  id: string;
  imageUrl: string;
  title: string;
  link: string;
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
  waterWells: number;
  mealsServed: number;
  projects: number;
}

export interface ChatMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: any;
  status: 'new' | 'read' | 'replied';
}
