import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import ChartListItem from './ChartListItem';
import { Flipper } from 'react-flip-toolkit';
import { HandleEnterUpdateDeleteArgs } from 'react-flip-toolkit/lib/FlipToolkit/types';

import { useStore } from '../stores/drawStore';

const StyledChartList = styled.div`
  height: 100%;
`;

const handleFlipperAnimations = ({
  hideEnteringElements,
  animateEnteringElements,
  animateExitingElements,
  animateFlippedElements,
}: HandleEnterUpdateDeleteArgs) => {
  hideEnteringElements();
  animateExitingElements();
  animateFlippedElements();
  animateEnteringElements();
};

const ChartList = () => {
  const {
    store: { charts },
    chartRemove,
    chartRedraw,
  } = useStore();

  const handleCardDelete = useCallback((chartId) => {
    chartRemove(chartId);
  }, []);

  const handleCardRedraw = useCallback((chartId) => {
    chartRedraw(chartId);
  }, []);

  return (
    <StyledChartList>
      <Flipper
        flipKey={charts.map(({ id }) => id).join(',')}
        handleEnterUpdateDelete={handleFlipperAnimations}
        spring={{ stiffness: 70, damping: 0, overshootClamping: true }}
      >
        {charts.map(({ id, name, artist, jacket, difficulty, level }) => (
          <ChartListItem
            key={id}
            id={id}
            name={name}
            artist={artist}
            jacket={jacket}
            difficulty={difficulty}
            level={level}
            onCardDelete={handleCardDelete}
            onCardRedraw={handleCardRedraw}
          />
        ))}
      </Flipper>
    </StyledChartList>
  );
};

export default ChartList;
