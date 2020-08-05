import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps } from '@reach/router';
import { IoMdSettings, IoMdSearch, IoMdClose } from 'react-icons/io';

import { Layout, Content, NavIcon } from '../../components/shared';
import Navbar from '../../components/Navbar';
import { SongList } from './components/SongList';

const StyledContent = styled(Content)`
  overflow: visible;
`;

const Browse: React.FC<RouteComponentProps> = () => {
  const [isSearchMode, setSearchMode] = useState(false);

  const handleOnSearch = useCallback(() => {
    setSearchMode(!isSearchMode);
  }, [isSearchMode]);

  return (
    <Layout>
      <Navbar
        navLeft={
          <NavIcon to="/settings">
            <IoMdSettings />
          </NavIcon>
        }
        navRight={
          <NavIcon onClick={handleOnSearch}>
            {!isSearchMode ? <IoMdSearch /> : <IoMdClose />}
          </NavIcon>
        }
      >
        {!isSearchMode ? 'Browse' : 'Search'}
      </Navbar>
      <StyledContent>
        <SongList />
      </StyledContent>
    </Layout>
  );
};

export default Browse;
