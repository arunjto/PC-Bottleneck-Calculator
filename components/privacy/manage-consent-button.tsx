'use client';

import {
  ButtonHTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

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

type ConsentManagerButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type OptionalConsentKey = 'analytics' | 'advertising';

type ConsentPreferences = Record<OptionalConsentKey, boolean>;

const STORAGE_KEY = 'pcbuildcheck-consent-preferences';

const DEFAULT_PREFERENCES: ConsentPreferences = {
  analytics: false,
  advertising: false,
};

const ACCEPT_ALL_PREFERENCES: ConsentPreferences = {
  analytics: true,
  advertising: true,
};

const OPTIONAL_FIELDS: {
  key: OptionalConsentKey;
  label: string;
  description: string;
}[] = [
  {
    key: 'analytics',
    label: 'Analytics cookies',
    description: 'Help us improve site performance with aggregated usage metrics.',
  },
  {
    key: 'advertising',
    label: 'Advertising cookies',
    description: 'Allow optional advertising storage when advertising is enabled.',
  },
];

export function ConsentManagerButton({
  className,
  children = 'Manage Cookie Preferences',
  onClick,
  ...props
}: ConsentManagerButtonProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch {
      // Ignore corrupted storage entries
    } finally {
      setLoaded(true);
    }
  }, []);

  const persistPreferences = useCallback((next: ConsentPreferences) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(
        new CustomEvent('pcbuildcheck:consent-changed', { detail: next })
      );
    } catch {
      // Storage can be unavailable in private browsing or hardened browsers.
    }
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const cmpOpener =
        typeof window !== 'undefined' ? (window as any).openConsentManager : undefined;
      if (typeof cmpOpener === 'function') {
        cmpOpener();
        return;
      }

      setDialogOpen(true);
    },
    [onClick]
  );

  const handleToggle = useCallback((key: OptionalConsentKey, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    persistPreferences(preferences);
    setDialogOpen(false);
  }, [persistPreferences, preferences]);

  const handleAcceptAll = useCallback(() => {
    setPreferences(ACCEPT_ALL_PREFERENCES);
    persistPreferences(ACCEPT_ALL_PREFERENCES);
    setDialogOpen(false);
  }, [persistPreferences]);

  const handleRejectAll = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    persistPreferences(DEFAULT_PREFERENCES);
    setDialogOpen(false);
  }, [persistPreferences]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-expanded={dialogOpen}
        {...props}
      >
        {children}
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent aria-labelledby="consent-dialog-title">
          <DialogHeader>
            <DialogTitle id="consent-dialog-title">Manage cookie preferences</DialogTitle>
            <DialogDescription>
              Essential cookies keep the site secure and cannot be disabled. Choose how the optional
              categories behave below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="font-medium">Essential cookies</p>
                <p className="text-sm text-muted-foreground">
                  Required for core functionality such as remembering calculator inputs.
                </p>
              </div>
              <Switch checked disabled aria-readonly />
            </div>

            {loaded &&
              OPTIONAL_FIELDS.map(({ key, label, description }) => (
                <div className="flex items-center justify-between rounded-md border p-3" key={key}>
                  <div className="pr-4">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                  <Switch
                    checked={preferences[key]}
                    onCheckedChange={(checked) => handleToggle(key, checked)}
                    aria-label={label}
                  />
                </div>
              ))}

            {!loaded && (
              <div className="rounded-md border p-3 text-sm text-muted-foreground">
                Loading your saved choices&hellip;
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={handleRejectAll}>
              Reject optional
            </Button>
            <Button type="button" variant="outline" onClick={handleSave}>
              Save preferences
            </Button>
            <Button type="button" onClick={handleAcceptAll}>
              Accept all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
