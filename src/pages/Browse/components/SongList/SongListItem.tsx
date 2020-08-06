import React from 'react';
import styled from '@emotion/styled';

import { ListGroupItem } from '../../../../components/ListGroup';
import { Jacket } from '../../../../components/Jacket';

const StyledSongListItem = styled(ListGroupItem)`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[3]};
  box-sizing: border-box;
`;

const SongInformation = styled.div`
  font-size: ${(props) => props.theme.fontSizes[1]};
  margin-left: ${(props) => props.theme.space[3]};
  min-width: 0;

  b,
  p {
    margin: 0;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export interface SongListItemProps {
  style?: any;
  name: string;
  artist: string;
  jacket: string;
}

const SongListItem = ({ name, artist, jacket, style }: SongListItemProps) => {
  return (
    <StyledSongListItem style={style}>
      <Jacket src={jacket} />
      <SongInformation>
        <b>{name}</b>
        <p>{artist}</p>
      </SongInformation>
    </StyledSongListItem>
  );
};

export default SongListItem;
