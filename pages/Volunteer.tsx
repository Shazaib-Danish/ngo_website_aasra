import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { trackEvent } from '../src/analytics';
import { submitVolunteer } from '../src/firebase';

// Stored in Firestore as these English keys so the app sees consistent values in every language.
const SKILL_OPTIONS = [
  { key: 'Teaching & Tutoring', icon: 'fa-chalkboard-user' },
  { key: 'Medical & Healthcare', icon: 'fa-stethoscope' },
  { key: 'Social Media & Design', icon: 'fa-pen-nib' },
  { key: 'Photography & Video', icon: 'fa-camera' },
  { key: 'Fundraising', icon: 'fa-hand-holding-dollar' },
  { key: 'Event Management', icon: 'fa-calendar-check' },
  { key: 'IT & Web Development', icon: 'fa-laptop-code' },
  { key: 'Logistics & Distribution', icon: 'fa-truck-ramp-box' },
  { key: 'Translation', icon: 'fa-language' },
  { key: 'Field Work', icon: 'fa-person-digging' },
];

const MAX_SKILLS = 20;

const inputClass =
  'w-full bg-paper-dim border border-line rounded-xl px-4 py-3 text-sm font-semibold text-ink placeholder:text-ink-faint placeholder:font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand transition-all';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  whatsapp: '',
  additionalInfo: '',
};

const Volunteer: React.FC = () => {
  const { t, i18n } = useTranslation('volunteer');

  useSEO({
    path: '/volunteer',
    title: 'Volunteer With Us | Aasra Welfare Society – Lahore, Pakistan',
    description: 'Join Aasra Welfare Society as a volunteer. Share your skills in teaching, healthcare, media, fundraising or field work and help orphans, flood victims and communities across Pakistan.',
    keywords: 'volunteer Pakistan NGO, volunteer Lahore, Aasra Welfare Society volunteer, charity volunteer Pakistan, NGO volunteer registration',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Volunteer', path: '/volunteer' },
    ],
  });

  const [form, setForm] = useState(emptyForm);
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : prev.length < MAX_SKILLS ? [...prev, skill] : prev
    );
  };

  const addCustomSkill = () => {
    const skill = customSkill.trim().slice(0, 60);
    if (skill && !skills.some((s) => s.toLowerCase() === skill.toLowerCase()) && skills.length < MAX_SKILLS) {
      setSkills((prev) => [...prev, skill]);
    }
    setCustomSkill('');
  };

  const handleCustomSkillKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addCustomSkill();
    }
  };

  const customSkills = skills.filter((s) => !SKILL_OPTIONS.some((o) => o.key === s));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(false);
    const phone = form.phone.trim();
    // Include a skill still sitting in the "other" box.
    const pending = customSkill.trim().slice(0, 60);
    const allSkills = pending && !skills.includes(pending) ? [...skills, pending].slice(0, MAX_SKILLS) : skills;
    try {
      await submitVolunteer({
        name: form.name.trim(),
        email: form.email.trim(),
        phone,
        whatsapp: sameWhatsapp ? phone : form.whatsapp.trim(),
        skills: allSkills,
        additionalInfo: form.additionalInfo.trim(),
        language: i18n.language,
      });
      // No personal data goes to Meta.
      trackEvent('SubmitApplication', { content_name: 'Volunteer Form' });
      setSubmitted(true);
      setForm(emptyForm);
      setSkills([]);
      setCustomSkill('');
      setSameWhatsapp(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const perks = [
    { icon: 'fa-hand-holding-heart', key: 'impact' },
    { icon: 'fa-certificate', key: 'certificate' },
    { icon: 'fa-people-group', key: 'community' },
    { icon: 'fa-clock', key: 'flexible' },
  ];

  const steps = ['apply', 'call', 'start'];

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-neon-mint/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-neon-mint">
              <i className="fa-solid fa-hands-holding-child"></i>
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
              {t('hero.title')}
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#volunteer-form"
                className="px-7 py-3.5 rounded-full font-heading font-bold text-sm text-brand-950 bg-white hover:bg-neon-mint shadow-lg transition-all flex items-center gap-2"
              >
                <span>{t('hero.cta')}</span>
                <i className="fa-solid fa-arrow-down text-xs"></i>
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Assalamualaikum, I would like to volunteer with AASRA Welfare Society.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-heading font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all flex items-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-base text-[#25D366]"></i>
                <span>{t('hero.whatsapp')}</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <img
                src="/images/relief-work/relief-work-04.webp"
                alt="AASRA volunteers distributing relief"
                className="w-full h-96 object-cover rounded-[2rem] shadow-2xl border-2 border-white/15"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-ink rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 animate-float">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand flex items-center justify-center text-lg">
                  <i className="fa-solid fa-heart"></i>
                </div>
                <div>
                  <span className="block font-heading font-extrabold text-lg leading-none">{t('hero.statValue')}</span>
                  <span className="text-[11px] font-semibold text-ink-soft">{t('hero.statLabel')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: why volunteer */}
          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-36">
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand block">{t('why.eyebrow')}</span>
              <h2 className="font-heading font-bold text-3xl text-ink">{t('why.title')}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {perks.map((perk) => (
                <div key={perk.key} className="p-5 rounded-3xl bg-white border border-line shadow-xs hover:border-brand-200 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand flex items-center justify-center text-lg mb-3">
                    <i className={`fa-solid ${perk.icon}`}></i>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-ink mb-1">{t(`why.perks.${perk.key}.title`)}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{t(`why.perks.${perk.key}.text`)}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-brand-50 border border-brand-100">
              <h3 className="font-heading font-bold text-sm text-ink mb-4">{t('steps.title')}</h3>
              <ol className="space-y-4">
                {steps.map((step, idx) => (
                  <li key={step} className="flex gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="block text-sm font-bold text-ink">{t(`steps.${step}.title`)}</span>
                      <span className="block text-xs text-ink-soft leading-relaxed">{t(`steps.${step}.text`)}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Right: form */}
          <div id="volunteer-form" className="lg:col-span-7 scroll-mt-36">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              {submitted ? (
                <div className="py-16 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-neon-emerald flex items-center justify-center text-4xl mx-auto border border-emerald-200 shadow-sm">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="space-y-2 max-w-sm mx-auto">
                    <h2 className="font-heading font-bold text-2xl text-ink">{t('success.title')}</h2>
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{t('success.text')}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      to="/programs"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand hover:bg-brand-700 transition-all"
                    >
                      {t('success.explore')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-brand bg-paper-dim border border-line hover:border-brand-200 transition-all"
                    >
                      {t('success.another')}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-brand block mb-1">{t('form.eyebrow')}</span>
                    <h2 className="font-heading font-bold text-2xl text-ink">{t('form.title')}</h2>
                    <p className="text-xs text-ink-soft mt-1.5">{t('form.subtitle')}</p>
                  </div>

                  {/* Personal details */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-ink-faint mb-3">
                      <i className="fa-solid fa-user text-brand"></i>
                      {t('form.sections.about')}
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="v-name" className="text-xs font-bold text-ink">{t('form.name')}</label>
                        <input
                          id="v-name"
                          required
                          maxLength={200}
                          name="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleInputChange}
                          type="text"
                          placeholder={t('form.namePlaceholder')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="v-email" className="text-xs font-bold text-ink">{t('form.email')}</label>
                        <input
                          id="v-email"
                          required
                          maxLength={200}
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleInputChange}
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="v-phone" className="text-xs font-bold text-ink">{t('form.phone')}</label>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute start-4 top-1/2 -translate-y-1/2 text-xs text-ink-faint pointer-events-none"></i>
                        <input
                          id="v-phone"
                          required
                          maxLength={40}
                          name="phone"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleInputChange}
                          type="tel"
                          dir="ltr"
                          placeholder={t('form.phonePlaceholder')}
                          className={`${inputClass} ps-10`}
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer select-none w-fit">
                      <span className="relative inline-flex">
                        <input
                          type="checkbox"
                          checked={sameWhatsapp}
                          onChange={(e) => setSameWhatsapp(e.target.checked)}
                          className="peer sr-only"
                        />
                        <span className="w-10 h-6 rounded-full bg-line peer-checked:bg-[#25D366] transition-colors"></span>
                        <span className="absolute top-1 start-1 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4 rtl:peer-checked:-translate-x-4"></span>
                      </span>
                      <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
                        <i className="fa-brands fa-whatsapp text-[#25D366] text-sm"></i>
                        {t('form.sameWhatsapp')}
                      </span>
                    </label>

                    {!sameWhatsapp && (
                      <div className="space-y-1.5 animate-fade-in">
                        <label htmlFor="v-whatsapp" className="text-xs font-bold text-ink">{t('form.whatsapp')}</label>
                        <div className="relative">
                          <i className="fa-brands fa-whatsapp absolute start-4 top-1/2 -translate-y-1/2 text-sm text-[#25D366] pointer-events-none"></i>
                          <input
                            id="v-whatsapp"
                            required
                            maxLength={40}
                            name="whatsapp"
                            value={form.whatsapp}
                            onChange={handleInputChange}
                            type="tel"
                            dir="ltr"
                            placeholder={t('form.phonePlaceholder')}
                            className={`${inputClass} ps-10`}
                          />
                        </div>
                      </div>
                    )}
                  </fieldset>

                  {/* Skills */}
                  <fieldset className="space-y-3 pt-6 border-t border-line">
                    <legend className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-ink-faint mb-1">
                      <i className="fa-solid fa-star text-brand"></i>
                      {t('form.sections.skills')}
                    </legend>
                    <p className="text-xs text-ink-soft">{t('form.skillsHint')}</p>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_OPTIONS.map((skill) => {
                        const active = skills.includes(skill.key);
                        return (
                          <button
                            key={skill.key}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggleSkill(skill.key)}
                            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                              active
                                ? 'bg-brand text-white border-brand shadow-xs'
                                : 'bg-paper-dim text-ink-soft border-line hover:border-brand-200 hover:text-brand'
                            }`}
                          >
                            <i className={`fa-solid ${active ? 'fa-check' : skill.icon} text-[10px]`}></i>
                            {t(`skills.${skill.key}`, { defaultValue: skill.key })}
                          </button>
                        );
                      })}
                      {customSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          aria-label={t('form.removeSkill', { skill })}
                          className="px-3.5 py-2 rounded-full text-xs font-bold bg-accent text-white border border-accent flex items-center gap-1.5 hover:bg-accent-600 transition-all"
                        >
                          {skill}
                          <i className="fa-solid fa-xmark text-[10px]"></i>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        onKeyDown={handleCustomSkillKey}
                        maxLength={60}
                        type="text"
                        placeholder={t('form.otherSkillPlaceholder')}
                        aria-label={t('form.otherSkillPlaceholder')}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={addCustomSkill}
                        disabled={!customSkill.trim()}
                        className="px-4 rounded-xl text-xs font-bold text-brand bg-brand-50 border border-brand-200 hover:bg-brand hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none shrink-0"
                      >
                        <i className="fa-solid fa-plus me-1"></i>
                        {t('form.addSkill')}
                      </button>
                    </div>
                  </fieldset>

                  {/* Additional info */}
                  <fieldset className="space-y-1.5 pt-6 border-t border-line">
                    <legend className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-ink-faint mb-3">
                      <i className="fa-solid fa-comment-dots text-brand"></i>
                      {t('form.sections.more')}
                    </legend>
                    <label htmlFor="v-info" className="text-xs font-bold text-ink">{t('form.additionalInfo')}</label>
                    <textarea
                      id="v-info"
                      rows={4}
                      maxLength={5000}
                      name="additionalInfo"
                      value={form.additionalInfo}
                      onChange={handleInputChange}
                      placeholder={t('form.additionalInfoPlaceholder')}
                      className={`${inputClass} resize-none`}
                    ></textarea>
                  </fieldset>

                  {error && (
                    <div role="alert" className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                      <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                      <span>{t('form.error', { whatsapp: CONTACT_INFO.whatsappDisplay })}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-accent to-accent-600 shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                    <i className={`fa-solid ${sending ? 'fa-spinner fa-spin' : 'fa-hands-holding-child'} text-xs`}></i>
                    <span>{sending ? t('form.sending') : t('form.submit')}</span>
                  </button>

                  <p className="text-[11px] text-ink-faint text-center">{t('form.privacyNote')}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
