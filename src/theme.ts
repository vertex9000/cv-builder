import { Font } from '@react-pdf/renderer';

// Elementi comuni a tutti i layout: temi disponibili e tema scelto, primitive di colore, font.
// Ruoli di colore e dimensioni sono invece propri di ogni layout (src/layouts/<nome>/theme.ts).

export const themeNames = ['default', 'high-contrast'] as const;
export type ThemeName = (typeof themeNames)[number];

// Primitive: la scala dei colori disponibili, con nomi che descrivono il colore e non l'uso.
// I temi dei layout assegnano le primitive ai ruoli; i componenti usano solo i ruoli.
export const primitives = {
  petrol: {
    900: '#16404d',
    700: '#1d6a7a',
    300: '#7fc4d0',
    200: '#a9c3ca',
    50: '#e8f0f2',
  },
  slate: {
    900: '#1f2a30',
    500: '#5b6b73',
    100: '#d5e2e6',
  },
  neutral: {
    white: '#ffffff',
    800: '#333333',
    black: '#000000',
  },
} as const;

// Aggiunge l'opacità (0–1) a una primitiva esadecimale a 6 cifre: alpha(primitives.neutral.black, 0.3).
export function alpha(hex: string, opacity: number): string {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`alpha() richiede un colore #rrggbb: ${hex}`);
  const a = Math.round(Math.min(1, Math.max(0, opacity)) * 255);
  return hex + a.toString(16).padStart(2, '0');
}

// Il tema va scelto prima che i componenti creino i loro stili (al caricamento dei moduli):
// in Node con la variabile d'ambiente CV_THEME, nell'anteprima nel browser con ?theme= nell'indirizzo.
function requestedTheme(): string | undefined {
  if (typeof process !== 'undefined' && process.env?.CV_THEME) return process.env.CV_THEME;
  if (typeof location !== 'undefined') return new URLSearchParams(location.search).get('theme') ?? undefined;
  return undefined;
}

function resolveTheme(value: string | undefined): ThemeName {
  const name = value ?? 'default';
  if (!(themeNames as readonly string[]).includes(name)) {
    throw new Error(`Tema non valido: ${name} (ammessi: ${themeNames.join(', ')})`);
  }
  return name as ThemeName;
}

export const themeName = resolveTheme(requestedTheme());

export const fonts = {
  family: 'SourceSans3',
};

let registered = false;

// Registra Source Sans 3 (400, 600, 700). La sorgente dei file cambia tra Node (percorso su disco,
// src/fonts-node.ts) e browser (URL servito da Vite, preview/fonts.ts).
export function registerFonts(fileFor: (weight: 400 | 600 | 700) => string): void {
  if (registered) return;
  Font.register({
    family: fonts.family,
    fonts: [
      { src: fileFor(400), fontWeight: 400 },
      { src: fileFor(600), fontWeight: 600 },
      { src: fileFor(700), fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}
