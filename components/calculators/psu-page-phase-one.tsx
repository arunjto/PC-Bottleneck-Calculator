import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Gauge,
  Scale,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getCPUById, getGPUById } from '@/lib/hardware-database';
import { getLocalizedPath } from '@/lib/path-translations';
import { DEFAULT_PSU_PERIPHERALS, estimateDetailedPSUPlanning } from '@/lib/psu-model';
import { getPsuPhaseOneCopy, PSU_EXAMPLES } from '@/lib/psu-page-phase-one';

function getExampleRows(lang: Locale) {
  const calculatorPath = getLocalizedPath(lang, 'psu-calculator');

  return PSU_EXAMPLES.map(({ cpuId, gpuId }) => {
    const cpu = getCPUById(cpuId);
    const gpu = getGPUById(gpuId);
    if (!cpu || !gpu) {
      throw new Error(`PSU example references unsupported hardware: ${cpuId} / ${gpuId}`);
    }

    const estimate = estimateDetailedPSUPlanning(cpu, gpu, DEFAULT_PSU_PERIPHERALS);
    const query = new URLSearchParams({ cpu: cpu.id, gpu: gpu.id });
    return {
      cpu,
      gpu,
      publishedPower: cpu.tdp + gpu.tdp,
      estimatedLoad: estimate.estimatedLoad,
      planningWattage: estimate.planningWattage,
      href: `${calculatorPath}?${query.toString()}#psu-calculator-form`,
    };
  });
}

export function PsuBuildExamples({ lang }: { lang: Locale }) {
  const copy = getPsuPhaseOneCopy(lang).examples;
  const rows = getExampleRows(lang);

  return (
    <section aria-labelledby="psu-examples-title" className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
          {copy.eyebrow}
        </p>
        <h2 id="psu-examples-title" className="text-2xl font-bold tracking-tight md:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">{copy.build}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{copy.publishedPower}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{copy.estimatedLoad}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{copy.planningSize}</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">{copy.loadCalculator}</span></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={`${row.cpu.id}-${row.gpu.id}`} className="align-middle hover:bg-muted/30">
                <th scope="row" className="px-4 py-4 font-semibold">
                  {row.cpu.name} + {row.gpu.name}
                </th>
                <td className="px-4 py-4 text-muted-foreground">
                  {row.cpu.tdp}W + {row.gpu.tdp}W = {row.publishedPower}W
                </td>
                <td className="px-4 py-4 font-medium">{row.estimatedLoad}W</td>
                <td className="px-4 py-4 text-lg font-bold text-emerald-700 dark:text-emerald-300">
                  {row.planningWattage}W
                </td>
                <td className="px-4 py-4 text-right">
                  <Link href={row.href} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                    {copy.loadCalculator}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
        {copy.note}
      </p>
    </section>
  );
}

export function PsuBuyingDecision({ lang }: { lang: Locale }) {
  const copy = getPsuPhaseOneCopy(lang).decision;

  return (
    <section aria-labelledby="psu-buying-decision-title" className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 dark:border-emerald-900 dark:bg-emerald-950/20 md:p-8">
      <div className="max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
          {copy.eyebrow}
        </p>
        <h2 id="psu-buying-decision-title" className="text-2xl font-bold tracking-tight md:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border bg-background p-5">
          <Gauge className="h-6 w-6 text-amber-600" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold">{copy.floorTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.floorBody}</p>
        </article>
        <article className="rounded-xl border-2 border-emerald-500 bg-background p-5 shadow-sm">
          <Scale className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold">{copy.recommendedTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.recommendedBody}</p>
        </article>
        <article className="rounded-xl border bg-background p-5">
          <ShieldCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold">{copy.verifyTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.verifyBody}</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            {copy.checks.map((check) => (
              <li key={check} className="flex gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export function PsuRelatedResources({ lang }: { lang: Locale }) {
  const copy = getPsuPhaseOneCopy(lang).resources;
  const guide = lang === 'en'
    ? { title: copy.guideTitle, description: copy.guideDescription, href: '/en/blog/how-much-psu-wattage-do-i-need', icon: BookOpen }
    : { title: copy.methodologyTitle, description: copy.methodologyDescription, href: getLocalizedPath(lang, 'methodology'), icon: BookOpen };
  const resources = [
    guide,
    { title: copy.upgradeTitle, description: copy.upgradeDescription, href: getLocalizedPath(lang, 'tools/pc-upgrade-priority-calculator'), icon: Wrench },
    { title: copy.comparisonTitle, description: copy.comparisonDescription, href: getLocalizedPath(lang, 'tools/component-comparison'), icon: Calculator },
    { title: copy.midrangeBuildTitle, description: copy.midrangeBuildDescription, href: `/${lang}/builds/core-i5-14600k-rtx-4070-super`, icon: Gauge },
    { title: copy.enthusiastBuildTitle, description: copy.enthusiastBuildDescription, href: `/${lang}/builds/ryzen-7-9800x3d-rtx-5080`, icon: ShieldCheck },
  ];

  return (
    <section aria-labelledby="psu-related-resources-title" className="space-y-5 border-t pt-10">
      <div className="max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
          {copy.eyebrow}
        </p>
        <h2 id="psu-related-resources-title" className="text-2xl font-bold tracking-tight md:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map(({ title, description, href, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-xl border bg-card p-5 transition hover:border-blue-400 hover:shadow-sm">
            <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <h3 className="mt-3 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
              {copy.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
