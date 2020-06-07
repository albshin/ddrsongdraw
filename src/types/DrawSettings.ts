export interface DrawSettingsProps {
  playlist?: string;
  style: 'single' | 'double';
  numCharts: number;
  levelMin: number;
  levelMax: number;
  // ex. {13: 1, 14: 2} (this means a Level 14 has 2x the chance to appear)
  levelWeights?: Record<number, number>;
}
