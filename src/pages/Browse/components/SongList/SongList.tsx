import React, { MutableRefObject } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useStore } from '../../../../stores/drawStore';
import { ListGroup } from '../../../../components/ListGroup';
import SongListItem from './SongListItem';
import useWindowScroll from '../../../../hooks/useWindowScroll';

const Row = React.memo(({ style, index }: ListChildComponentProps) => {
  const charts = useStore((state) => state.store.gameData.charts);
  const { id, name, artist, jacket } = charts[index];

  return (
    <SongListItem
      style={style}
      key={id}
      name={name}
      artist={artist}
      jacket={jacket}
    />
  );
});

const innerElementType = React.forwardRef(
  ({ style, ...props }: any, ref: MutableRefObject<HTMLDivElement>) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + 50}px`,
      }}
      {...props}
    />
  )
);

const SongList = () => {
  const charts = useStore((state) => state.store.gameData.charts);
  const { ref, bind } = useWindowScroll();

  return (
    <AutoSizer>
      {({ height, width }) => (
        <ListGroup>
          <FixedSizeList
            ref={ref}
            innerElementType={innerElementType}
            height={height}
            width={width}
            itemCount={charts.length}
            itemSize={67}
            {...bind}
          >
            {Row}
          </FixedSizeList>
        </ListGroup>
      )}
    </AutoSizer>
  );
};

export default SongList;
