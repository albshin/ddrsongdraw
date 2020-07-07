import styled from '@emotion/styled';
import { default as RCSlider } from 'rc-slider';
import { SliderProps as RCSliderProps, Range, RangeProps } from 'rc-slider';

export interface SliderProps extends RCSliderProps {}

export const Slider = styled(RCSlider)<SliderProps>`
  position: relative;
  height: 6px;
  width: 100%;
  border-radius: ${(props) => props.theme.radii.pill};
  touch-action: none;
  padding-top: 7px;
  padding-bottom: 7px;

  .rc-slider-rail {
    position: absolute;
    width: 100%;
    height: 6px;
    background-color: ${(props) => props.theme.colors.gray[3]};
    border-radius: ${(props) => props.theme.radii.pill};
  }

  .rc-slider-track {
    position: absolute;
    height: 6px;
    background-color: ${(props) => props.theme.colors.blue};
  }

  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 6px;
  }

  .rc-slider-handle {
    position: absolute;
    width: 18px;
    height: 18px;
    margin-top: -7px;
    cursor: grab;
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.blue};
    border-radius: ${(props) => props.theme.radii.pill};
    touch-action: pan-x;
    -webkit-tap-highlight-color: transparent;
  }
`;

export interface SliderRangeProps extends RangeProps {}

export const SliderRange = styled(Range)<SliderRangeProps>`
  position: relative;
  height: 6px;
  width: 100%;
  border-radius: ${(props) => props.theme.radii.pill};
  touch-action: none;
  padding-top: 7px;
  padding-bottom: 7px;

  .rc-slider-rail {
    position: absolute;
    width: 100%;
    height: 6px;
    background-color: ${(props) => props.theme.colors.gray[3]};
    border-radius: ${(props) => props.theme.radii.pill};
  }

  .rc-slider-track {
    position: absolute;
    height: 6px;
    background-color: ${(props) => props.theme.colors.blue};
  }

  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 6px;
  }

  .rc-slider-handle {
    position: absolute;
    width: 18px;
    height: 18px;
    margin-top: -7px;
    cursor: grab;
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.blue};
    border-radius: ${(props) => props.theme.radii.pill};
    touch-action: pan-x;
    -webkit-tap-highlight-color: transparent;
  }
`;
