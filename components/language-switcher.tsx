'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18n, Locale } from '@/i18n-config';
import { getCanonicalPath, getLocalizedPath } from '@/lib/path-translations';
import { getSiteChromeCopy } from '@/lib/site-i18n';

const languageOptions: Record<Locale, { label: string; flag: string }> = {
    en: { label: 'English', flag: '/flags/en.svg' },
    it: { label: 'Italiano', flag: '/flags/it.svg' },
    fr: { label: 'Français', flag: '/flags/fr.svg' },
    de: { label: 'Deutsch', flag: '/flags/de.svg' },
    es: { label: 'Español', flag: '/flags/es.svg' },
};

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = (pathname?.split('/')[1] || i18n.defaultLocale) as Locale;
    const currentLanguage = languageOptions[currentLocale] ?? languageOptions[i18n.defaultLocale];
    const copy = getSiteChromeCopy(currentLocale);

    const redirectToLocale = (newLocale: string) => {
        if (!pathname) return '/';

        // Remove locale from path to get the rest, e.g. /it/chi-siamo -> /chi-siamo.
        const segments = pathname.split('/');
        const pathAfterLocale = segments.slice(2).join('/');

        if (!pathAfterLocale) {
            router.push(`/${newLocale}`);
            return;
        }

        const canonicalPath = getCanonicalPath(currentLocale, pathAfterLocale);

        if (canonicalPath) {
            const newPath = getLocalizedPath(newLocale as Locale, canonicalPath);
            router.push(newPath);
            return;
        }

        const targetPath = getLocalizedPath(newLocale as Locale, pathAfterLocale);
        router.push(targetPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-700/50"
                    aria-label={`${copy.switchLanguage}: ${currentLanguage.label}`}
                >
                    <Image
                        src={currentLanguage.flag}
                        alt=""
                        width={24}
                        height={16}
                        className="h-4 w-6 rounded-[2px] border border-white/30 object-cover shadow-sm"
                        aria-hidden="true"
                    />
                    <span className="sr-only">{copy.switchLanguage}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {i18n.locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => redirectToLocale(locale)}
                        className={`gap-3 ${locale === currentLocale ? 'font-bold' : ''}`}
                    >
                        <Image
                            src={languageOptions[locale].flag}
                            alt=""
                            width={24}
                            height={16}
                            className="h-4 w-6 rounded-[2px] border border-border object-cover shadow-sm"
                            aria-hidden="true"
                        />
                        <span>{languageOptions[locale].label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
