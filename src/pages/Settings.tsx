import React, { useCallback } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { ArrowLeft } from 'react-feather';

import { Content, NavIcon } from '../components/shared';
import Navbar from '../components/Navbar';
import { ListGroup, ListGroupItem } from '../components/ListGroup';

const Settings: React.FC<RouteComponentProps> = () => {
  const handleOnClickBack = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <Navbar
        title="Settings"
        navLeft={
          <NavIcon onClick={handleOnClickBack}>
            <ArrowLeft />
          </NavIcon>
        }
      />
      <Content>
        <ListGroup title="General">
          <ListGroupItem link="about">About</ListGroupItem>
        </ListGroup>
      </Content>
    </>
  );
};

export default Settings;
