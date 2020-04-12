// Define our `fg` and `bg` on the theme
export const theme = {
	fg: "#444444",
	bg: "#F4F4F4",
	bgAccent: "#EEEEEE"
};
// This theme swaps `fg` and `bg`
export const invertTheme = () => ({
	fg: theme.bg,
	bg: theme.fg
});