import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PROGRAMS } from '../store/siteData';
import { CONTACT_INFO } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { trackEvent } from '../src/analytics';

const PROGRAM_KEYWORDS: Record<string, string> = {
  'orphan-care': 'sponsor an orphan Pakistan, orphan care home Lahore, orphan education donation, orphan sponsorship program, donate for orphans',
  'clean-water': 'clean water hand pump donation, Sadaqah Jariyah water well, water project Pakistan, donate a water pump, solar water pump donation',
  'flood-relief': 'flood relief donation Pakistan, emergency relief Pakistan, disaster relief NGO, flood victims Pakistan donation, emergency tent donation',
  'relief-work': 'food ration donation Pakistan, community food support, donate food for the poor, monthly ration pack donation, feed a family Pakistan',
};

const ProgramDetail: React.FC = () => {
  const { t } = useTranslation('programs');
  const { id } = useParams<{ id: string }>();
  const program = PROGRAMS.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useSEO({
    path: `/programs/${id}`,
    title: program ? `${t(`items.${program.id}.title`, { defaultValue: program.title })} | Aasra Welfare Society` : 'Program Not Found | Aasra Welfare Society',
    description: program
      ? `${t(`items.${program.id}.description`, { defaultValue: program.description })} Donate now to support this verified Aasra Welfare Society program in Pakistan.`
      : 'This program could not be found.',
    keywords: program ? PROGRAM_KEYWORDS[program.id] || '' : '',
    breadcrumbs: program
      ? [
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/programs' },
          { name: t(`items.${program.id}.title`, { defaultValue: program.title }), path: `/programs/${program.id}` },
        ]
      : undefined,
  });

  useEffect(() => {
    if (!program) return;
    trackEvent('ViewContent', {
      content_name: program.title,
      content_category: 'Program',
      content_ids: [program.id],
      content_type: 'product',
    });
  }, [program]);

  if (!program) return <Navigate to="/programs" replace />;

  const title = t(`items.${program.id}.title`, { defaultValue: program.title });
  const tagline = t(`items.${program.id}.tagline`, { defaultValue: program.tagline });
  const longDescription = t(`items.${program.id}.longDescription`, {
    defaultValue: program.longDescription,
    returnObjects: true,
  }) as string[];
  const unitCostLabels = t(`items.${program.id}.unitCosts`, {
    defaultValue: program.unitCosts?.map((c) => c.label) || [],
    returnObjects: true,
  }) as string[];

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero Banner */}
      <div className="h-[60vh] md:h-[68vh] relative overflow-hidden">
        <img
          src={program.image}
          alt={title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-neon-mint text-xs font-bold mb-4 border border-white/20">
              <i className={`fa-solid ${program.icon}`}></i>
              <span>{tagline}</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column (8 cols): Description & Media */}
          <div className="lg:col-span-8 space-y-12">

            {/* Long Description Prose */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-sm space-y-6">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink">
                {t('detail.aboutInitiative')}
              </h2>
              <div className="space-y-4 text-ink-soft text-base sm:text-lg leading-relaxed">
                {longDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Impact Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-7 rounded-3xl border border-line shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-ink mb-1">{t('detail.sustainableTitle')}</h4>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {t('detail.sustainableText')}
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-line shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-eye"></i>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-ink mb-1">{t('detail.photographicTitle')}</h4>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {t('detail.photographicText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Field Photo Gallery with Click to Zoom Lightbox */}
            {program.gallery.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-brand">{t('detail.fieldDocEyebrow')}</span>
                    <h3 className="font-heading font-bold text-2xl text-ink">{t('detail.fromTheField')}</h3>
                  </div>
                  <span className="text-xs text-ink-soft">{t('detail.clickToView')}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {program.gallery.slice(0, 9).map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className="aspect-square overflow-hidden rounded-2xl border border-line relative group focus:outline-none cursor-pointer"
                    >
                      <img
                        src={url}
                        alt={`${title} ${t('detail.documentation')} ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-brand-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <i className="fa-solid fa-magnifying-glass-plus text-xl"></i>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Call to Action Card */}
            <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-4 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-neon-mint block">
                  {t('detail.supportInitiative')}
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {t('detail.makeADifference')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {t('detail.everyContribution')}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to={`/donate?cause=${encodeURIComponent(title)}`}
                    className="px-8 py-4 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent/30 transition-all flex items-center gap-2"
                  >
                    <i className="fa-solid fa-heart"></i>
                    <span>{t('detail.sponsorNow')}</span>
                  </Link>
                </div>
              </div>
              <i className={`fa-solid ${program.icon} absolute -bottom-10 -right-10 text-[200px] text-white/5 pointer-events-none`}></i>
            </div>

          </div>

          {/* Right Column (4 cols): Sticky Action Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">

            {/* Campaign Goal Progress Card */}
            {program.goalPKR && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand">
                    {t('detail.activeCampaignGoal')}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-heading font-extrabold bg-brand-50 text-brand border border-brand-200">
                    {Math.round((program.raisedPKR / program.goalPKR) * 100)}{t('detail.funded')}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-ink-soft">{t('detail.raised')}</span>
                    <span className="font-heading font-extrabold text-xl text-ink">
                      ₨ {program.raisedPKR.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-ink-faint">
                    <span>{t('detail.targetGoal')}</span>
                    <span className="font-semibold text-ink-soft">₨ {program.goalPKR.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-line rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-brand to-neon-mint h-full rounded-full transition-all duration-1000 shadow-sm relative overflow-hidden"
                    style={{
                      width: `${Math.max(6, Math.min(100, Math.round((program.raisedPKR / program.goalPKR) * 100)))}%`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                  </div>
                </div>

                <p className="text-[11px] text-ink-soft">
                  ₨ {((program.goalPKR - program.raisedPKR) / 1000000).toFixed(1).replace('.0', '')} {t('detail.millionNeeded')}
                </p>

                {/* Unit Cost Reference */}
                {program.unitCosts && program.unitCosts.length > 0 && (
                  <div className="pt-3 border-t border-line space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint block">
                      {t('detail.standardUnitCosts')}
                    </span>
                    {program.unitCosts.map((cost, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-1 border-b border-line/40 last:border-0">
                        <span className="text-ink-soft">{unitCostLabels[idx] || cost.label}</span>
                        <span className="font-bold text-ink">₨ {cost.amountPKR.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quick Sponsorship Widget */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-lg space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand block mb-1">
                  {t('detail.immediateAction')}
                </span>
                <h3 className="font-heading font-bold text-xl text-ink">
                  {t('detail.supportProgram', { title })}
                </h3>
              </div>

              <p className="text-xs text-ink-soft leading-relaxed">
                {t('detail.zakatSadaqah')}
              </p>

              <Link
                to={`/donate?cause=${encodeURIComponent(title)}`}
                className="w-full py-4 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-md shadow-accent/25 transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-heart"></i>
                <span>{t('detail.donateProject')}</span>
              </Link>

              {/* Direct WhatsApp Coordinator Contact */}
              <div className="pt-4 border-t border-line space-y-3">
                <span className="text-[11px] font-bold text-ink-soft block uppercase tracking-wider">
                  {t('detail.speakCoordinator')}
                </span>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Assalamualaikum, I would like to inquire about sponsoring the ${title} initiative.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-semibold text-xs text-[#128C7E] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp text-base text-[#25D366]"></i>
                  <span>{t('detail.whatsappCoordinator')}</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="w-full py-3 rounded-xl font-semibold text-xs text-ink-soft hover:text-ink bg-paper-dim hover:bg-line transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-phone text-xs text-brand"></i>
                  <span>{t('detail.callPhone', { phone: CONTACT_INFO.phone })}</span>
                </a>
              </div>
            </div>

            {/* Back link */}
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline px-2"
            >
              <i className="fa-solid fa-arrow-left text-[10px]"></i>
              <span>{t('detail.backToPrograms')}</span>
            </Link>
          </aside>

        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-xl transition-all"
            aria-label={t('detail.closeViewer')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Prev Button */}
          {activeImageIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(activeImageIndex - 1);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-lg transition-all"
              aria-label={t('detail.previousPhoto')}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={program.gallery[activeImageIndex]}
              alt={`${title} ${t('detail.fullView')}`}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <span className="text-white/60 text-xs mt-3">
              {t('detail.photoCounter', {
                current: activeImageIndex + 1,
                total: Math.min(9, program.gallery.length),
                title,
              })}
            </span>
          </div>

          {/* Next Button */}
          {activeImageIndex < Math.min(8, program.gallery.length - 1) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(activeImageIndex + 1);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-lg transition-all"
              aria-label={t('detail.nextPhoto')}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default ProgramDetail;
