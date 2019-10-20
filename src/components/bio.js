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
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        marginBottom: rhythm(2.5),
      }}
    >

      <hr
            style={{
              marginBottom: rhythm(1),
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
      <p>
        After some enterpreneurships I had the opportunity to build a strong marketing and design full stack skillset. 
        I use these skills to drive growth to companies everyday being the creative and managing director of yumm.studio. 
        A work that I simply love doing.
        <br/>
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          Twitter
        </a>
        {` / `}
        <a href={`https://twitter.com/${social.twitter}`}>
          Linkedin
        </a>
        {` / `}
        <a href={`https://twitter.com/${social.twitter}`}>
          Email
        </a>
      </p>
    </div>
    </div>
  )
}

export default Bio
