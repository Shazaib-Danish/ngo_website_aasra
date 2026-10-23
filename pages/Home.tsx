import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HERO_SLIDES, STATS, ACHIEVEMENTS, PROGRAMS, MOMENTS, REVIEWS } from '../store/siteData';
import { IMPACT_TIERS, NISAB_SETTINGS, CONTACT_INFO, BANK_DETAILS, GOOGLE_REVIEWS_URL } from '../constants';
import { useSEO } from '../hooks/useSEO';

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 1800,
  suffix = '+',
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation(['home', 'programs']);
  const [activeSlide, setActiveSlide] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const methodsRef = useRef<HTMLDivElement>(null);
  const [activeMethod, setActiveMethod] = useState(0);

  // Which donation card is centred in the mobile swipe row (RTL scrollLeft is negative, hence abs).
  const handleMethodsScroll = () => {
    const el = methodsRef.current;
    if (!el || !el.children.length) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    setActiveMethod(Math.min(el.children.length - 1, Math.round(Math.abs(el.scrollLeft) / step)));
  };

  const scrollToMethod = (idx: number) => {
    const card = methodsRef.current?.children[idx] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  useSEO({
    path: '/',
    title: 'Aasra Welfare Society | Donate to Orphans, Clean Water & Flood Relief in Pakistan',
    description: 'Registered Pakistani NGO providing orphan care & education, clean water hand pumps, food relief and flood relief. Donate Zakat & Sadaqah online — 100% direct impact, trusted by donors worldwide.',
    keywords: 'Aasra Welfare Society, donate to orphans Pakistan, Zakat donation online, Sadaqah donation online, NGO Pakistan, charity Pakistan, clean water charity, flood relief donation, Islamic charity, orphan sponsorship Pakistan, donate online Pakistan NGO, charity organization Lahore, international donation Pakistan, non profit organization Pakistan',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CONTACT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const silverNisabPKR = Math.round(NISAB_SETTINGS.silverGrams * NISAB_SETTINGS.silverRatePKRPerGram);

  const currentSlide = HERO_SLIDES[activeSlide];
  const slideTitle = t(`home:hero.slides.${currentSlide.id}.title`, currentSlide.title);
  const slideHighlight = t(`home:hero.slides.${currentSlide.id}.highlight`, currentSlide.highlight);
  const slideSubtitle = t(`home:hero.slides.${currentSlide.id}.subtitle`, currentSlide.subtitle);
  const slideEyebrow = t(`home:hero.slides.${currentSlide.id}.eyebrow`, currentSlide.eyebrow);

  const heroCTAs = (
    <>
      <Link
        to={currentSlide.donateUrl}
        className="px-8 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-accent to-accent-600 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3"
      >
        <i className="fa-solid fa-heart text-sm"></i>
        <span>{t('home:hero.donateNow')}</span>
      </Link>

      <Link
        to="/programs"
        className="px-8 py-4 rounded-full font-semibold text-base text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all flex items-center gap-2.5"
      >
        <span>{t('home:hero.explorePrograms')}</span>
        <i className="fa-solid fa-arrow-right text-xs"></i>
      </Link>
    </>
  );

  return (
    <div className="overflow-hidden bg-paper">
      {/* 1. HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-8 pb-16 overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-brand-400/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-accent/15 rounded-full blur-[160px] pointer-events-none"></div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Heading & Messaging */}
            <div className="lg:col-span-7 space-y-6 text-white">
              {/* Glowing Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-neon-mint shadow-inner">
                <span className="w-2 h-2 rounded-full bg-neon-mint animate-ping"></span>
                <span>{t('home:hero.badge')}</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-[4.2rem] leading-[1.08] tracking-tight text-white drop-shadow-sm transition-all duration-500">
                {slideTitle}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-mint via-brand-200 to-amber-300">
                  {slideHighlight}
                </span>
              </h1>

              <p className="text-white/85 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl transition-all duration-500">
                {slideSubtitle}
              </p>

              <div className="hidden lg:flex flex-wrap items-center gap-4 pt-2">
                {heroCTAs}
              </div>
            </div>

            {/* Right Column: 4:5 Poster Slider — image only, no overlays or controls */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/30 bg-brand-950">
                  {HERO_SLIDES.map((slide, idx) => (
                    <img
                      key={slide.id}
                      src={slide.poster}
                      alt={`${t(`home:hero.slides.${slide.id}.title`, slide.title)} ${t(`home:hero.slides.${slide.id}.highlight`, slide.highlight)}`}
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-out ${
                        idx === activeSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>

                {/* Poster Dots Indicator */}
                <div className="flex items-center justify-center gap-2 mt-3.5">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={t(`home:hero.slides.${slide.id}.eyebrow`, slide.eyebrow)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeSlide
                          ? 'w-8 bg-neon-mint shadow-xs'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Mobile-only CTAs: shown below the poster slider */}
              <div className="lg:hidden flex flex-wrap items-center justify-center gap-4 pt-6 w-full max-w-[340px] sm:max-w-[380px]">
                {heroCTAs}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FUTURISTIC LIVE IMPACT BENTO GRID */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* Bento Card 1: Orphans */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-line shadow-xl flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand">{t('home:stats.orphanCare')}</span>
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-child-reaching"></i>
              </div>
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
                <CountUp end={STATS.orphans} />
              </p>
              <p className="text-xs sm:text-sm text-ink-soft mt-1">{t('home:stats.orphanCareDesc')}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[11px] text-brand font-semibold">
              <span>{t('home:stats.lahoreHome')}</span>
              <span className="text-accent">{t('home:stats.ongoingCare')}</span>
            </div>
          </div>

          {/* Bento Card 2: Water Projects */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-line shadow-xl flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-neon-emerald">{t('home:stats.cleanWater')}</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-faucet-drip"></i>
              </div>
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
                <CountUp end={STATS.waterProjects} />
              </p>
              <p className="text-xs sm:text-sm text-ink-soft mt-1">{t('home:stats.waterDesc')}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
              <span>{t('home:stats.numberedPlaques')}</span>
              <span>{t('home:stats.sadaqahJariyah')}</span>
            </div>
          </div>

          {/* Bento Card 3: Meals & Rations */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-line shadow-xl flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-accent">{t('home:stats.foodRelief')}</span>
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-accent flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-bowl-food"></i>
              </div>
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
                <CountUp end={STATS.mealsServed} />
              </p>
              <p className="text-xs sm:text-sm text-ink-soft mt-1">{t('home:stats.foodDesc')}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[11px] text-accent font-semibold">
              <span>{t('home:stats.widowsNeedy')}</span>
              <span>{t('home:stats.directHandover')}</span>
            </div>
          </div>

          {/* Bento Card 4: Lives Reached */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-line shadow-xl flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">{t('home:stats.totalBeneficiaries')}</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-users"></i>
              </div>
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
                <CountUp end={STATS.beneficiaries} />
              </p>
              <p className="text-xs sm:text-sm text-ink-soft mt-1">{t('home:stats.beneficiariesDesc')}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[11px] text-blue-700 font-semibold">
              <span>{t('home:stats.punjabSindh')}</span>
              <span>{t('home:stats.audited')}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2b. ORPHAN SPONSORSHIP SPOTLIGHT */}
      <section className="pt-16 md:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 shadow-2xl ring-1 ring-white/10">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/30 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-neon-mint/20 blur-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12">

            {/* Left: Sponsorship Image */}
            <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 lg:pr-0">
              <div className="relative h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden border border-white/15 shadow-xl group">
                <img
                  src="/images/home/sponsorhip_image.png"
                  alt={t('home:sponsorship.eyebrow')}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-brand-800 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold">
                  <i className="fa-solid fa-heart text-accent"></i>
                  <span>{t('home:sponsorship.eyebrow')}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-neon-mint/20 text-neon-mint flex items-center justify-center">
                    <i className="fa-solid fa-shield-heart"></i>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm leading-tight">{t('home:sponsorship.imageBadge')}</p>
                    <p className="text-xs text-white/75">{t('home:sponsorship.imageCaption')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Title, Prices & Breakdown */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:p-12 text-white flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 border border-accent/40 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-accent-200">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                {t('home:sponsorship.eyebrow')}
              </span>

              <h2 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl xl:text-5xl leading-[1.12]">
                {t('home:sponsorship.title')}{' '}
                <span className="bg-gradient-to-r from-neon-mint to-brand-200 bg-clip-text text-transparent">
                  {t('home:sponsorship.titleHighlight')}
                </span>
              </h2>
              <p className="mt-3 text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
                {t('home:sponsorship.subtitle')}
              </p>

              {/* Price block */}
              <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-3">
                <div>
                  <p className="font-heading font-extrabold text-4xl sm:text-5xl leading-none tracking-tight">
                    PKR 30,000
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/70 font-semibold">{t('home:sponsorship.perMonth')}</p>
                </div>
                <div className="flex gap-2 pb-1">
                  <span className="rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 font-heading font-extrabold text-base sm:text-lg">≈ €95</span>
                  <span className="rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 font-heading font-extrabold text-base sm:text-lg">≈ $107</span>
                </div>
              </div>

              {/* Allocation bar */}
              <div className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="bg-sky-400" style={{ width: '33%' }}></div>
                <div className="bg-amber-400" style={{ width: '30%' }}></div>
                <div className="bg-neon-mint" style={{ width: '37%' }}></div>
              </div>

              {/* Category cards */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { key: 'education', icon: 'fa-graduation-cap', price: 'PKR 10,000', share: '33%', chip: 'bg-sky-400/20 text-sky-300', dot: 'text-sky-300' },
                  { key: 'food', icon: 'fa-bowl-food', price: 'PKR 9,000', share: '30%', chip: 'bg-amber-400/20 text-amber-300', dot: 'text-amber-300' },
                  { key: 'other', icon: 'fa-house-chimney-user', price: 'PKR 11,000', share: '37%', chip: 'bg-neon-mint/20 text-neon-mint', dot: 'text-neon-mint' },
                ].map((cat) => {
                  const items = t(`home:sponsorship.categories.${cat.key}.items`, { returnObjects: true });
                  return (
                    <div
                      key={cat.key}
                      className="rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-sm p-4 hover:bg-white/[0.12] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${cat.chip}`}>
                          <i className={`fa-solid ${cat.icon}`}></i>
                        </div>
                        <span className={`text-[11px] font-extrabold ${cat.dot}`}>{cat.share}</span>
                      </div>
                      <h3 className="mt-3 font-heading font-bold text-base">{t(`home:sponsorship.categories.${cat.key}.title`)}</h3>
                      <p className="font-heading font-extrabold text-lg leading-tight">{cat.price}</p>
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-white/50">{t('home:sponsorship.includesLabel')}</p>
                      <ul className="mt-1.5 space-y-1">
                        {Array.isArray(items) && items.map((item: string) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-white/80 leading-snug">
                            <i className={`fa-solid fa-check text-[10px] mt-[3px] ${cat.dot}`}></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent hover:bg-accent-600 px-7 py-3.5 font-heading font-bold text-sm text-white shadow-lg shadow-accent/30 transition-colors group"
                >
                  <i className="fa-solid fa-hand-holding-heart"></i>
                  <span>{t('home:sponsorship.cta')}</span>
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link
                  to="/sponsorship"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 hover:bg-white/10 px-6 py-3.5 font-heading font-bold text-sm text-white transition-colors group"
                >
                  <i className="fa-solid fa-circle-info"></i>
                  <span>{t('home:sponsorship.learnMore')}</span>
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-white/50">{t('home:sponsorship.fxNote')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE & CORE PHILOSOPHY BENTO */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Authentic Imagery with Visual Accents */}
            <div className="lg:col-span-6 reveal-left">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl border border-line">
                  <img
                    src="/images/about/about.webp"
                    alt="Children supported by AASRA Welfare Society"
                    className="w-full h-[460px] md:h-[540px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Glass Stats Badge */}
                <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/60 max-w-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-700 text-white flex items-center justify-center text-2xl font-bold">
                      5+
                    </div>
                    <div>
                      <p className="font-heading font-bold text-base text-ink">{t('home:about.yearsOfService')}</p>
                      <p className="text-xs text-ink-soft">{t('home:about.registeredLine')}</p>
                    </div>
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-brand-950 text-white px-4 py-2 rounded-full shadow-lg border border-white/10 flex items-center gap-2 text-xs font-semibold">
                  <i className="fa-solid fa-circle-check text-neon-mint"></i>
                  <span>{t('home:about.govtCertified')}</span>
                </div>
              </div>
            </div>

            {/* Right: Message & Value Pillars */}
            <div className="lg:col-span-6 space-y-7 reveal-right">
              <div>
                <span className="eyebrow text-brand block mb-3">{t('home:about.eyebrow')}</span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.15]">
                  {t('home:about.titleLine1')} <br className="hidden sm:inline" />
                  <span className="text-brand">{t('home:about.titleLine2')}</span>
                </h2>
              </div>

              <p className="text-ink-soft text-base sm:text-lg leading-relaxed font-sans">
                {t('home:about.paragraph')}
              </p>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-line shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand flex items-center justify-center text-sm mb-2.5">
                    <i className="fa-solid fa-hand-holding-heart"></i>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-ink mb-1">{t('home:about.pillar1Title')}</h4>
                  <p className="text-xs text-ink-soft leading-relaxed">{t('home:about.pillar1Text')}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-line shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm mb-2.5">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-ink mb-1">{t('home:about.pillar2Title')}</h4>
                  <p className="text-xs text-ink-soft leading-relaxed">{t('home:about.pillar2Text')}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 font-heading font-bold text-sm text-brand hover:text-brand-600 group"
                >
                  <span>{t('home:about.learnMoreLink')}</span>
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform"></i>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW TO DONATE - 3 CONVENIENT OPTIONS */}
      <section className="py-16 md:py-24 bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="eyebrow text-brand block">{t('home:donateSection.eyebrow')}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
              {t('home:donateSection.title')}
            </h2>
            <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
              {t('home:donateSection.subtitle')}
            </p>
          </div>

          <div
            ref={methodsRef}
            onScroll={handleMethodsScroll}
            className="flex md:grid md:grid-cols-3 gap-4 lg:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-2 md:pb-0 no-scrollbar"
          >
            {/* Card 1: Online Donation */}
            <div className="w-[82%] min-[420px]:w-[75%] sm:w-[58%] md:w-auto shrink-0 snap-start bg-paper-dim/60 rounded-3xl border border-line overflow-hidden flex flex-col group hover:border-brand-300 hover:shadow-xl transition-all">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-dim">
                <img
                  src="/images/donate/method-online.webp"
                  alt={t('home:donateSection.card1.title')}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent"></div>
                <span className="absolute top-3 start-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-brand border border-brand-200 shadow-sm">
                  {t('home:donateSection.card1.badgeFull')}
                </span>
              </div>
              <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-ink mb-1.5 leading-snug">
                      {t('home:donateSection.card1.title')}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {t('home:donateSection.card1.descFull')}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ink-faint block">{t('home:donateSection.card1.accountLabel')}</span>
                    <span className="font-mono font-bold text-brand block select-all text-xs break-all">{BANK_DETAILS.accountNumber}</span>
                    <span className="block text-[10px] text-ink-soft">{BANK_DETAILS.bankName}</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-line/60">
                  <Link
                    to="/donate"
                    className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-white bg-brand hover:bg-brand-600 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>{t('home:donateSection.card1.ctaFull')}</span>
                    <i className="fa-solid fa-arrow-right text-[10px] rtl:rotate-180"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Pay by Cheque via Mail */}
            <div className="w-[82%] min-[420px]:w-[75%] sm:w-[58%] md:w-auto shrink-0 snap-start bg-paper-dim/60 rounded-3xl border border-line overflow-hidden flex flex-col group hover:border-brand-300 hover:shadow-xl transition-all">
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <img
                  src="/images/donate/method-cheque.webp"
                  alt={t('home:donateSection.card3.title')}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 start-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-accent border border-accent/20 shadow-sm">
                  {t('home:donateSection.card3.badgeFull')}
                </span>
              </div>
              <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-ink mb-1.5 leading-snug">
                      {t('home:donateSection.card3.title')}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {t('home:donateSection.card3.descPrefix')} <strong>"{t('home:donateSection.card3.descQuoted')}"</strong> {t('home:donateSection.card3.descSuffix')}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ink-faint block">{t('home:donateSection.card3.addressLabel')}</span>
                    <p className="text-[11px] font-semibold text-ink leading-snug">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-line/60">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-ink-soft hover:text-ink bg-white hover:bg-paper-dim border border-line transition-all flex items-center justify-center gap-2"
                  >
                    <i className={`fa-solid ${copiedAddress ? 'fa-check text-emerald-600' : 'fa-copy'}`}></i>
                    <span>{copiedAddress ? t('home:donateSection.card3.ctaCopiedFull') : t('home:donateSection.card3.ctaFull')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Cash or Cheque Collection at Doorstep */}
            <div className="w-[82%] min-[420px]:w-[75%] sm:w-[58%] md:w-auto shrink-0 snap-start bg-paper-dim/60 rounded-3xl border border-line overflow-hidden flex flex-col group hover:border-brand-300 hover:shadow-xl transition-all">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-dim">
                <img
                  src="/images/donate/method-doorstep.webp"
                  alt={t('home:donateSection.card4.title')}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent"></div>
                <span className="absolute top-3 start-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-amber-700 border border-amber-200 shadow-sm">
                  {t('home:donateSection.card4.badgeFull')}
                </span>
              </div>
              <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-ink mb-1.5 leading-snug">
                      {t('home:donateSection.card4.title')}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {t('home:donateSection.card4.desc')}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ink-faint block">{t('home:donateSection.card4.coverageLabel')}</span>
                    <p className="text-[11px] font-semibold text-ink">{t('home:donateSection.card4.coverageValue')}</p>
                    <span className="block text-[10px] text-emerald-600 font-bold">{t('home:donateSection.card4.receiptNote')}</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-line/60">
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                      'Assalamualaikum, I would like to schedule a doorstep cash/cheque collection for my donation to Aasra Welfare Society. My address is:'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-[#128C7E] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-brands fa-whatsapp text-sm text-[#25D366]"></i>
                    <span>{t('home:donateSection.card4.ctaFull')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center justify-center gap-2 mt-5" role="tablist" aria-label={t('home:donateSection.title')}>
            {[t('home:donateSection.card1.title'), t('home:donateSection.card3.title'), t('home:donateSection.card4.title')].map((label, idx) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={activeMethod === idx}
                aria-label={label}
                onClick={() => scrollToMethod(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeMethod === idx ? 'w-6 bg-brand' : 'w-2 bg-line hover:bg-brand-200'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. QURANIC / SPIRITUAL INSPIRATION BANNER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 py-14 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2DD4BF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6 reveal">
          <div className="w-12 h-12 rounded-full bg-white/10 text-amber-300 flex items-center justify-center text-xl mx-auto border border-white/15">
            <i className="fa-solid fa-quote-left"></i>
          </div>
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/95 leading-snug">
            {t('home:quote.text')}
          </blockquote>
          <p className="eyebrow text-neon-mint tracking-[0.3em]">
            {t('home:quote.reference')}
          </p>
        </div>
      </section>

      {/* 6. MODERN PROGRAMS BENTO SHOWCASE */}
      <section className="py-16 md:py-24 bg-paper-dim/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal">
            <div>
              <span className="eyebrow text-brand block mb-3">{t('home:programsSection.eyebrow')}</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
                {t('home:programsSection.title')}
              </h2>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-brand font-heading font-bold text-sm hover:underline"
            >
              <span>{t('home:programsSection.viewAll')}</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((program) => {
              const percent = program.goalPKR
                ? Math.round((program.raisedPKR / program.goalPKR) * 100)
                : 0;
              const title = t(`programs:items.${program.id}.title`, program.title);
              const description = t(`programs:items.${program.id}.description`, program.description);
              return (
                <div
                  key={program.id}
                  className="glass-card bg-white rounded-3xl overflow-hidden border border-line flex flex-col justify-between group"
                >
                  {/* Image Container with Floating Badge */}
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={program.homeImage || program.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-brand flex items-center justify-center text-base shadow-md">
                        <i className={`fa-solid ${program.icon}`}></i>
                      </div>
                      {program.goalPKR && (
                        <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand-950/80 backdrop-blur-md text-neon-mint text-[10px] font-extrabold border border-white/20">
                          {percent}{t('home:programsSection.funded')}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-heading font-bold text-base text-ink group-hover:text-brand transition-colors leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-ink-soft leading-relaxed line-clamp-2">
                        {description}
                      </p>

                      {/* Goal Progress Bar */}
                      {program.goalPKR && (
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-ink-soft text-[10px]">
                              {t('home:programsSection.raised')} <strong className="text-brand font-bold">₨ {program.raisedPKR >= 1000000 ? `${(program.raisedPKR / 1000000).toFixed(1).replace('.0', '')}M` : `${(program.raisedPKR / 1000).toFixed(0)}K`}</strong>
                            </span>
                            <span className="text-ink-faint text-[10px]">
                              {t('home:programsSection.goal')} ₨ {program.goalPKR >= 1000000 ? `${(program.goalPKR / 1000000).toFixed(0)}M` : `${(program.goalPKR / 1000).toFixed(0)}K`}
                            </span>
                          </div>
                          <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-brand to-neon-mint h-full rounded-full transition-all duration-700"
                              style={{ width: `${Math.max(6, Math.min(100, percent))}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                      <Link
                        to={`/programs/${program.id}`}
                        className="text-xs font-heading font-bold text-brand hover:underline flex items-center gap-1"
                      >
                        <span>{t('home:programsSection.details')}</span>
                        <i className="fa-solid fa-arrow-right text-[9px]"></i>
                      </Link>
                      <Link
                        to={`/donate?cause=${encodeURIComponent(title)}`}
                        className="text-xs font-heading font-bold text-accent hover:text-accent-600"
                      >
                        {t('home:programsSection.sponsor')}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE ZAKAT ENGINE GATEWAY */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-900 via-brand to-brand-900 rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Ambient Background Blur */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-neon-mint/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
                  <i className="fa-solid fa-calculator"></i>
                  <span>{t('home:zakatSection.badge')}</span>
                </div>

                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
                  {t('home:zakatSection.title')}
                </h2>

                <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                  {t('home:zakatSection.text')}
                </p>

                {/* Live Nisab Ticker */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 max-w-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{t('home:zakatSection.nisabLabel')}</span>
                    <span className="font-mono font-bold text-neon-mint">
                      ~ ₨ {silverNisabPKR.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1">
                    {t('home:zakatSection.nisabNote')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/zakat"
                    className="px-7 py-3.5 rounded-full font-heading font-bold text-sm text-brand-950 bg-white hover:bg-neon-mint shadow-lg transition-all flex items-center gap-2"
                  >
                    <i className="fa-solid fa-calculator"></i>
                    <span>{t('home:zakatSection.calculatorCta')}</span>
                  </Link>

                  <Link
                    to="/donate?cause=Zakat"
                    className="px-7 py-3.5 rounded-full font-heading font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/30 transition-all flex items-center gap-2"
                  >
                    <span>{t('home:zakatSection.donateCta')}</span>
                  </Link>
                </div>
              </div>

              {/* Right Side Visual Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative">
                  <img
                    src="/images/donate/zakat-coins.webp"
                    alt="Zakat giving"
                    className="w-full max-w-sm rounded-3xl object-cover shadow-2xl border-2 border-white/20"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-brand-950/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs">
                    <p className="font-bold text-white">{t('home:zakatSection.imageCaptionTitle')}</p>
                    <p className="text-white/70">{t('home:zakatSection.imageCaptionText')}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED MILESTONES & ACHIEVEMENTS */}
      <section className="py-16 md:py-24 bg-paper-dim/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 reveal">
            <span className="eyebrow text-brand block mb-3">{t('home:achievementsSection.eyebrow')}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              {t('home:achievementsSection.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className="glass-card bg-white rounded-3xl overflow-hidden border border-line flex flex-col group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={t(`home:achievementsSection.items.${item.id}.title`, item.title)}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-brand-950/80 backdrop-blur-md text-neon-mint text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/10">
                    {item.date}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-ink mb-2.5 leading-snug">
                      {t(`home:achievementsSection.items.${item.id}.title`, item.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {t(`home:achievementsSection.items.${item.id}.text`, item.text)}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-line/60 flex items-center gap-2 text-xs font-semibold text-brand">
                    <i className="fa-solid fa-award"></i>
                    <span>{t('home:achievementsSection.verifiedMilestone')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GOOGLE REVIEWS & TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12 reveal">
            <div>
              <span className="eyebrow text-brand block mb-3">{t('home:reviewsSection.eyebrow')}</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-3">
                {t('home:reviewsSection.title')}
              </h2>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <span className="text-sm font-bold text-ink">5.0</span>
                <span className="text-sm text-ink-soft">{t('home:reviewsSection.ratingLabel')}</span>
              </div>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-white bg-brand hover:bg-brand-600 shadow-md shadow-brand/20 transition-all shrink-0"
            >
              <i className="fa-brands fa-google"></i>
              <span>{t('home:reviewsSection.readAll')}</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>

          {/* Horizontal Scroll Review Cards — kept in original English as verbatim visitor quotes */}
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-2">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="glass-card bg-paper-dim/50 rounded-3xl p-6 border border-line flex flex-col justify-between min-w-[80%] sm:min-w-[320px] max-w-[320px] flex-shrink-0 snap-start"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <i className="fa-brands fa-google text-ink-faint text-sm"></i>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed line-clamp-5">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-5 mt-5 border-t border-line/60">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border border-line"
                  />
                  <div>
                    <p className="font-heading font-bold text-sm text-ink">{review.name}</p>
                    <p className="text-[11px] text-ink-faint">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-white bg-brand hover:bg-brand-600 shadow-md shadow-brand/20 transition-all"
            >
              <i className="fa-brands fa-google"></i>
              <span>{t('home:reviewsSection.readAll')}</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>
      </section>

      {/* 9. PHOTO IMPACT WALL */}
      <section className="py-16 md:py-24 bg-paper-dim/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 reveal">
            <div>
              <span className="eyebrow text-brand block mb-2">{t('home:gallerySection.eyebrow')}</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
                {t('home:gallerySection.title')}
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-brand font-heading font-bold text-sm hover:underline"
            >
              <span>{t('home:gallerySection.exploreLink')}</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {MOMENTS.map((moment) => (
              <Link
                to="/gallery"
                key={moment.id}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm border border-line block"
              >
                <img
                  src={moment.url}
                  alt={moment.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md">{t('home:gallerySection.viewInGallery')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. VOLUNTEER & AMBASSADOR CTA */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-950 to-brand-900 rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="eyebrow text-neon-mint block">{t('home:volunteerSection.eyebrow')}</span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
                  {t('home:volunteerSection.title')}
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
                  {t('home:volunteerSection.text')}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/volunteer"
                    className="px-8 py-4 rounded-full font-heading font-bold text-sm text-brand-950 bg-white hover:bg-neon-mint shadow-lg transition-all"
                  >
                    {t('home:volunteerSection.registerCta')}
                  </Link>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Assalamualaikum, I would like to volunteer with AASRA Welfare Society.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full font-heading font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all flex items-center gap-2"
                  >
                    <i className="fa-brands fa-whatsapp text-base text-[#25D366]"></i>
                    <span>{t('home:volunteerSection.whatsappCta')}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <img
                  src="/images/relief-work/relief-work-04.webp"
                  alt="AASRA Volunteers in action"
                  className="w-full h-80 object-cover rounded-3xl shadow-xl border-2 border-white/15"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
