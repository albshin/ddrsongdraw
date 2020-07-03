import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IoMdArrowBack } from 'react-icons/io';

import { LinkIcon } from '../components/shared';
import Navbar from '../components/Navbar';

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
    Settings
  </>
);

export default Settings;
