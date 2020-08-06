import React, { HTMLAttributes, ReactNode, useCallback } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

export interface ListGroupItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  interactive?: boolean;
  link?: string;
  value?: string | number;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement>,
    value?: string | number
  ) => void;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
`;

export const StyledListGroupItem = styled.li<ListGroupItemProps>`
  position: relative;
  display: block;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[3]};
  border: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-width: 1px 0 1px 0;

  ${(props) =>
    props.interactive &&
    `
    cursor: pointer;
  `}

  &:active {
    color: ${(props) => props.interactive && props.theme.colors.white};
    background-color: ${(props) =>
      props.interactive && props.theme.colors.blue};
  }
`;

export const ListGroupItem = ({
  className,
  children,
  interactive,
  link,
  value,
  onClick,
  ...props
}: ListGroupItemProps) => {
  const handleOnClickWithValue = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      value ? onClick(e, value) : onClick(e);
    },
    []
  );

  return link ? (
    <StyledLink to={link}>
      <StyledListGroupItem
        className={className}
        value={value}
        interactive={interactive || link !== undefined}
        onClick={onClick !== undefined ? handleOnClickWithValue : null}
        {...props}
      >
        {children}
      </StyledListGroupItem>
    </StyledLink>
  ) : (
    <StyledListGroupItem
      className={className}
      value={value}
      interactive={interactive || link !== undefined}
      onClick={onClick !== undefined ? handleOnClickWithValue : null}
      {...props}
    >
      {children}
    </StyledListGroupItem>
  );
};
