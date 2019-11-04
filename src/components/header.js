import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  position: fixed;
  left: 32px;
  max-width: 50%;
  top: 100px;
  mix-blend-mode: difference;
  color: teal!important;
  z-index:9;

`
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        scrollTop: 0,
        };
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    handleScroll = ev => {
        let scrollTopVal = window.scrollY;
        this.setState({
            scrollTop: scrollTopVal
        })
    }
    render() {
        const {title,subtitle,date} = this.props;
        return (
            <HeaderContainer style={{marginLeft:this.state.scrollTop}}>
            <div className="column">
                <h1 style={{marginTop: rhythm(1),marginBottom: 0}}> {this.state.scrollTop} - {title} </h1>
                <blockquote
                    style={{
                        ...scale(-1 / 5),
                        display: `block`,
                        marginTop: rhythm(1.5),
                        marginBottom: rhythm(1.5),
                    }}
                >
                {subtitle}
                </blockquote>
                <p
                    style={{
                        ...scale(-1/2),
                        display: `block`,
                        margin: 0,
                    }}
                >
                Article by Miguel Domenech {date}
                </p>
            </div>
            </HeaderContainer>
        )
    }
}

export default Header

