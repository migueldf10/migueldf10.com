import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import theme from '../utils/theme'
import styled from 'styled-components'

const NavBarContainer = styled.header`
  /* background-color: ${theme.colorBlack}; */
  position: relative;
  color: gray;
  z-index:9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 32px;
  a{
    text-decoration: none;
    text-transform: uppercase;
  }
  .contactMobile {
    display:none;
  }
  ${MEDIA.TABLET`
    a,span,h1,h2,h3{
      font-size: 18px;
    }
    .contactMobile{
      display: inline-block;
      background: white;
      height: 40px;
      width: 40px;
      border-radius: 40px;
      border: 2px solid white;
      box-shadow: -1px -1px 0px rgba(255, 255, 255, .7),
        1px -1px 0px rgba(255, 255, 255, .7),
        -1px 1px 0px rgba(255, 255, 255, .7),
        1px 1px 0px rgba(255, 255, 255, .7),
        -1px 2px 1px #a0a0a0,
        -2px 4px 2px #a0a0a0,
        -3px 6px 3px #a0a0a099,
        -4px 8px 4px #a0a0a077,
        -5px 10px 5px #a0a0a066,
        -6px 12px 6px #a0a0a055,
        -7px 13px 7px #a0a0a044,
        -8px 15px 8px #a0a0a044,
        -9px 17px 9px #a0a0a044,
        -10px 19px 10px #a0a0a033,
        -11px 20px 11px #a0a0a022,
        -12px 22px 12px #a0a0a022,
        -13px 24px 13px #a0a0a022,
        -14px 26px 14px #a0a0a022,
        -15px 28px 15px #a0a0a022,
        -16px 30px 16px #a0a0a022,
        -17px 32px 17px #a0a0a022,
        -18px 34px 18px #a0a0a022,
        -19px 36px 19px #a0a0a022,
        -20px 38px 20px #a0a0a022,
        -21px 39px 21px #a0a0a022,
        0px 2px 1px #00EE00EE,
        2px -4px 2px #00EE0022,
      2px 0px 2px #00EE0099,
      3px -6px 4px #00EE0044,
      10px -6px 4px #00EE0022;
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
class NavBar extends React.Component {
	render() {
		const { location, title } = this.props
		const rootPath = `${__PATH_PREFIX__}/`
		let header

		if (location.pathname === rootPath) {
			header = (
				<h1 className="headerTitles">
					{' '}
					<Link to={`/`}>{title}</Link>
				</h1>
			)
		} else {
			header = (
				<h3 style={{ margin: 0 }} className="headerTitles">
					<Link to={`/`}>{title}</Link>
				</h3>
			)
		}
		return (
			<NavBarContainer id="navBar">
				{header}

				<span className="contactDesktop">
					<span>
						<b>More</b> /
					</span>
					{` `}
					<a href={`https://twitter.com/migueldf10`}>Twitter</a>
					{` / `}
					<a href={`https://linkedin.com/in/migueldf10`}>Linkedin</a>
					{` / `}
					<a href={`mailto:migueldf10@gmail.com?subject=Hey!`}>
						Email
					</a>
				</span>
				<a href="#profileBio" className="contactMobile">
					{/* Contact */}
				</a>
			</NavBarContainer>
		)
	}
}

export default NavBar
