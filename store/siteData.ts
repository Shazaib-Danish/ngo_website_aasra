import { Program, GalleryItem, Achievement, Stats, HeroSlide, Review } from '../types';

// Builds an ordered list of image paths for a category folder, e.g.
// range('orphanage', 'orphanage', 21) -> ['/images/orphanage/orphanage-01.webp', ...]
const range = (folder: string, prefix: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/images/${folder}/${prefix}-${String(i + 1).padStart(2, '0')}.webp`);

const ORPHANAGE_PHOTOS = range('orphanage', 'orphanage', 31);
const WATER_PHOTOS = range('water-projects', 'water-project', 16);
const FLOOD_PHOTOS = range('flood-relief', 'flood-relief', 19);
const RELIEF_PHOTOS = range('relief-work', 'relief-work', 9);

export const STATS: Stats = {
  orphans: 32,
  waterProjects: 170,
  mealsServed: 5000,
  beneficiaries: 12000,
};

export const PROGRAMS: Program[] = [
  {
    id: 'orphan-care',
    title: 'Orphan Care & Education',
    tagline: 'Shelter, schooling and family for children without one.',
    description: 'Providing safe shelter, quality education, nutritious meals and religious upbringing to orphaned and vulnerable children.',
    longDescription: [
      'AASRA Welfare Society runs a dedicated orphan care home in Lahore, currently supporting more than 32 children who have lost one or both parents. Every child under our care receives a safe place to live, three nutritious meals a day, and access to formal schooling alongside Islamic education.',
      'Beyond the basics, we invest in each child’s long-term future through tutoring support, extracurricular activities, annual result celebrations, and regular health check-ups. Our goal is not just to shelter children, but to raise confident, educated individuals who can stand on their own feet.',
      'Every donation to this program is used directly for boarding costs, school fees, uniforms, books and healthcare for the children in our care.',
    ],
    image: '/images/orphanage/orphanage-16.webp',
    homeImage: '/images/home/moments-orphanage-care.webp',
    icon: 'fa-child-reaching',
    gallery: ORPHANAGE_PHOTOS,
    goalPKR: 10000000,
    raisedPKR: 2500000,
    unitCosts: [
      { label: 'Monthly Sponsorship', amountPKR: 30000 },
      { label: 'Annual Sponsorship', amountPKR: 360000 },
    ],
  },
  {
    id: 'clean-water',
    title: 'Clean Water Projects',
    tagline: 'Hand pumps and clean water points for underserved villages.',
    description: 'Installing hand pumps and solar water points in flood-affected and water-scarce villages across Punjab so families no longer have to walk for clean water.',
    longDescription: [
      'Access to clean drinking water remains one of the biggest challenges for rural communities across Pakistan, especially in areas recovering from flooding. AASRA Welfare Society has installed and handed over more than 170 water hand pumps and water points to date, each one numbered, documented, and dedicated in the name of the donor or their loved ones.',
      'Every installation is completed with the local community present, and each pump comes with a plaque recording the project number so donors can track exactly where their contribution went. We prioritise villages with no existing safe water source, working closely with local elders to identify the most urgent locations.',
      'A single water pump can serve dozens of families for years, making this one of the most sustainable and cost-effective forms of charity (Sadaqah Jariyah) you can give.',
    ],
    image: '/images/water-projects/water-project-04.webp',
    homeImage: '/images/home/moments-water-projects.webp',
    icon: 'fa-faucet-drip',
    gallery: WATER_PHOTOS,
    goalPKR: 3000000,
    raisedPKR: 500000,
    unitCosts: [
      { label: 'Dedicated Hand Pump', amountPKR: 60000 },
      { label: 'Solar Submersible Pump', amountPKR: 300000 },
    ],
  },
  {
    id: 'relief-work',
    title: 'Community Relief & Food Support',
    tagline: 'Standing with vulnerable families in everyday hardship.',
    description: 'On-ground community outreach, ration distribution, daily cooked meals and support for widows, daily-wage workers and families living below the poverty line.',
    longDescription: [
      'Not every hardship makes headlines. Alongside our emergency response work, AASRA Welfare Society runs ongoing community relief operations — visiting villages and settlements to distribute food rations, meet with families in need, and connect them with our other programs such as orphan sponsorship and water projects.',
      'Our field teams work directly with communities, listening to their needs and ensuring that support reaches the households that need it most, with full transparency and no middlemen.',
    ],
    image: '/images/relief-work/relief-work-01.webp',
    homeImage: '/images/home/moments-food-relief.webp',
    icon: 'fa-bowl-food',
    gallery: RELIEF_PHOTOS,
    goalPKR: 2000000,
    raisedPKR: 400000,
    unitCosts: [
      { label: 'Food for 1 Person', amountPKR: 300 },
      { label: 'Monthly Ration Pack', amountPKR: 5000 },
    ],
  },
  {
    id: 'flood-relief',
    title: 'Flood Relief & Emergency Response',
    tagline: 'Rapid, on-ground response when disaster strikes.',
    description: 'Emergency tents, ration packs, clean water and rebuilding support delivered directly to families affected by flooding across Punjab and Sindh.',
    longDescription: [
      'When floods devastate a region, AASRA Welfare Society teams are among the first on the ground — assessing damage, distributing emergency tents and ration packs, and setting up temporary water points in affected villages.',
      'Our relief response goes beyond the immediate emergency. We follow up with rehabilitation work, including rebuilding damaged community structures such as mosques and shared facilities, and distributing essentials like blankets, hygiene kits and cooked meals to displaced families.',
      'In recent flood response operations we distributed ration packs and clean water to hundreds of families, and continue to support rehabilitation efforts long after the initial emergency has passed.',
    ],
    image: '/images/flood-relief/flood-relief-13.webp',
    icon: 'fa-house-flood-water',
    gallery: FLOOD_PHOTOS,
    goalPKR: 5000000,
    raisedPKR: 3200000,
    unitCosts: [
      { label: 'Emergency Kit', amountPKR: 25000 },
      { label: 'Shelter Tent', amountPKR: 15000 },
    ],
  },
];

// Hero section: one entry per 4:5 poster slide. Drives both the poster image
// and the heading/subheading/CTA text in the left column of the hero.
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'orphan-care',
    poster: '/images/home/hero-orphan-poster.webp',
    eyebrow: 'Sponsor an Orphan',
    title: 'Give a Child Back Their',
    highlight: 'Childhood & Their Future',
    subtitle: 'Full boarding, quality schooling, healthcare and a loving home for 32+ orphaned children. For ₨30,000 a month, you can sponsor a child’s entire future.',
    donateUrl: '/donate?amount=30000&cause=Orphan%20Care%20%26%20Education&category=Orphan%20Care',
  },
  {
    id: 'clean-water',
    poster: '/images/home/hero-water-poster.webp',
    eyebrow: 'Install a Water Point',
    title: 'Turn Thirst Into',
    highlight: 'Lasting Hope',
    subtitle: 'One dedicated hand pump brings safe, clean water to 40+ families for years to come. Install a water point today as an everlasting Sadaqah Jariyah.',
    donateUrl: '/donate?amount=60000&cause=Clean%20Water%20Projects&category=Clean%20Water',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Clean Water Project Inauguration',
    text: 'Community dua ceremony marking the handover of a new hand pump, one of over 170 water points installed by AASRA across Punjab.',
    image: '/images/achievements/water-project-dua.webp',
    date: '2025',
  },
  {
    id: '2',
    title: 'Wheelchair Distribution Recognition',
    text: 'Recognised alongside allied welfare organisations for distributing wheelchairs to persons with disabilities in flood-affected communities.',
    image: '/images/achievements/wheelchair-award.webp',
    date: '2025',
  },
  {
    id: '3',
    title: 'Annual Result & Achievement Day',
    text: 'Our orphan students were celebrated for their academic achievements at the annual result day ceremony, held with games, prizes and gifts.',
    image: '/images/achievements/annual-result-day.webp',
    date: '2025',
  },
];

const buildGallery = (folder: string, files: string[], category: string, captions: string[]): GalleryItem[] =>
  files.map((url, i) => ({
    id: `${folder}-${i + 1}`,
    url,
    category,
    title: captions[i % captions.length],
  }));

export const GALLERY: GalleryItem[] = [
  ...buildGallery('orphanage', ORPHANAGE_PHOTOS, 'Orphan Care', [
    'Life at the Orphan Care Home',
    'Learning Together',
    'Shared Meals, Shared Family',
    'Celebrating Achievements',
    'A Safe Place to Grow',
    'School Days',
  ]),
  ...buildGallery('water-projects', WATER_PHOTOS, 'Clean Water', [
    'Clean Water Handover',
    'Hand Pump Installation',
    'Water for Every Home',
    'Community Water Point',
    'Dua Ceremony at a New Well',
  ]),
  ...buildGallery('flood-relief', FLOOD_PHOTOS, 'Flood Relief', [
    'Flood Relief Response',
    'Assessing the Damage',
    'Emergency Aid Distribution',
    'Standing With Flood-Hit Families',
    'Field Relief Operations',
    'Rebuilding After the Flood',
  ]),
  ...buildGallery('relief-work', RELIEF_PHOTOS, 'Relief Work', [
    'Community Outreach',
    'Field Visit',
    'Serving the Community',
    'Relief Work in Progress',
  ]),
];

// Curated highlights for the homepage "Moments of Hope" photo wall.
export const MOMENTS: GalleryItem[] = [
  { id: 'moments-1', url: '/images/home/moments-orphanage-care.webp', category: 'Orphan Care', title: 'Orphan Care & Education' },
  { id: 'moments-2', url: '/images/home/moments-water-projects.webp', category: 'Clean Water', title: 'Clean Water Projects' },
  { id: 'moments-3', url: '/images/home/moments-food-relief.webp', category: 'Food Relief', title: 'Food & Ration Relief' },
  { id: 'moments-4', url: '/images/home/moments-gallery-01.webp', category: 'Impact', title: 'Moments of Hope' },
  { id: 'moments-5', url: '/images/home/moments-gallery-02.webp', category: 'Impact', title: 'Moments of Hope' },
  { id: 'moments-6', url: '/images/home/moments-gallery-03.webp', category: 'Impact', title: 'Moments of Hope' },
  { id: 'moments-7', url: '/images/home/moments-gallery-04.webp', category: 'Impact', title: 'Moments of Hope' },
  { id: 'moments-8', url: '/images/home/moments-gallery-05.webp', category: 'Impact', title: 'Moments of Hope' },
  { id: 'moments-9', url: '/images/home/moments-gallery-06.webp', category: 'Impact', title: 'Moments of Hope' },
];

// Real visitor & donor reviews from Google, shown on the homepage.
export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Tabasum Soomro',
    rating: 5,
    date: '3 weeks ago',
    text: 'Visited Asra Welfare Orphanage today. Peaceful environment, neat & clean, and the children were so polite & smiling. Truly heartwarming. May Allah bless all who serve them. Support this wonderful place.',
    avatar: '/images/reviews/review-01.webp',
  },
  {
    id: '2',
    name: 'Abdullah Chaudhary',
    rating: 5,
    date: '6 months ago',
    text: 'Our visit to AASRA Welfare Organisation was truly a heart-touching and inspiring experience. The love, care, and dedication shown towards the children reflect the genuine mission behind this organization. It was wonderful to see how a nurturing environment is being created where every child feels valued and supported.',
    avatar: '/images/reviews/review-02.webp',
  },
  {
    id: '3',
    name: 'Areesha Haider',
    rating: 5,
    date: '3 weeks ago',
    text: 'It was really fun interacting with each and every kid. Very well mannered and enthusiastic students and I wish them the best.',
    avatar: '/images/reviews/review-03.webp',
  },
  {
    id: '4',
    name: 'Ibrahim Muhammad',
    rating: 5,
    date: '3 months ago',
    text: 'I recently visited them. Best orphanage I’ve ever seen. They literally train kids Karate, Quran, skills, school, translation of Quran. Everything has its own separate teacher and timing. Every donor should visit them.',
    avatar: '/images/reviews/review-04.webp',
  },
  {
    id: '5',
    name: 'Muhammad Saqib',
    rating: 5,
    date: '6 months ago',
    text: 'Very good experience visiting this place. They take good care of the children and their education. May Allah bless this foundation.',
    avatar: '/images/reviews/review-05.webp',
  },
  {
    id: '6',
    name: 'Salman Anees',
    rating: 5,
    date: '5 months ago',
    text: 'Very great initiative. Environment was great. All the children are so sweet. Donate to AASRA Welfare Society as much as you can.',
    avatar: '/images/reviews/review-06.webp',
  },
  {
    id: '7',
    name: 'Usama Butt',
    rating: 5,
    date: '6 months ago',
    text: 'Spent quality time here with the children, hats off to Aasra team, they are really doing a wonderful job. May Allah bless them for this kindness.',
    avatar: '/images/reviews/review-07.webp',
  },
  {
    id: '8',
    name: 'Ayesha Shabbir',
    rating: 5,
    date: '5 months ago',
    text: 'It was a great experience here, kids here were all well-mannered and active, their academic results were also amazing, all the kids here are active and well behaved, it is all handled well.',
    avatar: '/images/reviews/review-08.webp',
  },
  {
    id: '9',
    name: 'Ayyan Ahmad',
    rating: 5,
    date: '4 months ago',
    text: 'We had a great time with the children, the staff was so kind and friendly. Sincerely, from Punjab University.',
    avatar: '/images/reviews/review-09.webp',
  },
  {
    id: '10',
    name: 'Muhammad Ahsen',
    rating: 5,
    date: '6 months ago',
    text: 'Peaceful and admitting place for people who don’t have their own home. Seems to be like their first home. Amazing people.',
    avatar: '/images/reviews/review-10.webp',
  },
];
