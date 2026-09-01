import { Locale } from '@/i18n-config';

export type SiteChromeCopy = {
  home: string;
  tools: string;
  fpsCalculator: string;
  psuCalculator: string;
  blog: string;
  author: string;
  about: string;
  methodology: string;
  contact: string;
  privacy: string;
  terms: string;
  disclaimer: string;
  cookiePolicy: string;
  tagline: string;
  rights: string;
  mainNavigation: string;
  mobileNavigation: string;
  footerNavigation: string;
  openMenu: string;
  closeMenu: string;
  switchLanguage: string;
  switchToDark: string;
  switchToLight: string;
  followFacebook: string;
  followInstagram: string;
  breadcrumb: string;
};

const SITE_CHROME_COPY: Record<Locale, SiteChromeCopy> = {
  en: {
    home: 'Home',
    tools: 'Tools',
    fpsCalculator: 'FPS Calculator',
    psuCalculator: 'PSU Calculator',
    blog: 'Blog',
    author: 'Author',
    about: 'About Us',
    methodology: 'Methodology',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    disclaimer: 'Disclaimer',
    cookiePolicy: 'Cookie Policy',
    tagline: 'Bottleneck, FPS and PSU tools for smarter PC builds.',
    rights: 'All rights reserved.',
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    footerNavigation: 'Footer navigation',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    switchLanguage: 'Switch language',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
    followFacebook: 'Follow us on Facebook',
    followInstagram: 'Follow us on Instagram',
    breadcrumb: 'Breadcrumb',
  },
  it: {
    home: 'Home',
    tools: 'Strumenti',
    fpsCalculator: 'Calcolatore FPS',
    psuCalculator: 'Calcolatore PSU',
    blog: 'Blog',
    author: 'Autore',
    about: 'Chi siamo',
    methodology: 'Metodologia',
    contact: 'Contattaci',
    privacy: 'Informativa sulla privacy',
    terms: 'Termini e condizioni',
    disclaimer: 'Avvertenza legale',
    cookiePolicy: 'Politica sui cookie',
    tagline: 'Strumenti per colli di bottiglia, FPS e PSU per configurazioni PC più intelligenti.',
    rights: 'Tutti i diritti riservati.',
    mainNavigation: 'Navigazione principale',
    mobileNavigation: 'Navigazione mobile',
    footerNavigation: 'Navigazione a piè di pagina',
    openMenu: 'Apri il menu di navigazione',
    closeMenu: 'Chiudi il menu di navigazione',
    switchLanguage: 'Cambia lingua',
    switchToDark: 'Passa al tema scuro',
    switchToLight: 'Passa al tema chiaro',
    followFacebook: 'Seguici su Facebook',
    followInstagram: 'Seguici su Instagram',
    breadcrumb: 'Percorso di navigazione',
  },
  fr: {
    home: 'Accueil',
    tools: 'Outils',
    fpsCalculator: 'Calculateur FPS',
    psuCalculator: "Calculateur d’alimentation",
    blog: 'Blog',
    author: 'Auteur',
    about: 'À propos',
    methodology: 'Méthodologie',
    contact: 'Nous contacter',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions générales',
    disclaimer: 'Avertissement',
    cookiePolicy: 'Politique relative aux cookies',
    tagline: 'Des outils de goulot d’étranglement, de FPS et d’alimentation pour mieux configurer votre PC.',
    rights: 'Tous droits réservés.',
    mainNavigation: 'Navigation principale',
    mobileNavigation: 'Navigation mobile',
    footerNavigation: 'Navigation du pied de page',
    openMenu: 'Ouvrir le menu de navigation',
    closeMenu: 'Fermer le menu de navigation',
    switchLanguage: 'Changer de langue',
    switchToDark: 'Activer le thème sombre',
    switchToLight: 'Activer le thème clair',
    followFacebook: 'Suivez-nous sur Facebook',
    followInstagram: 'Suivez-nous sur Instagram',
    breadcrumb: 'Fil d’Ariane',
  },
  de: {
    home: 'Startseite',
    tools: 'Werkzeuge',
    fpsCalculator: 'FPS-Rechner',
    psuCalculator: 'Netzteil-Rechner',
    blog: 'Blog',
    author: 'Autor',
    about: 'Über uns',
    methodology: 'Methodik',
    contact: 'Kontakt',
    privacy: 'Datenschutzerklärung',
    terms: 'Allgemeine Geschäftsbedingungen',
    disclaimer: 'Haftungsausschluss',
    cookiePolicy: 'Cookie-Richtlinie',
    tagline: 'Engpass-, FPS- und Netzteil-Tools für intelligentere PC-Konfigurationen.',
    rights: 'Alle Rechte vorbehalten.',
    mainNavigation: 'Hauptnavigation',
    mobileNavigation: 'Mobile Navigation',
    footerNavigation: 'Fußzeilennavigation',
    openMenu: 'Navigationsmenü öffnen',
    closeMenu: 'Navigationsmenü schließen',
    switchLanguage: 'Sprache wechseln',
    switchToDark: 'Zum dunklen Design wechseln',
    switchToLight: 'Zum hellen Design wechseln',
    followFacebook: 'Folge uns auf Facebook',
    followInstagram: 'Folge uns auf Instagram',
    breadcrumb: 'Brotkrümelnavigation',
  },
  es: {
    home: 'Inicio',
    tools: 'Herramientas',
    fpsCalculator: 'Calculadora FPS',
    psuCalculator: 'Calculadora de PSU',
    blog: 'Blog',
    author: 'Autor',
    about: 'Sobre nosotros',
    methodology: 'Metodología',
    contact: 'Contacto',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    disclaimer: 'Aviso legal',
    cookiePolicy: 'Política de cookies',
    tagline: 'Herramientas de cuello de botella, FPS y PSU para montar mejores PC.',
    rights: 'Todos los derechos reservados.',
    mainNavigation: 'Navegación principal',
    mobileNavigation: 'Navegación móvil',
    footerNavigation: 'Navegación del pie de página',
    openMenu: 'Abrir el menú de navegación',
    closeMenu: 'Cerrar el menú de navegación',
    switchLanguage: 'Cambiar idioma',
    switchToDark: 'Cambiar al tema oscuro',
    switchToLight: 'Cambiar al tema claro',
    followFacebook: 'Síguenos en Facebook',
    followInstagram: 'Síguenos en Instagram',
    breadcrumb: 'Migas de pan',
  },
  ru: {
    home: 'Главная',
    tools: 'Инструменты',
    fpsCalculator: 'Калькулятор FPS',
    psuCalculator: 'Калькулятор блока питания',
    blog: 'Блог',
    author: 'Автор',
    about: 'О нас',
    methodology: 'Методология',
    contact: 'Контакты',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    disclaimer: 'Отказ от ответственности',
    cookiePolicy: 'Политика cookie',
    tagline: 'Инструменты для анализа узких мест, FPS и блока питания для сбалансированных сборок ПК.',
    rights: 'Все права защищены.',
    mainNavigation: 'Основная навигация',
    mobileNavigation: 'Мобильная навигация',
    footerNavigation: 'Навигация в нижней части сайта',
    openMenu: 'Открыть меню навигации',
    closeMenu: 'Закрыть меню навигации',
    switchLanguage: 'Сменить язык',
    switchToDark: 'Включить тёмную тему',
    switchToLight: 'Включить светлую тему',
    followFacebook: 'Подписаться на нас в Facebook',
    followInstagram: 'Подписаться на нас в Instagram',
    breadcrumb: 'Навигационная цепочка',
  },
};

export function getSiteChromeCopy(locale: string): SiteChromeCopy {
  return SITE_CHROME_COPY[locale as Locale] ?? SITE_CHROME_COPY.en;
}
