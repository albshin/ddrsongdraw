import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { useStore } from '../../stores/drawStore';
import { Section } from '../../components/Section';
import { SliderRange } from '../../components/Slider';

const LevelText = styled.b`
  display: block;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const LevelRange = () => {
  const { store, drawSettingsModify } = useStore();

  const handleOnSliderMove = useCallback((values) => {
    const [levelMin, levelMax] = values;
    drawSettingsModify({ levelMin, levelMax });
  }, []);

  return (
    <Section>
      <LevelText>
        Level{' '}
        {store.drawSettings.levelMin === store.drawSettings.levelMax
          ? store.drawSettings.levelMin
          : `${store.drawSettings.levelMin} - ${store.drawSettings.levelMax}`}
      </LevelText>
      <SliderRange
        min={1}
        max={19}
        count={2}
        defaultValue={[
          store.drawSettings.levelMin,
          store.drawSettings.levelMax,
        ]}
        onChange={handleOnSliderMove}
      />
    </Section>
  );
};

export default LevelRange;
