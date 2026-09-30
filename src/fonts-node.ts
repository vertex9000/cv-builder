import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { registerFonts } from './theme';

// Font per la build in Node: file WOFF letti dal disco, dal pacchetto @fontsource.
export function registerNodeFonts(): void {
  const require = createRequire(import.meta.url);
  const pkgDir = dirname(require.resolve('@fontsource/source-sans-3/package.json'));
  registerFonts((weight) => join(pkgDir, 'files', `source-sans-3-latin-${weight}-normal.woff`));
}
