import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { NISAB_SETTINGS } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { trackEvent, trackCustomEvent } from '../src/analytics';

interface AssetField {
  id: string;
  category: 'cash' | 'metals' | 'investments' | 'liabilities';
}

const FIELDS: AssetField[] = [
  { id: 'cashInHand', category: 'cash' },
  { id: 'foreignCurrency', category: 'cash' },
  { id: 'goldValue', category: 'metals' },
  { id: 'silverValue', category: 'metals' },
  { id: 'businessStock', category: 'investments' },
  { id: 'receivables', category: 'investments' },
  { id: 'sharesInvestments', category: 'investments' },
  { id: 'liabilities', category: 'liabilities' },
];

const ZakatCalculator: React.FC = () => {
  const { t } = useTranslation('zakat');
  const navigate = useNavigate();

  useSEO({
    path: '/zakat',
    title: 'Zakat Calculator | Calculate & Pay Your Zakat Online – Aasra Welfare Society',
    description: 'Use our free Zakat calculator to accurately calculate your obligatory 2.5% Zakat based on gold and silver Nisab, then donate directly to verified orphans and families in need.',
    keywords: 'zakat calculator, zakat calculator Pakistan, how to calculate zakat, nisab calculator, zakat on gold silver cash, pay zakat online, zakat nisab 2025, online zakat calculator',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Zakat Calculator', path: '/zakat' },
    ],
  });
  const [nisabStandard, setNisabStandard] = useState<'silver' | 'gold'>('silver');
  const [values, setValues] = useState<Record<string, number>>({
    cashInHand: 0,
    foreignCurrency: 0,
    goldValue: 0,
    silverValue: 0,
    businessStock: 0,
    receivables: 0,
    sharesInvestments: 0,
    liabilities: 0,
  });

  const silverNisabValue = Math.round(NISAB_SETTINGS.silverGrams * NISAB_SETTINGS.silverRatePKRPerGram);
  const goldNisabValue = Math.round(NISAB_SETTINGS.goldGrams * NISAB_SETTINGS.goldRatePKRPerGram);

  const activeNisabThreshold = nisabStandard === 'silver' ? silverNisabValue : goldNisabValue;

  const handleInputChange = (id: string, val: string) => {
    const num = parseFloat(val) || 0;
    setValues((prev) => ({ ...prev, [id]: num < 0 ? 0 : num }));
  };

  const addQuickAmount = (id: string, delta: number) => {
    setValues((prev) => ({ ...prev, [id]: (prev[id] || 0) + delta }));
  };

  const handleReset = () => {
    setValues({
      cashInHand: 0,
      foreignCurrency: 0,
      goldValue: 0,
      silverValue: 0,
      businessStock: 0,
      receivables: 0,
      sharesInvestments: 0,
      liabilities: 0,
    });
  };

  // Calculations
  const { grossWealth, totalLiabilities, netZakatableWealth, zakatPayable, isNisabReached } = useMemo(() => {
    const gross =
      (values.cashInHand || 0) +
      (values.foreignCurrency || 0) +
      (values.goldValue || 0) +
      (values.silverValue || 0) +
      (values.businessStock || 0) +
      (values.receivables || 0) +
      (values.sharesInvestments || 0);

    const liab = values.liabilities || 0;
    const net = Math.max(0, gross - liab);
    const reached = net >= activeNisabThreshold;
    const payable = reached ? net * 0.025 : 0;

    return {
      grossWealth: gross,
      totalLiabilities: liab,
      netZakatableWealth: net,
      zakatPayable: payable,
      isNisabReached: reached,
    };
  }, [values, activeNisabThreshold]);

  // Meta Pixel: record once per visit that this visitor owes Zakat (debounced while typing).
  const zakatTracked = useRef(false);
  useEffect(() => {
    if (zakatTracked.current || !isNisabReached || zakatPayable <= 0) return;
    const timer = setTimeout(() => {
      zakatTracked.current = true;
      trackCustomEvent('ZakatCalculated', { value: Math.round(zakatPayable), currency: 'PKR' });
    }, 2000);
    return () => clearTimeout(timer);
  }, [isNisabReached, zakatPayable]);

  const handleAllocate = (cause: string) => {
    const amount = Math.round(zakatPayable);
    trackEvent('InitiateCheckout', {
      content_name: cause,
      content_category: 'Zakat',
      value: amount,
      currency: 'PKR',
    });
    navigate(`/donate?amount=${amount}&cause=${encodeURIComponent(cause)}&category=Zakat`);
  };

  return (
    <div className="bg-paper min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand">
            <i className="fa-solid fa-calculator"></i>
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed font-sans">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Nisab Selector Bar */}
        <div className="bg-white rounded-3xl p-6 border border-line shadow-sm max-w-4xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand block mb-1">
                {t('nisabSelector.eyebrow')}
              </span>
              <p className="text-xs text-ink-soft">
                <Trans t={t} i18nKey="nisabSelector.note" components={{ 1: <strong /> }} />
              </p>
            </div>

            <div className="flex items-center bg-paper-dim p-1.5 rounded-2xl border border-line">
              <button
                type="button"
                onClick={() => setNisabStandard('silver')}
                className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs transition-all flex items-center gap-2 ${
                  nisabStandard === 'silver'
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                <i className="fa-solid fa-coins"></i>
                <span>{t('nisabSelector.silverOption')}</span>
              </button>
              <button
                type="button"
                onClick={() => setNisabStandard('gold')}
                className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs transition-all flex items-center gap-2 ${
                  nisabStandard === 'gold'
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                <i className="fa-solid fa-gem"></i>
                <span>{t('nisabSelector.goldOption')}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-line/60 flex flex-wrap items-center justify-between text-xs text-ink-soft gap-2">
            <span>
              {t('nisabSelector.activeThreshold')} <strong className="text-ink">₨ {activeNisabThreshold.toLocaleString()}</strong> ({nisabStandard.toUpperCase()} {t('nisabSelector.standardSuffix')})
            </span>
            <span className="text-[11px] text-brand font-semibold">
              {t('nisabSelector.rateNote', { silverRate: NISAB_SETTINGS.silverRatePKRPerGram, goldRate: NISAB_SETTINGS.goldRatePKRPerGram })}
            </span>
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Input Fields (8 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h3 className="font-heading font-bold text-xl text-ink flex items-center gap-2.5">
                  <i className="fa-solid fa-wallet text-brand text-lg"></i>
                  <span>{t('assetsCard.title')}</span>
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-ink-soft hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  <i className="fa-solid fa-arrow-rotate-right text-[10px]"></i>
                  <span>{t('assetsCard.resetAll')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {FIELDS.map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label className="text-xs font-bold text-ink block leading-snug">
                      {t(`fields.${field.id}.label`)}
                    </label>
                    <p className="text-[11px] text-ink-soft leading-tight line-clamp-1">
                      {t(`fields.${field.id}.description`)}
                    </p>

                    <div className="relative mt-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-faint">
                        ₨
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={values[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder="0"
                        className={`w-full py-2.5 pl-8 pr-3 text-sm font-semibold rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                          field.category === 'liabilities'
                            ? 'bg-rose-50/50 border-rose-200 text-rose-900 focus:ring-rose-400 focus:bg-white'
                            : 'bg-paper-dim border-line text-ink focus:ring-brand focus:bg-white'
                        }`}
                      />
                    </div>

                    {/* Quick increment chips */}
                    <div className="flex items-center gap-1 pt-1">
                      {[10000, 50000, 100000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => addQuickAmount(field.id, amt)}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-paper-dim hover:bg-brand-50 hover:text-brand text-ink-soft border border-line/60 transition-colors"
                        >
                          +{amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}k`}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Real-Time Live Results Dashboard (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-800 relative overflow-hidden">
              {/* Glowing Background Flare */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-mint/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-300">
                    {t('results.liveCalculation')}
                  </span>
                  {isNisabReached ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-neon-emerald/20 text-neon-mint border border-neon-mint/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-ping"></span>
                      {t('results.nisabMet')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {t('results.belowNisab')}
                    </span>
                  )}
                </div>

                {/* Wealth Breakdown Rows */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between items-center text-white/70">
                    <span>{t('results.totalGrossWealth')}</span>
                    <span className="font-mono text-white text-sm font-semibold">
                      ₨ {grossWealth.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white/70">
                    <span>{t('results.deductibleLiabilities')}</span>
                    <span className="font-mono text-rose-300 text-sm font-semibold">
                      - ₨ {totalLiabilities.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-white/15 my-2"></div>
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span>{t('results.netZakatableWealth')}</span>
                    <span className="font-mono text-neon-mint">
                      ₨ {netZakatableWealth.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Big Payable Output */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center space-y-1">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-white/60 block">
                    {t('results.calculatedZakat')}
                  </span>
                  <p className="font-heading font-extrabold text-3xl sm:text-4xl text-neon-mint tracking-tight">
                    ₨ {Math.round(zakatPayable).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-white/50 pt-1">
                    {isNisabReached ? t('results.purifyNote') : t('results.noObligatoryNote')}
                  </p>
                </div>

                {/* 1-Click Direct Allocation Buttons */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-white/70 block">
                    {t('results.instantAllocation')}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleAllocate(t('causes.orphanCare'))}
                    className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-md shadow-accent/30 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-child-reaching"></i>
                      {t('results.allocateOrphan')}
                    </span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAllocate(t('causes.cleanWater'))}
                    className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-faucet-drip text-neon-mint"></i>
                      {t('results.allocateWater')}
                    </span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAllocate(t('causes.generalZakat'))}
                    className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-white/80 hover:text-white bg-transparent hover:bg-white/5 border border-white/10 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-shield-heart text-amber-300"></i>
                      {t('results.allocateGeneral')}
                    </span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Scholars Note */}
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand flex items-center justify-center text-base shrink-0 mt-0.5">
                <i className="fa-solid fa-circle-info"></i>
              </div>
              <div className="text-xs text-ink-soft space-y-1">
                <h4 className="font-heading font-bold text-ink text-sm">{t('hawlNote.title')}</h4>
                <p className="leading-relaxed">
                  {t('hawlNote.text')}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ZakatCalculator;
