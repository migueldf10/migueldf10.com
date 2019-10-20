import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const Header = styled.header`
  margin-bottom: ${rhythm(3)};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 0 ${rhythm(1)};

  ${MEDIA.TABLET`
    flex-direction: column;
  `};
  .column{
    display: block;
    height: auto;
    width: 50%;
    padding: 0 ${rhythm(1)};
    ${MEDIA.TABLET`
      width: 100%;
      padding: 0;

  `};
  }

`
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext



    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
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
              <Img fluid={post.frontmatter.img.childImageSharp.fluid} />
            </div>
          </Header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
            <Bio />
          </footer>
        </article>

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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
