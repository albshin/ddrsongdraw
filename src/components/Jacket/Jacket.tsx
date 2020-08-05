import React from 'react';
import styled from '@emotion/styled';
import { ChartProps } from '../../types';

const JacketContainer = styled.div<Pick<JacketProps, 'size'>>`
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const JacketImage = styled.img<Pick<JacketProps, 'size'>>`
  border-radius: ${(props) => props.theme.radii.default};
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

// Emotion really doesn't like being able to access the theme in psuedo-elements...
const JacketDifficulty = styled.div<Pick<JacketProps, 'difficulty'>>`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0px -5px 0px ${(props) => props.theme.colors[props.difficulty]};
  border-radius: ${(props) => props.theme.radii.default};
`;

export interface JacketProps
  extends Pick<Partial<ChartProps>, 'difficulty'>,
    React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

const Jacket = ({ src, size = 48, difficulty, ...props }: JacketProps) => (
  <JacketContainer size={size}>
    <JacketImage
      src={`assets/jackets/${src.replace(/[\""]/g, '\\"')}`}
      size={size}
      {...props}
    />
    {difficulty && (
      <JacketDifficulty difficulty={difficulty} role="presentation" />
    )}
  </JacketContainer>
);

export default Jacket;
