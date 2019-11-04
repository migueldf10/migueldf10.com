/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            linkedin
          }
          contact {
            email
          }
        }
      }
    }
  `)

  const { author, social, contact } = data.site.siteMetadata
  return (
    <div style={{marginBottom: rhythm(2.5),}} id="profileBio">
      <hr
            style={{
              margin: rhythm(3),
              display: 'block'
            }}
          />
      <div
        style={{
          display: `flex`,
          marginBottom: rhythm(2.5),
        }}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <p>
        After some enterpreneurships I had the opportunity to build a strong marketing and design full stack skillset. 
        I use these skills to drive growth to companies everyday being the creative and managing director of yumm.studio. 
        A work that I simply love doing.
        </p>
        <hr style={{
          marginBottom: rhythm(1.5)
        }}/>
        <span><b>More</b> /</span>
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          Twitter
        </a>
        {` / `}
        <a href={`https://linkedin.com/in/${social.linkedin}`}>
          Linkedin
        </a>
        {` / `}
        <a href={`mailto:${contact.email}?subject=Hey!`}>
          Email
        </a>
      </div>

    </div>
    </div>
  )
}

export default Bio
