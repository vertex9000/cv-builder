import { PDFViewer } from '@react-pdf/renderer';
import type { CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import type { CvData } from '../src/data/types';
import { layouts } from '../src/layouts';
import { type ThemeName, themeName } from '../src/theme';
import { registerBrowserFonts } from './fonts';

// Anteprima live dei CV: menu laterale con tutti i file di cv/ (alias @cv in vite.config.ts), in
// ordine alfabetico, e scelta del tema. CV e tema stanno nell'indirizzo (?cv=&theme=): il
// cambio ricarica la pagina, necessario per il tema perché gli stili leggono i colori al
// caricamento dei moduli. Vite ricarica la pagina a ogni salvataggio.
const modules = import.meta.glob<{ default: CvData }>(['@cv/*.ts', '!@cv/*.d.ts']);
const loaders = new Map(
  Object.entries(modules).map(([path, load]) => [path.replace(/^.*\/([^/]+)\.ts$/, '$1'), load]),
);
const names = [...loaders.keys()].sort((a, b) => a.localeCompare(b));

const params = new URLSearchParams(location.search);
const requested = params.get('cv');
const selected = requested && loaders.has(requested) ? requested : names[0];

const themeLabels: Record<ThemeName, string> = { default: 'Predefinito', 'high-contrast': 'Alto contrasto' };

function href(cv: string | undefined, theme: ThemeName): string {
  const query = new URLSearchParams();
  if (cv) query.set('cv', cv);
  if (theme !== 'default') query.set('theme', theme);
  const text = query.toString();
  return text ? `?${text}` : '?';
}

const styles: Record<string, CSSProperties> = {
  app: { display: 'flex', height: '100%', fontFamily: 'system-ui, sans-serif', fontSize: 14 },
  menu: { width: 220, flexShrink: 0, overflowY: 'auto', background: '#f4f5f6', borderRight: '1px solid #ddd', padding: '16px 0' },
  heading: { margin: '0 16px 8px', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#666' },
  list: { listStyle: 'none', margin: '0 0 20px', padding: 0 },
  link: { display: 'block', padding: '6px 16px', color: '#222', textDecoration: 'none', borderLeft: '3px solid transparent' },
  active: { fontWeight: 600, background: '#e3e7ea', borderLeftColor: '#1d6a7a' },
  message: { flex: 1, padding: 24, color: '#666' },
};

function Menu() {
  return (
    <nav style={styles.menu}>
      <h2 style={styles.heading}>CV</h2>
      <ul style={styles.list}>
        {names.map((name) => (
          <li key={name}>
            <a href={href(name, themeName)} style={{ ...styles.link, ...(name === selected ? styles.active : {}) }}>
              {name}
            </a>
          </li>
        ))}
      </ul>
      <h2 style={styles.heading}>Tema</h2>
      <ul style={styles.list}>
        {(Object.keys(themeLabels) as ThemeName[]).map((theme) => (
          <li key={theme}>
            <a href={href(selected, theme)} style={{ ...styles.link, ...(theme === themeName ? styles.active : {}) }}>
              {themeLabels[theme]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const root = createRoot(document.getElementById('root')!);
const load = selected ? loaders.get(selected) : undefined;

if (load) {
  const { default: data } = await load();
  const { Document } = layouts[data.layout];
  registerBrowserFonts();
  root.render(
    <div style={styles.app}>
      <Menu />
      <PDFViewer style={{ flex: 1, height: '100%', borderWidth: 0 }} showToolbar>
        <Document data={data} />
      </PDFViewer>
    </div>,
  );
} else {
  root.render(
    <div style={styles.app}>
      <Menu />
      <p style={styles.message}>Nessun CV in cv/.</p>
    </div>,
  );
}
