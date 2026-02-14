
import { Program, Post, GalleryItem, TeamMember, SliderImage, Stats, Campaign, Achievement } from '../types';

export const initialPrograms: Program[] = [
  {
    id: '1',
    title: 'Orphan Care Program',
    description: 'Providing safe shelter, quality education, and nutritious food to children without guardians.',
    longDescription: 'Our orphan care program currently houses over 50 children in a modern facility. We focus on holistic development including private schooling, sports, and religious education.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    icon: 'fa-child'
  },
  {
    id: '2',
    title: 'Clean Water Initiative',
    description: 'Installing solar-powered pumps and deep wells in water-scarce regions of Tharparkar and Balochistan.',
    longDescription: 'AASRA has successfully installed over 150 water wells, providing clean drinking water to remote villages where women previously walked daily for water.',
    image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop',
    icon: 'fa-faucet-drip'
  },
  {
    id: '3',
    title: 'Food Distribution',
    description: 'Weekly meal drives and monthly ration packs for vulnerable families living below the poverty line.',
    longDescription: 'We distribute hot meals every Friday and provide monthly grocery packs to 500+ registered families, ensuring no child goes to bed hungry.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop',
    icon: 'fa-bowl-food'
  },
  {
    id: '4',
    title: 'Women Empowerment',
    description: 'Skill training centers teaching sewing and digital literacy to help widows gain financial independence.',
    longDescription: 'Our centers offer 6-month certified courses in tailoring and computer skills, followed by assistance in starting small home-based businesses.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    icon: 'fa-hand-holding-heart'
  }
];

export const initialPosts: Post[] = [
  {
    id: '1',
    title: 'New Water Well Inaugurated in Tharparkar',
    excerpt: 'Witness the joy of 200 families receiving clean water for the first time in decades.',
    content: 'Our latest solar-powered water pump is now operational, serving a community that previously had to travel 5km for brackish water.',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=2074&auto=format&fit=crop',
    date: 'Oct 24, 2023',
    category: 'Water'
  },
  {
    id: '2',
    title: 'Ramadan Ration Drive 2024: Our Goal',
    excerpt: 'Help us reach 2,000 families this holy month. Your Zakat can feed a family for a month.',
    content: 'We are preparing ration packs containing flour, oil, sugar, and pulses to be distributed across five districts.',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop',
    date: 'Nov 10, 2023',
    category: 'Food'
  },
  {
    id: '3',
    title: 'Winter Relief: Distributing Blankets',
    excerpt: 'Our team reached remote areas of Balochistan to provide warmth to those in need.',
    content: 'Over 1,000 high-quality blankets were distributed to families living in makeshift shelters during the cold snap.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    date: 'Dec 15, 2023',
    category: 'Relief'
  },
  {
    id: '4',
    title: 'Women Graduating from Vocational Center',
    excerpt: '20 widows successfully completed our six-month tailoring and embroidery course.',
    content: 'Each graduate was gifted a sewing machine to start her own business and support her children with dignity.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    date: 'Jan 05, 2024',
    category: 'Empowerment'
  }
];

export const initialGallery: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop', category: 'Orphans', title: 'Eid Celebrations' },
  { id: '2', url: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop', category: 'Water', title: 'Deep Well Installation' },
  { id: '3', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop', category: 'Food', title: 'Dastarkhwan Activity' },
  { id: '4', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop', category: 'Orphans', title: 'Classroom Learning' },
  { id: '5', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', category: 'Women', title: 'Sewing Workshop' },
  { id: '6', url: 'https://images.unsplash.com/photo-1511949863663-92c5c06824c2?q=80&w=2070&auto=format&fit=crop', category: 'Water', title: 'Solar Pump Project' },
];

export const initialTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Ahmad Salman',
    role: 'Chief Patron',
    bio: 'Dedicated to social welfare for 25 years, overseeing the strategic vision of AASRA.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Khan',
    role: 'President',
    bio: 'Leading operational excellence and community engagement programs since 2018.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Usman Ali',
    role: 'Board Director',
    bio: 'Financial strategist ensuring transparency and maximum impact of every donor cent.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Zoya Baig',
    role: 'Project Manager',
    bio: 'Oversees on-ground project execution and community relations in remote areas.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Bilal Hassan',
    role: 'Head of Logistics',
    bio: 'Expert in supply chain management for food and relief distribution across Pakistan.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Maria Qureshi',
    role: 'Medical Advisor',
    bio: 'Volunteer physician ensuring healthcare standards in our orphanages and camps.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop'
  }
];

export const initialSliders: SliderImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    title: 'Building a Better Tomorrow',
    subtitle: 'One Life at a Time. Your support creates hope.'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop',
    title: 'Pure Water, Pure Hearts',
    subtitle: 'Bringing life-giving resources to thirsty communities.'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop',
    title: '"Charity does not decrease wealth"',
    subtitle: 'Investing in the hereafter. Your Saddaqa changes lives forever. — Sahih Muslim'
  }
];

export const initialStats: Stats = {
  orphans: 50,
  waterWells: 150,
  mealsServed: 12000,
  projects: 8
};

export const initialCampaigns: Campaign[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop',
    title: 'Ramadan 2024: Feed a Family',
    link: '/donate'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    title: 'Orphan Education Fund',
    link: '/programs/1'
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Excellence in Welfare Award 2023',
    text: 'AASRA was recognized for its outstanding contribution to community uplift and transparent operations by the National Charity Board.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1000&auto=format&fit=crop',
    date: 'Dec 2023'
  },
  {
    id: '2',
    title: '150th Water Well Milestone',
    text: 'In mid-2023, we successfully inaugurated our 150th deep water well, providing clean water to over 30,000 residents across Pakistan.',
    image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1000&auto=format&fit=crop',
    date: 'July 2023'
  },
  {
    id: '3',
    title: 'Holistic Orphanage Expansion',
    text: 'We doubled our capacity to house 50+ children in a new purpose-built facility equipped with digital labs and libraries.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop',
    date: 'March 2023'
  }
];
