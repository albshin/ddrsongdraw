import React from 'react';
import styled from '@emotion/styled';

const StyledBottomNav = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSizes[4]};
  border-top: 1px solid ${(props) => props.theme.colors.gray[2]};
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

const BottomNav = () => (
  <StyledBottomNav>
    <BottomNavContent>
      <NavIconContainer></NavIconContainer>
      <NavIconContainer></NavIconContainer>
    </BottomNavContent>
  </StyledBottomNav>
);

export default BottomNav;
