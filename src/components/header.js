import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import theme from '../utils/theme'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  position: relative;
  max-width: 50%;
  top: 0px;
  mix-blend-mode: darken;
  color: ${theme.colorBlack}!important;
  z-index:9;
  transition: 0.1s;
  ${MEDIA.PHONE`
    max-width: 100%;
  `}
  /* opacity: 1; */

`
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            scrollTopOpacity: 1,
            scrollTopPosition: 0,
            windowHeight: 0,
            windowWidth: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      }


    handleScroll = ev => {
        let scrollTopVal = ( 300 - window.scrollY ) / 300 ;
        this.setState({
            scrollTopOpacity: scrollTopVal,
            scrollTopPosition: window.scrollY /3,
        })
    }
    render() {
        const {title,subtitle,date} = this.props;

        // let headerOpacity = this.state.scrollTop
        return (
            <HeaderContainer style={{top: this.state.scrollTopPosition}}>
                <div className="column" >
                    <h1 style={{opacity: this.state.scrollTopOpacity+0.1}}>{title} </h1>
                    <p style={{opacity: this.state.scrollTopOpacity+0.1}}>
                    {subtitle}
                    </p>
                    <p style={{opacity: this.state.scrollTopOpacity}}>
                    Article by Miguel Domenech {date}
                    </p>
                </div>
            </HeaderContainer>
        )
    }
}

export default Header

