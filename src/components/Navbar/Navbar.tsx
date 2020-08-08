import React from 'react';
import styled from '@emotion/styled';
import { NavIcon } from '../shared';

const NavbarContent = styled.div`
  display: flex;
  max-width: ${(props) => props.theme.maxWidth};
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const NavbarPlaceholder = styled(NavIcon)`
  cursor: none;
  pointer-events: none;
`;

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  color: ${(props) => props.theme.colors.white};
  background-color: #274463;
  font-weight: 500;

  svg {
    height: ${(props) => props.theme.iconSize.default};
    width: ${(props) => props.theme.iconSize.default};
    color: inherit;
    text-decoration: none;
  }
`;

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  navLeft?: React.ReactNode;
  navRight?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
}

const Navbar = ({ navLeft, navRight, title, children }: NavbarProps) => (
  <StyledNavbar>
    <NavbarContent>
      {navLeft || <NavbarPlaceholder />}
      {title && <b>{title}</b>}
      {children}
      {navRight || <NavbarPlaceholder />}
    </NavbarContent>
  </StyledNavbar>
);

export default Navbar;
