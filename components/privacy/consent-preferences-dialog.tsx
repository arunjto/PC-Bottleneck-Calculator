'use client';

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
import type { ConsentPreferences } from '@/lib/consent';
import type { getConsentCopy } from '@/lib/consent-i18n';

type ConsentPreferencesDialogProps = {
  copy: ReturnType<typeof getConsentCopy>;
  draftPreferences: ConsentPreferences;
  onDraftChange: (preferences: ConsentPreferences) => void;
  onOpenChange: (open: boolean) => void;
  onReject: () => void;
  onSave: (preferences: ConsentPreferences) => void;
};

export default function ConsentPreferencesDialog({
  copy,
  draftPreferences,
  onDraftChange,
  onOpenChange,
  onReject,
  onSave,
}: ConsentPreferencesDialogProps) {
  return (
    <Dialog open onOpenChange={onOpenChange}>
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
              onCheckedChange={(analytics) => onDraftChange({ analytics, advertising: false })}
              aria-label={copy.analyticsCookies}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onReject}>
            {copy.rejectOptional}
          </Button>
          <Button type="button" onClick={() => onSave(draftPreferences)}>
            {copy.savePreferences}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
