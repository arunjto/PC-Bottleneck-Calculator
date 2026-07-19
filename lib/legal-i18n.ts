import { Locale } from '@/i18n-config';

export type LegalPageKey = 'terms' | 'cookie-policy' | 'disclaimer';

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalPageCopy = {
  title: string;
  description: string;
  lastUpdated: string;
  displayDate: string;
  intro?: string;
  sections: LegalSection[];
  consent?: {
    afterSection: number;
    prefix: string;
    link: string;
    suffix: string;
  };
  contactTitle: string;
  contactPrefix: string;
  contactLink: string;
  contactSuffix: string;
};

type LegalLocaleCopy = Record<LegalPageKey, LegalPageCopy>;

const LEGAL_COPY: Record<Locale, LegalLocaleCopy> = {
  en: {
    terms: {
      title: 'Terms & Conditions',
      description: 'Read the Terms and Conditions governing the use of PCBuildCheck, including limitations and user responsibilities.',
      lastUpdated: 'Last updated',
      displayDate: 'July 14, 2026',
      intro: 'Welcome to PCBuildCheck. By accessing and using pcbuildcheck.com, you agree to these Terms and Conditions. If you do not agree with any part of them, please do not use our services.',
      sections: [
        { title: '1. Use of Service', paragraphs: ['PCBuildCheck provides free online tools, including a PC Bottleneck Calculator, FPS Estimator, and PSU Calculator, for informational and educational purposes only. Results are estimates based on manufacturer specifications and internally normalized comparison scores; they are not measured benchmarks and may not reflect exact real-world performance.'] },
        { title: '2. Intellectual Property', paragraphs: ['All content, including text, graphics, logos, icons, and software, is the property of PCBuildCheck or its content suppliers and is protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works without prior written consent.'] },
        { title: '3. Accuracy of Information', paragraphs: ['Although we aim to provide accurate and current information, we make no warranty about the accuracy, completeness, or reliability of site content. Hardware specifications and performance data may change over time.'] },
        { title: '4. Limitation of Liability', paragraphs: ['PCBuildCheck is not liable for direct, indirect, incidental, consequential, or punitive damages arising from use of, or inability to use, the website or its tools. This includes purchasing decisions based on calculator results.'] },
        { title: '5. External Links', paragraphs: ['Our website may link to external websites that we do not operate. We do not control their content or practices and are not responsible for their privacy policies or other activities.'] },
        { title: '6. Changes to Terms', paragraphs: ['We may modify or replace these Terms at any time. Material changes will appear on this page with a revised date. Continued use of the site after a change means you accept the updated Terms.'] },
      ],
      contactTitle: '7. Contact',
      contactPrefix: 'If you have questions about these Terms, please ',
      contactLink: 'contact us',
      contactSuffix: '.',
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      description: 'Learn how PCBuildCheck uses cookies to operate the site, remember preferences, analyze traffic, and serve advertising with consent.',
      lastUpdated: 'Last updated',
      displayDate: 'July 14, 2026',
      intro: 'This Cookie Policy explains how PCBuildCheck (“we”, “us”, or “our”) uses cookies and similar technologies when you visit pcbuildcheck.com.',
      sections: [
        { title: '1. What Are Cookies?', paragraphs: ['Cookies are small text files stored on your device when you visit a website. They help websites work efficiently, remember preferences, and provide analytics information.'] },
        { title: '2. Cookies We Use', paragraphs: ['Essential cookies: These are required for the website to function and include session, theme, and language-preference cookies.', 'Analytics cookies: If enabled with the required consent, analytics services help us understand page views, session duration, and how visitors use the site.', 'Advertising cookies: If advertising is enabled after the required consent setup, Google AdSense may set cookies. Advertising is disabled by default in this project until that setup is explicitly enabled.'] },
        { title: '3. Third-Party Cookies', paragraphs: ['Optional third-party services may place cookies only when those services are enabled. Providers may include Google advertising or analytics services. Ordinary links to Facebook or Instagram do not by themselves set cookies on this site.'] },
        { title: '4. Managing Cookies', paragraphs: ['Most browsers let you delete existing cookies, block new cookies, or receive a notice when cookies are set. Disabling essential cookies may affect site functionality.'] },
        { title: '5. Changes to This Policy', paragraphs: ['We may update this Cookie Policy from time to time. Changes will appear on this page with a revised date.'] },
      ],
      consent: { afterSection: 3, prefix: 'You can also manage your consent preferences through our ', link: 'consent manager', suffix: '.' },
      contactTitle: '6. Contact',
      contactPrefix: 'For questions about our cookie practices, please ',
      contactLink: 'contact us',
      contactSuffix: '.',
    },
    disclaimer: {
      title: 'Disclaimer',
      description: 'Understand the limitations of the PCBuildCheck bottleneck, FPS, and PSU calculators and the information we provide.',
      lastUpdated: 'Last updated',
      displayDate: 'July 14, 2026',
      sections: [
        { title: 'General Information', paragraphs: ['Information on pcbuildcheck.com is provided for general informational and educational purposes. Calculator results—including bottleneck percentages, estimated FPS, and PSU recommendations—are approximations based on published specifications and normalized comparison scores, not aggregated laboratory benchmarks or guaranteed measurements.'] },
        { title: 'No Professional Advice', paragraphs: ['Nothing on this website constitutes professional hardware advice, a purchase recommendation, or technical consultation. Research components carefully and check official manufacturer specifications before purchasing.'] },
        { title: 'Accuracy of Data', paragraphs: ['We aim to keep hardware data current, but real-world performance varies with drivers, BIOS versions, cooling, software optimization, and other factors. We do not guarantee that every item is accurate, complete, or current.'] },
        { title: 'Affiliate & Ad Disclaimer', paragraphs: ['If advertising is enabled, PCBuildCheck may display Google AdSense ads. Blog posts may include clearly disclosed affiliate links. Advertising and affiliate relationships do not influence calculator formulas or editorial conclusions.'] },
        { title: 'External Links', paragraphs: ['Our site may link to third-party websites for convenience. A link does not imply endorsement, and we are not responsible for external content, accuracy, or practices.'] },
      ],
      contactTitle: 'Contact',
      contactPrefix: 'If you have questions about this disclaimer, please ',
      contactLink: 'contact us',
      contactSuffix: '.',
    },
  },
  it: {
    terms: {
      title: 'Termini e condizioni',
      description: 'Leggi i Termini e condizioni che regolano l’uso di PCBuildCheck, comprese limitazioni e responsabilità degli utenti.',
      lastUpdated: 'Ultimo aggiornamento',
      displayDate: '14 luglio 2026',
      intro: 'Benvenuto su PCBuildCheck. Accedendo e utilizzando pcbuildcheck.com, accetti i presenti Termini e condizioni. Se non li accetti integralmente, ti invitiamo a non utilizzare i nostri servizi.',
      sections: [
        { title: '1. Uso del servizio', paragraphs: ['PCBuildCheck offre strumenti online gratuiti, tra cui il calcolatore dei colli di bottiglia, lo stimatore FPS e il calcolatore PSU, esclusivamente a scopo informativo ed educativo. I risultati sono stime basate sulle specifiche dei produttori e su punteggi comparativi normalizzati internamente; non sono benchmark misurati e possono differire dalle prestazioni reali.'] },
        { title: '2. Proprietà intellettuale', paragraphs: ['Tutti i contenuti, inclusi testi, grafica, loghi, icone e software, appartengono a PCBuildCheck o ai rispettivi fornitori e sono protetti dalle leggi applicabili sul diritto d’autore. Non puoi riprodurli, distribuirli o crearne opere derivate senza previa autorizzazione scritta.'] },
        { title: '3. Accuratezza delle informazioni', paragraphs: ['Cerchiamo di fornire informazioni accurate e aggiornate, ma non garantiamo l’accuratezza, la completezza o l’affidabilità dei contenuti. Le specifiche hardware e i dati sulle prestazioni possono cambiare nel tempo.'] },
        { title: '4. Limitazione di responsabilità', paragraphs: ['PCBuildCheck non è responsabile per danni diretti, indiretti, incidentali, consequenziali o punitivi derivanti dall’uso o dall’impossibilità di usare il sito e i suoi strumenti, comprese le decisioni di acquisto basate sui risultati dei calcolatori.'] },
        { title: '5. Link esterni', paragraphs: ['Il sito può contenere link a siti esterni che non gestiamo. Non controlliamo i loro contenuti o pratiche e non siamo responsabili delle rispettive informative sulla privacy o attività.'] },
        { title: '6. Modifiche ai termini', paragraphs: ['Possiamo modificare o sostituire questi Termini in qualsiasi momento. Le modifiche sostanziali saranno pubblicate in questa pagina con una nuova data. Continuando a usare il sito, accetti i Termini aggiornati.'] },
      ],
      contactTitle: '7. Contatti',
      contactPrefix: 'Per domande sui presenti Termini, ',
      contactLink: 'contattaci',
      contactSuffix: '.',
    },
    'cookie-policy': {
      title: 'Politica sui cookie',
      description: 'Scopri come PCBuildCheck usa i cookie per far funzionare il sito, ricordare le preferenze, analizzare il traffico e mostrare pubblicità con consenso.',
      lastUpdated: 'Ultimo aggiornamento',
      displayDate: '14 luglio 2026',
      intro: 'Questa Politica sui cookie spiega come PCBuildCheck (“noi” o “nostro”) utilizza cookie e tecnologie simili quando visiti pcbuildcheck.com.',
      sections: [
        { title: '1. Cosa sono i cookie?', paragraphs: ['I cookie sono piccoli file di testo memorizzati sul dispositivo quando visiti un sito. Aiutano il sito a funzionare, ricordano le preferenze e forniscono informazioni statistiche.'] },
        { title: '2. Cookie che utilizziamo', paragraphs: ['Cookie essenziali: sono necessari al funzionamento del sito e includono cookie di sessione e preferenze relative a tema e lingua.', 'Cookie analitici: se attivati con il consenso richiesto, ci aiutano a capire visualizzazioni, durata delle sessioni e utilizzo del sito.', 'Cookie pubblicitari: se la pubblicità viene attivata dopo la configurazione del consenso richiesta, Google AdSense può impostare cookie. In questo progetto la pubblicità è disattivata per impostazione predefinita finché tale configurazione non viene abilitata esplicitamente.'] },
        { title: '3. Cookie di terze parti', paragraphs: ['I servizi opzionali di terze parti possono impostare cookie solo quando sono attivi. Tra i fornitori possono esserci i servizi pubblicitari o analitici di Google. I normali link a Facebook o Instagram non impostano da soli cookie su questo sito.'] },
        { title: '4. Gestione dei cookie', paragraphs: ['La maggior parte dei browser consente di eliminare i cookie, bloccarne di nuovi o ricevere un avviso. Disattivare i cookie essenziali può compromettere alcune funzioni del sito.'] },
        { title: '5. Modifiche a questa politica', paragraphs: ['Potremmo aggiornare questa Politica sui cookie. Le modifiche saranno pubblicate in questa pagina con una nuova data.'] },
      ],
      consent: { afterSection: 3, prefix: 'Puoi inoltre gestire le preferenze di consenso tramite il nostro ', link: 'gestore del consenso', suffix: '.' },
      contactTitle: '6. Contatti',
      contactPrefix: 'Per domande sull’uso dei cookie, ',
      contactLink: 'contattaci',
      contactSuffix: '.',
    },
    disclaimer: {
      title: 'Avvertenza legale',
      description: 'Comprendi i limiti dei calcolatori PCBuildCheck per colli di bottiglia, FPS e PSU e delle informazioni fornite.',
      lastUpdated: 'Ultimo aggiornamento',
      displayDate: '14 luglio 2026',
      sections: [
        { title: 'Informazioni generali', paragraphs: ['Le informazioni su pcbuildcheck.com sono fornite esclusivamente a scopo informativo ed educativo. I risultati dei calcolatori, comprese percentuali di collo di bottiglia, stime FPS e raccomandazioni PSU, sono approssimazioni basate su specifiche pubblicate e punteggi comparativi normalizzati, non benchmark di laboratorio aggregati o misurazioni garantite.'] },
        { title: 'Nessuna consulenza professionale', paragraphs: ['Nulla sul sito costituisce consulenza hardware professionale, raccomandazione di acquisto o consulenza tecnica. Verifica attentamente i componenti e le specifiche ufficiali dei produttori prima di acquistare.'] },
        { title: 'Accuratezza dei dati', paragraphs: ['Cerchiamo di mantenere aggiornati i dati hardware, ma le prestazioni reali variano in base a driver, BIOS, raffreddamento, ottimizzazione software e altri fattori. Non garantiamo che ogni dato sia accurato, completo o aggiornato.'] },
        { title: 'Pubblicità e link affiliati', paragraphs: ['Se la pubblicità viene attivata, PCBuildCheck può mostrare annunci Google AdSense. Gli articoli possono includere link affiliati chiaramente segnalati. Pubblicità e affiliazioni non influenzano le formule dei calcolatori o le conclusioni editoriali.'] },
        { title: 'Link esterni', paragraphs: ['Il sito può includere link di terze parti per comodità. Un link non implica approvazione e non siamo responsabili di contenuti, accuratezza o pratiche esterne.'] },
      ],
      contactTitle: 'Contatti',
      contactPrefix: 'Per domande su questa avvertenza, ',
      contactLink: 'contattaci',
      contactSuffix: '.',
    },
  },
  fr: {
    terms: {
      title: 'Conditions générales',
      description: 'Consultez les Conditions générales qui encadrent l’utilisation de PCBuildCheck, notamment les limites et responsabilités des utilisateurs.',
      lastUpdated: 'Dernière mise à jour',
      displayDate: '14 juillet 2026',
      intro: 'Bienvenue sur PCBuildCheck. En accédant à pcbuildcheck.com et en l’utilisant, vous acceptez les présentes Conditions générales. Si vous n’en acceptez pas une partie, veuillez ne pas utiliser nos services.',
      sections: [
        { title: '1. Utilisation du service', paragraphs: ['PCBuildCheck propose gratuitement des outils en ligne, dont un calculateur de goulot d’étranglement, un estimateur de FPS et un calculateur d’alimentation, uniquement à des fins informatives et éducatives. Les résultats sont des estimations fondées sur les spécifications des fabricants et des scores comparatifs normalisés en interne ; ils ne constituent pas des benchmarks mesurés et peuvent différer des performances réelles.'] },
        { title: '2. Propriété intellectuelle', paragraphs: ['Tous les contenus, notamment les textes, graphismes, logos, icônes et logiciels, appartiennent à PCBuildCheck ou à ses fournisseurs et sont protégés par les lois applicables. Toute reproduction, distribution ou création dérivée nécessite une autorisation écrite préalable.'] },
        { title: '3. Exactitude des informations', paragraphs: ['Nous cherchons à fournir des informations exactes et actuelles, sans toutefois garantir leur exactitude, leur exhaustivité ou leur fiabilité. Les caractéristiques matérielles et les données de performance peuvent évoluer.'] },
        { title: '4. Limitation de responsabilité', paragraphs: ['PCBuildCheck ne saurait être tenu responsable de dommages directs, indirects, accessoires, consécutifs ou punitifs liés à l’utilisation ou à l’impossibilité d’utiliser le site et ses outils, y compris les décisions d’achat fondées sur les résultats.'] },
        { title: '5. Liens externes', paragraphs: ['Le site peut contenir des liens vers des services externes que nous n’exploitons pas. Nous ne contrôlons pas leur contenu ni leurs pratiques et ne sommes pas responsables de leurs politiques de confidentialité ou activités.'] },
        { title: '6. Modification des conditions', paragraphs: ['Nous pouvons modifier ou remplacer ces Conditions à tout moment. Les changements importants seront publiés sur cette page avec une nouvelle date. La poursuite de l’utilisation du site vaut acceptation des Conditions mises à jour.'] },
      ],
      contactTitle: '7. Contact',
      contactPrefix: 'Pour toute question concernant ces Conditions, ',
      contactLink: 'contactez-nous',
      contactSuffix: '.',
    },
    'cookie-policy': {
      title: 'Politique relative aux cookies',
      description: 'Découvrez comment PCBuildCheck utilise les cookies pour faire fonctionner le site, mémoriser les préférences, analyser le trafic et afficher des annonces avec consentement.',
      lastUpdated: 'Dernière mise à jour',
      displayDate: '14 juillet 2026',
      intro: 'Cette Politique explique comment PCBuildCheck (« nous » ou « notre ») utilise des cookies et technologies similaires lorsque vous consultez pcbuildcheck.com.',
      sections: [
        { title: '1. Que sont les cookies ?', paragraphs: ['Les cookies sont de petits fichiers texte enregistrés sur votre appareil lors de la visite d’un site. Ils facilitent son fonctionnement, mémorisent vos préférences et fournissent des données statistiques.'] },
        { title: '2. Cookies que nous utilisons', paragraphs: ['Cookies essentiels : nécessaires au fonctionnement du site, ils comprennent les cookies de session et de préférences de thème et de langue.', 'Cookies analytiques : s’ils sont activés avec le consentement requis, ils nous aident à comprendre les pages vues, la durée des sessions et l’utilisation du site.', 'Cookies publicitaires : si la publicité est activée après la configuration requise du consentement, Google AdSense peut déposer des cookies. Dans ce projet, la publicité est désactivée par défaut jusqu’à son activation explicite.'] },
        { title: '3. Cookies tiers', paragraphs: ['Les services tiers facultatifs ne peuvent déposer des cookies que lorsqu’ils sont activés. Il peut s’agir de services publicitaires ou analytiques de Google. De simples liens vers Facebook ou Instagram ne déposent pas à eux seuls de cookies sur ce site.'] },
        { title: '4. Gestion des cookies', paragraphs: ['La plupart des navigateurs permettent de supprimer ou bloquer les cookies et d’être averti de leur dépôt. La désactivation des cookies essentiels peut nuire au fonctionnement du site.'] },
        { title: '5. Modifications de cette politique', paragraphs: ['Nous pouvons mettre à jour cette Politique. Toute modification sera publiée sur cette page avec une nouvelle date.'] },
      ],
      consent: { afterSection: 3, prefix: 'Vous pouvez également gérer vos préférences via notre ', link: 'gestionnaire de consentement', suffix: '.' },
      contactTitle: '6. Contact',
      contactPrefix: 'Pour toute question sur nos cookies, ',
      contactLink: 'contactez-nous',
      contactSuffix: '.',
    },
    disclaimer: {
      title: 'Avertissement',
      description: 'Comprenez les limites des calculateurs PCBuildCheck de goulot d’étranglement, de FPS et d’alimentation, ainsi que des informations fournies.',
      lastUpdated: 'Dernière mise à jour',
      displayDate: '14 juillet 2026',
      sections: [
        { title: 'Informations générales', paragraphs: ['Les informations de pcbuildcheck.com sont fournies uniquement à des fins générales, informatives et éducatives. Les résultats, notamment les pourcentages de goulot d’étranglement, estimations de FPS et recommandations d’alimentation, sont des approximations fondées sur des spécifications publiées et des scores normalisés, et non des benchmarks de laboratoire agrégés ou des mesures garanties.'] },
        { title: 'Aucun conseil professionnel', paragraphs: ['Aucun contenu ne constitue un conseil matériel professionnel, une recommandation d’achat ou une consultation technique. Étudiez soigneusement les composants et vérifiez les spécifications officielles avant tout achat.'] },
        { title: 'Exactitude des données', paragraphs: ['Nous cherchons à tenir les données matérielles à jour, mais les performances réelles varient selon les pilotes, le BIOS, le refroidissement, l’optimisation logicielle et d’autres facteurs. Nous ne garantissons pas l’exactitude, l’exhaustivité ou l’actualité de chaque donnée.'] },
        { title: 'Publicité et affiliation', paragraphs: ['Si la publicité est activée, PCBuildCheck peut afficher des annonces Google AdSense. Les articles peuvent contenir des liens affiliés clairement signalés. Ces relations n’influencent ni les formules des calculateurs ni les conclusions éditoriales.'] },
        { title: 'Liens externes', paragraphs: ['Le site peut proposer des liens tiers pour votre commodité. Ils ne constituent pas une approbation et nous ne sommes pas responsables du contenu, de l’exactitude ou des pratiques de ces sites.'] },
      ],
      contactTitle: 'Contact',
      contactPrefix: 'Pour toute question concernant cet avertissement, ',
      contactLink: 'contactez-nous',
      contactSuffix: '.',
    },
  },
  de: {
    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      description: 'Lesen Sie die Bedingungen für die Nutzung von PCBuildCheck einschließlich Beschränkungen und Nutzerpflichten.',
      lastUpdated: 'Zuletzt aktualisiert',
      displayDate: '14. Juli 2026',
      intro: 'Willkommen bei PCBuildCheck. Durch den Zugriff auf pcbuildcheck.com und dessen Nutzung stimmen Sie diesen Bedingungen zu. Wenn Sie ihnen nicht vollständig zustimmen, nutzen Sie unsere Dienste bitte nicht.',
      sections: [
        { title: '1. Nutzung des Dienstes', paragraphs: ['PCBuildCheck bietet kostenlose Online-Tools wie PC-Engpass-Rechner, FPS-Schätzer und Netzteil-Rechner ausschließlich zu Informations- und Bildungszwecken. Ergebnisse sind Schätzungen auf Grundlage von Herstellerangaben und intern normalisierten Vergleichswerten; sie sind keine gemessenen Benchmarks und können von der tatsächlichen Leistung abweichen.'] },
        { title: '2. Geistiges Eigentum', paragraphs: ['Sämtliche Inhalte, darunter Texte, Grafiken, Logos, Symbole und Software, gehören PCBuildCheck oder seinen Anbietern und sind urheberrechtlich geschützt. Ohne vorherige schriftliche Zustimmung dürfen sie nicht vervielfältigt, verbreitet oder abgeleitet werden.'] },
        { title: '3. Richtigkeit der Informationen', paragraphs: ['Wir bemühen uns um richtige und aktuelle Informationen, übernehmen jedoch keine Gewähr für Richtigkeit, Vollständigkeit oder Zuverlässigkeit. Hardwaredaten und Leistungsangaben können sich ändern.'] },
        { title: '4. Haftungsbeschränkung', paragraphs: ['PCBuildCheck haftet nicht für direkte, indirekte, beiläufige, Folge- oder Strafschäden aus der Nutzung oder Nichtverfügbarkeit der Website und ihrer Tools. Dies schließt Kaufentscheidungen auf Grundlage der Rechnerergebnisse ein.'] },
        { title: '5. Externe Links', paragraphs: ['Unsere Website kann auf externe Angebote verweisen, die wir nicht betreiben. Wir kontrollieren deren Inhalte oder Praktiken nicht und sind nicht für Datenschutzrichtlinien oder sonstige Aktivitäten verantwortlich.'] },
        { title: '6. Änderungen der Bedingungen', paragraphs: ['Wir können diese Bedingungen jederzeit ändern oder ersetzen. Wesentliche Änderungen werden mit einem neuen Datum auf dieser Seite veröffentlicht. Durch die weitere Nutzung stimmen Sie den aktualisierten Bedingungen zu.'] },
      ],
      contactTitle: '7. Kontakt',
      contactPrefix: 'Bei Fragen zu diesen Bedingungen ',
      contactLink: 'kontaktieren Sie uns',
      contactSuffix: ' bitte.',
    },
    'cookie-policy': {
      title: 'Cookie-Richtlinie',
      description: 'Erfahren Sie, wie PCBuildCheck Cookies für den Betrieb, Einstellungen, Analysen und Werbung mit Einwilligung verwendet.',
      lastUpdated: 'Zuletzt aktualisiert',
      displayDate: '14. Juli 2026',
      intro: 'Diese Cookie-Richtlinie erklärt, wie PCBuildCheck („wir“ oder „uns“) Cookies und ähnliche Technologien bei Ihrem Besuch auf pcbuildcheck.com verwendet.',
      sections: [
        { title: '1. Was sind Cookies?', paragraphs: ['Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. Sie unterstützen den Betrieb, merken sich Einstellungen und liefern statistische Informationen.'] },
        { title: '2. Von uns verwendete Cookies', paragraphs: ['Erforderliche Cookies: Sie sind für den Betrieb notwendig und umfassen Sitzungs-, Design- und Spracheinstellungen.', 'Analyse-Cookies: Wenn sie mit der erforderlichen Einwilligung aktiviert werden, helfen sie uns, Seitenaufrufe, Sitzungsdauer und Nutzung zu verstehen.', 'Werbe-Cookies: Wird Werbung nach der erforderlichen Einwilligungskonfiguration aktiviert, kann Google AdSense Cookies setzen. In diesem Projekt ist Werbung standardmäßig deaktiviert, bis sie ausdrücklich aktiviert wird.'] },
        { title: '3. Cookies von Drittanbietern', paragraphs: ['Optionale Dienste dürfen nur Cookies setzen, wenn sie aktiviert sind. Dazu können Werbe- oder Analysedienste von Google gehören. Normale Links zu Facebook oder Instagram setzen auf dieser Website nicht von selbst Cookies.'] },
        { title: '4. Cookies verwalten', paragraphs: ['In den meisten Browsern können Sie Cookies löschen, blockieren oder sich über das Setzen informieren lassen. Das Deaktivieren erforderlicher Cookies kann Funktionen beeinträchtigen.'] },
        { title: '5. Änderungen dieser Richtlinie', paragraphs: ['Wir können diese Cookie-Richtlinie aktualisieren. Änderungen werden mit einem neuen Datum auf dieser Seite veröffentlicht.'] },
      ],
      consent: { afterSection: 3, prefix: 'Sie können Ihre Einwilligung außerdem über unseren ', link: 'Einwilligungsmanager', suffix: ' verwalten.' },
      contactTitle: '6. Kontakt',
      contactPrefix: 'Bei Fragen zu unseren Cookie-Praktiken ',
      contactLink: 'kontaktieren Sie uns',
      contactSuffix: ' bitte.',
    },
    disclaimer: {
      title: 'Haftungsausschluss',
      description: 'Informieren Sie sich über die Grenzen der PCBuildCheck-Rechner für Engpässe, FPS und Netzteile sowie der bereitgestellten Informationen.',
      lastUpdated: 'Zuletzt aktualisiert',
      displayDate: '14. Juli 2026',
      sections: [
        { title: 'Allgemeine Informationen', paragraphs: ['Die Informationen auf pcbuildcheck.com dienen nur allgemeinen Informations- und Bildungszwecken. Rechnerergebnisse wie Engpass-Prozentsätze, geschätzte FPS und Netzteil-Empfehlungen sind Näherungswerte auf Basis veröffentlichter Spezifikationen und normalisierter Vergleichswerte, keine zusammengefassten Labortests oder garantierten Messwerte.'] },
        { title: 'Keine professionelle Beratung', paragraphs: ['Die Inhalte stellen keine professionelle Hardwareberatung, Kaufempfehlung oder technische Beratung dar. Informieren Sie sich gründlich und prüfen Sie vor dem Kauf die offiziellen Herstellerangaben.'] },
        { title: 'Richtigkeit der Daten', paragraphs: ['Wir bemühen uns um aktuelle Hardwaredaten, doch die reale Leistung hängt unter anderem von Treibern, BIOS, Kühlung und Softwareoptimierung ab. Wir garantieren nicht, dass alle Angaben richtig, vollständig oder aktuell sind.'] },
        { title: 'Werbung und Affiliate-Links', paragraphs: ['Wenn Werbung aktiviert ist, kann PCBuildCheck Google-AdSense-Anzeigen einblenden. Blogbeiträge können deutlich gekennzeichnete Affiliate-Links enthalten. Solche Beziehungen beeinflussen weder Rechnerformeln noch redaktionelle Schlussfolgerungen.'] },
        { title: 'Externe Links', paragraphs: ['Die Website kann aus praktischen Gründen auf Drittanbieter verlinken. Ein Link bedeutet keine Empfehlung; für externe Inhalte, Richtigkeit oder Praktiken sind wir nicht verantwortlich.'] },
      ],
      contactTitle: 'Kontakt',
      contactPrefix: 'Bei Fragen zu diesem Haftungsausschluss ',
      contactLink: 'kontaktieren Sie uns',
      contactSuffix: ' bitte.',
    },
  },
  es: {
    terms: {
      title: 'Términos y condiciones',
      description: 'Lee los Términos y condiciones que regulan el uso de PCBuildCheck, incluidas las limitaciones y responsabilidades del usuario.',
      lastUpdated: 'Última actualización',
      displayDate: '14 de julio de 2026',
      intro: 'Bienvenido a PCBuildCheck. Al acceder y utilizar pcbuildcheck.com, aceptas estos Términos y condiciones. Si no estás de acuerdo con alguna parte, no utilices nuestros servicios.',
      sections: [
        { title: '1. Uso del servicio', paragraphs: ['PCBuildCheck ofrece herramientas gratuitas, como la calculadora de cuello de botella, el estimador de FPS y la calculadora de PSU, solo con fines informativos y educativos. Los resultados son estimaciones basadas en especificaciones de fabricantes y puntuaciones comparativas normalizadas internamente; no son benchmarks medidos y pueden diferir del rendimiento real.'] },
        { title: '2. Propiedad intelectual', paragraphs: ['Todo el contenido, incluidos textos, gráficos, logotipos, iconos y software, pertenece a PCBuildCheck o a sus proveedores y está protegido por la legislación aplicable. No puedes reproducirlo, distribuirlo ni crear obras derivadas sin autorización previa por escrito.'] },
        { title: '3. Exactitud de la información', paragraphs: ['Intentamos ofrecer información exacta y actual, pero no garantizamos su precisión, integridad o fiabilidad. Las especificaciones de hardware y los datos de rendimiento pueden cambiar.'] },
        { title: '4. Limitación de responsabilidad', paragraphs: ['PCBuildCheck no será responsable de daños directos, indirectos, incidentales, consecuentes o punitivos derivados del uso o de la imposibilidad de usar el sitio y sus herramientas, incluidas las compras basadas en los resultados.'] },
        { title: '5. Enlaces externos', paragraphs: ['El sitio puede enlazar a servicios externos que no operamos. No controlamos su contenido o prácticas y no somos responsables de sus políticas de privacidad ni de otras actividades.'] },
        { title: '6. Cambios en los términos', paragraphs: ['Podemos modificar o sustituir estos Términos en cualquier momento. Los cambios importantes se publicarán aquí con una fecha nueva. El uso continuado del sitio implica aceptar los Términos actualizados.'] },
      ],
      contactTitle: '7. Contacto',
      contactPrefix: 'Si tienes preguntas sobre estos Términos, ',
      contactLink: 'contáctanos',
      contactSuffix: '.',
    },
    'cookie-policy': {
      title: 'Política de cookies',
      description: 'Descubre cómo PCBuildCheck usa cookies para operar el sitio, recordar preferencias, analizar el tráfico y mostrar publicidad con consentimiento.',
      lastUpdated: 'Última actualización',
      displayDate: '14 de julio de 2026',
      intro: 'Esta Política explica cómo PCBuildCheck (“nosotros” o “nuestro”) utiliza cookies y tecnologías similares cuando visitas pcbuildcheck.com.',
      sections: [
        { title: '1. ¿Qué son las cookies?', paragraphs: ['Las cookies son pequeños archivos de texto almacenados en tu dispositivo al visitar un sitio. Ayudan a que funcione, recuerdan preferencias y proporcionan información estadística.'] },
        { title: '2. Cookies que utilizamos', paragraphs: ['Cookies esenciales: son necesarias para el funcionamiento e incluyen cookies de sesión y preferencias de tema e idioma.', 'Cookies analíticas: si se activan con el consentimiento necesario, nos ayudan a conocer las páginas vistas, la duración de las sesiones y el uso del sitio.', 'Cookies publicitarias: si se activa la publicidad después de configurar el consentimiento requerido, Google AdSense puede instalar cookies. En este proyecto, la publicidad está desactivada de forma predeterminada hasta que se habilite expresamente.'] },
        { title: '3. Cookies de terceros', paragraphs: ['Los servicios opcionales de terceros solo pueden instalar cookies cuando están activados. Pueden incluir servicios de publicidad o análisis de Google. Los enlaces normales a Facebook o Instagram no instalan por sí mismos cookies en este sitio.'] },
        { title: '4. Gestión de cookies', paragraphs: ['La mayoría de los navegadores permiten borrar o bloquear cookies y recibir avisos. Desactivar las cookies esenciales puede afectar al funcionamiento del sitio.'] },
        { title: '5. Cambios en esta política', paragraphs: ['Podemos actualizar esta Política de cookies. Los cambios aparecerán en esta página con una fecha nueva.'] },
      ],
      consent: { afterSection: 3, prefix: 'También puedes gestionar tus preferencias mediante nuestro ', link: 'gestor de consentimiento', suffix: '.' },
      contactTitle: '6. Contacto',
      contactPrefix: 'Si tienes preguntas sobre nuestras cookies, ',
      contactLink: 'contáctanos',
      contactSuffix: '.',
    },
    disclaimer: {
      title: 'Aviso legal',
      description: 'Conoce las limitaciones de las calculadoras PCBuildCheck de cuello de botella, FPS y PSU y de la información proporcionada.',
      lastUpdated: 'Última actualización',
      displayDate: '14 de julio de 2026',
      sections: [
        { title: 'Información general', paragraphs: ['La información de pcbuildcheck.com se ofrece únicamente con fines generales, informativos y educativos. Los resultados, incluidos porcentajes de cuello de botella, FPS estimados y recomendaciones de PSU, son aproximaciones basadas en especificaciones publicadas y puntuaciones comparativas normalizadas, no benchmarks de laboratorio agregados ni mediciones garantizadas.'] },
        { title: 'Sin asesoramiento profesional', paragraphs: ['Nada de este sitio constituye asesoramiento profesional de hardware, recomendación de compra o consultoría técnica. Investiga los componentes y revisa las especificaciones oficiales antes de comprar.'] },
        { title: 'Exactitud de los datos', paragraphs: ['Intentamos mantener actualizados los datos, pero el rendimiento real varía según los controladores, BIOS, refrigeración, optimización de software y otros factores. No garantizamos que todos los datos sean exactos, completos o actuales.'] },
        { title: 'Publicidad y afiliación', paragraphs: ['Si se activa la publicidad, PCBuildCheck puede mostrar anuncios de Google AdSense. Los artículos pueden incluir enlaces de afiliado claramente identificados. Estas relaciones no influyen en las fórmulas de las calculadoras ni en las conclusiones editoriales.'] },
        { title: 'Enlaces externos', paragraphs: ['El sitio puede incluir enlaces de terceros por comodidad. Un enlace no implica aprobación y no somos responsables de su contenido, exactitud o prácticas.'] },
      ],
      contactTitle: 'Contacto',
      contactPrefix: 'Si tienes preguntas sobre este aviso, ',
      contactLink: 'contáctanos',
      contactSuffix: '.',
    },
  },
};

export function getLegalCopy(locale: Locale, page: LegalPageKey): LegalPageCopy {
  return LEGAL_COPY[locale]?.[page] ?? LEGAL_COPY.en[page];
}
