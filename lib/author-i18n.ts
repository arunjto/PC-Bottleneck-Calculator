import { Locale } from '@/i18n-config';

export type AuthorCopy = {
  metaTitle: string;
  metaDescription: string;
  profileDescription: string;
  imageAlt: string;
  role: string;
  location: string;
  experience: string;
  about: string;
  bio: string[];
  expertise: string;
  expertiseItems: string[];
  recentArticles: string;
  connect: string;
  contact: string;
};

const AUTHOR_COPY: Record<Locale, AuthorCopy> = {
  en: {
    metaTitle: 'Arun Kumar Yadav — Founder & Editor',
    metaDescription: 'Arun Kumar Yadav is the founder and editor of PCBuildCheck, a web developer and technical writer creating practical PC planning tools and guides.',
    profileDescription: 'Founder, editor, technical writer, and tool creator at PCBuildCheck. BTech graduate and web developer from Lucknow with 10 years of experience.',
    imageAlt: 'Arun Kumar Yadav, founder of PCBuildCheck',
    role: 'Founder, Editor, Technical Writer & Tool Creator',
    location: 'Lucknow, India',
    experience: '10 years of experience',
    about: 'About',
    bio: [
      'Arun Kumar Yadav is a web developer, blogger, and the founder of PCBuildCheck, a website created to explain PC performance, gaming FPS, bottlenecks, and power-supply needs in a simple and practical way.',
      'With 10 years of experience in web development and blogging, Arun creates tools that are fast, easy to use, and useful in real decisions. His work makes technical PC topics easier for beginners, gamers, students, and PC builders.',
      'At PCBuildCheck, Arun creates and edits content about PC bottleneck analysis, FPS estimation, PSU requirements, and hardware compatibility. Every tool and article is designed to provide clear answers without unnecessary complexity.',
      'Arun is based in Lucknow and holds a BTech degree. His technology and web-development background helps him build practical tools for people planning to build, upgrade, or evaluate a PC.',
    ],
    expertise: 'Expertise',
    expertiseItems: ['PC bottleneck calculators', 'FPS calculator tools', 'PSU calculator tools', 'Web development', 'Technical content writing', 'User-first online tools', 'PC performance and compatibility guides', 'Beginner-friendly technical explanations'],
    recentArticles: 'Recent articles by Arun',
    connect: 'Connect',
    contact: 'Contact',
  },
  it: {
    metaTitle: 'Arun Kumar Yadav — Fondatore e redattore',
    metaDescription: 'Arun Kumar Yadav è il fondatore e redattore di PCBuildCheck, sviluppatore web e autore tecnico di strumenti e guide pratiche per pianificare un PC.',
    profileDescription: 'Fondatore, redattore, autore tecnico e creatore degli strumenti di PCBuildCheck. Laureato BTech e sviluppatore web di Lucknow con 10 anni di esperienza.',
    imageAlt: 'Arun Kumar Yadav, fondatore di PCBuildCheck',
    role: 'Fondatore, redattore, autore tecnico e creatore di strumenti',
    location: 'Lucknow, India',
    experience: '10 anni di esperienza',
    about: 'Profilo',
    bio: [
      'Arun Kumar Yadav è uno sviluppatore web, blogger e fondatore di PCBuildCheck, un sito nato per spiegare in modo semplice e pratico le prestazioni dei PC, gli FPS nei giochi, i colli di bottiglia e le esigenze dell’alimentatore.',
      'Con 10 anni di esperienza nello sviluppo web e nel blogging, Arun crea strumenti veloci, facili da usare e utili nelle decisioni reali. Il suo lavoro rende gli argomenti tecnici più accessibili a principianti, gamer, studenti e assemblatori di PC.',
      'Su PCBuildCheck, Arun crea e revisiona contenuti su analisi dei colli di bottiglia, stime FPS, requisiti PSU e compatibilità hardware. Ogni strumento e articolo è progettato per offrire risposte chiare senza complessità inutili.',
      'Arun vive a Lucknow e possiede una laurea BTech. La sua esperienza tecnologica e nello sviluppo web lo aiuta a creare strumenti pratici per chi vuole assemblare, aggiornare o valutare un PC.',
    ],
    expertise: 'Competenze',
    expertiseItems: ['Calcolatori dei colli di bottiglia', 'Strumenti per il calcolo degli FPS', 'Calcolatori PSU', 'Sviluppo web', 'Scrittura di contenuti tecnici', 'Strumenti online incentrati sugli utenti', 'Guide a prestazioni e compatibilità PC', 'Spiegazioni tecniche per principianti'],
    recentArticles: 'Articoli recenti di Arun',
    connect: 'Seguimi',
    contact: 'Contatti',
  },
  fr: {
    metaTitle: 'Arun Kumar Yadav — Fondateur et rédacteur',
    metaDescription: 'Arun Kumar Yadav est le fondateur et rédacteur de PCBuildCheck, développeur web et auteur technique de guides et outils pratiques pour configurer un PC.',
    profileDescription: 'Fondateur, rédacteur, auteur technique et créateur des outils PCBuildCheck. Diplômé BTech et développeur web à Lucknow avec 10 ans d’expérience.',
    imageAlt: 'Arun Kumar Yadav, fondateur de PCBuildCheck',
    role: 'Fondateur, rédacteur, auteur technique et créateur d’outils',
    location: 'Lucknow, Inde',
    experience: '10 ans d’expérience',
    about: 'À propos',
    bio: [
      'Arun Kumar Yadav est développeur web, blogueur et fondateur de PCBuildCheck, un site conçu pour expliquer simplement et concrètement les performances des PC, les FPS en jeu, les goulots d’étranglement et les besoins d’alimentation.',
      'Fort de 10 ans d’expérience en développement web et en rédaction, Arun crée des outils rapides, simples et utiles aux décisions réelles. Son travail rend les sujets techniques plus accessibles aux débutants, joueurs, étudiants et monteurs de PC.',
      'Sur PCBuildCheck, Arun crée et révise les contenus consacrés à l’analyse des goulots d’étranglement, à l’estimation des FPS, aux besoins d’alimentation et à la compatibilité matérielle. Chaque outil et article vise à fournir des réponses claires sans complexité superflue.',
      'Arun vit à Lucknow et possède un diplôme BTech. Son parcours technologique et son expérience du web l’aident à créer des outils pratiques pour les personnes qui souhaitent monter, mettre à niveau ou évaluer un PC.',
    ],
    expertise: 'Expertise',
    expertiseItems: ['Calculateurs de goulot d’étranglement', 'Outils de calcul des FPS', 'Calculateurs d’alimentation', 'Développement web', 'Rédaction technique', 'Outils en ligne centrés sur les utilisateurs', 'Guides de performances et de compatibilité PC', 'Explications techniques pour débutants'],
    recentArticles: 'Articles récents d’Arun',
    connect: 'Réseaux',
    contact: 'Contact',
  },
  de: {
    metaTitle: 'Arun Kumar Yadav — Gründer und Redakteur',
    metaDescription: 'Arun Kumar Yadav ist Gründer und Redakteur von PCBuildCheck sowie Webentwickler und technischer Autor praktischer PC-Planungstools und Ratgeber.',
    profileDescription: 'Gründer, Redakteur, technischer Autor und Tool-Entwickler bei PCBuildCheck. BTech-Absolvent und Webentwickler aus Lucknow mit 10 Jahren Erfahrung.',
    imageAlt: 'Arun Kumar Yadav, Gründer von PCBuildCheck',
    role: 'Gründer, Redakteur, technischer Autor und Tool-Entwickler',
    location: 'Lucknow, Indien',
    experience: '10 Jahre Erfahrung',
    about: 'Über Arun',
    bio: [
      'Arun Kumar Yadav ist Webentwickler, Blogger und Gründer von PCBuildCheck. Die Website erklärt PC-Leistung, Gaming-FPS, Engpässe und Netzteilbedarf auf einfache und praktische Weise.',
      'Mit 10 Jahren Erfahrung in Webentwicklung und Blogging entwickelt Arun schnelle, leicht bedienbare Tools für reale Entscheidungen. Seine Arbeit macht technische PC-Themen für Anfänger, Spieler, Studierende und PC-Bauer verständlicher.',
      'Bei PCBuildCheck erstellt und redigiert Arun Inhalte zu Engpassanalysen, FPS-Schätzungen, Netzteilanforderungen und Hardwarekompatibilität. Jedes Tool und jeder Artikel soll klare Antworten ohne unnötige Komplexität liefern.',
      'Arun lebt in Lucknow und hat einen BTech-Abschluss. Sein technischer und webbezogener Hintergrund hilft ihm, praktische Tools für Menschen zu entwickeln, die einen PC bauen, aufrüsten oder beurteilen möchten.',
    ],
    expertise: 'Fachgebiete',
    expertiseItems: ['PC-Engpass-Rechner', 'FPS-Rechner', 'Netzteil-Rechner', 'Webentwicklung', 'Technische Redaktion', 'Nutzerorientierte Online-Tools', 'Ratgeber zu PC-Leistung und Kompatibilität', 'Anfängerfreundliche technische Erklärungen'],
    recentArticles: 'Aktuelle Artikel von Arun',
    connect: 'Vernetzen',
    contact: 'Kontakt',
  },
  es: {
    metaTitle: 'Arun Kumar Yadav — Fundador y editor',
    metaDescription: 'Arun Kumar Yadav es el fundador y editor de PCBuildCheck, desarrollador web y autor técnico de herramientas y guías prácticas para planificar un PC.',
    profileDescription: 'Fundador, editor, autor técnico y creador de las herramientas de PCBuildCheck. Graduado en BTech y desarrollador web de Lucknow con 10 años de experiencia.',
    imageAlt: 'Arun Kumar Yadav, fundador de PCBuildCheck',
    role: 'Fundador, editor, autor técnico y creador de herramientas',
    location: 'Lucknow, India',
    experience: '10 años de experiencia',
    about: 'Acerca de Arun',
    bio: [
      'Arun Kumar Yadav es desarrollador web, bloguero y fundador de PCBuildCheck, un sitio creado para explicar de forma sencilla y práctica el rendimiento del PC, los FPS en juegos, los cuellos de botella y las necesidades de la fuente de alimentación.',
      'Con 10 años de experiencia en desarrollo web y blogs, Arun crea herramientas rápidas, fáciles de usar y útiles para decisiones reales. Su trabajo hace que los temas técnicos sean más accesibles para principiantes, jugadores, estudiantes y montadores de PC.',
      'En PCBuildCheck, Arun crea y edita contenido sobre análisis de cuellos de botella, estimación de FPS, requisitos de PSU y compatibilidad de hardware. Cada herramienta y artículo busca ofrecer respuestas claras sin complejidad innecesaria.',
      'Arun vive en Lucknow y posee un título BTech. Su experiencia tecnológica y en desarrollo web le ayuda a crear herramientas prácticas para quienes desean montar, actualizar o evaluar un PC.',
    ],
    expertise: 'Especialidades',
    expertiseItems: ['Calculadoras de cuello de botella', 'Herramientas de cálculo de FPS', 'Calculadoras de PSU', 'Desarrollo web', 'Redacción de contenido técnico', 'Herramientas centradas en el usuario', 'Guías de rendimiento y compatibilidad de PC', 'Explicaciones técnicas para principiantes'],
    recentArticles: 'Artículos recientes de Arun',
    connect: 'Conecta',
    contact: 'Contacto',
  },
};

export function getAuthorCopy(locale: Locale): AuthorCopy {
  return AUTHOR_COPY[locale] ?? AUTHOR_COPY.en;
}
