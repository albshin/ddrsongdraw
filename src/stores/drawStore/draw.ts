import { ChartProps, DrawSettingsProps } from '../../types';

export const getValidChartsByLevel = (
  charts: ChartProps[],
  drawSettings: DrawSettingsProps
) => {
  let pool: Record<number, ChartProps[]> = {};

  const validCharts = charts.filter(
    (chart) =>
      chart.level >= drawSettings.levelMin &&
      chart.level <= drawSettings.levelMax &&
      chart.style === drawSettings.style
  );

  validCharts.forEach((chart) => {
    if (!pool[chart.level]) {
      pool[chart.level] = [];
    }

    pool[chart.level].push(chart);
  });

  return pool;
};

// TODO: Do not draw chart that is already drawn
export const redrawChart = (
  charts: ChartProps[],
  drawSettings: DrawSettingsProps
) => {
  return drawCharts(charts, { ...drawSettings, numCharts: 1 })[0];
};

export const drawCharts = (
  charts: ChartProps[],
  drawSettings: DrawSettingsProps
) => {
  const chartPool = getValidChartsByLevel(charts, drawSettings);
  let levelWeights: Record<number, number> = {};

  // If a level weight is not set, use an equal distribution
  if (!drawSettings.levelWeights) {
    for (let i = drawSettings.levelMin; i <= drawSettings.levelMax; i++) {
      levelWeights[i] = 1;
    }
  } else {
    levelWeights = drawSettings.levelWeights;
  }

  // Weighted drawing methods: https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/
  const expandedWeights: number[] = [];
  Object.entries(levelWeights).forEach(([level, weight]) =>
    expandedWeights.push(...new Array(weight).fill(level))
  );

  let drawnCharts = [];

  const numDraws = drawSettings.numCharts;
  for (let i = 0; i < numDraws; i++) {
    const randomLevel =
      expandedWeights[Math.floor(Math.random() * expandedWeights.length)];
    const levelPool = chartPool[randomLevel];
    const randomChartIndex = Math.floor(Math.random() * levelPool.length);

    drawnCharts.push(levelPool[randomChartIndex]);
    levelPool.splice(randomChartIndex, 1);
  }

  return drawnCharts;
};
