import React, { useCallback } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import { useStore } from '../stores/drawStore';
import { Layout, Content } from '../components/shared';
import LinkIcon from '../components/LinkIcon';
import Navbar from '../components/Navbar';
import ChartList from '../components/ChartList';
import BottomNav from '../components/BottomNav';

const CardDraw: React.FC<RouteComponentProps> = () => {
  const { chartsDraw } = useStore();

  const handleCardDraw = useCallback(() => {
    chartsDraw();
  }, []);

  return (
    <Layout>
      <Navbar
        navRight={
          <LinkIcon to="settings">
            <IoMdSettings />
          </LinkIcon>
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
