import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Gauge,
  Monitor,
  SearchCheck,
  Settings2,
  ShieldAlert,
  Wrench,
} from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocalizedBlogSlug } from '@/lib/blog-slug-translations';
import { getBottleneckFieldGuideCopy } from '@/lib/bottleneck-field-guide-i18n';
import { getLocalizedPath } from '@/lib/path-translations';

const exampleAccents = [
  'border-blue-300 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/20',
  'border-violet-300 bg-violet-50/60 dark:border-violet-900 dark:bg-violet-950/20',
  'border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20',
] as const;

export function BottleneckFieldGuide({ lang }: { lang: Locale }) {
  const copy = getBottleneckFieldGuideCopy(lang);
  const testingGuide = `/${lang}/blog/${getLocalizedBlogSlug(lang, 'how-to-check-pc-bottleneck')}`;

  return (
    <article aria-labelledby="bottleneck-field-guide-title" className="space-y-8">
      <header className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm dark:border-blue-900 dark:from-blue-950/30 dark:via-gray-950 dark:to-cyan-950/20 md:p-8">
        <Badge variant="outline" className="mb-3 border-blue-300 text-blue-800 dark:border-blue-700 dark:text-blue-300">
          {copy.badge}
        </Badge>
        <h2 id="bottleneck-field-guide-title" className="text-3xl font-bold tracking-tight md:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>
      </header>

      <section aria-labelledby="calculator-steps-title" className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-400">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" /> {copy.decisionsEyebrow}
          </p>
          <h3 id="calculator-steps-title" className="text-2xl font-bold md:text-3xl">{copy.stepsTitle}</h3>
        </div>
        <ol className="grid gap-4">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-xl border bg-card p-5 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-900 dark:bg-blue-900 dark:text-blue-100">{index + 1}</span>
              <div>
                <h4 className="font-semibold">{step.title}</h4>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="read-result-title" className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
            <Gauge className="h-4 w-4" aria-hidden="true" /> {copy.interpretationEyebrow}
          </p>
          <h3 id="read-result-title" className="text-2xl font-bold md:text-3xl">{copy.resultTitle}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.resultIntro}</p>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <table className="min-w-[760px] w-full text-left text-sm">
            <caption className="sr-only">{copy.scoreCaption}</caption>
            <thead className="bg-muted/60">
              <tr>{copy.scoreHeaders.map((header) => <th key={header} className="px-4 py-3 font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              {copy.scoreRows.map((row) => (
                <tr key={row.range} className="align-top">
                  <td className="px-4 py-4 font-semibold text-blue-700 dark:text-blue-300">{row.range}</td>
                  <td className="px-4 py-4 font-medium">{row.label}</td>
                  <td className="px-4 py-4 leading-6 text-muted-foreground">{row.meaning}</td>
                  <td className="px-4 py-4 leading-6 text-muted-foreground">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>{copy.important}</strong> {copy.thresholdNotice}
        </p>
      </section>

      <section aria-labelledby="workload-title" className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-400">
            <BarChart3 className="h-4 w-4" aria-hidden="true" /> {copy.contextEyebrow}
          </p>
          <h3 id="workload-title" className="text-2xl font-bold md:text-3xl">{copy.workloadTitle}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.workloadIntro}</p>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <table className="min-w-[820px] w-full text-left text-sm">
            <caption className="sr-only">{copy.workloadCaption}</caption>
            <thead className="bg-muted/60">
              <tr>{copy.workloadHeaders.map((header) => <th key={header} className="px-4 py-3 font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              {copy.workloadRows.map((row) => (
                <tr key={row.scenario} className="align-top">
                  <td className="px-4 py-4 font-semibold">{row.scenario}</td>
                  <td className="px-4 py-4 font-medium text-cyan-700 dark:text-cyan-300">{row.likelyPressure}</td>
                  <td className="px-4 py-4 leading-6 text-muted-foreground">{row.reason}</td>
                  <td className="px-4 py-4 leading-6 text-muted-foreground">{row.verify}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="diagnosis-title" className="space-y-5 rounded-2xl border border-cyan-200/80 bg-cyan-50/40 p-6 dark:border-cyan-900 dark:bg-cyan-950/10 md:p-8">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-300">
            <SearchCheck className="h-4 w-4" aria-hidden="true" /> {copy.testEyebrow}
          </p>
          <h3 id="diagnosis-title" className="text-2xl font-bold md:text-3xl">{copy.diagnosisTitle}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.diagnosisIntro}</p>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="min-w-[780px] w-full text-left text-sm">
            <caption className="sr-only">{copy.diagnosisCaption}</caption>
            <thead className="bg-muted/60">
              <tr>{copy.diagnosisHeaders.map((header) => <th key={header} className="px-4 py-3 font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              {copy.diagnosisRows.map((row) => (
                <tr key={row.observation} className="align-top">
                  <td className="px-4 py-4 font-medium">{row.observation}</td>
                  <td className="px-4 py-4 leading-6 text-muted-foreground">{row.interpretation}</td>
                  <td className="px-4 py-4 leading-6 text-muted-foreground">{row.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href={testingGuide} className="inline-flex items-center gap-1.5 font-semibold text-cyan-800 hover:underline dark:text-cyan-300">
          {copy.testingLink} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <section aria-labelledby="examples-title" className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
            <Monitor className="h-4 w-4" aria-hidden="true" /> {copy.examplesEyebrow}
          </p>
          <h3 id="examples-title" className="text-2xl font-bold md:text-3xl">{copy.examplesTitle}</h3>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {copy.examples.map((example, index) => (
            <Card key={example.title} className={exampleAccents[index]}>
              <CardHeader><CardTitle className="text-lg">{example.title}</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm leading-6">
                <p><strong>{copy.situation}</strong> {example.setup}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">{copy.whatMatters}</strong> {example.lesson}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="fix-order-title" className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-orange-400">
            <Wrench className="h-4 w-4" aria-hidden="true" /> {copy.fixEyebrow}
          </p>
          <h3 id="fix-order-title" className="text-2xl font-bold md:text-3xl">{copy.fixTitle}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.fixIntro}</p>
        </div>
        <ol className="grid gap-4 md:grid-cols-2">
          {copy.fixOrder.map(([title, body], index) => (
            <li key={title} className="flex gap-3 rounded-xl border bg-card p-5 shadow-sm last:md:col-span-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
              <div><h4 className="font-semibold">{index + 1}. {title}</h4><p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="limits-title" className="rounded-2xl border border-slate-300 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/50 md:p-8">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-slate-700 dark:text-slate-300" aria-hidden="true" />
          <div>
            <h3 id="limits-title" className="text-2xl font-bold">{copy.limitsTitle}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{copy.limitsBody}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href={getLocalizedPath(lang, 'methodology')} className="inline-flex items-center gap-1.5 text-blue-700 hover:underline dark:text-blue-300">{copy.methodologyLink} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={getLocalizedPath(lang, 'fps-calculator')} className="inline-flex items-center gap-1.5 text-violet-700 hover:underline dark:text-violet-300"><Cpu className="h-4 w-4" />{copy.fpsLink}</Link>
              <Link href={getLocalizedPath(lang, 'psu-calculator')} className="inline-flex items-center gap-1.5 text-emerald-700 hover:underline dark:text-emerald-300"><Settings2 className="h-4 w-4" />{copy.psuLink}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
