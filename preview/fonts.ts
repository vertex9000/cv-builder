import regular from '@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff?url';
import semibold from '@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff?url';
import bold from '@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff?url';
import { registerFonts } from '../src/theme';

// Font per l'anteprima nel browser: gli stessi file WOFF, serviti da Vite come URL.
const urls = { 400: regular, 600: semibold, 700: bold } as const;

export function registerBrowserFonts(): void {
  registerFonts((weight) => urls[weight]);
}
