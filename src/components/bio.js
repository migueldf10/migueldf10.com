import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
// import styled from "styled-components"

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
    <div
      style={{
        marginBottom: "2.5rem",
        padding: `32px`,
      }}
      id="profileBio"
    >
      <hr
        style={{
          margin: "3rem",
          display: "block",
        }}
      />
      <div
        style={{
          display: `flex`,
          marginBottom: "2rem",
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: "24rem",
        }}
      >
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginRight: "0.5rem",
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
            Welcome to my personal corner of the internet!
            <br />
            in my free time, I love photography, traveling and the startup
            world.
          </p>
          <hr
            style={{
              marginBottom: "1.5rem",
            }}
          />
          <span>
            <b>More</b> /
          </span>
          {` `}
          <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
          {` / `}
          <a href={`https://linkedin.com/in/${social.linkedin}`}>Linkedin</a>
          {` / `}
          <a href={`mailto:${contact.email}?subject=Hey!`}>Email</a>
        </div>
      </div>
    </div>
  )
}

export default Bio
