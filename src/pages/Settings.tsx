import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { IoMdArrowBack } from 'react-icons/io';

import Navbar from '../components/Navbar';

const Settings: React.FC<RouteComponentProps> = () => (
  <>
    <Navbar
      title="Settings"
      navLeft={
        <Link to="/">
          <IoMdArrowBack />
        </Link>
      }
    />
    Settings
  </>
);

export default Settings;
