import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IoMdArrowBack, IoLogoGithub } from 'react-icons/io';

import { Content, LinkIcon } from '../components/shared';
import Navbar from '../components/Navbar';
import { Section } from '../components/Section';

const About: React.FC<RouteComponentProps> = () => (
  <>
    <Navbar
      navLeft={
        <LinkIcon to="/settings">
          <IoMdArrowBack />
        </LinkIcon>
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
        The source code is available on <IoLogoGithub />
        <a href="https://github.com/albshin/ddrsongdraw">GitHub</a>. All
        contributions are welcome!
      </Section>
    </Content>
  </>
);

export default About;
