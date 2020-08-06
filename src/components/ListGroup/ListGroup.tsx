import React, { ReactNode, HTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { StyledListGroupItem } from './ListGroupItem';

export interface ListGroupProps extends HTMLAttributes<HTMLUListElement> {
  title?: string;
  children?: ReactNode;
}

const StyledListGroup = styled.ul<ListGroupProps>`
  margin: 0;
  padding: 0;

  ${StyledListGroupItem}:not(:first-of-type) {
    border-top-width: 0;
  }
`;

const ListGroupTitle = styled.p`
  display: block;
  margin: 0;
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  color: ${(props) => props.theme.colors.textMuted};
`;

export const ListGroup = ({ title, children, ...props }: ListGroupProps) => (
  <>
    {title && <ListGroupTitle>{title}</ListGroupTitle>}
    <StyledListGroup {...props}>{children}</StyledListGroup>
  </>
);
