import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import shallow from 'zustand/shallow';

import { useStore } from '../../stores/drawStore';
import { Section } from '../../components/Section';
import { SliderRange } from '../../components/Slider';

const LevelText = styled.b`
  display: block;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const LevelRange = () => {
  const [levelMin, levelMax, drawSettingsModify] = useStore(
    (state) => [
      state.store.drawSettings.levelMin,
      state.store.drawSettings.levelMax,
      state.drawSettingsModify,
    ],
    shallow
  );

  const handleOnSliderMove = useCallback((values) => {
    const [levelMin, levelMax] = values;
    drawSettingsModify({ levelMin, levelMax });
  }, []);

  return (
    <Section>
      <LevelText>
        Level {levelMin === levelMax ? levelMin : `${levelMin} - ${levelMax}`}
      </LevelText>
      <SliderRange
        min={1}
        max={19}
        count={2}
        defaultValue={[levelMin, levelMax]}
        onChange={handleOnSliderMove}
      />
    </Section>
  );
};

export default LevelRange;
