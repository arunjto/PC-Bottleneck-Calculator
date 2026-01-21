import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { getLocalizedPath } from '@/lib/path-translations';

export function Footer({ dict, lang }: { dict: any; lang: string }) {
  // Fallback to avoid crashes if dict is missing (during build or transition)
  const t = dict || {
    about: 'About Us',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
    follow_fb: 'Follow us on Facebook',
    follow_ig: 'Follow us on Instagram',
    copyright: '© 2025 PC Build Check. All rights reserved.'
  };

  const footerLinks = [
    { href: getLocalizedPath(lang as any, 'about'), label: t.about },
    { href: getLocalizedPath(lang as any, 'privacy'), label: t.privacy },
    { href: getLocalizedPath(lang as any, 'contact'), label: t.contact },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: Facebook, label: t.follow_fb },
    { href: 'https://instagram.com', icon: Instagram, label: t.follow_ig },
  ];

  return (
    <footer className="text-center py-8 px-4 text-muted-foreground text-sm mt-8">
      <div className="flex justify-center gap-6 mb-4">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium hover:text-primary transition-colors hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-7 my-5">
        {socialLinks.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            <social.icon className="h-6 w-6" />
          </Link>
        ))}
      </div>

      <p>{t.copyright}</p>
    </footer>
  );
}