import React from 'react';
import styled from '@emotion/styled';
import { GiCardPickup } from 'react-icons/gi';
import { IoMdOptions } from 'react-icons/io';

import { LinkIcon } from './shared';

const StyledBottomNav = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const NavIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.theme.navbarHeight};
  width: 50px;
`;

interface BottomNavProps {
  handleCardDraw: () => void;
}

const BottomNav = ({ handleCardDraw }: BottomNavProps) => (
  <StyledBottomNav>
    <NavIconContainer>
      <LinkIcon to="draw-settings">
        <IoMdOptions />
      </LinkIcon>
    </NavIconContainer>
    <NavIconContainer onClick={handleCardDraw}>
      <GiCardPickup />
    </NavIconContainer>
  </StyledBottomNav>
);

export default BottomNav;
