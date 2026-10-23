import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../src/i18n';
import { trackCustomEvent } from '../src/analytics';

interface LanguageSwitcherProps {
  variant?: 'topbar' | 'mobile';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'topbar' }) => {
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const current =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    trackCustomEvent('LanguageChanged', { language: code });
    setOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="grid grid-cols-4 gap-2">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang.code)}
            className={`flex flex-col items-center gap-1 py-2 rounded-xl border transition-all ${
              lang.code === current.code
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-ink-soft border-line hover:border-brand-200'
            }`}
          >
            <img src={lang.flag} alt={lang.name} className="w-6 h-4.5 object-cover rounded-[2px]" />
            <span className="text-[10px] font-bold">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t('languageSelector')}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-white/70 hover:text-neon-mint transition-colors text-[12px] font-semibold"
      >
        <img src={current.flag} alt={current.name} className="w-4 h-3 object-cover rounded-[2px]" />
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div className="absolute right-0 mt-2.5 w-48 bg-white rounded-2xl border border-line shadow-2xl py-2 z-[70] max-h-80 overflow-y-auto">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs font-semibold transition-colors ${
                lang.code === current.code ? 'bg-brand-50 text-brand' : 'text-ink-soft hover:bg-paper-dim'
              }`}
            >
              <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-[2px] shrink-0" />
              <span>{lang.nativeName}</span>
              {lang.code === current.code && (
                <i className="fa-solid fa-check text-[10px] ml-auto text-brand"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
