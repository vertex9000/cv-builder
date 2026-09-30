import { existsSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { PDFDocument } from 'pdf-lib';
import { parseCliArgs } from './args';
import { cvName } from './config';
import { loadCv } from './data/cv';
import { layouts } from './layouts';
import { outFileFor } from './output';

// Uso: tsx src/check.ts <nome del CV> [--theme default|high-contrast]
// Il numero di pagine atteso dipende dal layout del CV.
const { theme } = parseCliArgs();
const name = cvName()!;
const outFile = outFileFor(name, theme);
const expectedPages = layouts[(await loadCv(name)).layout].pages;
if (!existsSync(outFile)) {
  console.error(`FAIL ${basename(outFile)}: non trovato`);
  process.exit(1);
}
const pages = (await PDFDocument.load(readFileSync(outFile))).getPageCount();
const ok = pages === expectedPages;
console.log(`${ok ? 'OK  ' : 'FAIL'} ${basename(outFile)}: ${pages} pagine (attese ${expectedPages})`);
process.exit(ok ? 0 : 1);
