import React from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps } from '@reach/router';

import { Layout, Content } from '../../components/shared';
import Navbar from '../../components/Navbar';
import { SongList } from './components/SongList';
import BottomNav from '../../components/BottomNav';

const StyledContent = styled(Content)`
  overflow: visible;
`;

const Browse: React.FC<RouteComponentProps> = () => (
  <Layout>
    <Navbar>
      <b>Browse</b>
    </Navbar>
    <StyledContent hasBottomNav>
      <SongList />
    </StyledContent>
    <BottomNav />
  </Layout>
);

export default Browse;
