import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IoMdSettings, IoMdOptions, IoMdRefresh } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import { useSpring, animated, config } from 'react-spring';

import { useStore } from '../stores/drawStore';
import { Layout, Content, LinkIcon } from '../components/shared';
import Navbar from '../components/Navbar';
import { ChartList } from '../components/ChartList';

const DraggableList = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;

const StyledContent = styled(Content)`
  overflow: hidden;
`;

const RedrawIndicator = styled(animated.div)`
  position: absolute;
  top: -50px;
  display: flex;
  width: 100%;
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

  const [pullProps, setPull] = useSpring(() => ({
    y: 0,
    config: config.default,
  }));
  const [indicatorProps, setIndicator] = useSpring(() => ({
    backgroundColor: theme.colors.muted,
    color: theme.colors.black,
    config: { duration: PULL_HOLD_DURATION },
  }));

  // Handle pull to draw
  const PULL_THRESHOLD = 50;
  let startY = 0;
  let topY = 0;
  let positionY = 0;
  let pulling = false;
  let pullingStartTime: number;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY = e.touches[0].pageY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    positionY = e.touches[0].pageY;
    const delta = startY - positionY;

    if (window.pageYOffset === 0 && delta < 0) {
      if (!pulling) {
        topY = positionY;
        pulling = true;
        pullingStartTime = Date.now();
      }
    } else if (window.pageYOffset !== 0 || positionY < topY) {
      pulling = false;
    }

    // Limit pull height
    let pullY = Math.min(positionY - topY, 50);
    // If list is scrollable, do not allow rubberbanding downwards
    if (window.innerHeight === document.body.scrollHeight) {
      pullY = Math.max(pullY, 0);
    }

    setPull({
      y: pulling ? pullY : 0,
    });

    const willDraw = pulling && positionY - topY >= PULL_THRESHOLD;
    setIndicator({
      backgroundColor: willDraw ? theme.colors.info : theme.colors.muted,
      color: willDraw ? theme.colors.white : theme.colors.black,
      immediate: !pulling,
    });
  };

  const handleTouchEnd = () => {
    const timeDelta = Date.now() - pullingStartTime;

    if (
      pulling &&
      positionY - topY >= PULL_THRESHOLD &&
      timeDelta >= PULL_HOLD_DURATION
    ) {
      chartsDraw();
    }

    // Cleanup
    topY = 0;
    pulling = false;

    setPull({
      y: 0,
    });
    setIndicator({
      backgroundColor: theme.colors.muted,
      color: theme.colors.black,
      immediate: true,
    });
  };

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
          style={{
            ...pullProps,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
