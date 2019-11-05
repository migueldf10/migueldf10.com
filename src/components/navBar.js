import React from "react"
import { Link } from "gatsby"
import { scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import theme from '../utils/theme'
import styled from 'styled-components'

const NavBarContainer = styled.header`
  /* background-color: ${theme.colorBlack}; */
  position: relative;
  color: ${theme.colorLight};
  z-index:9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 32px;
  transition: 0.1s;
  a{
    text-decoration: none;
    text-transform: uppercase;
  }
  .contactMobile {
    display:none;
  }
  ${MEDIA.PHONE`
    a,span,h1,h2,h3{
      font-size: 14px!important;
    }
    .contactMobile{
      display: inline-block;
    }
    .contactDesktop{
      display:none;
    }
  `}
`
class NavBar extends React.Component {
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
          scrollTopPosition: window.scrollY ,
        })
    }
    render() {
        const {location,title} = this.props;

        const rootPath = `${__PATH_PREFIX__}/`
        let header

    if (location.pathname === rootPath) {
      header = (
        <h1 className="headerTitles"> <Link to={`/`}>{title}</Link></h1>
      )
    } else {
      header = ( <h3 style={{margin: 0,...scale(0),}}className="headerTitles"><Link to={`/`}>{title}</Link></h3>)}
        return (
            <NavBarContainer id="navBar" style={{top: this.state.scrollTopPosition/1.3}}>
                {header} 
                
                <span className="contactDesktop">
                <span ><b>More</b> /</span>
                  {` `}
                  <a href={`https://twitter.com/migueldf10`}>
                    Twitter
                  </a>
                  {` / `}
                  <a href={`https://linkedin.com/in/migueldf10`}>
                    Linkedin
                  </a>
                  {` / `}
                  <a href={`mailto:migueldf10@gmail.com?subject=Hey!`}>
                    Email
                  </a>
                  </span>
                  <a href="#profileBio" className="contactMobile">Contact</a>
            </NavBarContainer>
        )
    }
}

export default NavBar

