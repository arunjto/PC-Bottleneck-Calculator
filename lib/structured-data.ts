export const SITE_URL = 'https://www.pcbuildcheck.com';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type BreadcrumbItem = { name: string; url: string };
type FaqItem = { q: string; a: string };

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'PCBuildCheck',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.webp`,
    width: 512,
    height: 512,
  },
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'PCBuildCheck',
  publisher: { '@id': ORGANIZATION_ID },
};

export function createBreadcrumbSchema(pageUrl: string, items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createFaqSchema(pageUrl: string, faqs: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a.replace(/<[^>]*>/g, ''),
      },
    })),
  };
}

export function createItemListSchema(
  pageUrl: string,
  name: string,
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#popular-builds`,
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function createWebPageSchema({
  pageUrl,
  name,
  description,
  lang,
  image,
  type = 'WebPage',
  mainEntityId,
  hasPartId,
}: {
  pageUrl: string;
  name: string;
  description: string;
  lang: string;
  image?: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'ProfilePage' | 'TechArticle';
  mainEntityId?: string;
  hasPartId?: string;
}) {
  return {
    '@type': type,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(hasPartId ? { hasPart: { '@id': hasPartId } } : {}),
  };
}

export function createWebApplicationSchema({
  pageUrl,
  name,
  description,
  lang,
}: {
  pageUrl: string;
  name: string;
  description: string;
  lang: string;
}) {
  return {
    '@type': 'WebApplication',
    '@id': `${pageUrl}#application`,
    name,
    url: pageUrl,
    description,
    inLanguage: lang,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    isAccessibleForFree: true,
    publisher: { '@id': ORGANIZATION_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function createSchemaGraph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, ...nodes],
  };
}
