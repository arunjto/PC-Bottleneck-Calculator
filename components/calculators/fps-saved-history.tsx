"use client";

import { useState } from 'react';
import { Check, Copy, History, Pencil, RotateCcw, ShieldCheck, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCPUById, getGameById, getGPUById } from '@/lib/hardware-database';
import type { FPSHistoryEntry } from '@/lib/fps-history';
import { serializeFPSShareConfig, type FPSCalculatorConfig } from '@/lib/fps-share';

type FPSSavedHistoryProps = {
  entries: FPSHistoryEntry[];
  storageAvailable: boolean;
  dict: any;
  lang: string;
  onOpen: (config: FPSCalculatorConfig) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
};

export function FPSSavedHistory({
  entries,
  storageAvailable,
  dict,
  lang,
  onOpen,
  onRename,
  onDelete,
  onClear,
}: FPSSavedHistoryProps) {
  const t = dict?.fps_calculator?.saved_history;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!t) return null;

  const beginRename = (entry: FPSHistoryEntry) => {
    setEditingId(entry.id);
    setDraftName(entry.name ?? '');
  };

  const saveRename = (entry: FPSHistoryEntry) => {
    onRename(entry.id, draftName);
    setEditingId(null);
    setDraftName('');
  };

  const copySavedLink = async (entry: FPSHistoryEntry) => {
    const params = serializeFPSShareConfig(entry.config);
    const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setCopiedId(entry.id);
    window.setTimeout(() => setCopiedId(null), 2500);
  };

  const clearHistory = () => {
    if (window.confirm(t.clear_confirm)) onClear();
  };

  return (
    <Card className="mx-auto mt-8 w-full max-w-4xl border-slate-200 dark:border-slate-800">
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-cyan-600" aria-hidden="true" />
              {t.title}
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.description}</p>
          </div>
          {entries.length > 0 && (
            <Button type="button" variant="outline" size="sm" onClick={clearHistory}>
              <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
              {t.clear_all}
            </Button>
          )}
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-cyan-200 bg-cyan-50/70 p-3 text-xs leading-5 text-cyan-950 dark:border-cyan-900 dark:bg-cyan-950/20 dark:text-cyan-100">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t.privacy}</span>
        </div>
      </CardHeader>
      <CardContent>
        {!storageAvailable ? (
          <p className="rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
            {t.unavailable}
          </p>
        ) : entries.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <History className="mx-auto h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
            <p className="mt-3 font-medium">{t.empty_title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.empty_description}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const cpu = getCPUById(entry.config.cpu);
              const gpu = getGPUById(entry.config.gpu);
              const game = getGameById(entry.config.game);
              if (!cpu || !gpu || !game) return null;

              const defaultName = `${cpu.name} + ${gpu.name}`;
              const qualityLabel = dict?.fps_calculator?.quality?.graphics_options?.[entry.config.quality]?.label
                ?? entry.config.quality;
              const updatedLabel = new Intl.DateTimeFormat(lang, {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(entry.updatedAt));
              const isEditing = editingId === entry.id;

              return (
                <article
                  key={entry.id}
                  className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/80"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <form
                          className="flex max-w-xl flex-col gap-2 sm:flex-row"
                          onSubmit={(event) => {
                            event.preventDefault();
                            saveRename(entry);
                          }}
                        >
                          <label className="sr-only" htmlFor={`history-name-${entry.id}`}>{t.name_label}</label>
                          <input
                            id={`history-name-${entry.id}`}
                            value={draftName}
                            maxLength={60}
                            autoFocus
                            onChange={(event) => setDraftName(event.target.value)}
                            placeholder={defaultName}
                            className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <div className="flex gap-2">
                            <Button type="submit" size="sm">
                              <Check className="mr-1.5 h-4 w-4" aria-hidden="true" />
                              {t.save_name}
                            </Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                              <X className="mr-1.5 h-4 w-4" aria-hidden="true" />
                              {t.cancel}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-start gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate font-semibold">{entry.name || defaultName}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{game.name}</p>
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 shrink-0"
                            onClick={() => beginRename(entry)}
                            aria-label={t.rename}
                            title={t.rename}
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">{entry.config.resolution}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">{qualityLabel}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">{entry.config.ramSize.toUpperCase()} RAM</span>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {t.last_used.replace('{date}', updatedLabel)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <Button type="button" size="sm" onClick={() => onOpen(entry.config)}>
                        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                        {t.reopen}
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => copySavedLink(entry)}>
                        {copiedId === entry.id ? (
                          <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                        )}
                        {copiedId === entry.id ? t.copied : t.copy_link}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(entry.id)}
                        className="bg-rose-700 text-white hover:bg-rose-800 dark:bg-rose-600 dark:text-white dark:hover:bg-rose-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                        {t.delete}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
