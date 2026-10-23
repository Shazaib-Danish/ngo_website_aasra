import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import ZakatCalculator from './pages/ZakatCalculator';
import Sponsorship from './pages/Sponsorship';
import Volunteer from './pages/Volunteer';
import { CONTACT_INFO, SOCIAL_LINKS, BANK_DETAILS } from './constants';
import { RTL_LANGUAGE_CODES } from './src/i18n';
import ScrollToTop from './ScrollToTop';
import { installClickTracking } from './src/analytics';
import LanguageSwitcher from './components/LanguageSwitcher';

const Logo = '/images/branding/logo.webp';

const TopAnnouncement = () => {
  const { t } = useTranslation('common');
  return (
    <div className="bg-brand-950 text-white text-xs border-b border-white/10 relative z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neon-mint/15 text-neon-mint border border-neon-mint/30 animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-ping inline-block"></span>
            {t('directAid')}
          </span>
          <span className="text-white/80 hidden sm:inline text-[12px]">
            {t('topAnnouncement')}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-white/80 ml-auto">
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            className="hover:text-neon-mint transition-colors flex items-center gap-1.5"
          >
            <i className="fa-solid fa-phone text-[10px] text-neon-mint"></i>
            <span className="hidden md:inline">{CONTACT_INFO.phone}</span>
          </a>
          <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-white/15">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-white/60 hover:text-neon-mint transition-colors text-xs"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
          <div className="pl-3 border-l border-white/15">
            <LanguageSwitcher variant="topbar" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { t } = useTranslation('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('programs'), path: '/programs' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('zakatCalculator'), path: '/zakat', badge: '2.5%' },
    { name: t('volunteer'), path: '/volunteer' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <TopAnnouncement />
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-brand-950/5 border-b border-line'
            : 'bg-white/80 backdrop-blur-lg border-b border-line/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-[84px]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <img
                  src={Logo}
                  alt="AASRA Welfare Society Logo"
                  className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-emerald rounded-full border-2 border-white"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl md:text-2xl text-ink tracking-tight leading-none group-hover:text-brand transition-colors">
                  AASRA
                </span>
                <span className="text-[10px] font-extrabold tracking-[0.28em] uppercase text-brand mt-1">
                  Welfare Society
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-brand/10 text-brand'
                        : 'text-ink-soft hover:text-brand hover:bg-brand-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-brand text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/donate"
                className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-accent to-accent-600 shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <i className="fa-solid fa-heart text-xs animate-pulse"></i>
                <span>{t('donateNow')}</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 rounded-xl bg-brand-50 text-brand flex items-center justify-center text-xl border border-brand-100 focus:outline-none"
              aria-label={t('toggleMenu')}
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-line px-6 py-6 space-y-2 shadow-2xl animate-fade-in">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-brand text-white shadow-sm'
                        : 'text-ink-soft hover:bg-brand-50 hover:text-brand'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge ? (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'
                      }`}>
                        {link.badge}
                      </span>
                    ) : (
                      <i className="fa-solid fa-chevron-right text-xs opacity-40"></i>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-line space-y-3">
              <LanguageSwitcher variant="mobile" />

              <Link
                to="/donate"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-accent to-accent-600 shadow-md shadow-accent/25"
              >
                <i className="fa-solid fa-heart"></i>
                {t('donateNow')}
              </Link>

              <div className="flex gap-2 text-center text-xs">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="flex-1 py-2.5 rounded-lg bg-brand-50 text-brand font-semibold flex items-center justify-center gap-1.5 border border-brand-100"
                >
                  <i className="fa-solid fa-phone"></i>
                  {t('callUs')}
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-[#25D366]/10 text-[#128C7E] font-semibold flex items-center justify-center gap-1.5 border border-[#25D366]/20"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  {t('whatsapp')}
                </a>
              </div>

              <p className="pt-3 border-t border-line text-center text-xs text-ink-faint">
                Developed by{' '}
                <a
                  href="https://aizsol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:underline underline-offset-4"
                >
                  Aizsol Technologies
                </a>
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const MobileStickyBottomBar = () => {
  const { t } = useTranslation('nav');
  const location = useLocation();
  const isDonatePage = location.pathname === '/donate';

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-line px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium ${
            location.pathname === '/' ? 'text-brand font-bold' : 'text-ink-soft'
          }`}
        >
          <i className="fa-solid fa-house text-base mb-1"></i>
          <span>{t('home')}</span>
        </Link>

        <Link
          to="/programs"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium ${
            location.pathname.startsWith('/programs') ? 'text-brand font-bold' : 'text-ink-soft'
          }`}
        >
          <i className="fa-solid fa-hand-holding-heart text-base mb-1"></i>
          <span>{t('programs')}</span>
        </Link>

        <Link
          to="/zakat"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium ${
            location.pathname === '/zakat' ? 'text-brand font-bold' : 'text-ink-soft'
          }`}
        >
          <i className="fa-solid fa-calculator text-base mb-1"></i>
          <span>{t('zakatCalculator')}</span>
        </Link>

        <Link
          to="/donate"
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-accent to-accent-600 shadow-md shadow-accent/25"
        >
          <i className="fa-solid fa-heart text-[10px]"></i>
          <span>{isDonatePage ? t('giveNow') : t('donate')}</span>
        </Link>
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="bg-gradient-to-b from-brand-900 to-brand-950 text-white pt-20 pb-28 lg:pb-12 border-t border-brand-800 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <img src={Logo} alt="AASRA Welfare Society" className="w-12 h-12 object-contain" />
              <div>
                <span className="font-heading font-bold text-2xl text-white block leading-none">Aasra Welfare</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-300">Society Pakistan</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {t('brandBlurb')}
            </p>

            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-brand hover:border-brand transition-all"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">{t('explore')}</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-neon-mint transition-colors">{t('ourMission')}</Link></li>
              <li><Link to="/programs" className="hover:text-neon-mint transition-colors">{t('allPrograms')}</Link></li>
              <li><Link to="/gallery" className="hover:text-neon-mint transition-colors">{t('impactGallery')}</Link></li>
              <li><Link to="/zakat" className="hover:text-neon-mint transition-colors">{t('zakatCalculator')}</Link></li>
              <li><Link to="/volunteer" className="hover:text-neon-mint transition-colors">{t('volunteer')}</Link></li>
              <li><Link to="/contact" className="hover:text-neon-mint transition-colors">{t('contactMap')}</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">{t('coreCauses')}</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/programs/orphan-care" className="hover:text-neon-mint transition-colors">{t('orphanShelter')}</Link></li>
              <li><Link to="/programs/clean-water" className="hover:text-neon-mint transition-colors">{t('cleanWater')}</Link></li>
              <li><Link to="/programs/flood-relief" className="hover:text-neon-mint transition-colors">{t('floodRelief')}</Link></li>
              <li><Link to="/programs/relief-work" className="hover:text-neon-mint transition-colors">{t('foodRations')}</Link></li>
              <li><Link to="/donate" className="text-accent font-semibold hover:underline">{t('supportCause')}</Link></li>
            </ul>
          </div>

          {/* Verified NGO Credentials */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-neon-mint text-xs"></i>
              {t('verifiedRegistered')}
            </h4>
            <div className="space-y-2.5">
              {CONTACT_INFO.registrationNumbers.map((num, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white/80 flex items-center gap-2.5"
                >
                  <i className="fa-solid fa-circle-check text-neon-mint text-[11px]"></i>
                  <span className="font-mono text-[11px]">{num}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="bg-brand-900/60 border border-brand-700/50 rounded-xl p-3 text-xs text-white/75">
                <span className="font-semibold text-white block mb-1">{t('directBank')}</span>
                <span className="font-mono text-[11px] text-neon-mint break-all select-all block">
                  {BANK_DETAILS.iban}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <p className="italic font-serif text-white/60">
            {t('hadithQuote')}
          </p>
        </div>
        <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-white/50">
          Developed by{' '}
          <a
            href="https://aizsol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neon-mint hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Aizsol Technologies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const applyDirection = (lng: string) => {
      const isRtl = RTL_LANGUAGE_CODES.includes(lng);
      document.documentElement.lang = lng;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    };
    applyDirection(i18n.language);
    i18n.on('languageChanged', applyDirection);
    return () => {
      i18n.off('languageChanged', applyDirection);
    };
  }, [i18n]);

  useEffect(() => installClickTracking(), []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-brand-300 selection:text-brand-950 font-sans">
        <Navbar />
        <main className="flex-grow pt-[104px] md:pt-[118px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/zakat" element={<ZakatCalculator />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/volunteer" element={<Volunteer />} />
          </Routes>
        </main>
        <Footer />
        <MobileStickyBottomBar />

        {/* Floating Desktop WhatsApp Button */}
        <div className="hidden lg:block fixed bottom-8 right-8 z-50 group">
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Assalamualaikum, I would like to learn more about donating to AASRA Welfare Society.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct Chat on WhatsApp"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl shadow-[#25D366]/30 flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-ink text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            {t('chatWithTeam')}
          </span>
        </div>
      </div>
    </BrowserRouter>
  );
}
