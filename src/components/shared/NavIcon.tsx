import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

const StyledNavIcon = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: inherit;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  display: flex;
  height: 100%;
  width: 100%;
  color: inherit;
  align-items: center;
  justify-content: center;
`;

export interface NavIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  to?: string;
}

const NavIcon = ({ children, to, ...props }: NavIconProps) => (
  <StyledNavIcon {...props}>
    {to ? <StyledLink to={to}>{children}</StyledLink> : children}
  </StyledNavIcon>
);

export default NavIcon;
