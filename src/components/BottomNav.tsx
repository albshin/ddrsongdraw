import React from 'react';
import styled from '@emotion/styled';
import { GiCardPickup } from 'react-icons/gi';
import { IoMdOptions } from 'react-icons/io';

const StyledBottomNav = styled.footer`
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
  height: 50px;
  width: 50px;

  svg {
    height: 24px;
    width: 24px;
  }
`;

interface BottomNavProps {
  handleCardDraw: () => void;
}

const BottomNav = ({ handleCardDraw }: BottomNavProps) => (
  <StyledBottomNav>
    <NavIconContainer>
      <IoMdOptions />
    </NavIconContainer>
    <NavIconContainer onClick={handleCardDraw}>
      <GiCardPickup />
    </NavIconContainer>
  </StyledBottomNav>
);

export default BottomNav;
