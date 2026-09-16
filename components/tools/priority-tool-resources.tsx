import Link from 'next/link';
import { ArrowRight, BookOpen, CircleHelp } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getPostBySlug } from '@/lib/blog';
import { getLocalizedBlogSlug } from '@/lib/blog-slug-translations';
import type { ToolContent, ToolSlug } from '@/lib/pc-tools';

type PriorityToolSlug = Extract<
  ToolSlug,
  | 'component-comparison'
  | 'pc-upgrade-priority-calculator'
  | 'resolution-scaling-calculator'
  | 'ssd-upgrade-calculator'
>;

type Faq = { q: string; a: string };

const GUIDE_SLUGS: Record<PriorityToolSlug, readonly string[]> = {
  'component-comparison': [
    'cpu-vs-gpu-bottleneck-explained',
    'how-to-check-pc-bottleneck',
    'best-gpu-for-gaming-2026',
  ],
  'pc-upgrade-priority-calculator': [
    'how-to-check-pc-bottleneck',
    'cpu-vs-gpu-bottleneck-explained',
    'how-much-psu-wattage-do-i-need',
  ],
  'resolution-scaling-calculator': [
    'how-to-estimate-gaming-fps',
    'how-to-check-fps-on-pc',
    'best-gpu-for-gaming-2026',
  ],
  'ssd-upgrade-calculator': [
    'how-to-check-fps-on-pc',
    'how-to-check-pc-bottleneck',
  ],
};

const COPY: Record<Locale, {
  faqTitle: string;
  faqIntro: string;
  benchmarkQuestion: (title: string) => string;
  methodQuestion: (title: string) => string;
  verifyQuestion: string;
  guidesTitle: string;
  guidesIntro: string;
  openGuide: string;
}> = {
  en: {
    faqTitle: 'Frequently asked questions',
    faqIntro: 'Quick answers about this tool’s calculation, evidence and practical limits.',
    benchmarkQuestion: title => `Is the ${title} result a measured benchmark?`,
    methodQuestion: title => `How does the ${title} calculate its result?`,
    verifyQuestion: 'What should I verify before acting on the result?',
    guidesTitle: 'Related PC planning guides',
    guidesIntro: 'Use these editorial guides to add testing context before changing hardware.',
    openGuide: 'Read guide',
  },
  de: {
    faqTitle: 'Häufige Fragen',
    faqIntro: 'Kurze Antworten zu Berechnung, Aussagekraft und praktischen Grenzen dieses Tools.',
    benchmarkQuestion: title => `Ist das Ergebnis von „${title}“ ein gemessener Benchmark?`,
    methodQuestion: title => `Wie berechnet „${title}“ das Ergebnis?`,
    verifyQuestion: 'Was sollte ich prüfen, bevor ich nach dem Ergebnis handle?',
    guidesTitle: 'Passende Leitfäden zur PC-Planung',
    guidesIntro: 'Diese redaktionellen Leitfäden liefern Testkontext vor einer Hardwareänderung.',
    openGuide: 'Leitfaden lesen',
  },
  fr: {
    faqTitle: 'Questions fréquentes',
    faqIntro: 'Réponses rapides sur le calcul, la portée et les limites pratiques de cet outil.',
    benchmarkQuestion: title => `Le résultat de « ${title} » est-il un benchmark mesuré ?`,
    methodQuestion: title => `Comment « ${title} » calcule-t-il son résultat ?`,
    verifyQuestion: 'Que faut-il vérifier avant d’agir selon le résultat ?',
    guidesTitle: 'Guides associés pour planifier le PC',
    guidesIntro: 'Ajoutez le contexte de test de ces guides avant de modifier le matériel.',
    openGuide: 'Lire le guide',
  },
  it: {
    faqTitle: 'Domande frequenti',
    faqIntro: 'Risposte rapide su calcolo, significato e limiti pratici di questo strumento.',
    benchmarkQuestion: title => `Il risultato di “${title}” è un benchmark misurato?`,
    methodQuestion: title => `Come calcola il risultato “${title}”?`,
    verifyQuestion: 'Cosa devo verificare prima di agire in base al risultato?',
    guidesTitle: 'Guide correlate per pianificare il PC',
    guidesIntro: 'Usa queste guide editoriali per aggiungere contesto di test prima di cambiare hardware.',
    openGuide: 'Leggi la guida',
  },
  es: {
    faqTitle: 'Preguntas frecuentes',
    faqIntro: 'Respuestas rápidas sobre el cálculo, el alcance y los límites prácticos de esta herramienta.',
    benchmarkQuestion: title => `¿El resultado de “${title}” es un benchmark medido?`,
    methodQuestion: title => `¿Cómo calcula su resultado “${title}”?`,
    verifyQuestion: '¿Qué debo verificar antes de actuar según el resultado?',
    guidesTitle: 'Guías relacionadas para planificar el PC',
    guidesIntro: 'Añade contexto de pruebas con estas guías antes de cambiar el hardware.',
    openGuide: 'Leer la guía',
  },
  ru: {
    faqTitle: 'Частые вопросы',
    faqIntro: 'Краткие ответы о расчёте, значении и практических ограничениях инструмента.',
    benchmarkQuestion: title => `Результат «${title}» — это измеренный тест?`,
    methodQuestion: title => `Как «${title}» рассчитывает результат?`,
    verifyQuestion: 'Что проверить перед решением по результату?',
    guidesTitle: 'Связанные руководства по планированию ПК',
    guidesIntro: 'Используйте эти материалы для проверки контекста перед заменой комплектующих.',
    openGuide: 'Читать руководство',
  },
};

function isPriorityTool(slug: ToolSlug): slug is PriorityToolSlug {
  return slug in GUIDE_SLUGS;
}

function getFaqs(lang: Locale, content: ToolContent): Faq[] {
  const copy = COPY[lang] ?? COPY.en;
  return [
    { q: copy.benchmarkQuestion(content.title), a: content.resultGuide },
    { q: copy.methodQuestion(content.title), a: content.methodologyOverview },
    { q: copy.verifyQuestion, a: content.limitations.join(' ') },
  ];
}

export function PriorityToolResources({
  slug,
  lang,
  content,
  pageUrl,
}: {
  slug: ToolSlug;
  lang: Locale;
  content: ToolContent;
  pageUrl: string;
}) {
  if (!isPriorityTool(slug)) return null;

  const copy = COPY[lang] ?? COPY.en;
  const faqs = getFaqs(lang, content);
  const guides = GUIDE_SLUGS[slug]
    .map((canonicalSlug) => {
      const localizedSlug = getLocalizedBlogSlug(lang, canonicalSlug);
      const post = getPostBySlug(localizedSlug, lang);
      return post ? { post, href: `/${lang}/blog/${localizedSlug}` } : null;
    })
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
  const faqId = `tool-faq-${slug}`;
  const guidesId = `tool-guides-${slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section aria-labelledby={faqId} className="space-y-5 border-t pt-10">
        <div className="max-w-3xl">
          <h2 id={faqId} className="flex items-center gap-2 text-3xl font-semibold">
            <CircleHelp className="h-7 w-7 text-blue-600" aria-hidden="true" />
            {copy.faqTitle}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">{copy.faqIntro}</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-xl border bg-card p-5">
              <summary className="cursor-pointer font-semibold">{faq.q}</summary>
              <p className="mt-3 leading-7 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {guides.length > 0 && (
        <section aria-labelledby={guidesId} className="space-y-5 rounded-2xl border border-amber-200 bg-amber-50/40 p-6 dark:border-amber-900 dark:bg-amber-950/20 md:p-8">
          <div className="max-w-3xl">
            <h2 id={guidesId} className="flex items-center gap-2 text-3xl font-semibold">
              <BookOpen className="h-7 w-7 text-amber-700 dark:text-amber-300" aria-hidden="true" />
              {copy.guidesTitle}
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">{copy.guidesIntro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guides.map(({ post, href }) => (
              <Link key={href} href={href} className="group rounded-xl border bg-background p-5 transition hover:border-amber-400 hover:shadow-sm">
                <h3 className="font-semibold group-hover:text-amber-800 dark:group-hover:text-amber-300">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {copy.openGuide}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
