import type { CvData } from '../src/data/types';

// CV d'esempio con dati fittizi: mostra la struttura di un CvData completo.
// I CV reali stanno in questa stessa cartella (esclusi da git) e si generano per nome,
// per esempio npm run build -- nome.
const cv: CvData = {
  layout: 'sidebar',
  contacts: {
    name: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    phone: '+39 000 000 0000',
    linkedin: 'linkedin.com/in/example',
    instagram: 'instagram.com/example',
    location: 'Milano, Italia',
  },
  lang: 'it',
  headline: 'Sviluppatore software\nBack-end e cloud',
  labels: {
    contacts: 'Contatti',
    profile: 'Profilo',
    experience: 'Esperienze',
    skills: 'Competenze tecniche',
    certifications: 'Certificazioni',
    education: 'Istruzione',
    languages: 'Lingue',
    interests: 'Interessi',
  },
  profile: [
    'Sviluppatore con esperienza nella progettazione di servizi back-end e applicazioni web. Attenzione alla qualità del codice, ai test automatici e alla collaborazione nel team.',
  ],
  employers: [
    {
      company: 'Azienda Esempio S.p.A.',
      role: 'Senior Developer',
      period: '01/2022 – oggi',
      experiences: [
        {
          title: 'Piattaforma di gestione ordini',
          role: 'Sviluppatore back-end',
          period: '01/2022 – oggi',
          intro: 'Servizi per la gestione degli ordini e l’integrazione con i sistemi di magazzino.',
          subInitiatives: [
            {
              title: 'Migrazione al cloud',
              period: '2023',
              bullets: [
                { title: 'Architettura', text: 'servizi containerizzati e code di messaggi per l’elaborazione asincrona.' },
                { title: 'Rilascio', text: 'pipeline CI/CD con test automatici e rilasci progressivi.' },
              ],
            },
          ],
        },
        {
          title: 'Portale clienti',
          role: 'Full-stack developer',
          period: '06/2023 – 12/2024',
          bullets: [
            { title: 'Frontend', text: 'interfaccia web responsive con autenticazione e gestione dei profili.' },
            { title: 'API', text: 'API REST documentate e versionate, con test di contratto.' },
          ],
        },
      ],
    },
    {
      company: 'Software House Esempio',
      role: 'Junior Developer',
      period: '09/2019 – 12/2021',
      experiences: [
        {
          title: 'Sviluppo e manutenzione di applicazioni web',
          bullets: [
            { title: 'Sviluppo', text: 'nuove funzionalità e correzione di difetti su applicazioni esistenti.' },
            { title: 'Supporto', text: 'gestione delle segnalazioni e documentazione tecnica.' },
          ],
        },
      ],
    },
  ],
  skills: [
    { area: 'Linguaggi', items: 'TypeScript, C#, SQL' },
    { area: 'Back-end', items: 'Node.js, .NET, API REST' },
    { area: 'Cloud e DevOps', items: 'Docker, CI/CD, Git' },
    { area: 'Dati', items: 'PostgreSQL, Redis' },
  ],
  certifications: [{ name: 'Certificazione Esempio – Cloud Fundamentals', date: '05/2023' }],
  education: [{ title: 'Laurea in Informatica', school: 'Università Esempio', period: '2015 – 2019' }],
  languages: [
    { name: 'Italiano', level: 'Madrelingua' },
    { name: 'Inglese', level: 'B2' },
  ],
  interests: [{ text: 'Fotografia, escursionismo, open source.' }],
  privacy: 'Autorizzo il trattamento dei dati personali contenuti nel CV ai sensi del Regolamento UE 2016/679 (GDPR).',
};

export default cv;
