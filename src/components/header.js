import React from "react"
// import { Link } from "gatsby"
// import Img from 'gatsby-image'
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import MEDIA from "../utils/mediaTemplates"
import theme from "../utils/theme"
import styled from "styled-components"

const HeaderContainer = styled.header`
  position: relative;
  max-width: 50%;
  top: 0px;
  mix-blend-mode: darken;
  color: ${theme.colorBlack}!important;
  z-index: 9;
  margin-top: 100px;
  margin-bottom: 200px;
  p,
  span,
  h1,
  h2,
  h3,
  h4 {
    line-height: 1;
  }
  h1 {
    font-size: 3rem;
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
    window.addEventListener("scroll", this.handleScroll)
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.updateWindowDimensions)
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
          transform: "translateY(" + this.state.scrollTopPosition + "px)",
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
