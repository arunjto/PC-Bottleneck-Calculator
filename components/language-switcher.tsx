'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18n } from '@/i18n-config';
import { Globe } from 'lucide-react';

import { getCanonicalPath, getLocalizedPath } from '@/lib/path-translations';
import { Locale } from '@/i18n-config';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = pathname?.split('/')[1] || i18n.defaultLocale;

    const redirectToLocale = (newLocale: string) => {
        if (!pathname) return '/';

        // Remove locale from path to get the rest
        // e.g. /it/chi-siamo -> /chi-siamo
        const segments = pathname.split('/');
        // segments[0] is empty, segments[1] is locale
        const pathAfterLocale = segments.slice(2).join('/');

        // Find canonical path for current page
        // e.g. /chi-siamo -> 'about'
        // If pathAfterLocale is empty, we are at home.
        if (!pathAfterLocale) {
            router.push(`/${newLocale}`);
            return;
        }

        const canonicalPath = getCanonicalPath(currentLocale as Locale, pathAfterLocale);

        // If we found a canonical path (e.g. 'about'), translate it to new locale
        if (canonicalPath) {
            const newPath = getLocalizedPath(newLocale as Locale, canonicalPath);
            router.push(newPath);
            return;
        }

        // Fallback: mostly for non-localized paths or if something fails, just try strictly swapping locale.
        // But since we have strict redirects, this might 404 if not careful.
        // However, if getCanonicalPath returns null, it might mean the path is NOT localized in the current locale
        // (e.g. it was just /en/about which matches canonical directly).
        // Let's try to assume current path IS canonical if lookup failed.

        const targetPath = getLocalizedPath(newLocale as Locale, pathAfterLocale);
        router.push(targetPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-slate-700/50">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Switch Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {i18n.locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => redirectToLocale(locale)}
                        className={locale === currentLocale ? 'font-bold' : ''}
                    >
                        {locale === 'en' ? 'English' : locale === 'it' ? 'Italiano' : locale === 'fr' ? 'Français' : locale === 'de' ? 'Deutsch' : 'Español'}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
