import Link from 'next/link';
import { ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getGameGuideCopy, type GameGuideSlug } from '@/lib/can-i-run';
import { getGameGuideDefinition } from '@/lib/game-guides';
import { getLocalizedPath } from '@/lib/path-translations';
import { getLocalizedBlogSlug, blogSlugTranslations } from '@/lib/blog-slug-translations';
import { getPostBySlug } from '@/lib/blog';
import { BUILD_ARTICLES, BUILD_GAMES, GAME_ARTICLES, GAME_SIBLINGS } from '@/lib/detail-recommendations';
import type { PopularBuild } from '@/lib/popular-builds';

type Copy = { gameTitle: string; gameIntro: string; buildTitle: string; buildIntro: string; guidesTitle: string; guidesIntro: string; openGame: string; readGuide: string };
const COPY: Record<Locale, Copy> = {
  en: { gameTitle: 'Compare a different game workload', gameIntro: 'These games stress a related part of the system but change the practical decision.', buildTitle: 'Test this build against real game targets', buildIntro: 'Use the closest workloads to check whether this parts list matches the frame rate and settings you actually want.', guidesTitle: 'Guides for the next decision', guidesIntro: 'Read these before changing a component; they explain the measurement or buying question raised by this page.', openGame: 'Open game check', readGuide: 'Read guide' },
  it: { gameTitle: 'Confronta un carico di gioco diverso', gameIntro: 'Questi giochi sollecitano parti simili del sistema ma cambiano la decisione pratica.', buildTitle: 'Verifica la build con obiettivi di gioco reali', buildIntro: 'Usa i carichi più vicini per controllare FPS e impostazioni desiderati.', guidesTitle: 'Guide per la decisione successiva', guidesIntro: 'Leggile prima di cambiare un componente.', openGame: 'Apri verifica', readGuide: 'Leggi guida' },
  fr: { gameTitle: 'Comparer une autre charge de jeu', gameIntro: 'Ces jeux sollicitent des parties proches du système, mais peuvent changer la décision.', buildTitle: 'Tester cette configuration avec des objectifs réels', buildIntro: 'Utilisez les charges les plus proches de vos FPS et réglages visés.', guidesTitle: 'Guides pour la prochaine décision', guidesIntro: 'À lire avant de remplacer un composant.', openGame: 'Ouvrir la vérification', readGuide: 'Lire le guide' },
  de: { gameTitle: 'Eine andere Spielelast vergleichen', gameIntro: 'Diese Spiele belasten ähnliche Systembereiche, können aber zu einer anderen Entscheidung führen.', buildTitle: 'Diesen Build mit echten Spielzielen prüfen', buildIntro: 'Prüfe passende Lasten für die gewünschten FPS und Einstellungen.', guidesTitle: 'Leitfäden für die nächste Entscheidung', guidesIntro: 'Vor einem Komponentenwechsel lesen.', openGame: 'Spielprüfung öffnen', readGuide: 'Leitfaden lesen' },
  es: { gameTitle: 'Compara otra carga de juego', gameIntro: 'Estos juegos exigen partes similares del sistema, pero pueden cambiar la decisión práctica.', buildTitle: 'Prueba este equipo con objetivos de juego reales', buildIntro: 'Usa las cargas más cercanas a los FPS y ajustes que buscas.', guidesTitle: 'Guías para la siguiente decisión', guidesIntro: 'Léelas antes de cambiar un componente.', openGame: 'Abrir comprobación', readGuide: 'Leer guía' },
  ru: { gameTitle: 'Сравните другую игровую нагрузку', gameIntro: 'Эти игры нагружают похожие части системы, но могут изменить решение об апгрейде.', buildTitle: 'Проверьте сборку на реальных игровых целях', buildIntro: 'Выберите близкие нагрузки для нужных FPS и настроек.', guidesTitle: 'Материалы для следующего решения', guidesIntro: 'Прочитайте их до замены комплектующих.', openGame: 'Открыть проверку', readGuide: 'Читать гайд' },
};

const LOCALIZED_FALLBACKS = ['how-to-check-pc-bottleneck', 'cpu-vs-gpu-bottleneck-explained', 'best-gpu-for-gaming-2026', 'how-to-estimate-gaming-fps'] as const;

function getArticles(lang: Locale, requested: readonly string[]) {
  const candidates = Array.from(new Set([...requested, ...LOCALIZED_FALLBACKS]));
  return candidates.flatMap((canonicalSlug) => {
    if (lang !== 'en' && !blogSlugTranslations[lang]?.[canonicalSlug]) return [];
    const slug = getLocalizedBlogSlug(lang, canonicalSlug);
    const post = getPostBySlug(slug, lang);
    return post ? [{ title: post.title, description: post.description, href: `/${lang}/blog/${slug}` }] : [];
  }).slice(0, 2);
}

function GameCards({ lang, slugs }: { lang: Locale; slugs: readonly GameGuideSlug[] }) {
  const copy = COPY[lang];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {slugs.map((slug) => {
        const guide = getGameGuideDefinition(slug);
        const gameCopy = getGameGuideCopy(lang, slug);
        return <Link key={slug} href={getLocalizedPath(lang, `can-i-run/${slug}`)} className="group rounded-xl border bg-background p-5 transition hover:border-primary hover:shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{guide.category}</p><h3 className="mt-2 text-lg font-bold">{guide.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{gameCopy.quickAnswer}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">{copy.openGame}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>;
      })}
    </div>
  );
}

function ArticleCards({ lang, requested }: { lang: Locale; requested: readonly string[] }) {
  const copy = COPY[lang];
  const articles = getArticles(lang, requested);
  if (!articles.length) return null;
  return <section className="space-y-3"><div><h2 className="flex items-center gap-2 text-2xl font-bold"><BookOpen className="h-5 w-5 text-blue-600" />{copy.guidesTitle}</h2><p className="mt-2 leading-7 text-muted-foreground">{copy.guidesIntro}</p></div><div className="grid gap-3 md:grid-cols-2">{articles.map((article) => <Link key={article.href} href={article.href} className="group rounded-xl border bg-card p-5 transition hover:border-blue-400 hover:shadow-sm"><h3 className="font-bold">{article.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{article.description}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">{copy.readGuide}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section>;
}

export function GameDetailRecommendations({ lang, slug }: { lang: Locale; slug: GameGuideSlug }) {
  const copy = COPY[lang];
  return <section aria-labelledby={`game-siblings-${slug}`} className="space-y-8 rounded-3xl border bg-muted/20 p-6 sm:p-8"><div className="space-y-4"><div><h2 id={`game-siblings-${slug}`} className="flex items-center gap-2 text-2xl font-bold"><Gamepad2 className="h-6 w-6 text-indigo-600" />{copy.gameTitle}</h2><p className="mt-2 leading-7 text-muted-foreground">{copy.gameIntro}</p></div><GameCards lang={lang} slugs={GAME_SIBLINGS[slug]} /></div><ArticleCards lang={lang} requested={GAME_ARTICLES[slug]} /></section>;
}

export function BuildDetailRecommendations({ lang, build }: { lang: Locale; build: PopularBuild }) {
  const copy = COPY[lang];
  return <section aria-labelledby={`build-games-${build.slug}`} className="space-y-8 rounded-3xl border bg-muted/20 p-6 sm:p-8"><div className="space-y-4"><div><h2 id={`build-games-${build.slug}`} className="flex items-center gap-2 text-2xl font-bold"><Gamepad2 className="h-6 w-6 text-indigo-600" />{copy.buildTitle}</h2><p className="mt-2 leading-7 text-muted-foreground">{copy.buildIntro}</p></div><GameCards lang={lang} slugs={BUILD_GAMES[build.slug] ?? []} /></div><ArticleCards lang={lang} requested={BUILD_ARTICLES[build.slug] ?? []} /></section>;
}
