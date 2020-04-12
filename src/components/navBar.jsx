import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const NavBarContainer = styled.header`
	position: relative;
	color: gray;
	z-index: 9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 32px;
	a {
		text-decoration: none;
		text-transform: uppercase;
	}
	.contactMobile {
		display: none;
	}
	.headerTitles {
		font-size: 1rem;
	}
	${MEDIA.TABLET`
		a,span,h1,h2,h3{
			font-size: 18px;
		}
		.contactMobile{
			display: inline-block;
		
		}
		.contactDesktop{
			display:none;
		}
	`}
	${MEDIA.PHONE`
		a,span,h1,h2,h3{
			font-size: 14px;
		}
	`}
`

const ContactPill = styled.div`
	background: white;
	border-radius: 40px;
	padding: 10px 12px;

	box-shadow: -1px -1px 0px rgba(255, 255, 255, 0.5),
		1px -1px 0px rgba(255, 255, 255, 0.5),
		-1px 1px 0px rgba(255, 255, 255, 0.5),
		1px 1px 0px rgba(255, 255, 255, 0.5), -1px 2px 1px #a0a0a0,
		-2px 4px 2px #a0a0a0, -3px 6px 3px #a0a0a099, -4px 8px 4px #a0a0a077,
		-5px 6px 5px #a0a0a033, -6px 12px 6px #a0a0a044, -7px 13px 7px #a0a0a044,
		-8px 15px 8px #a0a0a033, -9px 14px 6px #a0a0a044,
		-10px 19px 10px #a0a0a033, -11px 12px 7px #a0a0a022,
		-12px 22px 12px #a0a0a022, -21px 39px 21px #a0a0a022,
		1px -1px 1px #00ee00ee, 3px -3px 3px #00ee0022;
`

class NavBar extends React.Component {
	render() {
		const { location, title } = this.props
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
					<Link to={`/`}>{title}</Link>
				</h3>
			)
		}
		return (
			<NavBarContainer id="navBar">
				{header}
				<ContactPill>
					<span className="contactDesktop">
						<span>
							<b>More</b> /
						</span>
						{` `}

						<a href={`https://linkedin.com/in/migueldf10`}>
							Linkedin
						</a>
						{` / `}
						<a href={`mailto:migueldf10@gmail.com?subject=Hey!`}>
							Email
						</a>
					</span>
					<a href="#profileBio" className="contactMobile">
						Contact
					</a>
				</ContactPill>
			</NavBarContainer>
		)
	}
}

export default NavBar
