import React from 'react';
import styled from '@emotion/styled';

const NavItem = styled.div`
  display: flex;
  height: ${(props) => props.theme.navbarHeight};
  width: 50px;
  justify-content: center;
  align-items: center;

  svg {
    color: inherit;
    text-decoration: none;
  }
`;

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  background-color: #274463;
  font-weight: 500;
`;

interface NavbarProps {
  navLeft?: React.ReactNode;
  navRight?: React.ReactNode;
  title?: string;
}

const Navbar = ({ navLeft, navRight, title }: NavbarProps) => (
  <StyledNavbar>
    <NavItem>{navLeft}</NavItem>
    {title && <b>{title}</b>}
    <NavItem>{navRight}</NavItem>
  </StyledNavbar>
);

export default Navbar;
