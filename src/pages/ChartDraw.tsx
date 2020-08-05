import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IoMdSettings, IoMdOptions, IoMdRefresh } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import { useSpring, animated, config } from 'react-spring';

import { useStore } from '../stores/drawStore';
import { Layout, Content, NavIcon } from '../components/shared';
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
const PULL_THRESHOLD = 50;

const ChartDraw: React.FC<RouteComponentProps> = () => {
  const draggableListRef = useRef<HTMLDivElement>(null);
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
  let isSwipingChart: Boolean | null = null;
  let startPos = [0, 0];
  let topY = 0;
  let positionY = 0;
  let pulling = false;
  let pullingStartTime: number;

  const handleTouchStart = (e: React.TouchEvent) => {
    const { pageX, pageY } = e.touches[0];
    startPos = [pageX, pageY];
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSwipingChart) return;

    const { pageX, pageY } = e.touches[0];
    const [deltaX, deltaY] = [startPos[0] - pageX, startPos[1] - pageY];
    positionY = pageY;

    // Disable drag gesture if swiping chart list
    if (
      e.target !== draggableListRef.current &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      isSwipingChart === null
    ) {
      isSwipingChart = true;
      return;
    }

    if (window.pageYOffset === 0 && deltaY < 0) {
      if (!pulling) {
        topY = positionY;
        pulling = true;
        pullingStartTime = e.timeStamp;
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

  const handleTouchEnd = (e: React.TouchEvent) => {
    const timeDelta = e.timeStamp - pullingStartTime;

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
    isSwipingChart = null;

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
          <NavIcon to="/settings">
            <IoMdSettings />
          </NavIcon>
        }
        navRight={
          <NavIcon to="/draw-settings">
            <IoMdOptions />
          </NavIcon>
        }
        title="Song Draw"
      />
      <StyledContent>
        <DraggableList
          ref={draggableListRef}
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
