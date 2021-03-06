import React from 'react';
import styled from '@emotion/styled';
import { ChartProps } from '../../types';

const JacketContainer = styled.picture<
  Pick<JacketProps, 'size' | 'difficulty'>
>`
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.theme.radii.default};
  background-color: ${(props) => props.theme.colors.gray[1]};

  ${(props) =>
    props.difficulty &&
    `
  &::after {
    display: block;
    position: absolute;
    content: '';
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px -5px 0px ${props.theme.colors[props.difficulty]};
    border-radius: ${props.theme.radii.default};
  }
  `}
`;

const JacketImage = styled.img<Pick<JacketProps, 'size'>>`
  border-radius: ${(props) => props.theme.radii.default};
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export interface JacketProps
  extends Pick<Partial<ChartProps>, 'difficulty'>,
    React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

const Jacket = ({ src, size = 48, difficulty, ...props }: JacketProps) => {
  const sanitizedFilename = src.replace(/[\""]/g, '\\"');
  const baseFilename = sanitizedFilename.split('.').slice(0, -1).join('.');

  return (
    <JacketContainer size={size} difficulty={difficulty}>
      <source
        srcSet={encodeURI(`assets/jackets/${baseFilename}.webp`)}
        type="image/webp"
      />
      <source srcSet={encodeURI(`assets/jackets/${sanitizedFilename}`)} />
      <JacketImage
        src={`assets/jackets/${sanitizedFilename}`}
        size={size}
        alt=""
        {...props}
      />
    </JacketContainer>
  );
};

export default Jacket;
