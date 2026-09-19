'use client';

import { ChevronDown, Minus, Plus, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect, type Option } from '@/components/ui/enhanced-searchable-select';
import type { PsuPhaseTwoCopy } from '@/lib/psu-page-phase-two';
import {
  PSU_COMPONENT_ASSUMPTIONS,
  type PsuCoolingType,
  type PsuPeripheralSelection,
} from '@/lib/psu-model';

type CountKey =
  | 'ramSticks'
  | 'nvmeDrives'
  | 'sataSsds'
  | 'hardDrives'
  | 'caseFans'
  | 'rgbControllers'
  | 'addInCards'
  | 'usbDevices';

type CountControlProps = {
  id: string;
  label: string;
  value: number;
  max: number;
  watts: number;
  copy: PsuPhaseTwoCopy;
  onChange: (value: number) => void;
};

function CountControl({ id, label, value, max, watts, copy, onChange }: CountControlProps) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <label htmlFor={`${id}-value`} className="font-medium">
            {label}
          </label>
          <p className="mt-0.5 text-xs text-muted-foreground">{copy.wattsEach(watts)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => onChange(Math.max(0, value - 1))}
            disabled={value === 0}
            aria-label={`${label}: decrease`}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </Button>
          <output
            id={`${id}-value`}
            aria-live="polite"
            className="min-w-8 text-center text-lg font-semibold tabular-nums"
          >
            {value}
          </output>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value === max}
            aria-label={`${label}: increase`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <p className="mt-3 text-right text-xs font-medium text-muted-foreground">
        {copy.estimatedWatts(value * watts)}
      </p>
    </div>
  );
}

export function PsuPeripheralInputs({
  copy,
  value,
  onChange,
  secondGpu,
  onSecondGpuChange,
  secondGpuOptions,
}: {
  copy: PsuPhaseTwoCopy;
  value: PsuPeripheralSelection;
  onChange: (value: PsuPeripheralSelection) => void;
  secondGpu: string;
  onSecondGpuChange: (value: string) => void;
  secondGpuOptions: Option[];
}) {
  const updateCount = (key: CountKey, nextValue: number) => {
    onChange({ ...value, [key]: nextValue });
  };

  const countControls: Array<{
    key: CountKey;
    label: string;
    max: number;
    watts: number;
  }> = [
    { key: 'ramSticks', label: copy.ramSticks, max: 8, watts: PSU_COMPONENT_ASSUMPTIONS.ramStick },
    { key: 'nvmeDrives', label: copy.nvmeDrives, max: 8, watts: PSU_COMPONENT_ASSUMPTIONS.nvme },
    { key: 'sataSsds', label: copy.sataSsds, max: 8, watts: PSU_COMPONENT_ASSUMPTIONS.sataSsd },
    { key: 'hardDrives', label: copy.hardDrives, max: 8, watts: PSU_COMPONENT_ASSUMPTIONS.hdd },
    { key: 'caseFans', label: copy.caseFans, max: 20, watts: PSU_COMPONENT_ASSUMPTIONS.caseFan },
  ];

  const advancedControls: Array<{
    key: CountKey;
    label: string;
    max: number;
    watts: number;
  }> = [
    { key: 'rgbControllers', label: copy.rgbControllers, max: 10, watts: PSU_COMPONENT_ASSUMPTIONS.rgbController },
    { key: 'addInCards', label: copy.addInCards, max: 8, watts: PSU_COMPONENT_ASSUMPTIONS.addInCard },
    { key: 'usbDevices', label: copy.usbDevices, max: 12, watts: PSU_COMPONENT_ASSUMPTIONS.usbDevice },
  ];

  return (
    <section aria-labelledby="psu-components-title" className="space-y-4 rounded-2xl border bg-muted/20 p-4 md:p-6">
      <div>
        <h3 id="psu-components-title" className="text-lg font-semibold">{copy.sectionTitle}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy.sectionDescription}</p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-blue-950 dark:text-blue-100">{copy.platformLabel}</p>
            <p className="mt-1 text-xs text-blue-900/75 dark:text-blue-100/75">{copy.platformDescription}</p>
          </div>
          <span className="shrink-0 font-semibold tabular-nums text-blue-950 dark:text-blue-100">
            {PSU_COMPONENT_ASSUMPTIONS.platform}W
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countControls.map((control) => (
          <CountControl
            key={control.key}
            id={`psu-${control.key}`}
            label={control.label}
            value={value[control.key]}
            max={control.max}
            watts={control.watts}
            copy={copy}
            onChange={(nextValue) => updateCount(control.key, nextValue)}
          />
        ))}

        <div className="rounded-xl border bg-background p-4">
          <label htmlFor="psu-cooling-select" className="font-medium">{copy.cooling}</label>
          <select
            id="psu-cooling-select"
            value={value.cooling}
            onChange={(event) => onChange({ ...value, cooling: event.target.value as PsuCoolingType })}
            className="mt-3 h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {(Object.keys(copy.coolingOptions) as PsuCoolingType[]).map((coolingType) => (
              <option key={coolingType} value={coolingType}>
                {copy.coolingOptions[coolingType]} (~{PSU_COMPONENT_ASSUMPTIONS.cooling[coolingType]}W)
              </option>
            ))}
          </select>
        </div>
      </div>

      <details className="group rounded-xl border bg-background">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
          <div className="flex items-start gap-3">
            <Settings2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">{copy.advancedTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{copy.advancedDescription}</p>
            </div>
          </div>
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>

        <div className="space-y-4 border-t p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {advancedControls.map((control) => (
              <CountControl
                key={control.key}
                id={`psu-${control.key}`}
                label={control.label}
                value={value[control.key]}
                max={control.max}
                watts={control.watts}
                copy={copy}
                onChange={(nextValue) => updateCount(control.key, nextValue)}
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border p-4">
              <label htmlFor="psu-second-gpu-select" className="font-medium">{copy.secondGpu}</label>
              <p id="psu-second-gpu-description" className="text-xs leading-5 text-muted-foreground">{copy.secondGpuDescription}</p>
              <EnhancedSearchableSelect
                id="psu-second-gpu-select"
                options={secondGpuOptions}
                value={secondGpu}
                onValueChange={onSecondGpuChange}
                placeholder={copy.secondGpuPlaceholder}
                type="gpu"
                descriptionId="psu-second-gpu-description"
              />
              {secondGpu && (
                <button
                  type="button"
                  onClick={() => onSecondGpuChange('')}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {copy.secondGpuPlaceholder}
                </button>
              )}
            </div>

            <div className="space-y-4 rounded-xl border p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={value.overclocking}
                  onChange={(event) => onChange({ ...value, overclocking: event.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span>
                  <span className="block font-medium">{copy.overclocking}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">{copy.overclockingDescription}</span>
                </span>
              </label>

              <div>
                <label htmlFor="psu-manual-extra" className="font-medium">{copy.manualExtra}</label>
                <p id="psu-manual-extra-description" className="mt-1 text-xs leading-5 text-muted-foreground">{copy.manualExtraDescription}</p>
                <div className="relative mt-2">
                  <input
                    id="psu-manual-extra"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={1000}
                    step={5}
                    value={value.manualExtraWatts}
                    aria-describedby="psu-manual-extra-description"
                    onChange={(event) => {
                      const nextValue = Number.parseInt(event.target.value, 10);
                      onChange({
                        ...value,
                        manualExtraWatts: Number.isFinite(nextValue)
                          ? Math.min(1000, Math.max(0, nextValue))
                          : 0,
                      });
                    }}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">W</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <p className="text-xs leading-5 text-muted-foreground">{copy.assumptionsNote}</p>
    </section>
  );
}
