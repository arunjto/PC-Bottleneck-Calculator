'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, CalendarCheck2, Gauge, Search } from 'lucide-react';

type GameCard = {
  id: string;
  name: string;
  summary: string;
  category: string;
  href: string;
  reviewed: boolean;
};

const RECENT_KEY = 'pcbuildcheck:recent-game-checks';

export function GameGuideDirectory({ games, labels }: {
  games: GameCard[];
  labels: {
    searchLabel: string; searchPlaceholder: string; noResults: string; openGuide: string;
    estimateFps: string; reviewed: string; modelled: string; allCategories: string;
    recentTitle: string; showMore: string; showLess: string;
  };
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]');
      if (Array.isArray(stored)) setRecentIds(stored.filter((value): value is string => typeof value === 'string').slice(0, 4));
    } catch {
      // A disabled or malformed localStorage should never block the directory.
    }
  }, []);

  const categories = useMemo(() => Array.from(new Set(games.map((game) => game.category))).sort(), [games]);
  const filteredGames = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return games.filter((game) =>
      (category === 'all' || game.category === category) &&
      (!normalized || `${game.name} ${game.category}`.toLocaleLowerCase().includes(normalized))
    );
  }, [category, games, query]);
  const visibleGames = expanded || query || category !== 'all' ? filteredGames : filteredGames.slice(0, 12);
  const recentGames = recentIds.map((id) => games.find((game) => game.id === id)).filter((game): game is GameCard => Boolean(game));

  const rememberGame = (id: string) => {
    const next = [id, ...recentIds.filter((item) => item !== id)].slice(0, 4);
    setRecentIds(next);
    try { window.localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* optional enhancement */ }
  };

  return (
    <div className="space-y-6">
      {recentGames.length > 0 && (
        <section aria-labelledby="recent-games" className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 dark:border-indigo-900 dark:bg-indigo-950/30">
          <h3 id="recent-games" className="flex items-center gap-2 font-bold"><Bookmark className="h-4 w-4 text-indigo-600" aria-hidden="true" />{labels.recentTitle}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {recentGames.map((game) => <Link key={game.id} href={game.href} onClick={() => rememberGame(game.id)} className="rounded-full border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary hover:text-primary">{game.name}</Link>)}
          </div>
        </section>
      )}

      <label className="block space-y-2">
        <span className="text-sm font-semibold">{labels.searchLabel}</span>
        <span className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setExpanded(true); }} placeholder={labels.searchPlaceholder} className="min-h-12 w-full rounded-xl border bg-background py-3 pl-11 pr-4 text-base shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </span>
      </label>

      <div className="flex flex-wrap gap-2" aria-label="Game categories">
        <button type="button" onClick={() => setCategory('all')} aria-pressed={category === 'all'} className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${category === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary hover:text-primary'}`}>{labels.allCategories}</button>
        {categories.map((item) => <button key={item} type="button" onClick={() => { setCategory(item); setExpanded(true); }} aria-pressed={category === item} className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${category === item ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary hover:text-primary'}`}>{item}</button>)}
      </div>

      {visibleGames.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleGames.map((game) => (
            <article key={game.id} className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{game.category}</span>
                <span className={`inline-flex items-center gap-1.5 ${game.reviewed ? 'text-emerald-700 dark:text-emerald-400' : ''}`}>
                  {game.reviewed ? <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> : <Gauge className="h-3.5 w-3.5" aria-hidden="true" />}
                  {game.reviewed ? labels.reviewed : labels.modelled}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{game.name}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{game.summary}</p>
              <Link href={game.href} onClick={() => rememberGame(game.id)} rel={game.reviewed ? undefined : 'nofollow'} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                {game.reviewed ? labels.openGuide : labels.estimateFps}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      ) : <p role="status" className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">{labels.noResults}</p>}

      {!query && category === 'all' && filteredGames.length > 12 && (
        <button type="button" onClick={() => setExpanded((value) => !value)} className="mx-auto flex min-h-11 items-center justify-center rounded-lg border px-5 font-semibold hover:border-primary hover:text-primary">
          {expanded ? labels.showLess : `${labels.showMore} (${filteredGames.length - 12})`}
        </button>
      )}
    </div>
  );
}
