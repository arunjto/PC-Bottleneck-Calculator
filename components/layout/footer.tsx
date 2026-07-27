import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  BookOpen,
  Info,
  Mail,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Cookie,
  FlaskConical,
  Facebook,
  Instagram,
  Wrench,
} from 'lucide-react';
import { getLocalizedPath } from '@/lib/path-translations';
import { Locale } from '@/i18n-config';
import { getSiteChromeCopy } from '@/lib/site-i18n';

export function Footer({ lang }: { dict?: unknown; lang: string }) {
  const t = getSiteChromeCopy(lang);
  const locale = lang as Locale;

  const footerLinks = [
    { href: `/${lang}`, label: t.home, icon: Home },
    { href: getLocalizedPath(locale, 'tools'), label: t.tools, icon: Wrench },
    { href: `/${lang}/blog`, label: t.blog, icon: BookOpen },
    { href: getLocalizedPath(locale, 'about'), label: t.about, icon: Info },
    { href: getLocalizedPath(locale, 'methodology'), label: t.methodology, icon: FlaskConical },
    { href: getLocalizedPath(locale, 'contact'), label: t.contact, icon: Mail },
    { href: getLocalizedPath(locale, 'privacy'), label: t.privacy, icon: ShieldCheck },
    { href: getLocalizedPath(locale, 'terms'), label: t.terms, icon: FileText },
    { href: getLocalizedPath(locale, 'disclaimer'), label: t.disclaimer, icon: AlertTriangle },
    { href: getLocalizedPath(locale, 'cookie-policy'), label: t.cookiePolicy, icon: Cookie },
  ];

  const socialLinks = [
    {
      href: 'https://www.facebook.com/people/PC-Build-Check/61576275498498/',
      label: 'Facebook',
      ariaLabel: t.followFacebook,
      icon: Facebook,
    },
    {
      href: 'https://www.instagram.com/pcbuildcheck/',
      label: 'Instagram',
      ariaLabel: t.followInstagram,
      icon: Instagram,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#0c1220] text-gray-300 mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/logo.webp"
              alt="PC Build Check"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-white font-semibold text-lg">PC Build Check</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md">{t.tagline}</p>
        </div>

        <nav aria-label={t.footerNavigation} className="mb-6">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600/50 rounded-full hover:border-blue-400/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <link.icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center gap-3 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600/50 rounded-full hover:border-blue-400/60 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <social.icon className="w-3.5 h-3.5" aria-hidden="true" />
              {social.label}
            </a>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm">
          © {currentYear} PC Build Check. {t.rights}
        </p>
      </div>
    </footer>
  );
}
