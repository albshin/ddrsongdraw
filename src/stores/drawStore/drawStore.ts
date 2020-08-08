import create from 'zustand';
import produce from 'immer';
import Fuse from 'fuse.js';

import { redrawChart, drawCharts } from './draw';
import {
  DrawSettingsProps,
  PlaylistProps,
  ChartProps,
  DrawSettingsDifficulties,
  SongData,
} from '../../types';

export const DEFAULT_DRAW_SETTINGS: DrawSettingsProps = {
  difficulties: new Set(['expert', 'challenge']),
  style: 'single',
  numCharts: 4,
  levelMin: 13,
  levelMax: 15,
};

const DEFAULT_PLAYLISTS: PlaylistProps[] = [
  {
    id: 'DanceDanceRevolution A20',
    name: 'DanceDanceRevolution A20',
    game: 'DanceDanceRevolution A20',
    filename: 'a20.json',
    isLocal: true,
  },
];

type GameData = {
  songs: Partial<SongData>[];
  charts: ChartProps[];
  search: Fuse<Partial<SongData>>;
};

type DrawStoreProps = {
  drawSettings: DrawSettingsProps;
  playlists: PlaylistProps[];
  playlist: Partial<PlaylistProps>;
  gameData: GameData;
  drawnCharts: ChartProps[];
};

export interface DrawStateProps {
  store: DrawStoreProps;
  loadGameData: () => Promise<void>;
  chartsDraw: () => void;
  chartRemove: (chartId: string) => void;
  chartRedraw: (chartId: string) => void;
  drawSettingsModify: (settings: Partial<DrawSettingsProps>) => void;
  drawSettingsDifficultyToggle: (difficulty: DrawSettingsDifficulties) => void;
}

export const [useStore] = create<DrawStateProps>((set, get) => ({
  store: {
    drawSettings: DEFAULT_DRAW_SETTINGS,
    playlists: DEFAULT_PLAYLISTS,
    playlist: DEFAULT_PLAYLISTS[0],
    gameData: {
      songs: [],
      charts: [],
      search: undefined,
    },
    drawnCharts: [],
  },
  loadGameData: async () => {
    const { filename, isLocal } = get().store.playlist;

    let songs: SongData[] = [];

    if (isLocal) {
      try {
        const { default: data } = await import(
          /* webpackChunkName: "data" */ `../../data/${filename}`
        );
        songs = data;
      } catch (e) {
        console.log(`Could not read file: ../../data/${filename}`, e);
      }
    }

    let charts: ChartProps[] = [];
    songs.forEach((songData) => {
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

    set(
      produce((state) => {
        state.store.gameData.songs = songs;
        state.store.gameData.charts = charts;
        state.store.gameData.search = new Fuse(
          songs.map(({ charts, ...rest }) => rest)
        );
      })
    );
  },
  chartsDraw: () =>
    set(
      produce((state) => {
        state.store.drawnCharts = drawCharts(
          get().store.gameData.charts,
          get().store.drawSettings
        );
      })
    ),
  chartRemove: (chartId: string) =>
    set(
      produce((state) => {
        state.store.drawnCharts = state.store.drawnCharts.filter(
          (chart: ChartProps) => chart.id !== chartId
        );
      })
    ),
  chartRedraw: (chartId: string) =>
    set(
      produce((state) => {
        const newChart = redrawChart(
          get().store.gameData.charts,
          get().store.drawSettings
        );
        state.store.drawnCharts = state.store.drawnCharts.map(
          (chart: ChartProps) => {
            if (chart.id !== chartId) return chart;
            return { ...newChart, id: chart.id };
          }
        );
      })
    ),
  drawSettingsModify: (settings: Partial<DrawSettingsProps>) =>
    set(
      produce((state) => {
        state.store.drawSettings = { ...state.store.drawSettings, ...settings };
      })
    ),
  drawSettingsDifficultyToggle: (difficulty: DrawSettingsDifficulties) =>
    set(
      produce((state) => {
        const {
          drawSettings: { difficulties },
        } = state.store;
        difficulties.has(difficulty)
          ? difficulties.delete(difficulty)
          : difficulties.add(difficulty);
      })
    ),
}));
