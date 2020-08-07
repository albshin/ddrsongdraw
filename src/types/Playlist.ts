import { ChartProps } from '.';

type Games = 'DanceDanceRevolution A20' | 'DanceDanceRevolution A20 PLUS';

export interface PlaylistProps {
  id: string;
  name: string;
  game: Games;
  charts?: ChartProps[];
  filename?: string;
  isLocal?: boolean;
}
