'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeftRight,
  BarChart3,
  Check,
  Copy,
  Cpu,
  ExternalLink,
  Gauge,
  Info,
  Microchip,
  TriangleAlert,
} from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { COMPONENT_COMPARISON_COPY } from '@/lib/component-comparison-i18n';
import { getLocalizedPath } from '@/lib/path-translations';
import type { ToolHardwareOption } from '@/components/tools/tool-calculator';
import { EnhancedSearchableSelect, type Option } from '@/components/ui/enhanced-searchable-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type ComparisonType = 'cpu' | 'gpu';
type Pair = { first: string; second: string };

type ComponentComparisonProps = {
  lang: Locale;
  cpus: ToolHardwareOption[];
  gpus: ToolHardwareOption[];
  initialSelection?: Record<string, string>;
  databaseUpdated?: string;
  scoreMethodologyVersion?: string;
};

function buildPair(options: ToolHardwareOption[], first?: string, second?: string): Pair {
  const validFirst = options.some((option) => option.id === first) ? first! : options[0]?.id ?? '';
  const validSecond = options.some((option) => option.id === second && option.id !== validFirst)
    ? second!
    : options.find((option) => option.id !== validFirst)?.id ?? validFirst;
  return { first: validFirst, second: validSecond };
}

function template(value: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce(
    (result, [key, replacement]) => result.replaceAll(`{${key}}`, replacement),
    value
  );
}

function comparisonOptions(type: ComparisonType, items: ToolHardwareOption[]): Option[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    tier: item.tier ?? item.category ?? 'Desktop',
    benchmarkScore: item.score,
    specs: type === 'cpu'
      ? `${item.cores ?? '—'}C/${item.threads ?? '—'}T · ${item.boostClock ?? '—'} GHz · ${item.socket ?? '—'}`
      : `${item.vram ?? '—'} GB · ${item.boostClock ?? '—'} MHz · ${item.tdp} W`,
  }));
}

function leaderName(
  first: ToolHardwareOption,
  second: ToolHardwareOption,
  firstValue: number,
  secondValue: number,
  tie: string,
  lowerWins = false
) {
  if (Math.abs(firstValue - secondValue) < 0.0001) return tie;
  const firstWins = lowerWins ? firstValue < secondValue : firstValue > secondValue;
  return firstWins ? first.name : second.name;
}

export function ComponentComparison({
  lang,
  cpus,
  gpus,
  initialSelection,
  databaseUpdated,
  scoreMethodologyVersion,
}: ComponentComparisonProps) {
  const copy = COMPONENT_COMPARISON_COPY[lang] ?? COMPONENT_COMPARISON_COPY.en;
  const initialType: ComparisonType = initialSelection?.type === 'gpu' ? 'gpu' : 'cpu';
  const [comparisonType, setComparisonType] = useState<ComparisonType>(initialType);
  const [cpuPair, setCpuPair] = useState<Pair>(() => buildPair(
    cpus,
    initialType === 'cpu' ? initialSelection?.first : undefined,
    initialType === 'cpu' ? initialSelection?.second : undefined
  ));
  const [gpuPair, setGpuPair] = useState<Pair>(() => buildPair(
    gpus,
    initialType === 'gpu' ? initialSelection?.first : undefined,
    initialType === 'gpu' ? initialSelection?.second : undefined
  ));
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const activeItems = comparisonType === 'cpu' ? cpus : gpus;
  const activePair = comparisonType === 'cpu' ? cpuPair : gpuPair;
  const setActivePair = comparisonType === 'cpu' ? setCpuPair : setGpuPair;
  const options = useMemo(
    () => comparisonOptions(comparisonType, activeItems),
    [activeItems, comparisonType]
  );
  const first = activeItems.find((item) => item.id === activePair.first);
  const second = activeItems.find((item) => item.id === activePair.second);
  const hasComparison = Boolean(first && second && first.id !== second.id);

  const number = (value: number, digits = 0) => new Intl.NumberFormat(lang, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
  const signed = (value: number, digits = 0) => new Intl.NumberFormat(lang, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    signDisplay: 'always',
  }).format(value);

  const changeType = (type: ComparisonType) => {
    setComparisonType(type);
    setCopyState('idle');
  };

  const copyComparisonLink = async () => {
    if (!hasComparison || !first || !second) return;
    const query = new URLSearchParams({ type: comparisonType, first: first.id, second: second.id });
    const path = getLocalizedPath(lang, 'tools/component-comparison');
    const url = `${window.location.origin}${path}?${query.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  const swapComponents = () => {
    setActivePair({ first: activePair.second, second: activePair.first });
    setCopyState('idle');
  };

  const scoreDifference = first && second ? (second.score / Math.max(1, first.score) - 1) * 100 : 0;
  const powerDifference = first && second ? second.tdp - first.tdp : 0;
  const firstEfficiency = first ? first.score / Math.max(1, first.tdp) : 0;
  const secondEfficiency = second ? second.score / Math.max(1, second.tdp) : 0;
  const efficiencyDifference = firstEfficiency > 0
    ? (secondEfficiency / firstEfficiency - 1) * 100
    : 0;

  const scoreSummary = first && second
    ? Math.abs(scoreDifference) < 0.05
      ? copy.scoreSame
      : template(scoreDifference > 0 ? copy.scoreHigher : copy.scoreLower, {
          component: second.name,
          baseline: first.name,
          value: number(Math.abs(scoreDifference), 1),
        })
    : '';

  const socketSummary = comparisonType === 'cpu' && first && second
    ? !first.socket || !second.socket
      ? copy.socketUnknown
      : first.socket.toLowerCase() === second.socket.toLowerCase()
        ? template(copy.socketSame, { socket: first.socket })
        : copy.socketDifferent
    : null;

  const dataDate = databaseUpdated
    ? new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${databaseUpdated}T00:00:00Z`))
    : null;

  const specRows = (item: ToolHardwareOption) => comparisonType === 'cpu'
    ? [
        [copy.normalizedScore, `${number(item.score)}/100`],
        [copy.coresThreads, `${item.cores ?? '—'} / ${item.threads ?? '—'}`],
        [copy.baseBoostClock, `${item.baseClock ?? '—'} / ${item.boostClock ?? '—'} GHz`],
        [copy.listedPower, `${number(item.tdp)} W`],
        [copy.socket, item.socket ?? '—'],
        [copy.architecture, item.architecture ?? '—'],
        [copy.releaseYear, item.releaseYear ? number(item.releaseYear) : '—'],
        [copy.tier, item.tier ?? '—'],
      ]
    : [
        [copy.normalizedScore, `${number(item.score)}/100`],
        [copy.vram, item.vram === undefined ? '—' : `${number(item.vram)} GB`],
        [copy.baseBoostClock, `${item.baseClock ?? '—'} / ${item.boostClock ?? '—'} MHz`],
        [copy.listedPower, `${number(item.tdp)} W`],
        [copy.architecture, item.architecture ?? '—'],
        [copy.releaseYear, item.releaseYear ? number(item.releaseYear) : '—'],
        [copy.tier, item.tier ?? '—'],
      ];

  const renderComponentCard = (item: ToolHardwareOption, position: 'first' | 'second') => (
    <Card className={position === 'first'
      ? 'border-2 border-blue-300 dark:border-blue-800'
      : 'border-2 border-emerald-300 dark:border-emerald-800'}
    >
      <CardHeader className="space-y-3 pb-3">
        <span className={position === 'first'
          ? 'w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200'
          : 'w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'}
        >
          {position === 'first' ? copy.baseline : copy.comparison}
        </span>
        <CardTitle className="text-xl leading-7">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{[item.brand, item.series].filter(Boolean).join(' · ')}</p>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-border">
          {specRows(item).map(([label, value]) => (
            <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        {item.officialUrl && (
          <Button asChild variant="outline" size="sm" className="mt-4 w-full">
            <Link href={item.officialUrl} target="_blank" rel="noreferrer">
              {copy.officialSpecs}<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const leaders = first && second
    ? [
        [copy.higherScore, leaderName(first, second, first.score, second.score, copy.tie)],
        [copy.powerEfficiency, leaderName(first, second, firstEfficiency, secondEfficiency, copy.tie)],
        [copy.lowerPower, leaderName(first, second, first.tdp, second.tdp, copy.tie, true)],
        ...(comparisonType === 'cpu'
          ? [
              [copy.moreCores, leaderName(first, second, first.cores ?? 0, second.cores ?? 0, copy.tie)],
              [copy.moreThreads, leaderName(first, second, first.threads ?? 0, second.threads ?? 0, copy.tie)],
            ]
          : [[copy.moreVram, leaderName(first, second, first.vram ?? 0, second.vram ?? 0, copy.tie)]]),
      ]
    : [];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Microchip className="h-5 w-5 text-violet-600" aria-hidden="true" />
            {copy.configureTitle}
          </CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">{copy.configureDescription}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2 rounded-xl bg-muted p-1 sm:grid-cols-2" role="group" aria-label={copy.configureTitle}>
            <Button
              type="button"
              variant={comparisonType === 'cpu' ? 'default' : 'ghost'}
              onClick={() => changeType('cpu')}
              aria-pressed={comparisonType === 'cpu'}
            >
              <Cpu className="mr-2 h-4 w-4" aria-hidden="true" />{copy.cpuTab}
            </Button>
            <Button
              type="button"
              variant={comparisonType === 'gpu' ? 'default' : 'ghost'}
              onClick={() => changeType('gpu')}
              aria-pressed={comparisonType === 'gpu'}
            >
              <Gauge className="mr-2 h-4 w-4" aria-hidden="true" />{copy.gpuTab}
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {(['first', 'second'] as const).map((position) => {
              const isCpu = comparisonType === 'cpu';
              const label = position === 'first'
                ? isCpu ? copy.firstCpu : copy.firstGpu
                : isCpu ? copy.secondCpu : copy.secondGpu;
              const id = `component-comparison-${comparisonType}-${position}`;
              return (
                <div key={position} className="space-y-2">
                  <Label id={`${id}-label`} htmlFor={id}>{label}</Label>
                  <EnhancedSearchableSelect
                    id={id}
                    labelId={`${id}-label`}
                    options={options}
                    value={activePair[position]}
                    onValueChange={(value) => {
                      setActivePair({ ...activePair, [position]: value });
                      setCopyState('idle');
                    }}
                    placeholder={isCpu ? copy.selectCpu : copy.selectGpu}
                    type={comparisonType}
                    searchPlaceholder={isCpu ? copy.searchCpu : copy.searchGpu}
                    noResultsText={isCpu ? copy.noCpuResults : copy.noGpuResults}
                    openInstructions={isCpu ? copy.openCpuInstructions : copy.openGpuInstructions}
                    listLabel={isCpu ? copy.cpuListLabel : copy.gpuListLabel}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={swapComponents} disabled={!hasComparison}>
              <ArrowLeftRight className="mr-2 h-4 w-4" aria-hidden="true" />{copy.swap}
            </Button>
            <Button type="button" variant="outline" onClick={copyComparisonLink} disabled={!hasComparison}>
              {copyState === 'copied'
                ? <Check className="mr-2 h-4 w-4 text-emerald-600" aria-hidden="true" />
                : <Copy className="mr-2 h-4 w-4" aria-hidden="true" />}
              {copyState === 'copied' ? copy.copied : copy.copyLink}
            </Button>
          </div>
          {copyState === 'error' && (
            <p role="alert" className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{copy.copyError}
            </p>
          )}
        </CardContent>
      </Card>

      {!hasComparison || !first || !second ? (
        <Card className="border-dashed">
          <CardContent className="flex min-h-40 items-center justify-center p-8 text-center text-muted-foreground">
            {copy.emptyState}
          </CardContent>
        </Card>
      ) : (
        <section aria-labelledby="component-comparison-results" aria-live="polite" className="space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <h2 id="component-comparison-results" className="text-2xl font-semibold">{copy.resultsTitle}</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {renderComponentCard(first, 'first')}
            {renderComponentCard(second, 'second')}
          </div>

          <Card className="border-violet-200 bg-violet-50/60 dark:border-violet-900 dark:bg-violet-950/30">
            <CardHeader>
              <CardTitle className="text-xl">{copy.relativeChanges}</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">{scoreSummary}</p>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [copy.scoreDifference, `${signed(scoreDifference, 1)}%`],
                [copy.powerDifference, `${signed(powerDifference)} W`],
                [copy.efficiencyDifference, `${signed(efficiencyDifference, 1)}%`],
                ...(comparisonType === 'cpu'
                  ? [
                      [copy.coreDifference, signed((second.cores ?? 0) - (first.cores ?? 0))],
                      [copy.threadDifference, signed((second.threads ?? 0) - (first.threads ?? 0))],
                    ]
                  : [[copy.vramDifference, `${signed((second.vram ?? 0) - (first.vram ?? 0))} GB`]]),
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border bg-background/85 p-4">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div className="mt-1 text-xl font-bold">{value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-xl">{copy.categoryLeaders}</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-muted/80">
                    <tr><th className="px-4 py-3 font-semibold">{copy.metric}</th><th className="px-4 py-3 font-semibold">{copy.leader}</th></tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {leaders.map(([metric, leader]) => (
                      <tr key={metric}><td className="px-4 py-3 text-muted-foreground">{metric}</td><td className="px-4 py-3 font-semibold">{leader}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {socketSummary && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>{socketSummary}</p>
            </div>
          )}

          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm leading-6 text-blue-950 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p>{copy.modelNotice}</p>
                <p className="mt-2 text-xs opacity-80">
                  {[dataDate ? `${copy.dataSnapshot}: ${dataDate}` : null,
                    scoreMethodologyVersion ? `${copy.methodologyVersion}: ${scoreMethodologyVersion}` : null]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
