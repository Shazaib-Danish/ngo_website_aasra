import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';

const TIMELINE_IDS = ['1', '2', '3'];
const REGISTRATION_DATA = [
  { id: '1', icon: 'fa-landmark', license: 'DO.SW.LHR(R&G)08-1564' },
  { id: '2', icon: 'fa-scale-balanced', license: 'PB-LHR-8081727259287789' },
  { id: '3', icon: 'fa-file-shield', license: 'NTN: 4547488' },
];

const About: React.FC = () => {
  const { t } = useTranslation('about');

  useSEO({
    path: '/about',
    title: 'About Us | Aasra Welfare Society – Registered NGO in Lahore, Pakistan',
    description: "Learn about Aasra Welfare Society's mission, milestones and official registrations. A government-certified non-profit serving orphans and underprivileged families across Pakistan since 2021.",
    keywords: 'About Aasra Welfare Society, registered NGO Pakistan, charity commission Pakistan, non-profit Lahore, NGO history Pakistan, Islamic charity mission, verified charity Pakistan',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  });

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-neon-mint">
            <i className="fa-solid fa-heart"></i>
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans italic">
            {t('hero.quote')}
          </p>
        </div>
      </section>

      {/* Narrative & Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left 7 cols: Story & Timeline */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="eyebrow text-brand block">{t('story.eyebrow')}</span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
                  {t('story.title')}
                </h2>
                <p className="text-ink-soft text-base sm:text-lg leading-relaxed">
                  {t('story.paragraph1')}
                </p>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                  {t('story.paragraph2')}
                </p>
              </div>

              {/* Glowing Interactive Timeline */}
              <div className="space-y-6 pt-2">
                <h3 className="font-heading font-bold text-xl text-ink">{t('timeline.title')}</h3>
                <div className="relative pl-8 border-l-2 border-brand/20 space-y-8">
                  {TIMELINE_IDS.map((id) => (
                    <div key={id} className="relative group">
                      {/* Node Bullet */}
                      <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-brand group-hover:border-neon-mint transition-colors shadow-sm"></div>

                      <div className="bg-white p-5 rounded-2xl border border-line shadow-xs group-hover:shadow-md transition-all">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-brand uppercase tracking-wider">
                            {t(`timeline.items.${id}.year`)}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand">
                            {t(`timeline.items.${id}.badge`)}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-base text-ink mb-1">
                          {t(`timeline.items.${id}.title`)}
                        </h4>
                        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                          {t(`timeline.items.${id}.text`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-6 rounded-3xl border border-line shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand flex items-center justify-center text-lg mb-2">
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-ink">{t('vision.title')}</h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {t('vision.text')}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-line shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-2">
                    <i className="fa-solid fa-bullseye"></i>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-ink">{t('mission.title')}</h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {t('mission.text')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Authentic Imagery & Proof */}
            <div className="lg:col-span-5 space-y-6">
              <div className="overflow-hidden rounded-3xl shadow-xl border border-line">
                <img
                  src="/images/orphanage/orphanage-03.webp"
                  alt={t('imageAlts.students')}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="overflow-hidden rounded-3xl shadow-xl border border-line">
                <img
                  src="/images/water-projects/water-project-02.webp"
                  alt={t('imageAlts.waterHandover')}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Quick Commitment Box */}
              <div className="bg-gradient-to-br from-brand-950 to-brand-900 text-white p-6 rounded-3xl border border-brand-800 space-y-3">
                <div className="flex items-center gap-2 text-neon-mint text-xs font-bold uppercase tracking-wider">
                  <i className="fa-solid fa-scale-balanced"></i>
                  <span>{t('commitmentBox.eyebrow')}</span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  {t('commitmentBox.title')}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  {t('commitmentBox.text')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Official Government & Legal Registrations */}
      <section className="py-20 bg-paper-dim/60 border-t border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="eyebrow text-brand block">{t('registrations.eyebrow')}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
              {t('registrations.title')}
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft">
              {t('registrations.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {REGISTRATION_DATA.map((reg) => (
              <div
                key={reg.id}
                className="bg-white rounded-3xl p-6 border border-line shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center text-xl">
                    <i className={`fa-solid ${reg.icon}`}></i>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-ink-faint block">
                      {t(`registrations.items.${reg.id}.authority`)}
                    </span>
                    <h4 className="font-heading font-bold text-base text-ink leading-snug">
                      {t(`registrations.items.${reg.id}.label`)}
                    </h4>
                  </div>
                </div>

                <div className="pt-3 border-t border-line/60">
                  <p className="font-mono text-xs font-bold text-ink bg-paper-dim p-2 rounded-xl text-center break-all select-all">
                    {reg.license}
                  </p>
                  <span className="text-[10px] text-neon-emerald font-semibold text-center block mt-2">
                    <i className="fa-solid fa-circle-check mr-1"></i>
                    {t(`registrations.items.${reg.id}.status`)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm text-white bg-brand hover:bg-brand-600 shadow-md shadow-brand/20 transition-all"
            >
              <span>{t('registrations.exploreCta')}</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
