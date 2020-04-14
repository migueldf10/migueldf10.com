import React from 'react'
import Styles from '../utils/styles'
import MovingCursor from './movingCursor'
import NavBar from './navBar'
import { ThemeProvider } from 'styled-components'
import { theme, invertTheme } from '../theme/theme'
import LightSwitcher from './lightSwitcher'
import Footer from '../components/footer'

if (typeof window !== 'undefined') {
	// Make scroll behavior of internal links smooth
	// eslint-disable-next-line global-require
	require('smooth-scroll')('a[href*="#"]')
}

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dark: false,
		}
	}

	toggleDarkmode = () => {
		this.setState(prevState => {
			return { dark: !prevState.dark }
		})
	}
	render() {
		const { location, title, children } = this.props
		let useTheme = theme
		if (this.state.dark) {
			useTheme = invertTheme
		}
		return (
			<ThemeProvider theme={useTheme}>
				<Styles />
				<LightSwitcher switcher={this.toggleDarkmode} />
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
