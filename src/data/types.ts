import type { LayoutName } from '../layouts/names';

export interface Contacts {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  location: string;
}

// Testo semplice oppure composto da parti, alcune delle quali link cliccabili.
export type RichText = string | (string | { text: string; href: string })[];

export interface WebLink {
  text: string;
  href: string;
}

export interface Bullet {
  title?: string;
  text?: RichText;
  // Rende cliccabile l'intero testo; per link su singole parti usare RichText.
  href?: string;
  // Bullet di soli link, ciascuno preceduto dall'icona (al posto di text).
  links?: WebLink[];
}

export interface SubInitiative {
  title: string;
  period?: string;
  intro?: string;
  bullets: Bullet[];
}

export interface Experience {
  title: string;
  // Ruolo e periodo si omettono quando coincidono con quelli dell'Employer.
  role?: string;
  period?: string;
  context?: string;
  intro?: string;
  bullets?: Bullet[];
  subInitiatives?: SubInitiative[];
}

export interface Employer {
  company: string;
  role: string;
  period: string;
  experiences: Experience[];
}

export interface SkillGroup {
  area: string;
  items: string;
}

export interface Certification {
  name: string;
  date: string;
}

export interface Education {
  title: string;
  school: string;
  period: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CvData {
  // Layout con cui impaginare il CV (src/layouts/<nome>/).
  layout: LayoutName;
  // Dati anagrafici e contatti propri del CV.
  contacts: Contacts;
  lang: string;
  headline: string;
  labels: {
    contacts: string;
    profile: string;
    experience: string;
    skills: string;
    certifications: string;
    education: string;
    languages: string;
    interests: string;
  };
  profile: string[];
  employers: Employer[];
  skills: SkillGroup[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  interests?: Bullet[];
  // Indirizzo da mostrare come QR code accanto agli interessi, utile nella copia stampata.
  interestsQr?: string;
  // Autorizzazione al trattamento dei dati personali, in fondo alla pagina.
  privacy?: string;
}
