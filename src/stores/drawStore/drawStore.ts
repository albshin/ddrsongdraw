import create from 'zustand';
import produce from 'immer';

import { redrawChart, drawCharts } from './draw';
import { getDefaultPlaylists } from './playlist';
import { DrawSettingsProps, PlaylistProps, ChartProps } from '../../types';

export const DEFAULT_DRAW_SETTINGS: DrawSettingsProps = {
  playlist: 'A20',
  style: 'single',
  numCharts: 4,
  levelMin: 13,
  levelMax: 15,
};

interface DrawStoreProps {
  drawSettings: DrawSettingsProps;
  playlists: PlaylistProps[];
  charts: ChartProps[];
}

interface DrawStateProps {
  store: DrawStoreProps;
  chartsDraw: () => void;
  chartRemove: (chartId: string) => void;
  chartRedraw: (chartId: string) => void;
  drawSettingsModify: (settings: Partial<DrawSettingsProps>) => void;
}

export const [useStore] = create<DrawStateProps>((set, get) => ({
  store: {
    drawSettings: DEFAULT_DRAW_SETTINGS,
    playlists: getDefaultPlaylists(),
    charts: [],
  },
  chartsDraw: () =>
    set(
      produce((state) => {
        state.store.charts = drawCharts(
          get().store.playlists[0].charts,
          get().store.drawSettings
        );
      })
    ),
  chartRemove: (chartId: string) =>
    set(
      produce((state) => {
        state.store.charts = state.store.charts.filter(
          (chart: ChartProps) => chart.id !== chartId
        );
      })
    ),
  chartRedraw: (chartId: string) =>
    set(
      produce((state) => {
        const newChart = redrawChart(
          get().store.playlists[0].charts,
          get().store.drawSettings
        );
        state.store.charts = state.store.charts.map((chart: ChartProps) => {
          if (chart.id !== chartId) return chart;
          return { ...newChart, id: chart.id };
        });
      })
    ),
  drawSettingsModify: (settings: Partial<DrawSettingsProps>) =>
    set(
      produce((state) => {
        state.store.drawSettings = { ...state.store.drawSettings, ...settings };
      })
    ),
}));
