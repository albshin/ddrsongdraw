import React, { MutableRefObject } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import A20Data from '../../../../data/a20.json';
import { ListGroup } from '../../../../components/ListGroup';
import SongListItem from './SongListItem';
import useWindowScroll from '../../../../hooks/useWindowScroll';

const Row = React.memo(({ style, index }: ListChildComponentProps) => {
  const { id, name, artist, jacket } = A20Data[index];

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
            itemCount={A20Data.length}
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
