import { join } from 'node:path';
import { projectRoot } from './config';
import type { ThemeName } from './theme';

// PDF generati da build (uno per CV e tema) e verificati da check: cv-<nome>[-hc].pdf, dove
// <nome> è il nome del file del CV senza estensione.
// Il numero di pagine atteso è una proprietà del layout (src/layouts/index.ts).
const outDir = join(projectRoot, 'out');
const themeSuffix: Record<ThemeName, string> = { default: '', 'high-contrast': '-hc' };

export function outFileFor(name: string, theme: ThemeName): string {
  return join(outDir, `cv-${name}${themeSuffix[theme]}.pdf`);
}
