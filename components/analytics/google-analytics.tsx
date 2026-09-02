'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  consentGranted: boolean;
  measurementId?: string;
};

function deleteAnalyticsCookies(measurementId: string) {
  const measurementSuffix = measurementId.replace(/^G-/, '').toLowerCase();
  const hostParts = window.location.hostname.split('.');
  const domains = ['', window.location.hostname];

  if (hostParts.length >= 2) {
    domains.push(`.${hostParts.slice(-2).join('.')}`);
  }

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || (name !== '_ga' && !name.startsWith('_ga_'))) return;
    if (name !== '_ga' && !name.toLowerCase().includes(measurementSuffix)) return;

    domains.forEach((domain) => {
      const domainAttribute = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
    });
  });
}

export function GoogleAnalytics({ consentGranted, measurementId }: GoogleAnalyticsProps) {
  const wasEnabled = useRef(false);

  useEffect(() => {
    if (!measurementId) return;

    const analyticsWindow = window as unknown as Window & Record<string, unknown>;
    const disableKey = `ga-disable-${measurementId}`;

    if (!consentGranted) {
      if (wasEnabled.current) {
        analyticsWindow[disableKey] = true;
        window.gtag?.('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
        deleteAnalyticsCookies(measurementId);

        // A reload fully removes the already-loaded tag after consent is revoked.
        window.location.reload();
      }
      return;
    }

    wasEnabled.current = true;
    analyticsWindow[disableKey] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));

    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const scriptId = 'google-analytics-gtag';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
  }, [consentGranted, measurementId]);

  return null;
}
