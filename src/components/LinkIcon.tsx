import { Path, Svg } from '@react-pdf/renderer';

// Icona "catena" (disegno di Feather Icons, licenza MIT) da mettere prima dei link.
// È un SVG perché il font caricato (sottoinsieme latin) non contiene simboli adatti.
export function LinkIcon({ size, color }: { size: number; color: string }) {
  const stroke = { stroke: color, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...stroke} />
      <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...stroke} />
    </Svg>
  );
}
