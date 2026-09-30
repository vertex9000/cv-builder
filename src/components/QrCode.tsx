import { Path, Svg } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// QR code vettoriale: la matrice è calcolata in modo sincrono e disegnata come un unico Path SVG.
// Funziona sia nella build Node sia nell'anteprima nel browser.
export function QrCode({ value, size, color }: { value: string; size: number; color: string }) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: 'M' });
  const n = modules.size;
  let d = '';
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (modules.get(row, col)) d += `M${col} ${row}h1v1h-1z`;
    }
  }
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${n} ${n}`}>
      <Path d={d} fill={color} />
    </Svg>
  );
}
