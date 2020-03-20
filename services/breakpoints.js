import { css } from 'styled-components';

/*
  Apply styled above a certain breakpoint
  Used like:
  ${above.md`
    ...styles
  `}

  ${below.md`
    ...styles
  `}
*/

export const size = {
  sm: 400,
  md: 1090,
  lg: 1440,
};

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const below = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
