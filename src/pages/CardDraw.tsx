import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import { IoMdSettings } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import { useStore } from '../stores/drawStore';
import Navbar from '../components/Navbar';
import ChartList from '../components/ChartList';
import BottomNav from '../components/BottomNav';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const CardDraw: React.FC<RouteComponentProps> = () => {
  const { chartsDraw } = useStore();

  const handleCardDraw = useCallback(() => {
    chartsDraw();
  }, []);

  return (
    <Layout>
      <Navbar
        navRight={
          <Link to="settings">
            <IoMdSettings />
          </Link>
        }
        title="Card Draw"
      />
      <Content>
        <ChartList />
      </Content>
      <BottomNav handleCardDraw={handleCardDraw} />
    </Layout>
  );
};

export default CardDraw;
