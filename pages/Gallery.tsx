import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GALLERY } from '../store/siteData';
import { useSEO } from '../hooks/useSEO';

const Gallery: React.FC = () => {
  const { t } = useTranslation('gallery');
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useSEO({
    path: '/gallery',
    title: 'Photo Gallery | See Our Impact – Aasra Welfare Society',
    description: "Browse real photos of Aasra Welfare Society's orphan care home, clean water hand pump installations, flood relief operations and community outreach across Pakistan.",
    keywords: 'charity photos Pakistan, orphan care gallery, NGO impact photos, welfare society pictures, flood relief photos Pakistan, water project photos',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery' },
    ],
  });

  const categories: string[] = ['All', ...Array.from(new Set(GALLERY.map((item) => item.category)))];

  const filteredGallery = filter === 'All'
    ? GALLERY
    : GALLERY.filter((item) => item.category === filter);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  }, [lightboxIndex, filteredGallery.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  }, [lightboxIndex, filteredGallery.length]);

  const handleClose = () => {
    setLightboxIndex(null);
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  const activeItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <div className="bg-paper min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-neon-mint">
            <i className="fa-solid fa-camera"></i>
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

      {/* Gallery Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Filter Pills with Counts */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const count = cat === 'All' ? GALLERY.length : GALLERY.filter(g => g.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full font-heading font-bold text-xs transition-all flex items-center gap-2 border ${
                    filter === cat
                      ? 'bg-brand text-white border-brand shadow-sm'
                      : 'bg-white text-ink-soft border-line hover:border-brand-200 hover:text-brand'
                  }`}
                >
                  <span>{t(`categories.${cat}`, { defaultValue: cat })}</span>
                  <span className={`text-[10px] px-2 py-0.2 rounded-full ${
                    filter === cat ? 'bg-white/20 text-white' : 'bg-paper-dim text-ink-faint'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGallery.map((item, idx) => {
              const caption = t(`captions.${item.title}`, { defaultValue: item.title });
              const category = t(`categories.${item.category}`, { defaultValue: item.category });
              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-ink cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.url}
                    alt={caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-neon-mint mb-1">
                      {category}
                    </span>
                    <h3 className="text-white font-heading font-bold text-sm sm:text-base leading-snug">
                      {caption}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-white/70">
                      <i className="fa-solid fa-magnifying-glass-plus text-[11px]"></i>
                      <span className="text-[11px]">{t('clickToView')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Full-Screen Interactive Lightbox */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in"
          onClick={handleClose}
        >
          {/* Top Bar with Info & Close */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-neon-mint uppercase tracking-wider">
                {t('photoCounter', {
                  current: lightboxIndex + 1,
                  total: filteredGallery.length,
                  category: t(`categories.${activeItem.category}`, { defaultValue: activeItem.category }),
                })}
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                {t(`captions.${activeItem.title}`, { defaultValue: activeItem.title })}
              </h4>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-all"
              aria-label={t('closeViewer')}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-all z-20"
            aria-label={t('previousImage')}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Active Image Container */}
          <div
            className="max-w-5xl max-h-[82vh] flex flex-col items-center justify-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.url}
              alt={t(`captions.${activeItem.title}`, { defaultValue: activeItem.title })}
              className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-all z-20"
            aria-label={t('nextImage')}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}

    </div>
  );
};

export default Gallery;
