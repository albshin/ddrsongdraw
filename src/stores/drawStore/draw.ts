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
      chart.style === drawSettings.style &&
      drawSettings.difficulties.has(chart.difficulty)
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
  if (!charts) return [];

  const chartPool = getValidChartsByLevel(charts, drawSettings);
  if (Object.keys(chartPool).length === 0) return [];

  let levelWeights: Record<number, number> = {};

  // If a level weight is not set, use an equal distribution
  if (!drawSettings.levelWeights) {
    for (let i = drawSettings.levelMin; i <= drawSettings.levelMax; i++) {
      levelWeights[i] = 1;
    }
  } else {
    levelWeights = drawSettings.levelWeights;
  }

  // Expand the draw weights
  let expandedWeights: number[] = [];
  Object.entries(levelWeights).forEach(([level, weight]: [string, number]) => {
    // Only expand level weight if the level exists in the pool
    if (chartPool[Number(level)]) {
      expandedWeights.push(...new Array(weight).fill(level));
    }
  });

  let drawnCharts = [];

  while (drawnCharts.length < drawSettings.numCharts) {
    // Stop drawing charts when no more charts are available
    if (expandedWeights.length === 0) break;

    const randomLevel =
      expandedWeights[Math.floor(Math.random() * expandedWeights.length)];
    const levelPool = chartPool[randomLevel];
    const randomChartIndex = Math.floor(Math.random() * levelPool.length);

    drawnCharts.push(levelPool[randomChartIndex]);
    levelPool.splice(randomChartIndex, 1);

    // Remove weights for level if no more charts exist in the level pool
    if (levelPool.length === 0) {
      expandedWeights = expandedWeights.filter((lvl) => lvl !== randomLevel);
    }
  }

  return drawnCharts;
};
