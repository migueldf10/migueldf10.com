import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const NavBarContainer = styled.header`
	color: ${props => props.theme.fg};
	z-index: 9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 32px;
	background: ${props => props.theme.bg};
	position: sticky;
	top: 0px;
	a {
		transition: 0.5s;
		:hover {
			letter-spacing: 1px;
			font-variation-settings: 'wght' 900;
		}
	}
	a,
	.superCta span {
		text-decoration: none;
	}
	.contactMobile {
		display: none;
	}
	.headerTitles {
		font-size: 1rem;
	}
	a,
	span,
	h1,
	h2,
	h3 {
		font-family: 'League Spartan';
		font-variation-settings: 'wght' 240;
	}
	${MEDIA.PHONE`
		a,span,h1,h2,h3{
			font-size: 17px;

		}
		
		.contactDesktop{
			display:none;
		}
	`}
`

const ContactPill = styled.div`
	border-radius: 40px;
	padding: 10px 12px;
	.title {
		color: ${props => props.theme.fgLight};
	}
	.superCta {
		position: relative;
		padding-right: 24px;
		margin-right: -24px;
		padding-top: 8px;
		margin-top: -8px;
		:hover {
			span {
				transition: 0.5s;
				letter-spacing: 1px;
				font-variation-settings: 'wght' 900;
			}
		}
		span {
			position: relative;
			display: inline-block;
			z-index: 3;
		}
		::after {
			content: '';
			height: 12px;
			width: 12px;
			position: absolute;
			z-index: 1;
			border-radius: 40px;
			background-color: ${props => props.theme.ctaBg};
			/*transform: translate(0 -50%);*/
			/*right: 50%;*/
			top: 0px;
			right: 0px;
			box-shadow: 0px 0px 4px #00ee00aa, 0px 0px 2px #00ee00cc,
				0px 0px 6px #00ee0055, 0px 0px 10px #00ee0088;
		}
	}
`

class NavBar extends React.Component {
	render() {
		const { location, title = 'migueldf10' } = this.props
		const rootPath = `${__PATH_PREFIX__}/`
		let header

		if (location.pathname === rootPath) {
			header = (
				<h1 className="headerTitles">
					<Link to={`/`}>{title}</Link>
				</h1>
			)
		} else {
			header = (
				<h3 className="headerTitles">
					<Link to={`/`}>{'← ' + title}</Link>
				</h3>
			)
		}
		return (
			<NavBarContainer id="navBar">
				{header}
				<ContactPill>
					<span>
						<span className="title contactDesktop">Contact /</span>
						{` `}

						<a
							href={`https://linkedin.com/in/migueldf10`}
							className="contactDesktop"
						>
							LinkedIn
						</a>
						<span className="contactDesktop title"> / </span>
						<a
							href={`mailto:hi@migueldf10.com?subject=Hey!`}
							className="superCta"
						>
							<span>Email me</span>
						</a>
					</span>
				</ContactPill>
			</NavBarContainer>
		)
	}
}

export default NavBar
