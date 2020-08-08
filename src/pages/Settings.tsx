import React, { useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { ArrowLeft } from 'react-feather';

import { Content, NavIcon, Layout } from '../components/shared';
import Navbar from '../components/Navbar';
import { ListGroup, ListGroupItem } from '../components/ListGroup';

const Settings: React.FC<RouteComponentProps> = () => (
  <Layout>
    <Navbar
      title="Settings"
      navLeft={
        <NavIcon to="/">
          <ArrowLeft />
        </NavIcon>
      }
    />
    <Content>
      <ListGroup title="General">
        <ListGroupItem link="about">About</ListGroupItem>
      </ListGroup>
    </Content>
  </Layout>
);

export default Settings;
