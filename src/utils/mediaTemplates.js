import { css } from 'styled-components';

// This creates the media templates, which allows for simple
// breakpoint usage inside styled-components, e.g.:
//
// ${MEDIA.PHONE`
//   font-size: 1.6rem;
// `};
//
// ${MEDIA.MIN_TABLET`
//   display: flex;
// `};
//
// Edit or add breakpoints inside constants/breakpoints.js

const BREAKPOINTS = {
	DESKTOP: 992,
	TABLET: 768,
	PHONE: 420,
	MINIPHONE: 321,
};


const MEDIA = Object.keys(BREAKPOINTS).reduce((acc, label) => {
	acc[label] = (...args) => css`
    @media (max-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)};
    }
  `;

	acc[`MIN_${label}`] = (...args) => css`
    @media (min-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)};
    }
  `;

	return acc;
}, {});

export default MEDIA;
