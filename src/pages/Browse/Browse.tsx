import React from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps } from '@reach/router';
import { Settings } from 'react-feather';

import { Layout, Content, NavIcon } from '../../components/shared';
import Navbar from '../../components/Navbar';
import { SongList } from './components/SongList';
import BottomNav from '../../components/BottomNav';

const StyledContent = styled(Content)`
  overflow: visible;
`;

const Browse: React.FC<RouteComponentProps> = () => (
  <Layout>
    <Navbar
      navLeft={
        <NavIcon to="/settings">
          <Settings />
        </NavIcon>
      }
    >
      <b>Browse</b>
    </Navbar>
    <StyledContent hasBottomNav>
      <SongList />
    </StyledContent>
    <BottomNav />
  </Layout>
);

export default Browse;
