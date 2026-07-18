import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Locale } from '@/i18n-config';
import { LegalPageCopy } from '@/lib/legal-i18n';
import { getLocalizedPath } from '@/lib/path-translations';
import { getSiteChromeCopy } from '@/lib/site-i18n';
import type { LegalPageKey } from '@/lib/legal-i18n';
import { JsonLd } from '@/components/seo/json-ld';
import { createBreadcrumbSchema, createSchemaGraph, createWebPageSchema, SITE_URL } from '@/lib/structured-data';

type LegalPageProps = {
  lang: Locale;
  copy: LegalPageCopy;
  pageKey: LegalPageKey;
};

export function LegalPage({ lang, copy, pageKey }: LegalPageProps) {
  const chrome = getSiteChromeCopy(lang);
  const pageUrl = `${SITE_URL}${getLocalizedPath(lang, pageKey)}`;
  const schema = createSchemaGraph([
    createWebPageSchema({ pageUrl, name: copy.title, description: copy.description, lang }),
    createBreadcrumbSchema(pageUrl, [
      { name: chrome.home, url: `${SITE_URL}/${lang}` },
      { name: copy.title, url: pageUrl },
    ]),
  ]);

  return (
    <div className="py-8 px-4">
      <JsonLd data={schema} />
      <div className="max-w-4xl mx-auto">
        <nav aria-label={chrome.breadcrumb} className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          <ol className="flex gap-1 items-center">
            <li>
              <Link href={`/${lang}`} className="hover:underline">{chrome.home}</Link>
            </li>
            <li aria-hidden="true" className="px-1">›</li>
            <li className="text-slate-900 dark:text-slate-200 font-medium" aria-current="page">
              {copy.title}
            </li>
          </ol>
        </nav>

        <Card className="shadow-lg">
          <CardContent className="pt-8">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h1 className="text-4xl font-bold text-primary mb-2">{copy.title}</h1>
              <p className="text-muted-foreground italic mb-8">
                {copy.lastUpdated}: <time dateTime="2026-07-14">{copy.displayDate}</time>
              </p>

              {copy.intro && <p className="leading-7">{copy.intro}</p>}

              {copy.sections.map((section, index) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-7">{paragraph}</p>
                  ))}
                  {copy.consent?.afterSection === index && (
                    <p className="leading-7 mt-3">
                      {copy.consent.prefix}
                      <Link
                        href={`${getLocalizedPath(lang, 'privacy')}#preferences`}
                        className="text-primary underline"
                      >
                        {copy.consent.link}
                      </Link>
                      {copy.consent.suffix}
                    </p>
                  )}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {copy.contactTitle}
                </h2>
                <p className="leading-7">
                  {copy.contactPrefix}
                  <Link href={getLocalizedPath(lang, 'contact')} className="text-primary underline">
                    {copy.contactLink}
                  </Link>
                  {copy.contactSuffix}
                </p>
              </section>
            </article>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
