import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { renderToFile } from '@react-pdf/renderer';
import { cvName } from './config';
import { loadCv } from './data/cv';
import { registerNodeFonts } from './fonts-node';
import { layouts } from './layouts';
import { outFileFor } from './output';
import { themeName } from './theme';

// Genera il PDF del CV indicato da CV_NAME nel tema scelto con CV_THEME, con il layout
// dichiarato dal CV. Si lancia tramite cli.ts, che imposta le variabili.
const name = cvName();
if (!name) throw new Error('CV_NAME non impostata: lanciare con npm run build -- <nome del CV>');
const data = await loadCv(name);
const { Document } = layouts[data.layout];
const outFile = outFileFor(name, themeName);
registerNodeFonts();
mkdirSync(dirname(outFile), { recursive: true });
await renderToFile(<Document data={data} />, outFile);
console.log(`Generato ${outFile} (cv ${name}, layout ${data.layout}, tema ${themeName})`);
