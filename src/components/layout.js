import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(0),
            margin: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            margin: 0,
            ...scale(0),

          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
      >
        <header
          style={{
            borderBottom: `1px solid #999`,
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',


          }}>{header} 
          <a
            style={{
              ...scale(-1/2),
            }}
            href="#profileBio">Contact</a></header>

        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
          }}
        >


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
      </div>
    )
  }
}

export default Layout
