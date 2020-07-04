import React, { HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

export interface ListGroupItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  link?: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledListGroupItem = styled.li`
  position: relative;
  display: block;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[3]};
  border: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-width: 1px 0 1px 0;
`;

export const ListGroupItem = ({ children, link }: ListGroupItemProps) =>
  link ? (
    <StyledLink to={link}>
      <StyledListGroupItem>{children}</StyledListGroupItem>
    </StyledLink>
  ) : (
    <StyledListGroupItem>{children}</StyledListGroupItem>
  );
