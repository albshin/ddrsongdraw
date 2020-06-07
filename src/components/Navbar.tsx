import React from 'react';
import styled from '@emotion/styled';

const NavItem = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;

  svg {
    color: white;
    text-decoration: none;
    height: 24px;
    width: 24px;
  }
`;

const StyledNavbar = styled.nav`
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
