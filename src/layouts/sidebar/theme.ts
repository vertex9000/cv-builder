import { alpha, primitives, type ThemeName, themeName } from '../../theme';

// Tema del layout "sidebar": ruoli di colore e dimensioni propri di questo layout.
// Ogni tema (predefinito, alto contrasto) assegna le primitive comuni ai ruoli; i componenti
// del layout usano solo i ruoli (colors.*) e le dimensioni (sizes.*).
interface Palette {
  sidebarBg: string;
  sidebarHeading: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarAccent: string;
  // Filetto tra sidebar e colonna principale; 0 quando la sidebar ha uno sfondo proprio.
  sidebarBorderWidth: number;
  text: string;
  muted: string;
  accent: string;
  // Filetti: uno per ogni elemento, così si possono regolare separatamente.
  sectionRule: string; // sotto i titoli di sezione
  experienceRule: string; // verticale accanto alle esperienze di un datore di lavoro
  sidebarDivider: string; // tra sidebar e colonna principale (visibile se sidebarBorderWidth > 0)
  sidebarRule: string; // sotto i titoli dei blocchi della sidebar (Contatti, Competenze…)
}

const { petrol, slate, neutral } = primitives;

const palettes: Record<ThemeName, Palette> = {
  default: {
    sidebarBg: petrol[900],
    sidebarHeading: neutral.white,
    sidebarText: petrol[50],
    sidebarMuted: petrol[200],
    sidebarAccent: petrol[300],
    sidebarBorderWidth: 0,
    text: slate[900],
    muted: slate[500],
    accent: petrol[700],
    sectionRule: slate[100],
    experienceRule: slate[100],
    sidebarDivider: slate[100],
    sidebarRule: petrol[300],
  },
  // Alto contrasto: nero su bianco, nessuno sfondo colorato; la gerarchia è data da peso e filetti.
  'high-contrast': {
    sidebarBg: neutral.white,
    sidebarHeading: neutral.black,
    sidebarText: neutral.black,
    sidebarMuted: neutral[800],
    sidebarAccent: neutral.black,
    sidebarBorderWidth: 0,
    text: neutral.black,
    muted: neutral[800],
    accent: neutral.black,
    sectionRule: alpha(neutral[800], 0.2),
    experienceRule: alpha(neutral[800], 0.2),
    sidebarDivider: alpha(neutral[800], 0.9),
    sidebarRule: alpha(neutral[800], 0.2),
  },
};

export const colors = palettes[themeName];

export const sizes = {
  pagePaddingY: 26,
  sidebarWidth: 186, // ~31% di A4 (595pt)
  sidebarPaddingX: 16,
  // Margine sinistro maggiore: lascia spazio alla clausola privacy verticale sul bordo.
  sidebarPaddingLeft: 24,
  mainPaddingX: 20,
  qrSize: 44, // lato del QR code accanto agli interessi
  subIndent: 6, // rientro delle sotto-iniziative (titolo, sottotitolo e bullet)
  body: 9.5,
  small: 8.75,
  sectionTitle: 12,
  itemTitle: 10.5,
  name: 20,
  lineHeight: 1.35,
};
