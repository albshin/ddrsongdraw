import React from 'react';
import styled from '@emotion/styled';
import { List, Home } from 'react-feather';
import { NavIcon } from './shared';

const StyledBottomNav = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border-top: 1px solid ${(props) => props.theme.colors.gray[5]};
  color: ${(props) => props.theme.colors.grayDark};

  svg {
    height: ${(props) => props.theme.iconSize.default};
    width: ${(props) => props.theme.iconSize.default};
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
          <Home />
        </BottomNavIcon>
        <BottomNavIcon to="/browse">
          <List />
        </BottomNavIcon>
      </BottomNavContent>
    </StyledBottomNav>
  );
};

export default BottomNav;
