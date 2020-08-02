import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IoMdSettings, IoMdOptions, IoMdRefresh } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { useStore } from '../stores/drawStore';
import { Layout, Content, LinkIcon } from '../components/shared';
import Navbar from '../components/Navbar';
import { ChartList } from '../components/ChartList';

const DraggableList = styled(animated.div)`
  flex: 1;
`;

const StyledContent = styled(Content)`
  margin-top: 0;
`;

const RedrawIndicator = styled(animated.div)`
  display: flex;
  margin: 0;
  height: ${(props) => props.theme.navbarHeight};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.muted};

  svg {
    height: 26px;
    width: 26px;
  }
`;

const PULL_HOLD_DURATION = 800;

const ChartDraw: React.FC<RouteComponentProps> = () => {
  const theme = useTheme();

  const chartsDraw = useStore((state) => state.chartsDraw);

  const [pullProps, setPull] = useSpring(() => ({ y: 0, config: config.slow }));
  const [indicatorProps, setIndicator] = useSpring(() => ({
    backgroundColor: theme.colors.muted,
    color: theme.colors.black,
    config: { duration: PULL_HOLD_DURATION },
  }));

  const bind = useDrag(
    ({ down, movement: [, my], cancel, last, elapsedTime }) => {
      if (my <= 0) return cancel();

      const shouldRedraw = my >= 40 && down;
      setIndicator({
        backgroundColor: shouldRedraw ? theme.colors.info : theme.colors.muted,
        color: shouldRedraw ? theme.colors.white : theme.colors.black,
        reset: !down,
      });

      if (last) {
        if (my >= 40 && elapsedTime >= PULL_HOLD_DURATION) {
          chartsDraw();
        }
      }

      setPull({
        y: down ? my : 0,
      });
    },
    {
      axis: 'y',
      filterTaps: true,
      bounds: { top: 0, bottom: 50 },
    }
  );

  return (
    <Layout>
      <Navbar
        navLeft={
          <LinkIcon to="settings">
            <IoMdSettings />
          </LinkIcon>
        }
        navRight={
          <LinkIcon to="draw-settings">
            <IoMdOptions />
          </LinkIcon>
        }
        title="Song Draw"
      />
      <StyledContent>
        <DraggableList
          style={{ ...pullProps, touchAction: 'pan-x' }}
          {...bind()}
        >
          <RedrawIndicator style={indicatorProps}>
            <IoMdRefresh />
          </RedrawIndicator>
          <ChartList />
        </DraggableList>
      </StyledContent>
    </Layout>
  );
};

export default ChartDraw;
