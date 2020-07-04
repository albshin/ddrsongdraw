import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { Flipped, spring } from 'react-flip-toolkit';
import styled from '@emotion/styled';
import { IoMdCheckmark, IoMdSync } from 'react-icons/io';

import { StyledListGroupItem } from '../../components/ListGroup';
import { ChartProps } from '../../types';

// Leave this as "any" for now due to react-spring TS performance issues
const StyledChartListItem = styled(StyledListGroupItem)<any>`
  display: flex;
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  width: 100%;
`;

const SwipeableContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:not(:first-of-type) {
    ${StyledChartListItem} {
      border-top-width: 0;
    }
  }
`;

const ActionDisplay = styled(animated.div)`
  display: flex;
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  left: 0;
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes[6]};
  z-index: -999;
`;

const Jacket = styled.div<Pick<ChartProps, 'difficulty' | 'jacket'>>`
  flex: 0 0 74px;
  height: 74px;
  width: 74px;
  border-radius: ${(props) => props.theme.radii.default};
  background: ${(props) =>
    `url("assets/jackets/${props.jacket.replace(/[\""]/g, '\\"')}") no-repeat`};
  background-size: cover;
  box-shadow: inset 0px -5px 0px ${(props) => props.theme.colors[props.difficulty]};
`;

const SongInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes[1]};
  justify-content: space-between;
`;

const SongName = styled.b`
  margin: 0;
`;

const SongArtist = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes[0]};
`;

const SongDifficulty = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes[0]};
  text-transform: capitalize;
`;

interface ChartListItemProps
  extends Pick<
    ChartProps,
    'id' | 'name' | 'artist' | 'jacket' | 'difficulty' | 'level'
  > {
  onCardDelete: (cardId: string) => void;
  onCardRedraw: (cardId: string) => void;
}

const animateItemOnExit = (
  el: HTMLElement,
  i: number,
  removeElement: () => void
) => {
  el.style.zIndex = '-1';
  spring({
    config: { overshootClamping: true, stiffness: 100, damping: 0 },
    values: {
      opacity: [1, 0],
    },
    onUpdate: ({ opacity }: Record<string, number>) => {
      el.style.opacity = opacity.toString();
    },
    delay: 0,
    onComplete: removeElement,
  });
};

const ChartListItem = ({
  id,
  name,
  artist,
  jacket,
  difficulty,
  level,
  onCardDelete,
  onCardRedraw,
}: ChartListItemProps) => {
  const isGestureDisabled = useRef(false);
  const containerRef = useRef(null);
  const containerWidth = useRef(null);
  const activateThreshold = 80;

  useEffect(() => {
    containerWidth.current = containerRef.current.clientWidth;
  }, []);

  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  let onRest = () => {};

  const bind = useDrag(
    ({ down, movement: [mx], last, cancel }) => {
      if (isGestureDisabled.current) return cancel();
      let restPosition = 0;

      if (last) {
        if (Math.abs(mx) >= activateThreshold) {
          isGestureDisabled.current = true;
          if (mx < 0) {
            restPosition = -containerWidth.current;
            onRest = () => {
              onCardRedraw(id);
              isGestureDisabled.current = false;
              set({ x: 0 });
            };
          } else {
            restPosition = containerWidth.current;
            onRest = () => {
              onCardDelete(id);
            };
          }
        }
      }

      set({
        x: down ? mx : restPosition,
        immediate: !last,
        onRest,
        config: { tension: 439, friction: 40, clamp: last },
      });
    },
    { axis: 'x' }
  );

  return (
    <Flipped flipId={`chart-${id}`} onExit={animateItemOnExit}>
      <SwipeableContainer ref={containerRef} {...bind()}>
        <StyledChartListItem as={animated.li} style={{ x }}>
          <Jacket jacket={jacket} difficulty={difficulty} />
          <SongInformation>
            <div>
              <SongName>{name}</SongName>
              <SongArtist>{artist}</SongArtist>
            </div>
            <SongDifficulty>{`${difficulty} ${level}`}</SongDifficulty>
          </SongInformation>
        </StyledChartListItem>

        <ActionDisplay
          style={{
            display: x.to((x) => (x === 0 ? 'none' : 'flex')),
            backgroundColor: x.to((x) => (x < 0 ? 'orange' : 'green')),
            flexDirection: x.to((x) => (x < 0 ? 'row-reverse' : 'row')),
          }}
        >
          <animated.div
            style={{ display: x.to((x) => (x >= 0 ? 'none' : 'flex')) }}
          >
            <IoMdSync />
          </animated.div>
          <animated.div
            style={{ display: x.to((x) => (x <= 0 ? 'none' : 'flex')) }}
          >
            <IoMdCheckmark />
          </animated.div>
        </ActionDisplay>
      </SwipeableContainer>
    </Flipped>
  );
};

export default React.memo(ChartListItem);
