import React from 'react';
import styled from '@emotion/styled';
import { X } from 'react-feather';
import { RouteComponentProps } from '@reach/router';

import Navbar from '../../components/Navbar';
import { Layout, Content, NavIcon } from '../../components/shared';
import LevelRange from './LevelRange';
import Difficulties from './Difficulties';

const OptionSection = styled.div`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const OptionTitle = styled.p`
  margin: 0;
  padding: ${(props) => props.theme.space[3]};
  color: ${(props) => props.theme.colors.textMuted};
`;

const DrawSettings: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <Navbar
        navLeft={
          <NavIcon to="/">
            <X />
          </NavIcon>
        }
        title="Draw Settings"
      />
      <Content>
        <OptionSection>
          <OptionTitle>Difficulties</OptionTitle>
          <Difficulties />
        </OptionSection>
        <OptionSection>
          <OptionTitle>Level Range</OptionTitle>
          <LevelRange />
        </OptionSection>
      </Content>
    </Layout>
  );
};

export default DrawSettings;
