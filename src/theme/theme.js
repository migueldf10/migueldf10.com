// Define our `fg` and `bg` on the theme
export const theme = {
	fgLight: "#999",
	fg: "#444444",
	fgAccent: "#222",
	bgLight: "#FFFFFF",
	bg: "#F1F1F1",
	bgAccent: "#DEDEDE",
	ctaBg: "#00EE00",
	ctaFg: "#002222",
	cursor: "#880088",
};
// This theme swaps `fg` and `bg`
export const invertTheme = () => ({
	fgAccent: theme.bgAccent,
	fg: theme.bg,
	fgLight: theme.bgLight,
	bgLight: theme.fgAccent,
	bg: theme.fg,
	bgAccent: theme.fgLight,
	ctaBg: "#00AA00",
	ctaFg: "#333",
	cursor: theme.ctaBg,

});