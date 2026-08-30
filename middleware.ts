import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { getCanonicalPath, getLocalizedPath } from '@/lib/path-translations';
import { Locale } from '@/i18n-config';

function getPermanentRedirectTarget(pathname: string): string | null {
    const normalizedPathname = pathname.length > 1
        ? pathname.replace(/\/+$/, '')
        : pathname;
    const removedTrailingSlash = normalizedPathname !== pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !normalizedPathname.startsWith(`/${locale}/`) && normalizedPathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        return normalizedPathname === '/'
            ? `/${i18n.defaultLocale}`
            : `/${i18n.defaultLocale}${normalizedPathname}`;
    }

    const match = normalizedPathname.match(/^\/([a-z]{2})(?:\/(.*))?$/);
    if (!match) {
        return removedTrailingSlash ? normalizedPathname : null;
    }

    const locale = match[1] as Locale;
    const pathSegment = match[2] || '';

    // Blog slugs are already public paths and only need slash normalization.
    if (pathSegment.startsWith('blog')) {
        return removedTrailingSlash ? normalizedPathname : null;
    }

    // A matching reverse lookup means this is already the localized public URL.
    if (getCanonicalPath(locale, pathSegment)) {
        return removedTrailingSlash ? normalizedPathname : null;
    }

    const localizedPath = getLocalizedPath(locale, pathSegment);
    if (localizedPath !== normalizedPathname) {
        return localizedPath;
    }

    return removedTrailingSlash ? normalizedPathname : null;
}

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

    // A localized public URL is rewritten once to its internal App Router path.
    // Do not run localization again for that internal rewrite or it will redirect
    // back to the same public URL.
    if (request.headers.get('x-pcbuildcheck-localized-rewrite') === '1') {
        return NextResponse.next();
    }

    // Consolidate locale, translated-path and trailing-slash normalization into
    // one permanent hop while preserving the original query string.
    const redirectTarget = getPermanentRedirectTarget(pathname);
    if (redirectTarget) {
        const redirectUrl = new URL(request.url);
        redirectUrl.pathname = redirectTarget;
        return NextResponse.redirect(redirectUrl, 301);
    }

    // Handle localized public paths.
    // Extract locale and path segments
    // e.g. /it/chi-siamo -> locale='it', pathSegment='chi-siamo'
    const match = pathname.match(/^\/([a-z]{2})(?:\/(.*))?$/);

    if (match) {
        const locale = match[1] as Locale;
        const pathSegment = match[2] || '';

        // Skip path translation for blog routes — blog uses its own routing
        if (pathSegment.startsWith('blog')) {
          return NextResponse.next();
        }

        // Case A: User visits a localized path (e.g., /it/chi-siamo)
        // We need to rewrite it to the internal path (e.g., /it/about) so Next.js can find the file.
        const canonicalPath = getCanonicalPath(locale, pathSegment);
        if (canonicalPath) {
            const url = request.nextUrl.clone();
            url.pathname = `/${locale}/${canonicalPath}`;
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-pcbuildcheck-localized-rewrite', '1');
            return NextResponse.rewrite(url, {
                request: { headers: requestHeaders },
            });
        }

    }

    return NextResponse.next();
}

export const config = {
    // Exclude Next.js internals and every file-like request from middleware.
    // Missing assets should resolve as assets/404s, never as locale routes.
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\..*).*)',
    ],
};
