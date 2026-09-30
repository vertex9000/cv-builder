import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { cvDir, cvName } from './src/config.ts';

// Anteprima live nel browser (npm run dev [-- <nome>], tramite src/dev.ts); la build dei PDF resta
// in src/build.tsx. La cartella cv/ è esposta con l'alias @cv: l'anteprima elenca tutti i CV in un
// menu laterale e apre all'avvio quello indicato (CV_NAME), se presente.
const initial = cvName();

export default defineConfig({
  root: 'preview',
  plugins: [react()],
  resolve: { alias: { '@cv': cvDir } },
  server: { open: initial ? `/?cv=${encodeURIComponent(initial)}` : true },
});
