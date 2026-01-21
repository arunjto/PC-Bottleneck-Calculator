import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

import { getCanonicalPath, getLocalizedPath } from '@/lib/path-translations';
import { Locale } from '@/i18n-config';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 0. Skip internal Next.js paths and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        /\.[^/.]+(?=\?|$)/.test(pathname) // Matches file extensions (css, js, ico, etc.)
    ) {
        return NextResponse.next();
    }

    // 1. Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        const newUrl = new URL(
            `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
            request.url
        );
        return NextResponse.redirect(newUrl);
    }

    // 2. Handle Localized Paths
    // Extract locale and path segments
    // e.g. /it/chi-siamo -> locale='it', pathSegment='chi-siamo'
    const match = pathname.match(/^\/([a-z]{2})(?:\/(.*))?$/);

    if (match) {
        const locale = match[1] as Locale;
        const pathSegment = match[2] || '';

        // Case A: User visits a localized path (e.g., /it/chi-siamo)
        // We need to rewrite it to the internal path (e.g., /it/about) so Next.js can find the file.
        const canonicalPath = getCanonicalPath(locale, pathSegment);
        if (canonicalPath) {
            const url = request.nextUrl.clone();
            url.pathname = `/${locale}/${canonicalPath}`;
            return NextResponse.rewrite(url);
        }

        // Case B: User visits an internal path directly (e.g., /it/about)
        // We SHOULD redirect them to the localized path (e.g., /it/chi-siamo) to avoid duplicate content
        // BUT we must verify this isn't a rewrite loop.
        // The check `canonicalPath` above handles the incoming requests that ARE localized.
        // Now we check if the current pathSegment IS actually a canonical path key that HAS a different localized value.

        // This logic requires a reverse lookup helper or access to the config.
        // Ideally: if pathSegment is 'about' and locale is 'it', we see that 'about' -> 'chi-siamo'.
        // So we redirect to /it/chi-siamo.

        // Let's implement this check safely.
        // We import the direct translations object or use a helper that checks if "input path" is a canonical key.
        // Actually, getLocalizedPath does simpler logic: it assumes input is canonical.

        const potentiallyLocalized = getLocalizedPath(locale, pathSegment);

        // If getLocalizedPath returns a different path than what we are on, it means we are on the canonical path
        // but should be on the localized one.
        // e.g. pathSegment = 'about' -> returns '/it/chi-siamo'
        // current url = '/it/about'
        // mismatch -> redirect.

        // One catch: getLocalizedPath('/it/chi-siamo') would likely return '/it/chi-siamo' if 'chi-siamo' isn't a key.
        // So we need to be careful not to redirect valid localized paths if they happen to match a key (unlikely here but good practice).

        // Simpler check:
        // iterate keys of translations[locale]
        // if pathSegment === key, and value !== key -> Redirect to value.

        // We can use a simplified check using the helper:
        const targetPath = getLocalizedPath(locale, pathSegment);
        // targetPath comes back as full string e.g. /it/chi-siamo

        if (targetPath !== pathname && targetPath !== `/${locale}/${pathSegment}`) {
            // If function returned a mapped path that is different from current,
            // it implies current pathSegment IS a canonical key that should be translated.
            return NextResponse.redirect(new URL(targetPath, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Strictly exclude static files and Next.js internals to prevent CSS 404s
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
