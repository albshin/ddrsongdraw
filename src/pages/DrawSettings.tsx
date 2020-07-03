import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import Navbar from '../components/Navbar';
import { Layout, Content, LinkIcon } from '../components/shared';

const DrawSettings: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <Navbar
        navLeft={
          <LinkIcon to="/">
            <IoMdClose />
          </LinkIcon>
        }
        title="Draw Settings"
      />
      <Content>Draw Settings</Content>
    </Layout>
  );
};

export default DrawSettings;
