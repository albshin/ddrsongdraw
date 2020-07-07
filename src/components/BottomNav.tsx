import React from 'react';
import styled from '@emotion/styled';
import { GiCardPickup } from 'react-icons/gi';
import { IoMdOptions } from 'react-icons/io';

import { LinkIcon } from './shared';

const StyledBottomNav = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const BottomNavContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => props.theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
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
    <BottomNavContent>
      <NavIconContainer>
        <LinkIcon to="draw-settings">
          <IoMdOptions />
        </LinkIcon>
      </NavIconContainer>
      <NavIconContainer onClick={handleCardDraw}>
        <GiCardPickup />
      </NavIconContainer>
    </BottomNavContent>
  </StyledBottomNav>
);

export default BottomNav;
