import React from 'react'
import Styles from '../utils/styles'
import MovingCursor from './movingCursor'
import NavBar from './navBar'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme/theme'
import Footer from '../components/footer'
if (typeof window !== 'undefined') {
	// Make scroll behavior of internal links smooth
	// eslint-disable-next-line global-require
	require('smooth-scroll')('a[href*="#"]')
}

export default class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props
		return (
			<ThemeProvider theme={theme}>
				<Styles />
				<NavBar location={location} title={title} />
				<main>
					<MovingCursor />
					<main>{children}</main>
				</main>
				<Footer />
			</ThemeProvider>
		)
	}
}
