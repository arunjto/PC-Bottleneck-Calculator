export type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

export const CONSENT_STORAGE_KEY = 'pcbuildcheck-consent-preferences';
export const CONSENT_CHANGED_EVENT = 'pcbuildcheck:consent-changed';
export const OPEN_CONSENT_MANAGER_EVENT = 'pcbuildcheck:open-consent-manager';

export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = {
  analytics: false,
  advertising: false,
};

export function parseConsentPreferences(value: string | null): ConsentPreferences | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>;

    return {
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
    };
  } catch {
    return null;
  }
}
