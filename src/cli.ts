import { spawnSync } from 'node:child_process';
import { parseCliArgs } from './args';

// Uso: tsx src/cli.ts <nome del CV> [--theme default|high-contrast] [--watch]
// Genera il PDF di un CV in un tema. CV e tema passano a build.tsx tramite CV_NAME e CV_THEME,
// perché gli stili dei componenti leggono i colori al caricamento dei moduli.
const { theme, watch } = parseCliArgs();
const result = spawnSync(`npx tsx ${watch ? 'watch ' : ''}src/build.tsx`, {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, CV_THEME: theme },
});
process.exit(result.status ?? 1);
