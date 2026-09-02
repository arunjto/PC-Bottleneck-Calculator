'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Cookie } from 'lucide-react';

import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import type { Locale } from '@/i18n-config';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  DEFAULT_CONSENT_PREFERENCES,
  OPEN_CONSENT_MANAGER_EVENT,
  parseConsentPreferences,
  type ConsentPreferences,
} from '@/lib/consent';
import { getConsentCopy } from '@/lib/consent-i18n';
import { getLocalizedPath } from '@/lib/path-translations';

type ConsentControllerProps = {
  lang: Locale;
  measurementId?: string;
};

export function ConsentController({ lang, measurementId }: ConsentControllerProps) {
  const copy = useMemo(() => getConsentCopy(lang), [lang]);
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [draftPreferences, setDraftPreferences] = useState<ConsentPreferences>(
    DEFAULT_CONSENT_PREFERENCES
  );
  const [bannerOpen, setBannerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    let storedPreferences: ConsentPreferences | null = null;

    try {
      storedPreferences = parseConsentPreferences(
        window.localStorage.getItem(CONSENT_STORAGE_KEY)
      );
    } catch {
      // Some private-browsing configurations disable local storage.
    }

    if (storedPreferences) {
      setPreferences(storedPreferences);
      setDraftPreferences(storedPreferences);
    } else {
      setPreferences(DEFAULT_CONSENT_PREFERENCES);
      setDraftPreferences(DEFAULT_CONSENT_PREFERENCES);
      setBannerOpen(true);
    }
  }, []);

  const openManager = useCallback(() => {
    setDraftPreferences(preferences ?? DEFAULT_CONSENT_PREFERENCES);
    setDialogOpen(true);
  }, [preferences]);

  useEffect(() => {
    const handleOpenManager = () => openManager();
    window.addEventListener(OPEN_CONSENT_MANAGER_EVENT, handleOpenManager);
    (window as Window & { openConsentManager?: () => void }).openConsentManager = openManager;

    return () => {
      window.removeEventListener(OPEN_CONSENT_MANAGER_EVENT, handleOpenManager);
      delete (window as Window & { openConsentManager?: () => void }).openConsentManager;
    };
  }, [openManager]);

  const persistPreferences = useCallback((next: ConsentPreferences) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The choice still applies to this page even if storage is unavailable.
    }
    setPreferences(next);
    setDraftPreferences(next);
    setBannerOpen(false);
    setDialogOpen(false);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: next }));
  }, []);

  const rejectOptional = useCallback(() => {
    persistPreferences(DEFAULT_CONSENT_PREFERENCES);
  }, [persistPreferences]);

  const acceptAnalytics = useCallback(() => {
    persistPreferences({ analytics: true, advertising: false });
  }, [persistPreferences]);

  return (
    <>
      <GoogleAnalytics
        consentGranted={preferences?.analytics === true}
        measurementId={measurementId}
      />

      {bannerOpen && (
        <section
          aria-label={copy.bannerLabel}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-4xl rounded-xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/90 sm:bottom-5 sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-1 flex items-center gap-2 font-semibold text-foreground">
                <Cookie className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2>{copy.bannerTitle}</h2>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {copy.bannerDescription}{' '}
                <Link className="underline underline-offset-2 hover:text-foreground" href={getLocalizedPath(lang, 'privacy')}>
                  {copy.privacyPolicy}
                </Link>{' '}
                ·{' '}
                <Link className="underline underline-offset-2 hover:text-foreground" href={getLocalizedPath(lang, 'cookie-policy')}>
                  {copy.cookiePolicy}
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
              <Button type="button" variant="ghost" onClick={rejectOptional}>
                {copy.rejectOptional}
              </Button>
              <Button type="button" variant="outline" onClick={openManager}>
                {copy.managePreferences}
              </Button>
              <Button type="button" onClick={acceptAnalytics}>
                {copy.acceptAnalytics}
              </Button>
            </div>
          </div>
        </section>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent aria-labelledby="consent-dialog-title">
          <DialogHeader>
            <DialogTitle id="consent-dialog-title">{copy.dialogTitle}</DialogTitle>
            <DialogDescription>{copy.dialogDescription}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="pr-4">
                <p className="font-medium">{copy.essentialCookies}</p>
                <p className="text-sm text-muted-foreground">{copy.essentialDescription}</p>
              </div>
              <Switch checked disabled aria-readonly />
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="pr-4">
                <p className="font-medium">{copy.analyticsCookies}</p>
                <p className="text-sm text-muted-foreground">{copy.analyticsDescription}</p>
              </div>
              <Switch
                checked={draftPreferences.analytics}
                onCheckedChange={(analytics) =>
                  setDraftPreferences({ analytics, advertising: false })
                }
                aria-label={copy.analyticsCookies}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={rejectOptional}>
              {copy.rejectOptional}
            </Button>
            <Button type="button" onClick={() => persistPreferences(draftPreferences)}>
              {copy.savePreferences}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
