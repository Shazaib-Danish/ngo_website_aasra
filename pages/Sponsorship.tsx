import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO, BANK_DETAILS, CURRENCIES } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { trackEvent } from '../src/analytics';

type Currency = 'PKR' | 'EUR' | 'USD';
type Period = 'month' | 'year';

// EUR rate matches the official sponsorship breakdown sheet; USD follows the site-wide rate.
const EUR_RATE = 316.04;
const USD_RATE = CURRENCIES.find((c) => c.code === 'USD')?.pkrRate ?? 279;
const TOTAL_PKR = 30000;

interface LineItem {
  key: string;
  icon: string;
  amount?: number;
  sub?: { key: string; amount: number }[];
  staff?: { key: string; icon: string }[];
}

interface Category {
  key: 'education' | 'food' | 'other';
  icon: string;
  amount: number;
  share: number;
  hex: string;
  iconBox: string;
  text: string;
  ring: string;
  soft: string;
  items: LineItem[];
}

const CATEGORIES: Category[] = [
  {
    key: 'education',
    icon: 'fa-graduation-cap',
    amount: 10000,
    share: 33,
    hex: '#0EA5E9',
    iconBox: 'bg-sky-500 text-white',
    text: 'text-sky-600',
    ring: 'ring-sky-200',
    soft: 'bg-sky-50',
    items: [
      { key: 'school', icon: 'fa-school', amount: 2500 },
      { key: 'van', icon: 'fa-van-shuttle', amount: 1500 },
      { key: 'tuition', icon: 'fa-chalkboard-user', amount: 2000 },
      { key: 'stationery', icon: 'fa-pencil', amount: 1000 },
      {
        key: 'islamic',
        icon: 'fa-book-quran',
        amount: 3000,
        sub: [
          { key: 'tajweed', amount: 1500 },
          { key: 'translation', amount: 1500 },
        ],
      },
    ],
  },
  {
    key: 'food',
    icon: 'fa-bowl-food',
    amount: 9000,
    share: 30,
    hex: '#F59E0B',
    iconBox: 'bg-amber-500 text-white',
    text: 'text-amber-600',
    ring: 'ring-amber-200',
    soft: 'bg-amber-50',
    items: [
      { key: 'meals', icon: 'fa-utensils' },
      { key: 'organic', icon: 'fa-leaf' },
      { key: 'fastfood', icon: 'fa-burger' },
      { key: 'fruits', icon: 'fa-apple-whole' },
    ],
  },
  {
    key: 'other',
    icon: 'fa-house-chimney-user',
    amount: 11000,
    share: 37,
    hex: '#14B8A6',
    iconBox: 'bg-brand-400 text-white',
    text: 'text-brand',
    ring: 'ring-brand-200',
    soft: 'bg-brand-50',
    items: [
      { key: 'house', icon: 'fa-house' },
      { key: 'utilities', icon: 'fa-bolt' },
      {
        key: 'staff',
        icon: 'fa-people-group',
        staff: [
          { key: 'chefs', icon: 'fa-kitchen-set' },
          { key: 'maids', icon: 'fa-broom' },
          { key: 'doctor', icon: 'fa-user-doctor' },
          { key: 'driver', icon: 'fa-van-shuttle' },
          { key: 'accountant', icon: 'fa-calculator' },
          { key: 'martial', icon: 'fa-hand-fist' },
        ],
      },
    ],
  },
];

const LIFE_POINTS = [
  { key: 'learn', icon: 'fa-book-open-reader', box: 'bg-sky-50 text-sky-600' },
  { key: 'nourish', icon: 'fa-apple-whole', box: 'bg-amber-50 text-amber-600' },
  { key: 'health', icon: 'fa-stethoscope', box: 'bg-rose-50 text-rose-600' },
  { key: 'confidence', icon: 'fa-hand-fist', box: 'bg-brand-50 text-brand' },
];

const LIFE_IMAGES = [
  '/images/orphanage/orphanage-16.webp',
  '/images/home/moments-orphanage-care.webp',
  '/images/orphanage/orphanage-01.webp',
  '/images/orphanage/orphanage-05.webp',
];

const Sponsorship: React.FC = () => {
  const { t } = useTranslation('sponsorship');
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [period, setPeriod] = useState<Period>('month');
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({ education: true, food: true, other: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState<string | null>(null);

  useSEO({
    path: '/sponsorship',
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    ogImage: 'https://www.aasra-welfare.org/images/home/sponsorhip_image.png',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Orphan Sponsorship', path: '/sponsorship' },
    ],
  });

  useEffect(() => {
    trackEvent('ViewContent', {
      content_name: 'Orphan Sponsorship',
      content_category: 'Sponsorship',
      content_ids: ['orphan-sponsorship'],
      content_type: 'product',
      value: TOTAL_PKR,
      currency: 'PKR',
    });
  }, []);

  const multiplier = period === 'year' ? 12 : 1;

  const fmt = (pkr: number, approx = false) => {
    const value = pkr * multiplier;
    if (currency === 'PKR') return `PKR ${value.toLocaleString('en-US')}`;
    const rate = currency === 'EUR' ? EUR_RATE : USD_RATE;
    const symbol = currency === 'EUR' ? '€' : '$';
    return `${approx ? '≈ ' : ''}${symbol}${Math.round(value / rate).toLocaleString('en-US')}`;
  };

  const periodLabel = period === 'year' ? t('hero.perYear') : t('hero.perMonth');

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    'Assalam o Alaikum, I would like to sponsor a child at Aasra Welfare Society.'
  )}`;

  const handleCopy = (field: string, value: string) => {
    trackEvent('AddPaymentInfo', {
      content_name: 'Orphan Sponsorship',
      content_category: 'Sponsorship',
      payment_method: 'bank_transfer',
      value: TOTAL_PKR,
      currency: 'PKR',
    });
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const faqItems = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];

  // Conic gradient for the allocation donut
  let acc = 0;
  const donut = `conic-gradient(${CATEGORIES.map((c) => {
    const start = acc;
    acc += (c.amount / TOTAL_PKR) * 100;
    return `${c.hex} ${start}% ${acc}%`;
  }).join(', ')})`;

  /* ---------- Reusable controls ---------- */
  const CurrencySwitch = ({ dark = false }: { dark?: boolean }) => (
    <div
      role="radiogroup"
      aria-label={t('breakdown.currency')}
      className={`inline-flex p-1 rounded-full ${dark ? 'bg-white/10 border border-white/15' : 'bg-paper-dim border border-line'}`}
    >
      {(['PKR', 'EUR', 'USD'] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={currency === c}
          onClick={() => setCurrency(c)}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            currency === c
              ? dark
                ? 'bg-white text-brand-900 shadow'
                : 'bg-brand text-white shadow'
              : dark
                ? 'text-white/70 hover:text-white'
                : 'text-ink-soft hover:text-ink'
          }`}
        >
          {c === 'PKR' ? '₨ PKR' : c === 'EUR' ? '€ EUR' : '$ USD'}
        </button>
      ))}
    </div>
  );

  const PeriodSwitch = ({ dark = false }: { dark?: boolean }) => (
    <div
      role="radiogroup"
      className={`inline-flex p-1 rounded-full ${dark ? 'bg-white/10 border border-white/15' : 'bg-paper-dim border border-line'}`}
    >
      {(['month', 'year'] as Period[]).map((p) => (
        <button
          key={p}
          type="button"
          role="radio"
          aria-checked={period === p}
          onClick={() => setPeriod(p)}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            period === p
              ? dark
                ? 'bg-accent text-white shadow'
                : 'bg-accent text-white shadow'
              : dark
                ? 'text-white/70 hover:text-white'
                : 'text-ink-soft hover:text-ink'
          }`}
        >
          {p === 'month' ? t('hero.monthly') : t('hero.yearly')}
        </button>
      ))}
    </div>
  );

  const navItems = [
    { id: 'breakdown', label: t('nav.breakdown'), icon: 'fa-chart-pie' },
    { id: 'life', label: t('nav.life'), icon: 'fa-heart' },
    { id: 'how', label: t('nav.how'), icon: 'fa-list-check' },
    { id: 'faq', label: t('nav.faq'), icon: 'fa-circle-question' },
  ];

  const bankRows = [
    { key: 'bank', label: t('how.bankName'), value: BANK_DETAILS.bankName, copy: false },
    { key: 'title', label: t('how.accountTitle'), value: BANK_DETAILS.accountTitle, copy: true },
    { key: 'account', label: t('how.accountNumber'), value: BANK_DETAILS.accountNumber, copy: true, mono: true },
    { key: 'iban', label: t('how.iban'), value: BANK_DETAILS.iban, copy: true, mono: true },
    { key: 'branch', label: t('how.branch'), value: `${BANK_DETAILS.branch} (${BANK_DETAILS.branch_code})`, copy: false },
  ];

  return (
    <div className="bg-paper min-h-screen">

      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700">
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-neon-mint/15 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pt-12 md:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-white/60 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">{t('breadcrumbHome')}</Link>
            <i className="fa-solid fa-chevron-right text-[9px]"></i>
            <span className="text-white font-semibold">{t('breadcrumbCurrent')}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text + price */}
            <div className="lg:col-span-7 text-white order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/40 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-accent-200">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                {t('hero.eyebrow')}
              </span>
              <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-[1.08] tracking-tight">
                {t('hero.title')}{' '}
                <span className="bg-gradient-to-r from-neon-mint to-brand-200 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="mt-5 text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>

              {/* Price card */}
              <div className="mt-8 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md p-5 sm:p-6 max-w-xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">{t('hero.priceLabel')}</p>
                  <PeriodSwitch dark />
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-heading font-extrabold text-4xl sm:text-5xl leading-none tracking-tight" aria-live="polite">
                    {fmt(TOTAL_PKR, true)}
                  </p>
                  <span className="text-sm text-white/70 font-semibold">{periodLabel}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <CurrencySwitch dark />
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent hover:bg-accent-600 px-7 py-4 font-heading font-bold text-sm text-white shadow-lg shadow-accent/30 transition-colors group"
                >
                  <i className="fa-solid fa-hand-holding-heart"></i>
                  <span>{t('hero.ctaPrimary')}</span>
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 hover:bg-white/10 px-7 py-4 font-heading font-bold text-sm text-white transition-colors"
                >
                  <i className="fa-brands fa-whatsapp text-base text-neon-mint"></i>
                  <span>{t('hero.ctaWhatsapp')}</span>
                </a>
              </div>

              {/* Trust */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/70">
                <span className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-neon-mint"></i>{t('hero.trust1')}</span>
                <span className="flex items-center gap-2"><i className="fa-solid fa-receipt text-neon-mint"></i>{t('hero.trust2')}</span>
                <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-neon-mint"></i>{t('hero.trust3')}</span>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-neon-mint/40 via-transparent to-accent/40 blur-xl"></div>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
                  <img
                    src="/images/home/sponsorhip_image.png"
                    alt={t('hero.eyebrow')}
                    className="w-full h-[360px] sm:h-[460px] lg:h-[560px] object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                    {CATEGORIES.map((c) => (
                      <div key={c.key} className="rounded-2xl bg-white/90 backdrop-blur-md px-2.5 py-2 text-center shadow-lg">
                        <i className={`fa-solid ${c.icon} ${c.text} text-sm`}></i>
                        <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-ink leading-tight">{t(`categories.${c.key}.title`)}</p>
                        <p className="text-[10px] font-extrabold text-ink-soft">{c.share}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IN-PAGE NAV */}
      <nav aria-label={t('nav.label')} className="bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-bold text-ink-soft hover:text-brand hover:border-brand-200 hover:bg-brand-50 transition-colors"
              >
                <i className={`fa-solid ${n.icon} text-[11px]`}></i>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. BREAKDOWN */}
      <section id="breakdown" className="scroll-mt-28 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="eyebrow text-brand block">{t('breakdown.eyebrow')}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">{t('breakdown.title')}</h2>
            <p className="text-ink-soft text-base sm:text-lg">{t('breakdown.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Summary (sticky on desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="rounded-3xl bg-white border border-line shadow-xl p-6 sm:p-7">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full shadow-inner" style={{ background: donut }} aria-hidden="true">
                    <div className="absolute inset-[18%] rounded-full bg-white flex flex-col items-center justify-center text-center shadow">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{t('overview.total')}</span>
                      <span className="font-heading font-extrabold text-xl sm:text-2xl text-ink leading-tight">{fmt(TOTAL_PKR, true)}</span>
                      <span className="text-[11px] text-ink-soft font-semibold">{periodLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <CurrencySwitch />
                  <PeriodSwitch />
                </div>

                <ul className="mt-6 space-y-2.5">
                  {CATEGORIES.map((c) => (
                    <li key={c.key}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenCats((s) => ({ ...s, [c.key]: true }));
                          document.getElementById(`cat-${c.key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="w-full flex items-center gap-3 rounded-2xl p-3 hover:bg-paper transition-colors text-left"
                      >
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.hex }}></span>
                        <span className="flex-1 font-heading font-bold text-sm text-ink">{t(`categories.${c.key}.title`)}</span>
                        <span className="text-xs font-bold text-ink-faint">{c.share}%</span>
                        <span className="font-heading font-extrabold text-sm text-ink tabular-nums">{fmt(c.amount)}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/donate"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-600 px-6 py-3.5 font-heading font-bold text-sm text-white transition-colors"
                >
                  <i className="fa-solid fa-hand-holding-heart"></i>
                  {t('hero.ctaPrimary')}
                </Link>
              </div>
            </aside>

            {/* Category accordions */}
            <div className="lg:col-span-8 space-y-5">
              {CATEGORIES.map((c) => {
                const open = !!openCats[c.key];
                return (
                  <article
                    key={c.key}
                    id={`cat-${c.key}`}
                    className={`scroll-mt-28 rounded-3xl bg-white border border-line shadow-sm overflow-hidden transition-shadow ${open ? `shadow-lg ring-1 ${c.ring}` : ''}`}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`panel-${c.key}`}
                      onClick={() => setOpenCats((s) => ({ ...s, [c.key]: !s[c.key] }))}
                      className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl flex items-center justify-center text-lg sm:text-xl shadow-md ${c.iconBox}`}>
                        <i className={`fa-solid ${c.icon}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-ink">{t(`categories.${c.key}.title`)}</h3>
                        <p className="text-xs sm:text-sm text-ink-soft truncate">{t(`categories.${c.key}.tagline`)}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-heading font-extrabold text-base sm:text-xl text-ink tabular-nums">{fmt(c.amount)}</p>
                        <p className={`text-[11px] font-bold ${c.text}`}>{c.share}% {t('overview.ofTotal')}</p>
                      </div>
                      <i className={`fa-solid fa-chevron-down text-ink-faint text-sm transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
                    </button>

                    {/* Share bar */}
                    <div className="px-5 sm:px-6">
                      <div className="h-1.5 rounded-full bg-paper-dim overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.share}%`, backgroundColor: c.hex }}></div>
                      </div>
                    </div>

                    <div
                      id={`panel-${c.key}`}
                      className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <ul className="p-5 sm:p-6 pt-5 space-y-3">
                          {c.items.map((item) => (
                            <li key={item.key} className={`rounded-2xl ${c.soft} p-4`}>
                              <div className="flex items-start gap-3.5">
                                <div className={`w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm ${c.text}`}>
                                  <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-heading font-bold text-sm sm:text-base text-ink">{t(`categories.${c.key}.items.${item.key}.label`)}</p>
                                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{t(`categories.${c.key}.items.${item.key}.desc`)}</p>
                                </div>
                                {item.amount !== undefined ? (
                                  <span className="font-heading font-extrabold text-sm sm:text-base text-ink tabular-nums shrink-0">{fmt(item.amount)}</span>
                                ) : (
                                  <span className={`shrink-0 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold ${c.text}`}>
                                    <i className="fa-solid fa-check"></i>
                                    {t('breakdown.includes')}
                                  </span>
                                )}
                              </div>

                              {item.sub && (
                                <ul className="mt-3 ml-[3.375rem] space-y-1.5 border-l-2 border-white pl-4">
                                  {item.sub.map((s) => (
                                    <li key={s.key} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                                      <span className="text-ink-soft">{t(`categories.${c.key}.sub.${s.key}`)}</span>
                                      <span className="font-semibold text-ink-soft tabular-nums">{fmt(s.amount)}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {item.staff && (
                                <div className="mt-3 sm:ml-[3.375rem] grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {item.staff.map((s) => (
                                    <div key={s.key} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-ink">
                                      <i className={`fa-solid ${s.icon} ${c.text} text-[11px] w-4 text-center`}></i>
                                      <span className="leading-tight">{t(`categories.${c.key}.staff.${s.key}`)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Total row */}
              <div className="rounded-3xl bg-gradient-to-r from-brand-900 to-brand-700 text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-neon-mint">
                    <i className="fa-solid fa-child-reaching"></i>
                  </div>
                  <p className="font-heading font-bold text-base sm:text-lg">{t('hero.priceLabel')}</p>
                </div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl tabular-nums">
                  {fmt(TOTAL_PKR, true)} <span className="text-sm font-semibold text-white/70">{periodLabel}</span>
                </p>
              </div>
              <p className="text-xs text-ink-faint text-center">
                {t('fxNote', { eur: EUR_RATE, usd: USD_RATE })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIFE AT THE HOME */}
      <section id="life" className="scroll-mt-28 py-16 md:py-24 bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {LIFE_IMAGES.map((src, i) => (
                <div key={src} className={`overflow-hidden rounded-3xl shadow-lg border border-line ${i % 2 === 1 ? 'translate-y-6' : ''}`}>
                  <img
                    src={src}
                    alt={t('life.title')}
                    loading="lazy"
                    className="w-full h-40 sm:h-56 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6 lg:pt-0">
              <div className="space-y-3">
                <span className="eyebrow text-brand block">{t('life.eyebrow')}</span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.15]">{t('life.title')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LIFE_POINTS.map((p) => (
                  <div key={p.key} className="p-5 rounded-2xl bg-paper border border-line hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${p.box}`}>
                      <i className={`fa-solid ${p.icon}`}></i>
                    </div>
                    <h3 className="font-heading font-bold text-base text-ink mb-1">{t(`life.points.${p.key}.title`)}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{t(`life.points.${p.key}.text`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW TO SPONSOR */}
      <section id="how" className="scroll-mt-28 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="eyebrow text-brand block">{t('how.eyebrow')}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">{t('how.title')}</h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {(['1', '2', '3'] as const).map((n, i) => (
              <li key={n} className="relative rounded-3xl bg-white border border-line p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-700 text-white font-heading font-extrabold flex items-center justify-center shadow-md">
                    {n}
                  </span>
                  {i < 2 && <span className="hidden md:block flex-1 h-px bg-gradient-to-r from-brand-200 to-transparent"></span>}
                </div>
                <h3 className="font-heading font-bold text-lg text-ink mb-1">{t(`how.steps.${n}.title`)}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{t(`how.steps.${n}.text`)}</p>
              </li>
            ))}
          </ol>

          {/* Bank details */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 rounded-3xl bg-white border border-line shadow-lg p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <img src={BANK_DETAILS.logo} alt={BANK_DETAILS.bankName} className="h-10 w-auto object-contain" loading="lazy" />
                <h3 className="font-heading font-extrabold text-lg text-ink">{t('how.bankTitle')}</h3>
              </div>
              <dl className="divide-y divide-line">
                {bankRows.map((row) => (
                  <div key={row.key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3">
                    <dt className="sm:w-36 shrink-0 text-[11px] font-bold uppercase tracking-wider text-ink-faint">{row.label}</dt>
                    <dd className="flex-1 flex items-center justify-between gap-3 min-w-0">
                      <span className={`text-sm font-semibold text-ink break-all ${row.mono ? 'font-mono' : ''}`}>{row.value}</span>
                      {row.copy && (
                        <button
                          type="button"
                          onClick={() => handleCopy(row.key, row.value)}
                          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
                            copied === row.key ? 'bg-emerald-100 text-emerald-700' : 'bg-paper-dim text-ink-soft hover:bg-brand-50 hover:text-brand'
                          }`}
                        >
                          <i className={`fa-solid ${copied === row.key ? 'fa-check' : 'fa-copy'}`}></i>
                          {copied === row.key ? t('how.copied') : t('how.copy')}
                        </button>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-brand-900 to-brand-700 text-white p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-lg">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">{t('hero.priceLabel')}</p>
                <p className="mt-2 font-heading font-extrabold text-3xl sm:text-4xl">{fmt(TOTAL_PKR, true)}</p>
                <p className="text-sm text-white/70">{periodLabel}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent hover:bg-accent-600 px-6 py-3.5 font-heading font-bold text-sm text-white transition-colors"
                >
                  <i className="fa-solid fa-credit-card"></i>
                  {t('how.donateOnline')}
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/25 hover:bg-white/20 px-6 py-3.5 font-heading font-bold text-sm text-white transition-colors"
                >
                  <i className="fa-brands fa-whatsapp text-base text-neon-mint"></i>
                  {t('how.whatsappReceipt')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="scroll-mt-28 py-16 md:py-24 bg-white border-y border-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <span className="eyebrow text-brand block">{t('faq.eyebrow')}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">{t('faq.title')}</h2>
          </div>
          <div className="space-y-3">
            {Array.isArray(faqItems) && faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className={`rounded-2xl border transition-colors ${open ? 'border-brand-200 bg-brand-50/50' : 'border-line bg-paper'}`}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-ink">{item.q}</span>
                    <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${open ? 'bg-brand text-white rotate-45' : 'bg-white text-brand border border-line'}`}>
                      <i className="fa-solid fa-plus text-xs"></i>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-ink-soft leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent via-accent-600 to-accent-700 p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/15 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-amber-300/30 blur-3xl"></div>
            <div className="relative">
              <i className="fa-solid fa-heart text-3xl text-white/90"></i>
              <h2 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">{t('finalCta.title')}</h2>
              <p className="mt-4 text-white/85 text-base sm:text-lg max-w-2xl mx-auto">{t('finalCta.text')}</p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-accent-700 hover:bg-accent-100 px-8 py-4 font-heading font-bold text-sm shadow-lg transition-colors group"
                >
                  <i className="fa-solid fa-hand-holding-heart"></i>
                  {t('finalCta.primary')}
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 hover:bg-white/10 px-8 py-4 font-heading font-bold text-sm text-white transition-colors"
                >
                  <i className="fa-regular fa-comments"></i>
                  {t('finalCta.secondary')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsorship;
