import React, { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { Flipper } from 'react-flip-toolkit';
import { HandleEnterUpdateDeleteArgs } from 'react-flip-toolkit/lib/FlipToolkit/types';

import { useStore } from '../../stores/drawStore';
import { ListGroup } from '../../components/ListGroup';
import ChartListItem from './ChartListItem';

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
  const [charts, chartRemove, chartRedraw] = useStore(
    (state) => [state.store.charts, state.chartRemove, state.chartRedraw],
    shallow
  );

  const handleCardDelete = useCallback((chartId) => {
    chartRemove(chartId);
  }, []);

  const handleCardRedraw = useCallback((chartId) => {
    chartRedraw(chartId);
  }, []);

  return (
    <ListGroup>
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
    </ListGroup>
  );
};

export default ChartList;
