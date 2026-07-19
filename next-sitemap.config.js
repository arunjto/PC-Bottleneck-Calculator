const publicPaths = {
  en: {},
  it: {
    about: 'chi-siamo',
    'fps-calculator': 'calcolatore-fps',
    'psu-calculator': 'calcolatore-psu',
    contact: 'contatti',
    'thank-you': 'grazie',
    terms: 'termini',
    disclaimer: 'avvertenza',
    'cookie-policy': 'politica-cookie',
    author: 'autore',
    methodology: 'metodologia',
  },
  fr: {
    about: 'a-propos',
    'fps-calculator': 'calculateur-fps',
    'psu-calculator': 'calculateur-alimentation',
    privacy: 'confidentialite',
    'thank-you': 'merci',
    terms: 'conditions',
    disclaimer: 'avertissement',
    'cookie-policy': 'politique-cookies',
    author: 'auteur',
    methodology: 'methodologie',
  },
  de: {
    about: 'ueber-uns',
    'fps-calculator': 'fps-rechner',
    'psu-calculator': 'netzteil-rechner',
    contact: 'kontakt',
    privacy: 'datenschutz',
    'thank-you': 'danke',
    terms: 'agb',
    disclaimer: 'haftungsausschluss',
    'cookie-policy': 'cookie-richtlinie',
    author: 'autor',
    methodology: 'methodik',
  },
  es: {
    about: 'sobre-nosotros',
    'fps-calculator': 'calculadora-fps',
    'psu-calculator': 'calculadora-psu',
    contact: 'contacto',
    privacy: 'privacidad',
    'thank-you': 'gracias',
    terms: 'terminos',
    disclaimer: 'aviso-legal',
    'cookie-policy': 'politica-cookies',
    author: 'autor',
    methodology: 'metodologia',
  },
};

function toPublicPath(route) {
  const match = route.match(/^\/([a-z]{2})\/([^/]+)$/);
  if (!match) return route;
  const [, locale, segment] = match;
  const localized = publicPaths[locale]?.[segment];
  return localized ? `/${locale}/${localized}` : route;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pcbuildcheck.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  autoLastmod: false,
  exclude: [
    '*/thank-you',
    '*/blog/category/*',
    '*/blog/tag/*',
  ],
  transform: async (config, route) => ({
    loc: toPublicPath(route),
    changefreq: config.changefreq,
    priority: config.priority,
  }),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/404', '/500'],
      },
    ],
  },
};
