import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import shallow from 'zustand/shallow';
import { Square, CheckSquare } from 'react-feather';

import { useStore } from '../../stores/drawStore';
import { ListGroup, ListGroupItem } from '../../components/ListGroup';
import { DrawSettingsDifficulties } from '../../types/DrawSettings';

const DifficultyOption = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Difficulties = () => {
  const [difficulties, drawSettingsDifficultyToggle] = useStore(
    (state) => [
      state.store.drawSettings.difficulties,
      state.drawSettingsDifficultyToggle,
    ],
    shallow
  );

  const handleOnDifficultyOptionClick = useCallback((e, value) => {
    drawSettingsDifficultyToggle(value);
  }, []);

  return (
    <ListGroup>
      {['Beginner', 'Basic', 'Difficult', 'Expert', 'Challenge'].map((diff) => (
        <DifficultyOption
          key={diff}
          value={diff.toLowerCase()}
          interactive
          onClick={handleOnDifficultyOptionClick}
        >
          {diff}
          {!difficulties.has(diff.toLowerCase() as DrawSettingsDifficulties) ? (
            <Square />
          ) : (
            <CheckSquare />
          )}
        </DifficultyOption>
      ))}
    </ListGroup>
  );
};

export default Difficulties;
