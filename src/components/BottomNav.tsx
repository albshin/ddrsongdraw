import React from 'react';
import styled from '@emotion/styled';
import { IoMdListBox, IoMdHome } from 'react-icons/io';
import { NavIcon } from './shared';

const StyledBottomNav = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border-top: 1px solid ${(props) => props.theme.colors.gray[5]};
  color: ${(props) => props.theme.colors.grayDark};

  svg {
    width: 26px;
    height: 26px;
  }
`;

const BottomNavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => props.theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

const BottomNavIcon = styled(NavIcon)`
  flex: 1;
`;

const BottomNav = () => {
  return (
    <StyledBottomNav>
      <BottomNavContent>
        <BottomNavIcon to="/">
          <IoMdHome />
        </BottomNavIcon>
        <BottomNavIcon to="/browse">
          <IoMdListBox />
        </BottomNavIcon>
      </BottomNavContent>
    </StyledBottomNav>
  );
};

export default BottomNav;
