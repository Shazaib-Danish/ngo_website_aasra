import { useEffect } from 'react';

export const SITE_URL = 'https://www.aasra-welfare.org';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbEntry[];
}

const setMetaByName = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setMetaByProperty = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const JSONLD_ID = 'seo-breadcrumb-jsonld';

const setBreadcrumbJsonLd = (breadcrumbs?: BreadcrumbEntry[]) => {
  const existing = document.getElementById(JSONLD_ID);
  if (!breadcrumbs || breadcrumbs.length === 0) {
    if (existing) existing.remove();
    return;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };

  let script = existing as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = JSONLD_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
};

/**
 * Updates document title + meta/canonical/OG/Twitter tags on route mount.
 * This is a client-side SPA, so this only helps crawlers that execute JS
 * (Googlebot does); it does not change what non-JS social-media unfurlers
 * see on first request — those still read index.html's static tags.
 */
export const useSEO = ({ title, description, keywords, path, ogImage, breadcrumbs }: SEOOptions) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    document.title = title;
    setMetaByName('description', description);
    if (keywords) setMetaByName('keywords', keywords);
    setCanonical(url);

    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', url);
    setMetaByProperty('og:image', image);

    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:url', url);
    setMetaByName('twitter:image', image);

    setBreadcrumbJsonLd(breadcrumbs);
  }, [title, description, keywords, path, ogImage, breadcrumbs]);
};
