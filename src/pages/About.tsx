import React from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps } from '@reach/router';
import { ArrowLeft, GitHub } from 'react-feather';

import { Content, NavIcon } from '../components/shared';
import Navbar from '../components/Navbar';
import { Section } from '../components/Section';

const GitHubInfo = styled.div`
  display: inline-flex;
  align-self: center;

  svg {
    top: 0.125em;
    position: relative;
    height: 1em;
    width: 1em;
    margin-right: ${(props) => props.theme.space[1]};
  }
`;

const About: React.FC<RouteComponentProps> = () => (
  <>
    <Navbar
      navLeft={
        <NavIcon to="/settings">
          <ArrowLeft />
        </NavIcon>
      }
      title="About"
    />
    <Content>
      <Section>
        <b>Song Draw</b> is an app that randomly "draws" songs to play from the
        arcade game <i>DanceDanceRevolution</i>.
        <br />
        <br />
        This app is inspired by{' '}
        <a href="https://ddrdraw.surge.sh/">DDRCardDraw</a> but without a focus
        on tournament features such as "banning" and "pocket picking".
        <br />
        <br />
        The source code is available on{' '}
        <GitHubInfo>
          <GitHub />
          <a href="https://github.com/albshin/ddrsongdraw">GitHub</a>
        </GitHubInfo>
        . All contributions are welcome!
      </Section>
    </Content>
  </>
);

export default About;
