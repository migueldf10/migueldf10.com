// Define our `fg` and `bg` on the theme
export const theme = {
	fgLight: "#999",
	fg: "#444444",
	fgAccent: "#222",
	bgLight: "#EEE",
	bg: "#F4F4F4",
	bgAccent: "#DEDEDE",
	ctaBg: "#00EE00",
	ctaFg: "#002222",
};
// This theme swaps `fg` and `bg`
export const invertTheme = () => ({
	fgAccent: theme.bgAccent,
	fg: theme.bg,
	fgLight: theme.bgLight,
	bgLight: theme.fgAccent,
	bg: theme.fg,
	bgAccent: theme.fgLight,
	ctaBg: "#002200",
	ctaFg: "#FFF",

});