import React from 'react'
// import { Link } from "gatsby"
// import Img from 'gatsby-image'
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import theme from '../utils/theme'
import styled from 'styled-components'

const HeaderContainer = styled.header`
	position: relative;
	max-width: 50%;
	top: 0px;
	mix-blend-mode: darken;
  /* color: ${theme.colorBlack}!important; */
	z-index: 9;
	margin-top: 100px;
	margin-bottom: 200px;
	p,
	span,
	h1,
	h2,
	h3,
	h4,
	a {
		color: inherit;
		line-height: 1;
	}
	h1 {
		/* font-size: 3rem; */
			margin: 0;
			font-size: 20vw;
			font-family: 'Decovar Regular24';
			color: white;
			font-variation-settings: 'SSTR' 1000;
      animation: loadin 8s infinite linear;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-align: center;
      transform: translateZ(0);
      backface-visibility: hidden;
      text-shadow: 
        -1px -1px 0px rgba(255, 255, 255, .7),
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
        -21px 39px 21px #a0a0a022;
		}

		@keyframes loadin {
			0% {
        font-variation-settings: 'SSTR' 0;
			}
			100% {
        font-variation-settings: 'SSTR' 1000;
			}
		}
	h2 {
		font-size: 2rem;
	}
	p {
		font-size: 2rem;
		line-height: 1.4;
		margin: 0px;
		margin-top: 10px;
	}
	/* transition: 0.1s; */
	max-width: 100%;
	${MEDIA.MIN_TABLET`
  max-width: 80%;
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 4rem;
  }
  p {
    font-size: 3rem;
  }
  `} /* opacity: 1; */
`
class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollTopOpacity: 1,
			scrollTopPosition: 0,
			windowHeight: 0,
			windowWidth: 0,
		}
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
		this.updateWindowDimensions()
		window.addEventListener('resize', this.updateWindowDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
		window.removeEventListener('resize', this.updateWindowDimensions)
	}

	updateWindowDimensions() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		})
	}

	handleScroll = ev => {
		let scrollTopVal = (300 - window.scrollY) / 300
		this.setState({
			scrollTopOpacity: scrollTopVal,
			scrollTopPosition: window.scrollY / 3,
		})
	}
	render() {
		const { title, children } = this.props

		// let headerOpacity = this.state.scrollTop
		return (
			<HeaderContainer
				style={{
					transform:
						'translateY(' + this.state.scrollTopPosition + 'px)',
				}}
			>
				<div className="column">
					<h1 style={{ opacity: this.state.scrollTopOpacity + 0.1 }}>
						{title}
					</h1>
					<div style={{ opacity: this.state.scrollTopOpacity + 0.1 }}>
						{children}
					</div>
				</div>
			</HeaderContainer>
		)
	}
}

export default Header
