import type { ComponentType } from 'react';
import type { CvData } from '../data/types';
import type { LayoutName } from './names';
import { SidebarDocument } from './sidebar/SidebarDocument';

// Un layout è un modo di impaginare un CvData: il documento react-pdf e il numero di pagine
// atteso (usato da check). Ogni layout vive in src/layouts/<nome>/ con componenti e tema propri;
// il CV sceglie il layout con CvData.layout.
export interface Layout {
  Document: ComponentType<{ data: CvData }>;
  pages: number;
  description: string;
}

export const layouts: Record<LayoutName, Layout> = {
  sidebar: {
    Document: SidebarDocument,
    pages: 1,
    description: 'Una pagina A4, sidebar colorata a sinistra con contatti e competenze, colonna principale con profilo ed esperienze.',
  },
};

export { type LayoutName, layoutNames } from './names';
