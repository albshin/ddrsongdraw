import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IoMdArrowBack } from 'react-icons/io';

import { Content, LinkIcon } from '../components/shared';
import Navbar from '../components/Navbar';
import { ListGroup, ListGroupItem } from '../components/ListGroup';

const Settings: React.FC<RouteComponentProps> = () => (
  <>
    <Navbar
      title="Settings"
      navLeft={
        <LinkIcon to="/">
          <IoMdArrowBack />
        </LinkIcon>
      }
    />
    <Content>
      <ListGroup title="General">
        <ListGroupItem link="/settings/about">About</ListGroupItem>
      </ListGroup>
    </Content>
  </>
);

export default Settings;
