import { ChartProps } from './Song';

type Versions = 'DanceDanceRevolution A20';

export interface PlaylistProps {
  id: string;
  name: string;
  version: Versions;
  charts: ChartProps[];
  isDefault: boolean;
}
