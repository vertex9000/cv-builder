import { parseArgs } from 'node:util';
import { setCv } from './config';
import { type ThemeName, themeNames } from './theme';

// Argomenti comuni a cli.ts e check.ts: <nome del CV> [--theme <nome>] [--watch].
export function parseCliArgs(argv = process.argv.slice(2)): { theme: ThemeName; watch: boolean } {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      theme: { type: 'string', default: 'default' },
      watch: { type: 'boolean', default: false },
    },
  });
  const error = positionals.length > 1 ? 'Indicare un solo CV' : setCv(positionals[0]);
  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (!(themeNames as readonly string[]).includes(values.theme)) {
    console.error(`Tema non valido: ${values.theme} (ammessi: ${themeNames.join(', ')})`);
    process.exit(1);
  }
  return { theme: values.theme as ThemeName, watch: values.watch };
}
