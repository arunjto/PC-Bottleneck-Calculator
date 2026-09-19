import type { Locale } from '@/i18n-config';

export type PsuPhaseFourCopy = {
  modelGuidanceTitle: string;
  modelGuidanceDescription: string;
  gpuPowerTier: string;
  planningClass: string;
  planningClassValue: (watts: number) => string;
  officialRequirement: string;
  officialRequirementValue: string;
  systemClassDescription: string;
  notOfficialMinimum: string;
};

const COPY: Record<Locale, PsuPhaseFourCopy> = {
  en: { modelGuidanceTitle: 'GPU model guidance', modelGuidanceDescription: 'Use this power-tier class to shortlist a PSU, then confirm the exact board-partner requirement. It is not an official minimum.', gpuPowerTier: 'GPU power tier', planningClass: 'Editorial system-class starting point', planningClassValue: watts => `≥ ${watts}W PSU class`, officialRequirement: 'Official requirement', officialRequirementValue: 'Verify exact GPU model', systemClassDescription: 'A system-class starting point based on published GPU power', notOfficialMinimum: 'This tier is an editorial planning aid, not a vendor-certified PSU recommendation.' },
  it: { modelGuidanceTitle: 'Guida per modello GPU', modelGuidanceDescription: 'Usa questa fascia per una prima selezione del PSU, poi verifica il requisito del partner esatto. Non è un minimo ufficiale.', gpuPowerTier: 'Fascia di potenza GPU', planningClass: 'Base editoriale per la classe del sistema', planningClassValue: watts => `Classe PSU ≥ ${watts}W`, officialRequirement: 'Requisito ufficiale', officialRequirementValue: 'Verifica il modello GPU esatto', systemClassDescription: 'Base di classe sistema ricavata dalla potenza GPU pubblicata', notOfficialMinimum: 'Questa fascia aiuta la pianificazione editoriale, non è una raccomandazione PSU certificata.' },
  fr: { modelGuidanceTitle: 'Conseil lié au modèle GPU', modelGuidanceDescription: 'Utilisez cette plage pour présélectionner un PSU, puis confirmez l’exigence du partenaire exact. Ce n’est pas un minimum officiel.', gpuPowerTier: 'Plage de puissance GPU', planningClass: 'Point de départ éditorial pour la classe système', planningClassValue: watts => `Classe PSU ≥ ${watts} W`, officialRequirement: 'Exigence officielle', officialRequirementValue: 'Vérifier le modèle GPU exact', systemClassDescription: 'Point de départ de classe système basé sur la puissance GPU publiée', notOfficialMinimum: 'Cette plage aide la planification éditoriale; ce n’est pas une recommandation PSU certifiée.' },
  de: { modelGuidanceTitle: 'GPU-Modellhinweis', modelGuidanceDescription: 'Nutzen Sie diese Leistungsklasse zur Vorauswahl und prüfen Sie danach die Anforderung des exakten Boardpartners. Sie ist kein offizielles Minimum.', gpuPowerTier: 'GPU-Leistungsklasse', planningClass: 'Redaktioneller Startwert für die Systemklasse', planningClassValue: watts => `PSU-Klasse ≥ ${watts}W`, officialRequirement: 'Offizielle Anforderung', officialRequirementValue: 'Exaktes GPU-Modell prüfen', systemClassDescription: 'Startwert für die Systemklasse anhand der veröffentlichten GPU-Leistung', notOfficialMinimum: 'Diese Klasse dient der redaktionellen Planung und ist keine zertifizierte PSU-Empfehlung.' },
  es: { modelGuidanceTitle: 'Guía del modelo GPU', modelGuidanceDescription: 'Usa esta banda para preseleccionar una PSU y después confirma el requisito del partner exacto. No es un mínimo oficial.', gpuPowerTier: 'Banda de potencia GPU', planningClass: 'Punto de partida editorial para la clase del sistema', planningClassValue: watts => `Clase de PSU ≥ ${watts}W`, officialRequirement: 'Requisito oficial', officialRequirementValue: 'Verifica el modelo GPU exacto', systemClassDescription: 'Punto de partida de clase de sistema basado en la potencia GPU publicada', notOfficialMinimum: 'Esta banda ayuda a planificar, pero no es una recomendación PSU certificada por el fabricante.' },
  ru: { modelGuidanceTitle: 'Рекомендации для модели GPU', modelGuidanceDescription: 'Используйте этот диапазон для предварительного выбора PSU, затем подтвердите требование точного партнёра платы. Это не официальный минимум.', gpuPowerTier: 'Диапазон мощности GPU', planningClass: 'Редакционный ориентир класса системы', planningClassValue: watts => `Класс PSU ≥ ${watts} Вт`, officialRequirement: 'Официальное требование', officialRequirementValue: 'Проверьте точную модель GPU', systemClassDescription: 'Ориентир класса системы на основе опубликованной мощности GPU', notOfficialMinimum: 'Этот диапазон помогает планированию, но не является сертифицированной рекомендацией PSU.' },
};

export function getPsuPhaseFourCopy(lang: Locale): PsuPhaseFourCopy {
  return COPY[lang] ?? COPY.en;
}
