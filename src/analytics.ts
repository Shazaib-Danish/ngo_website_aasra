// Meta Pixel helpers. The base pixel (init + first PageView) is loaded in index.html.
// Never pass personal data (names, emails, phone numbers) in event parameters.

type PixelParams = Record<string, string | number | boolean | string[] | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const send = (method: 'track' | 'trackCustom', event: string, params?: PixelParams) => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(method, event, params || {});
    }
  } catch {
    // Tracking must never break the page.
  }
};

/** Meta standard events (ViewContent, Contact, Lead, InitiateCheckout, AddPaymentInfo, FindLocation, ...) */
export const trackEvent = (event: string, params?: PixelParams) => send('track', event, params);

/** Custom events for actions that have no standard Meta event. */
export const trackCustomEvent = (event: string, params?: PixelParams) => send('trackCustom', event, params);

export const trackPageView = () => send('track', 'PageView');

const SOCIAL_HOSTS: Record<string, string> = {
  'facebook.com': 'Facebook',
  'instagram.com': 'Instagram',
  'linkedin.com': 'LinkedIn',
  'tiktok.com': 'TikTok',
  'youtube.com': 'YouTube',
};

/**
 * One delegated click listener that maps link clicks to Meta events, so every
 * WhatsApp / call / email / map / donate link across the site is tracked
 * without wiring each button by hand.
 */
export const installClickTracking = () => {
  const handler = (e: MouseEvent) => {
    const anchor = (e.target as HTMLElement | null)?.closest?.('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    const label = (anchor.textContent || '').trim().slice(0, 60);
    const page = window.location.pathname;

    if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      trackEvent('Contact', { content_name: 'WhatsApp', content_category: page });
      return;
    }
    if (href.startsWith('tel:')) {
      trackEvent('Contact', { content_name: 'Phone Call', content_category: page });
      return;
    }
    if (href.startsWith('mailto:')) {
      trackEvent('Contact', { content_name: 'Email', content_category: page });
      return;
    }
    if (href.includes('maps.app.goo.gl') || href.includes('google.com/maps')) {
      trackEvent('FindLocation', { content_name: label || 'Map', content_category: page });
      return;
    }

    let url: URL;
    try {
      url = new URL(href, window.location.origin);
    } catch {
      return;
    }

    const social = Object.keys(SOCIAL_HOSTS).find((h) => url.hostname.endsWith(h));
    if (social) {
      trackCustomEvent('SocialProfileClick', { platform: SOCIAL_HOSTS[social], content_category: page });
      return;
    }

    if (url.origin === window.location.origin && url.pathname === '/donate' && page !== '/donate') {
      const amount = Number(url.searchParams.get('amount'));
      trackEvent('InitiateCheckout', {
        content_name: label || 'Donate',
        content_category: url.searchParams.get('category') || page,
        ...(amount > 0 ? { value: amount, currency: 'PKR' } : {}),
      });
    }
  };

  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
};
