import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import {theme} from '../utils/theme'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  position: fixed;
  left: 32px;
  max-width: 50%;
  top: 100px;
  mix-blend-mode: difference;
  color: ${theme.colorBlack}!important;
  z-index:9;
  /* opacity: 1; */

`
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            scrollTop: 1,
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
            scrollTop: scrollTopVal
        })
    }
    render() {
        const {title,subtitle,date} = this.props;

        // let headerOpacity = this.state.scrollTop
        return (
            <HeaderContainer >
                <div className="column">
                    <h1 style={{opacity: this.state.scrollTop+1}}>{title} </h1>
                    <p style={{opacity: this.state.scrollTop+0.3}}>
                    {subtitle}
                    </p>
                    <p style={{opacity: this.state.scrollTop}}>
                    Article by Miguel Domenech {date}
                    </p>
                </div>
            </HeaderContainer>
        )
    }
}

export default Header

