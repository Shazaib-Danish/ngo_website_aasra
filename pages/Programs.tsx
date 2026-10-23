import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { PROGRAMS } from '../store/siteData';
import { useSEO } from '../hooks/useSEO';

const Programs: React.FC = () => {
  const { t } = useTranslation('programs');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useSEO({
    path: '/programs',
    title: 'Our Programs | Orphan Care, Clean Water, Flood Relief & Food Support',
    description: "Explore Aasra Welfare Society's four core programs: orphan care & education, clean water hand pumps, flood & emergency relief, and community food support across Pakistan.",
    keywords: 'orphan care program Pakistan, clean water project Pakistan, flood relief program, food support charity, NGO programs Pakistan, sponsor an orphan, donate hand pump, community relief Pakistan',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Programs', path: '/programs' },
    ],
  });

  const filteredPrograms = selectedFilter === 'All'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.id === selectedFilter);

  const filterTabs = [
    { id: 'All', label: t('filters.all') },
    { id: 'orphan-care', label: t('filters.orphan-care') },
    { id: 'clean-water', label: t('filters.clean-water') },
    { id: 'flood-relief', label: t('filters.flood-relief') },
    { id: 'relief-work', label: t('filters.relief-work') },
  ];

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-neon-mint">
            <i className="fa-solid fa-shapes"></i>
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold transition-all border ${
                  selectedFilter === tab.id
                    ? 'bg-brand text-white border-brand shadow-sm'
                    : 'bg-white text-ink-soft border-line hover:border-brand-300 hover:text-brand'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Programs Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredPrograms.map((program) => {
              const title = t(`items.${program.id}.title`, { defaultValue: program.title });
              const tagline = t(`items.${program.id}.tagline`, { defaultValue: program.tagline });
              const description = t(`items.${program.id}.description`, { defaultValue: program.description });
              const longDescription = t(`items.${program.id}.longDescription`, {
                defaultValue: program.longDescription,
                returnObjects: true,
              }) as string[];
              const unitCostLabels = t(`items.${program.id}.unitCosts`, {
                defaultValue: program.unitCosts?.map((c) => c.label) || [],
                returnObjects: true,
              }) as string[];
              const percent = program.goalPKR ? Math.round((program.raisedPKR / program.goalPKR) * 100) : 0;

              return (
                <div
                  key={program.id}
                  className="glass-card bg-white rounded-3xl overflow-hidden border border-line shadow-lg flex flex-col group"
                >
                  {/* Image Banner with Badge */}
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={program.homeImage || program.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md text-brand flex items-center justify-center text-xl shadow-md">
                      <i className={`fa-solid ${program.icon}`}></i>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-neon-mint block mb-1">
                        {tagline}
                      </span>
                      <h2 className="font-heading font-bold text-2xl leading-tight">
                        {title}
                      </h2>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                        {description}
                      </p>

                      {/* Preview Paragraph */}
                      {longDescription && longDescription[0] && (
                        <p className="text-xs sm:text-sm text-ink-faint leading-relaxed line-clamp-2 italic">
                          "{longDescription[0]}"
                        </p>
                      )}

                      {/* Campaign Goal Progress Box */}
                      {program.goalPKR && (
                        <div className="bg-paper-dim/90 p-5 rounded-2xl border border-line space-y-3 mt-4">
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand block">
                                {t('card.donationGoal')}
                              </span>
                              <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="font-heading font-extrabold text-base sm:text-lg text-ink">
                                  ₨ {program.raisedPKR >= 1000000 ? `${(program.raisedPKR / 1000000).toFixed(1).replace('.0', '')}M` : `${(program.raisedPKR / 1000).toFixed(0)}K`}
                                </span>
                                <span className="text-xs text-ink-soft">
                                  {t('card.raisedOf')} <strong className="text-ink font-semibold">₨ {program.goalPKR >= 1000000 ? `${(program.goalPKR / 1000000).toFixed(0)}M` : `${(program.goalPKR / 1000).toFixed(0)}K`}</strong>
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading font-extrabold bg-brand text-white shadow-xs">
                                {percent}{t('card.funded')}
                              </span>
                              <span className="text-[10px] text-ink-faint block mt-0.5">
                                ₨ {((program.goalPKR - program.raisedPKR) / 1000000).toFixed(1).replace('.0', '')}{t('card.needed')}
                              </span>
                            </div>
                          </div>

                          {/* Visual Percentage Bar */}
                          <div className="w-full bg-line rounded-full h-3 overflow-hidden p-0.5 relative">
                            <div
                              className="bg-gradient-to-r from-brand via-brand-400 to-neon-mint h-full rounded-full transition-all duration-1000 shadow-sm relative overflow-hidden"
                              style={{
                                width: `${Math.max(6, Math.min(100, percent))}%`
                              }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                            </div>
                          </div>

                          {/* Unit Cost Pills */}
                          {program.unitCosts && program.unitCosts.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint mr-0.5">{t('card.unitCosts')}</span>
                              {program.unitCosts.map((cost, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] font-semibold text-ink-soft bg-white px-2.5 py-1 rounded-lg border border-line shadow-2xs inline-flex items-center gap-1"
                                >
                                  <span className="text-brand font-bold">₨ {cost.amountPKR.toLocaleString()}</span>
                                  <span className="text-ink-faint text-[10px]">({unitCostLabels[idx] || cost.label})</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4">
                      <Link
                        to={`/programs/${program.id}`}
                        className="px-6 py-3 rounded-full font-heading font-bold text-xs text-white bg-brand hover:bg-brand-600 shadow-sm transition-all flex items-center gap-2"
                      >
                        <span>{t('card.fullStory')}</span>
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </Link>

                      <Link
                        to={`/donate?cause=${encodeURIComponent(title)}`}
                        className="px-6 py-3 rounded-full font-heading font-bold text-xs text-accent hover:text-white bg-accent/10 hover:bg-accent transition-all flex items-center gap-2"
                      >
                        <i className="fa-solid fa-heart text-[10px]"></i>
                        <span>{t('card.sponsorProject')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Transparency Guarantee */}
          <div className="mt-16 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-4 shadow-xl">
            <h3 className="font-heading font-bold text-2xl">{t('bottomCta.title')}</h3>
            <p className="text-white/80 text-sm max-w-lg mx-auto leading-relaxed">
              <Trans t={t} i18nKey="bottomCta.text" components={{ 1: <strong /> }} />
            </p>
            <div className="pt-2">
              <Link
                to="/donate?cause=General%20Relief"
                className="inline-block px-8 py-4 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent/30 transition-all"
              >
                {t('bottomCta.cta')}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Programs;
