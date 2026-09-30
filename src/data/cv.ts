import { pathToFileURL } from 'node:url';
import { cvFileFor } from '../config';
import type { CvData } from './types';

// Un CV è un file cv/<nome>.ts indipendente che esporta come default un CvData completo.
// Solo per Node: l'anteprima nel browser importa gli stessi file tramite l'alias @cv di Vite.
export async function loadCv(name: string): Promise<CvData> {
  const mod = (await import(pathToFileURL(cvFileFor(name)).href)) as { default?: CvData };
  if (!mod.default) throw new Error(`Il CV ${name} deve esportare il suo CvData come default`);
  return mod.default;
}