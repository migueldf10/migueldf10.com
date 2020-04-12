import React from 'react'
import Styles from '../utils/styles'
import MovingCursor from './movingCursor'
import NavBar from './navBar'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme, invertTheme } from '../theme/theme'

if (typeof window !== 'undefined') {
	// Make scroll behavior of internal links smooth
	// eslint-disable-next-line global-require
	require('smooth-scroll')('a[href*="#"]')
}

export default class Layout extends React.Component {
	render() {
		const { location, title, children, type } = this.props
		return (
			<ThemeProvider theme={theme}>
				<Styles />
				<NavBar location={location} title={title} />
				<main>
					<MovingCursor />
					<main>{children}</main>
					<hr />
					<footer>
						Miguel Domenech© {new Date().getFullYear()}, All rights
						reserved.
						{` `}
						{/* <a href="#profileBio">Contact</a> */}
					</footer>
				</main>
			</ThemeProvider>
		)
	}
}
