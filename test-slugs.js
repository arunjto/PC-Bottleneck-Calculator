// Quick test to verify blog slug translations are working
const path = require('path');
const fs = require('fs');

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// Inline the translation logic for testing
const blogSlugTranslations = {
  en: {
    'best-gpu-for-gaming-2026': 'best-gpu-for-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'cpu-vs-gpu-bottleneck-explained',
    'how-to-check-pc-bottleneck': 'how-to-check-pc-bottleneck',
  },
  it: {
    'best-gpu-for-gaming-2026': 'migliori-gpu-per-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'bottleneck-cpu-vs-gpu-spiegato',
    'how-to-check-pc-bottleneck': 'come-verificare-bottleneck-pc',
  },
  fr: {
    'best-gpu-for-gaming-2026': 'meilleures-gpu-pour-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'bottleneck-cpu-vs-gpu-explique',
    'how-to-check-pc-bottleneck': 'comment-verifier-bottleneck-pc',
  },
};

function getLocalizedBlogSlug(locale, englishSlug) {
  return blogSlugTranslations[locale]?.[englishSlug] || englishSlug;
}

// Simulate getAllPosts
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log('English files found:', files);
console.log('');

for (const locale of ['en', 'it', 'fr']) {
  console.log(`=== Locale: ${locale} ===`);
  for (const file of files) {
    const englishSlug = file.replace(/\.mdx$/, '');
    const displaySlug = getLocalizedBlogSlug(locale, englishSlug);
    console.log(`  ${englishSlug} -> ${displaySlug}`);
  }
}
