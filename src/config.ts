import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Si usa import.meta.url, e non import.meta.dirname, perché questo modulo viene incluso anche
// nella configurazione di Vite.
export const projectRoot = fileURLToPath(new URL('..', import.meta.url));

// Cartella dei CV: un file <nome>.ts per CV. Nel repository è versionato solo cv/esempio.ts;
// gli altri sono esclusi da .gitignore.
export const cvDir = resolve(projectRoot, 'cv');

export function cvNames(): string[] {
  if (!existsSync(cvDir)) return [];
  return readdirSync(cvDir)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'))
    .map((f) => f.slice(0, -'.ts'.length))
    .sort();
}

export function cvFileFor(name: string): string {
  return resolve(cvDir, `${name}.ts`);
}

// CV scelto per questo processo e per i processi figli (build, Vite), nella variabile CV_NAME.
export function cvName(): string | undefined {
  return process.env.CV_NAME || undefined;
}

// Controlla il nome e lo imposta; restituisce un messaggio d'errore se non è valido.
export function setCv(name: string | undefined): string | undefined {
  const list = cvNames().join(', ') || 'nessuno';
  if (!name) return `Indicare il CV da generare, per esempio: npm run build -- esempio (disponibili: ${list})`;
  if (!cvNames().includes(name)) return `CV non trovato in cv/: ${name} (disponibili: ${list})`;
  process.env.CV_NAME = name;
  return undefined;
}
