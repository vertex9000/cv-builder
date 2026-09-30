import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { setCv } from './config';

// Uso: tsx src/dev.ts [<nome del CV>]
// Avvia l'anteprima Vite con il menu di tutti i CV; il nome facoltativo indica quello da aprire
// all'avvio e passa a vite.config.ts tramite CV_NAME.
const { positionals } = parseArgs({ allowPositionals: true, options: {} });
if (positionals[0]) {
  const error = setCv(positionals[0]);
  if (error) {
    console.error(error.replace('npm run build', 'npm run dev'));
    process.exit(1);
  }
}
const result = spawnSync('npx vite', { stdio: 'inherit', shell: true, env: process.env });
process.exit(result.status ?? 1);
