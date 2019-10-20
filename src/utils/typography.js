import Typography from "typography"




const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['IBM Plex Serif', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Gayathri', 'serif'],
  scaleRatio: 3,
  googleFonts: [
    {
      name: 'Gayathri',
      styles: [
        '400',
        '700',
      ],
    },
    {
      name: 'IBM Plex Serif',
      styles: [
        '400',
        '700',
      ],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      // fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
    blockquote: {
      ...adjustFontSizeTo('19px'),
      color: '#444',
      fontStyle: 'italic',
      paddingLeft: rhythm(13/16),
      marginLeft: rhythm(0),
      borderLeft: `2px solid #444`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    a: {
      color: '#B99309'
    }
  })
})





// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
