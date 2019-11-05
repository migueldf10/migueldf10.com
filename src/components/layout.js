import React from "react"
import { Link } from "gatsby"
import theme from '../utils/theme'
import Styles from '../utils/styles'
import { rhythm, scale } from "../utils/typography"

import NavBar from './navBar'

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

export default class Layout extends React.Component {
  render() {
    const { location, title, children, type } = this.props
    
    let LayoutStyles = ""
    
    if (type ==="fullwidth"){
      LayoutStyles = {
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: '2600px',
        padding: `32px`,
      }
    } else {
      LayoutStyles = {
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `32px`,
      }
    }
    return (
      <Styles>
        <NavBar location={location} title={title}/>

        <div style={LayoutStyles}>
          <main>{children}</main>
          <hr/>
            <footer
              style={{
                ...scale(-0.3),
              }}>
              Miguel Domenech© {new Date().getFullYear()}, All rights reserved.
              {` `}
              {/* <a href="#profileBio">Contact</a> */}
            </footer>
        </div>
      </Styles>
    )
  }
}