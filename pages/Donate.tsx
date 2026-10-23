import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BANK_DETAILS, CONTACT_INFO, IMPACT_TIERS } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { trackEvent } from '../src/analytics';

const BankLogo = BANK_DETAILS.logo;

const Donate: React.FC = () => {
  const { t } = useTranslation('donate');
  const [searchParams] = useSearchParams();
  const widgetRef = useRef<HTMLDivElement>(null);

  useSEO({
    path: '/donate',
    title: 'Donate Now | Zakat, Sadaqah & Online Donations – Aasra Welfare Society',
    description: 'Donate Zakat, Sadaqah or a one-time gift securely online via card, bank transfer or mobile wallet. 100% of your donation reaches orphans and families in need across Pakistan.',
    keywords: 'donate zakat online, donate sadaqah online Pakistan, online donation Pakistan NGO, credit card donation Pakistan, JazzCash donation, EasyPaisa donation, bank transfer donation Pakistan, donate to charity online, international donation Pakistan NGO',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Donate', path: '/donate' },
    ],
  });

  // URL params state
  const paramAmount = searchParams.get('amount');
  const paramCause = searchParams.get('cause');
  const paramCategory = searchParams.get('category');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [donationCategory, setDonationCategory] = useState(paramCategory || 'Zakat');
  const [activeCause] = useState(paramCause || 'Orphan Care & Education');
  const [customAmount] = useState<number>(paramAmount ? parseFloat(paramAmount) : 30000);
  const [activeGateway, setActiveGateway] = useState<'bank' | 'card'>('bank');

  // Meta Pixel: one ViewContent per visit, and AddPaymentInfo once per payment method.
  const trackedPaymentMethods = useRef<Set<string>>(new Set());
  const trackPaymentInfo = (method: 'bank_transfer' | 'card') => {
    if (trackedPaymentMethods.current.has(method)) return;
    trackedPaymentMethods.current.add(method);
    trackEvent('AddPaymentInfo', {
      content_name: activeCause,
      content_category: donationCategory,
      payment_method: method,
      value: customAmount,
      currency: 'PKR',
    });
  };

  useEffect(() => {
    trackEvent('ViewContent', {
      content_name: 'Donate Page',
      content_category: paramCategory || 'General',
      value: customAmount,
      currency: 'PKR',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectGateway = (gateway: 'bank' | 'card') => {
    setActiveGateway(gateway);
    if (gateway === 'card') trackPaymentInfo('card');
  };

  const copyToClipboard = (text: string, key: string) => {
    trackPaymentInfo('bank_transfer');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyAllBankDetails = () => {
    const text = `
🌟 Bank Account Details - Aasra Welfare Society 🌟
Bank Name: ${BANK_DETAILS.bankName}
Title: ${BANK_DETAILS.accountTitle}
Acc No: ${BANK_DETAILS.accountNumber}
IBAN No: ${BANK_DETAILS.iban}
Branch Code: ${BANK_DETAILS.branch_code}
Branch: ${BANK_DETAILS.branch}
NTN: 4547488 | Govt Reg: DO.SW.LHR(R&G)08-1564
    `.trim();
    copyToClipboard(text, 'all');
  };

  useEffect(() => {
    if (widgetRef.current) {
      if (!document.getElementById('whydonate-css')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://plugin.whydonate.com/wdplugin-style.css';
        link.id = 'whydonate-css';
        document.head.appendChild(link);
      }

      const existingScript = document.getElementById('whydonate-js');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.src = 'https://plugin.whydonate.com/wp_styling.js';
      script.id = 'whydonate-js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [activeGateway]);

  const bankRows = [
    { label: t('bankPortal.rows.bankName'), value: BANK_DETAILS.bankName, key: 'bank' },
    { label: t('bankPortal.rows.accountTitle'), value: BANK_DETAILS.accountTitle, key: 'title' },
    { label: t('bankPortal.rows.accountNumber'), value: BANK_DETAILS.accountNumber, key: 'acc', highlight: true },
    { label: t('bankPortal.rows.ibanNumber'), value: BANK_DETAILS.iban, key: 'iban', highlight: true },
    { label: t('bankPortal.rows.branchCode'), value: BANK_DETAILS.branch_code, key: 'code' },
    { label: t('bankPortal.rows.branchAddress'), value: BANK_DETAILS.branch, key: 'branch' },
  ];

  const cardCategories = ['Zakat', 'Sadaqah', 'General Relief', 'Orphan Care'];

  return (
    <div className="bg-paper min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-neon-mint">
            <i className="fa-solid fa-hand-holding-heart"></i>
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            {t('hero.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-mint to-amber-300">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-10 relative z-30">

        {/* Dynamic Allocation Banner if arrived with URL params */}
        {(paramAmount || paramCause) && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-brand/30 shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand flex items-center justify-center text-lg shrink-0">
                <i className="fa-solid fa-check-circle text-neon-emerald"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-brand uppercase tracking-wider">{t('preSelected.label')}</p>
                <p className="text-sm sm:text-base font-heading font-bold text-ink">
                  {paramCause || t('preSelected.defaultCause')}: ₨ {parseFloat(paramAmount || '0').toLocaleString()}
                </p>
              </div>
            </div>
            <span className="text-xs text-ink-soft hidden sm:inline">{t('preSelected.note')}</span>
          </div>
        )}

        {/* Impact Tiers Grid / Mobile Snap-Scroll Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand">{t('tiers.eyebrow')}</span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">{t('tiers.title')}</h2>
            </div>
            <span className="text-xs text-ink-soft hidden sm:inline">{t('tiers.swipeHint')}</span>
          </div>

          {/* Touch-Friendly Snap Carousel (mobile) / Grid (desktop) — reference pricing, read-only */}
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pb-2 snap-x no-scrollbar">
            {IMPACT_TIERS.map((tier) => {
              const title = t(`impactTiers.${tier.id}.title`, { defaultValue: tier.title });
              const description = t(`impactTiers.${tier.id}.description`, { defaultValue: tier.description });
              const badge = tier.badge ? t(`impactTiers.${tier.id}.badge`, { defaultValue: tier.badge }) : null;
              return (
                <div
                  key={tier.id}
                  className="p-4 sm:p-5 rounded-2xl text-left border bg-white border-line flex flex-col justify-between relative shrink-0 w-[240px] sm:w-auto snap-start"
                >
                  {badge && (
                    <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                      {badge}
                    </span>
                  )}

                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand flex items-center justify-center text-sm">
                      <i className={`fa-solid ${tier.icon}`}></i>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-ink leading-snug">{title}</h3>
                    <p className="text-[11px] text-ink-soft leading-relaxed line-clamp-2">{description}</p>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-3 border-t border-line/60">
                    <span className="font-heading font-bold text-sm sm:text-base text-ink block">
                      ₨ {tier.amountPKR.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Intuitive Gateway Tab Selector for Mobile & Desktop */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-paper-dim p-1.5 rounded-2xl border border-line flex items-center w-full max-w-xl shadow-xs">
            <button
              type="button"
              onClick={() => selectGateway('bank')}
              className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-2 ${
                activeGateway === 'bank'
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              <i className="fa-solid fa-building-columns text-sm"></i>
              <span>{t('gatewaySelector.bank')}</span>
            </button>
            <button
              type="button"
              onClick={() => selectGateway('card')}
              className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-2 ${
                activeGateway === 'card'
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              <i className="fa-solid fa-credit-card text-sm"></i>
              <span>{t('gatewaySelector.card')}</span>
            </button>
          </div>
        </div>

        {/* Dual Giving Gateways */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Portal 1: Direct Bank Makramah Transfer & Digital Banking (6 cols) */}
          <div className={`${activeGateway === 'bank' ? 'block' : 'hidden lg:block'} lg:col-span-6 space-y-6`}>
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-line shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand block">
                      {t('bankPortal.eyebrow')}
                    </span>
                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">{t('bankPortal.title')}</h2>
                  </div>
                  <img src={BankLogo} alt={t('bankPortal.bankLogoAlt')} className="h-9 sm:h-10 object-contain" />
                </div>

                <p className="text-xs text-ink-soft leading-relaxed">
                  {t('bankPortal.description')}
                </p>

                {/* Account Details Rows */}
                <div className="space-y-3">
                  {bankRows.map((row) => (
                    <div
                      key={row.key}
                      className={`p-3 sm:p-3.5 rounded-2xl border transition-colors flex items-center justify-between gap-2.5 ${
                        row.highlight
                          ? 'bg-brand-50/50 border-brand-200'
                          : 'bg-paper-dim/60 border-line'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-ink-faint block">
                          {row.label}
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-ink break-all select-all">
                          {row.value}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(row.value, row.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          copiedKey === row.key
                            ? 'bg-neon-emerald text-white'
                            : 'bg-white text-brand hover:bg-brand hover:text-white border border-line'
                        }`}
                      >
                        <i className={`fa-solid ${copiedKey === row.key ? 'fa-check' : 'fa-copy'} text-[11px]`}></i>
                        <span>{copiedKey === row.key ? t('bankPortal.copied') : t('bankPortal.copy')}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Big Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyAllBankDetails}
                    className="w-full py-3.5 sm:py-4 rounded-2xl font-heading font-bold text-xs sm:text-sm text-white bg-brand hover:bg-brand-600 shadow-md shadow-brand/20 transition-all flex items-center justify-center gap-2"
                  >
                    <i className={`fa-solid ${copiedKey === 'all' ? 'fa-check' : 'fa-copy'}`}></i>
                    <span>{copiedKey === 'all' ? t('bankPortal.allCopied') : t('bankPortal.copyAllDetails')}</span>
                  </button>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                      `Assalamualaikum, I have made a donation of ₨ ${customAmount.toLocaleString()} towards ${activeCause} (${donationCategory}). Please find the receipt attached.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 sm:py-3.5 rounded-2xl font-heading font-bold text-xs sm:text-sm text-[#128C7E] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-brands fa-whatsapp text-lg text-[#25D366]"></i>
                    <span>{t('bankPortal.whatsappSlip')}</span>
                  </a>
                </div>

                {/* Doorstep Collection & Cheque Notice */}
                <div className="p-3.5 rounded-2xl bg-paper-dim/80 border border-line text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-brand font-bold">
                    <i className="fa-solid fa-truck-ramp-box"></i>
                    <span>{t('bankPortal.doorstepTitle')}</span>
                  </div>
                  <p className="text-[11px] text-ink-soft leading-relaxed">
                    {t('bankPortal.doorstepText', { phone: CONTACT_INFO.phone, address: CONTACT_INFO.address })}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Portal 2: International Credit / Debit Card (6 cols) */}
          <div className={`${activeGateway === 'card' ? 'block' : 'hidden lg:block'} lg:col-span-6 space-y-6`}>
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-accent block">
                  {t('cardPortal.eyebrow')}
                </span>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">{t('cardPortal.title')}</h2>
                <p className="text-xs text-ink-soft mt-1">
                  {t('cardPortal.subtitle')}
                </p>
              </div>

              {/* Category Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {cardCategories.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDonationCategory(type)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all border ${
                      donationCategory === type
                        ? 'bg-accent text-white border-accent shadow-xs'
                        : 'bg-paper-dim text-ink-soft border-line hover:border-accent'
                    }`}
                  >
                    {t(`cardPortal.categories.${type}`, { defaultValue: type })}
                  </button>
                ))}
              </div>

              {/* Embedded WhyDonate Container */}
              <div className="min-h-[360px] bg-paper-dim/40 rounded-2xl p-4 border border-line flex flex-col justify-center">
                <div
                  ref={widgetRef}
                  id="widget-here-wWmjJ"
                  className="widget-here w-full"
                  data-shortcode="wWmjJ"
                  data-lang="auto"
                ></div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-line grid grid-cols-2 gap-3 text-[11px] text-ink-soft">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-lock text-emerald-600"></i>
                  <span>{t('cardPortal.trustBadges.ssl')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-file-invoice text-emerald-600"></i>
                  <span>{t('cardPortal.trustBadges.receipt')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-emerald-600"></i>
                  <span>{t('cardPortal.trustBadges.taxExempt')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-check-double text-emerald-600"></i>
                  <span>{t('cardPortal.trustBadges.compliant')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Donate;
