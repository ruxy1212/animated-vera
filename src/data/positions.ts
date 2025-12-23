export interface FloatingPosition {
  top: number | string;
  left: number | string;
  opacity: number;
  scale: number;
  rotation: number;
}

export const floatingPositions: FloatingPosition[] = [
  { top: 50, left: 50, opacity: 1, scale: 1.0, rotation: 0 },
  { top: 40, left: 50, opacity: 1, scale: 0.8, rotation: 0 },
  { top: 42, left: 70, opacity: 1, scale: 0.5, rotation: -9 },
  { top: '70vh', left: 50, opacity: 1, scale: 0.8, rotation: 0 }
];

export const mobilePositionOverrides: Partial<Record<number, Partial<FloatingPosition>>> = {
  2: { top: '21%', left: '42%' }
};
