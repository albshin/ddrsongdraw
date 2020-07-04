import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {}

export const Section = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-width: 1px 0 1px 0;
  padding: ${(props) => props.theme.space[3]};
`;
