import React from 'react';
import styled from '@emotion/styled';
import { IoMdClose } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import Navbar from '../../components/Navbar';
import { Layout, Content, LinkIcon } from '../../components/shared';
import LevelRange from './LevelRange';

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
          <LinkIcon to="/">
            <IoMdClose />
          </LinkIcon>
        }
        title="Draw Settings"
      />
      <Content>
        <OptionSection>
          <OptionTitle>Level Range</OptionTitle>
          <LevelRange />
        </OptionSection>
      </Content>
    </Layout>
  );
};

export default DrawSettings;
