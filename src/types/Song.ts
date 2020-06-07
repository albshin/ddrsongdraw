export interface SongData {
  id: string;
  name: string;
  alternate_names: string[];
  artist: string;
  artist_translated: string;
  bpm: string;
  folder: string;
  jacket: string;
  charts: SongCharts[];
}

export interface SongProps {
  id: string;
  name: string;
  alternateNames: Array<string>;
  artist: string;
  artistTranslated: string;
  bpm: string;
  folder: string;
  jacket: string;
  charts: SongCharts[];
}

export interface SongCharts {
  style: 'single' | 'double';
  level: number;
  difficulty: 'beginner' | 'basic' | 'difficult' | 'expert' | 'challenge';
}

export interface ChartProps
  extends Partial<Omit<SongProps, 'id' | 'charts'>>,
    SongCharts {
  id: string;
}
