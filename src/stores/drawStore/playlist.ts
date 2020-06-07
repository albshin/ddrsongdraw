import { ChartProps, SongData, PlaylistProps } from '../../types';
import A20Data from '../../data/a20.json';

const importChartsFromData = (data: SongData[]): ChartProps[] => {
  let charts: ChartProps[] = [];

  data.forEach((songData) => {
    songData.charts.forEach((chartData) => {
      charts.push({
        id: `${songData.id}_${chartData.style}_${chartData.difficulty}`,
        name: songData.name,
        alternateNames: songData.alternate_names,
        artist: songData.artist,
        artistTranslated: songData.artist_translated,
        bpm: songData.bpm,
        jacket: songData.jacket,
        ...chartData,
      });
    });
  });

  return charts;
};

export const getDefaultPlaylists = (): PlaylistProps[] => {
  const defaultPlaylists: Partial<PlaylistProps>[] = [
    {
      name: 'DanceDanceRevolution A20',
      version: 'DanceDanceRevolution A20',
      charts: importChartsFromData(A20Data as any),
    },
  ];

  return (defaultPlaylists as Required<PlaylistProps[]>).map((playlist) => ({
    ...playlist,
    id: playlist.name,
    isDefault: true,
  }));
};
