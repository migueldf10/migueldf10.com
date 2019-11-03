import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
const Article  = styled.article`
    img{
        /* max-width: 100%; */
        /* max-height: 100vh; */
        width: auto;

    }
    .gatsby-resp-image-wrapper{
        width: 100%;
        height: 100vh;
        margin-bottom: 64px;
    }
    .gatsby-resp-image-background-image{
        max-width: 100%;
        max-height: 100vh;
        display:block;
        margin: 0px;
    }
    .gatsby-resp-image-image{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: auto;
        height: auto;
        max-height: 100vh;
    }
`
const Header = styled.header`
  position: fixed;
  left: 32px;
  max-width: 50%;
  top: 100px;
  mix-blend-mode: difference;
  color: teal!important;
  z-index:9;

`
class PhotobookTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext



    return (
      <Layout location={this.props.location} title={siteTitle} type="fullwidth">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Article>
          <Header>
            <div className="column column-one">
              <h1
                style={{
                  marginTop: rhythm(1),
                  marginBottom: 0,
                }}
                >
                {post.frontmatter.title}
              </h1>
              <blockquote
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginTop: rhythm(1.5),
                  marginBottom: rhythm(1.5),
                }}
                >
                {post.frontmatter.description || post.excerpt}
              </blockquote>
              <p
                style={{
                  ...scale(-1/2),
                  display: `block`,
                  margin: 0,
                }}
                >
                Article by Miguel Domenech {post.frontmatter.date}
              </p>
            </div>
            <div className="column column-two">
            </div>
          </Header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
            <Bio />
          </footer>
        </Article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default PhotobookTemplate

export const photoboookQuery = graphql`
  query PhotobookBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        img {
          childImageSharp {
            fluid(maxWidth: 2600 maxHeight:2600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
