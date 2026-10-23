import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { trackEvent } from '../src/analytics';
import { submitContactMessage } from '../src/firebase';
import OfficeMap from '../components/OfficeMap';

const INTENT_CHIPS = [
  'Sponsor an Orphan',
  'Water Well Dedication',
  'Volunteer / Ambassador',
  'Zakat Inquiries',
  'General Question',
];

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation('contact');

  useSEO({
    path: '/contact',
    title: 'Contact Us | Aasra Welfare Society – Lahore, Pakistan',
    description: 'Get in touch with Aasra Welfare Society for orphan sponsorship, water well dedication, volunteering or general inquiries. Call, WhatsApp or visit our Lahore office.',
    keywords: 'contact Aasra Welfare Society, NGO Lahore contact, charity phone number Pakistan, volunteer Pakistan NGO, NGO office address Lahore',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: INTENT_CHIPS[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleChipSelect = (chip: string) => {
    setForm((prev) => ({
      ...prev,
      subject: chip,
      message: prev.message || t('inquiryPrefill', { chip: t(`intentChips.${chip}`, { defaultValue: chip }) }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(false);
    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        language: i18n.language,
      });
      // Only the inquiry topic is sent to Meta — never the visitor's name, email or phone.
      trackEvent('Lead', { content_name: 'Contact Form', content_category: form.subject });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: INTENT_CHIPS[0], message: '' });
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const contactPoints = [
    {
      icon: 'fa-location-dot',
      label: t('contactPoints.headquarters.label'),
      value: CONTACT_INFO.address,
      href: CONTACT_INFO.mapUrl,
      action: t('contactPoints.headquarters.action'),
    },
    {
      icon: 'fa-phone',
      label: t('contactPoints.helpline.label'),
      value: `${CONTACT_INFO.phone} / ${CONTACT_INFO.phone1}`,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
      action: t('contactPoints.helpline.action'),
    },
    {
      icon: 'fa-envelope',
      label: t('contactPoints.email.label'),
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      action: t('contactPoints.email.action'),
    },
    {
      icon: 'fa-brands fa-whatsapp',
      label: t('contactPoints.whatsapp.label'),
      value: CONTACT_INFO.whatsappDisplay,
      href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
      action: t('contactPoints.whatsapp.action'),
      highlight: true,
    },
  ];

  return (
    <div className="bg-paper min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand">
            <i className="fa-solid fa-headset"></i>
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed font-sans">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Direct Contacts & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Contact Cards */}
            <div className="space-y-3.5">
              {contactPoints.map((point) => (
                <div
                  key={point.label}
                  className={`p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
                    point.highlight
                      ? 'bg-[#25D366]/10 border-[#25D366]/30 shadow-xs'
                      : 'bg-white border-line shadow-xs hover:border-brand-200'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                        point.highlight
                          ? 'bg-[#25D366] text-white shadow-md shadow-[#25D366]/20'
                          : 'bg-brand-50 text-brand'
                      }`}
                    >
                      <i className={point.icon.startsWith('fa-brands') ? point.icon : `fa-solid ${point.icon}`}></i>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink-faint block">
                        {point.label}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-ink truncate">
                        {point.value}
                      </p>
                    </div>
                  </div>

                  {point.href && (
                    <a
                      href={point.href}
                      target={point.href.startsWith('http') ? '_blank' : undefined}
                      rel={point.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        point.highlight
                          ? 'bg-[#128C7E] text-white hover:bg-[#075E54]'
                          : 'bg-paper-dim text-brand hover:bg-brand hover:text-white border border-line'
                      }`}
                    >
                      {point.action}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Map Embed */}
            <div className="bg-white rounded-3xl overflow-hidden border border-line shadow-md relative group h-72">
              <OfficeMap
                title="AASRA Welfare Society office location"
                label="AASRA Welfare Society"
                address={CONTACT_INFO.address}
              />
              <a
                href={CONTACT_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-4 z-[500] bg-brand-950 text-white px-4 py-2 rounded-xl text-xs font-heading font-bold shadow-lg hover:bg-brand transition-all flex items-center gap-1.5"
              >
                <i className="fa-solid fa-location-arrow text-[10px]"></i>
                <span>{t('map.openInMaps')}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Contact & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl relative">

              {submitted ? (
                <div className="py-16 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-neon-emerald flex items-center justify-center text-4xl mx-auto border border-emerald-200 shadow-sm">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="space-y-2 max-w-sm mx-auto">
                    <h2 className="font-heading font-bold text-2xl text-ink">{t('success.title')}</h2>
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {t('success.text', { whatsapp: CONTACT_INFO.whatsappDisplay })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-brand hover:underline"
                  >
                    {t('success.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-brand block mb-1">
                      {t('form.eyebrow')}
                    </span>
                    <h2 className="font-heading font-bold text-2xl text-ink">
                      {t('form.title')}
                    </h2>
                  </div>

                  {/* Intent Selection Chips */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-ink block">
                      {t('form.selectReason')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTENT_CHIPS.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleChipSelect(chip)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            form.subject === chip
                              ? 'bg-brand text-white border-brand shadow-xs'
                              : 'bg-paper-dim text-ink-soft border-line hover:border-brand-200 hover:text-brand'
                          }`}
                        >
                          {t(`intentChips.${chip}`, { defaultValue: chip })}
                        </button>
                      ))}
                    </div>
                    {form.subject === 'Volunteer / Ambassador' && (
                      <Link
                        to="/volunteer"
                        className="mt-2 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs font-semibold text-brand hover:bg-brand hover:text-white transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-hands-holding-child"></i>
                          {t('volunteerPrompt')}
                        </span>
                        <i className="fa-solid fa-arrow-right rtl:rotate-180"></i>
                      </Link>
                    )}
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink">{t('form.fullName')}</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder={t('form.fullNamePlaceholder')}
                        className="w-full bg-paper-dim border border-line rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink">{t('form.email')}</label>
                      <input
                        required
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder={t('form.emailPlaceholder')}
                        className="w-full bg-paper-dim border border-line rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink">{t('form.phone')}</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder={t('form.phonePlaceholder')}
                        className="w-full bg-paper-dim border border-line rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink">{t('form.subject')}</label>
                      <input
                        required
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        type="text"
                        className="w-full bg-paper-dim border border-line rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink">{t('form.message')}</label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder={t('form.messagePlaceholder')}
                      className="w-full bg-paper-dim border border-line rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand transition-all resize-none"
                    ></textarea>
                  </div>

                  {error && (
                    <div role="alert" className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                      <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                      <span>{t('form.error', { whatsapp: CONTACT_INFO.whatsappDisplay })}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-brand to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-md shadow-brand/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                    <i className={`fa-solid ${sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-xs`}></i>
                    <span>{sending ? t('form.sending') : t('form.submit')}</span>
                  </button>

                  <p className="text-[11px] text-ink-faint text-center">
                    {t('form.privacyNote')}
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
