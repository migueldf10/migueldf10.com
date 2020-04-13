import { createGlobalStyle } from 'styled-components'
import 'normalize.css'

const Styles = createGlobalStyle`
	* {
		font-family: 'Inconsolata', 'Arial', sans-serif;
		color: inherit;
		text-decoration: inherit;
		color: ${props => props.theme.fg};
		cursor: none!important;
	}
	:root {
		font-size: 18px;
	}
	body{
		background-color: ${props => props.theme.bg};
		cursor: none !important;
		a,
		img {
			cursor: none !important;
		}

	}
	blockquote{
		padding:0px;
		margin:0px;
	}

`

export default Styles
