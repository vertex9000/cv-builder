// Nomi dei layout disponibili, separati dal registro (index.ts) perché i tipi dei dati
// (CvData.layout) li usano senza dover importare i componenti.
export const layoutNames = ['sidebar'] as const;
export type LayoutName = (typeof layoutNames)[number];
