import type { Locale } from '@/i18n-config';

export type ConsentCopy = {
  bannerLabel: string;
  bannerTitle: string;
  bannerDescription: string;
  privacyPolicy: string;
  cookiePolicy: string;
  rejectOptional: string;
  managePreferences: string;
  acceptAnalytics: string;
  dialogTitle: string;
  dialogDescription: string;
  essentialCookies: string;
  essentialDescription: string;
  analyticsCookies: string;
  analyticsDescription: string;
  savePreferences: string;
  preferencesSectionTitle: string;
  openManagerIntro: string;
};

const COPY: Record<Locale, ConsentCopy> = {
  en: {
    bannerLabel: 'Cookie consent',
    bannerTitle: 'Your privacy choices',
    bannerDescription:
      'We use optional analytics cookies to understand how the site is used and improve our calculators. They are disabled until you choose to accept them.',
    privacyPolicy: 'Privacy policy',
    cookiePolicy: 'Cookie policy',
    rejectOptional: 'Reject optional',
    managePreferences: 'Manage preferences',
    acceptAnalytics: 'Accept analytics',
    dialogTitle: 'Manage cookie preferences',
    dialogDescription:
      'Essential storage keeps the site working. You can choose whether to allow optional analytics cookies.',
    essentialCookies: 'Essential storage',
    essentialDescription: 'Required for core functionality and saving your privacy choice.',
    analyticsCookies: 'Analytics cookies',
    analyticsDescription:
      'Help us understand page views and site interactions using Google Analytics 4.',
    savePreferences: 'Save preferences',
    preferencesSectionTitle: '6. Cookie / Consent Preferences',
    openManagerIntro: 'You can review or change your consent choice here:',
  },
  it: {
    bannerLabel: 'Consenso ai cookie',
    bannerTitle: 'Le tue scelte sulla privacy',
    bannerDescription:
      'Utilizziamo cookie analitici facoltativi per capire come viene usato il sito e migliorare i nostri calcolatori. Restano disattivati finché non li accetti.',
    privacyPolicy: 'Informativa sulla privacy',
    cookiePolicy: 'Informativa sui cookie',
    rejectOptional: 'Rifiuta facoltativi',
    managePreferences: 'Gestisci preferenze',
    acceptAnalytics: 'Accetta analisi',
    dialogTitle: 'Gestisci le preferenze dei cookie',
    dialogDescription:
      'L’archiviazione essenziale mantiene operativo il sito. Puoi scegliere se consentire i cookie analitici facoltativi.',
    essentialCookies: 'Archiviazione essenziale',
    essentialDescription: 'Necessaria per le funzioni principali e per salvare la tua scelta.',
    analyticsCookies: 'Cookie analitici',
    analyticsDescription:
      'Ci aiutano a comprendere visualizzazioni e interazioni tramite Google Analytics 4.',
    savePreferences: 'Salva preferenze',
    preferencesSectionTitle: '6. Preferenze Cookie / Consenso',
    openManagerIntro: 'Puoi rivedere o modificare qui la tua scelta sul consenso:',
  },
  fr: {
    bannerLabel: 'Consentement aux cookies',
    bannerTitle: 'Vos choix de confidentialité',
    bannerDescription:
      'Nous utilisons des cookies analytiques facultatifs pour comprendre l’utilisation du site et améliorer nos calculateurs. Ils restent désactivés sans votre accord.',
    privacyPolicy: 'Politique de confidentialité',
    cookiePolicy: 'Politique relative aux cookies',
    rejectOptional: 'Refuser les facultatifs',
    managePreferences: 'Gérer les préférences',
    acceptAnalytics: 'Accepter l’analyse',
    dialogTitle: 'Gérer les préférences de cookies',
    dialogDescription:
      'Le stockage essentiel assure le fonctionnement du site. Vous pouvez autoriser ou refuser les cookies analytiques facultatifs.',
    essentialCookies: 'Stockage essentiel',
    essentialDescription: 'Nécessaire aux fonctions principales et à la mémorisation de votre choix.',
    analyticsCookies: 'Cookies analytiques',
    analyticsDescription:
      'Ils nous aident à comprendre les pages vues et les interactions via Google Analytics 4.',
    savePreferences: 'Enregistrer',
    preferencesSectionTitle: '6. Préférences relatives aux cookies / consentement',
    openManagerIntro: 'Vous pouvez consulter ou modifier votre choix ici :',
  },
  de: {
    bannerLabel: 'Cookie-Einwilligung',
    bannerTitle: 'Ihre Datenschutzeinstellungen',
    bannerDescription:
      'Wir verwenden optionale Analyse-Cookies, um die Nutzung der Website zu verstehen und unsere Rechner zu verbessern. Sie bleiben ohne Ihre Zustimmung deaktiviert.',
    privacyPolicy: 'Datenschutzerklärung',
    cookiePolicy: 'Cookie-Richtlinie',
    rejectOptional: 'Optionale ablehnen',
    managePreferences: 'Einstellungen verwalten',
    acceptAnalytics: 'Analyse akzeptieren',
    dialogTitle: 'Cookie-Einstellungen verwalten',
    dialogDescription:
      'Notwendiger Speicher hält die Website funktionsfähig. Optionale Analyse-Cookies können Sie selbst erlauben oder ablehnen.',
    essentialCookies: 'Notwendiger Speicher',
    essentialDescription: 'Erforderlich für Kernfunktionen und zum Speichern Ihrer Auswahl.',
    analyticsCookies: 'Analyse-Cookies',
    analyticsDescription:
      'Sie helfen uns, Seitenaufrufe und Interaktionen mit Google Analytics 4 zu verstehen.',
    savePreferences: 'Einstellungen speichern',
    preferencesSectionTitle: '6. Cookie- / Einwilligungseinstellungen',
    openManagerIntro: 'Hier können Sie Ihre Einwilligung prüfen oder ändern:',
  },
  es: {
    bannerLabel: 'Consentimiento de cookies',
    bannerTitle: 'Tus opciones de privacidad',
    bannerDescription:
      'Usamos cookies analíticas opcionales para entender cómo se utiliza el sitio y mejorar nuestras calculadoras. Permanecen desactivadas hasta que las aceptes.',
    privacyPolicy: 'Política de privacidad',
    cookiePolicy: 'Política de cookies',
    rejectOptional: 'Rechazar opcionales',
    managePreferences: 'Gestionar preferencias',
    acceptAnalytics: 'Aceptar analítica',
    dialogTitle: 'Gestionar preferencias de cookies',
    dialogDescription:
      'El almacenamiento esencial mantiene el sitio en funcionamiento. Puedes decidir si permites las cookies analíticas opcionales.',
    essentialCookies: 'Almacenamiento esencial',
    essentialDescription: 'Necesario para las funciones básicas y para guardar tu elección.',
    analyticsCookies: 'Cookies analíticas',
    analyticsDescription:
      'Nos ayudan a entender las páginas vistas y las interacciones mediante Google Analytics 4.',
    savePreferences: 'Guardar preferencias',
    preferencesSectionTitle: '6. Preferencias de cookies / consentimiento',
    openManagerIntro: 'Puedes revisar o cambiar aquí tu elección de consentimiento:',
  },
  ru: {
    bannerLabel: 'Согласие на файлы cookie',
    bannerTitle: 'Ваши настройки конфиденциальности',
    bannerDescription:
      'Мы используем необязательные аналитические файлы cookie, чтобы понимать, как используется сайт, и улучшать наши калькуляторы. Без вашего согласия они отключены.',
    privacyPolicy: 'Политика конфиденциальности',
    cookiePolicy: 'Политика использования cookie',
    rejectOptional: 'Отклонить необязательные',
    managePreferences: 'Настроить',
    acceptAnalytics: 'Разрешить аналитику',
    dialogTitle: 'Настройки файлов cookie',
    dialogDescription:
      'Необходимое хранилище обеспечивает работу сайта. Вы можете разрешить или запретить необязательные аналитические файлы cookie.',
    essentialCookies: 'Необходимое хранилище',
    essentialDescription: 'Нужно для основных функций и сохранения вашего выбора.',
    analyticsCookies: 'Аналитические файлы cookie',
    analyticsDescription:
      'Помогают нам анализировать просмотры страниц и взаимодействия с помощью Google Analytics 4.',
    savePreferences: 'Сохранить настройки',
    preferencesSectionTitle: '6. Настройки файлов cookie / согласия',
    openManagerIntro: 'Здесь можно проверить или изменить свой выбор:',
  },
};

export function getConsentCopy(locale: string): ConsentCopy {
  return COPY[locale as Locale] ?? COPY.en;
}
