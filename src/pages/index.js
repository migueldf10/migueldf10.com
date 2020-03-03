import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import Header from "../components/header"
import Img from "gatsby-image"
import styled from "styled-components"
// import ImageZoom from "react-medium-image-zoom"
import MEDIA from "../utils/mediaTemplates"
import ArticleGridItem from "../components/articleGridItem"
const Content = styled.div`
  max-width: 1080px;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: white;
  /* margin: auto; */

  .blogPosts {
    width: 60%;
    display: inline-block;
    padding-left: 32px;
  }
  ${MEDIA.PHONE`
    flex-direction: column;
    .blogPosts{
      width: 100%;
    }
  `}
`
const ImageWrapper = styled.div`
  .gatsby-image-wrapper {
    height: 70vh;
  }
  width: 40%;
  position: sticky;
  top: 32px;
  margin: 0 0 auto 0;
  ${MEDIA.PHONE`
    width: 80%;
    position: static;
    text-align: center;
    margin: 32px auto;
    .gatsby-image-wrapper {
      height: 40vh;
    }

  `}
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    // const imgs = data.allFile.nodes

    return (
      <Layout location={this.props.location} title={siteTitle} type="fullwidth">
        <SEO title="All posts" />
        <Header title="Hello, its Miguel Domenech">
          <p>
            <mark>I’m a full stack marketer and web designer.</mark>
            <br />I help start-ups as a freelancer in{" "}
            <a href="https://yumm.studio">Yumm Studio</a>.
          </p>
        </Header>
        <Content>
          <ImageWrapper>
            <Img fluid={data.profileImg.childImageSharp.fluid} />
          </ImageWrapper>
          <div className="blogPosts">
            {posts.map(({ node }) => {
              return <ArticleGridItem key={node.fields.slug} node={node} />
            })}
          </div>
        </Content>

        <Bio />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    icon: file(relativePath: { eq: "cursor+.png" }) {
      relativePath
    }
    profileImg: file(relativePath: { eq: "Miguel-Domenech.jpg" }) {
      relativePath
      childImageSharp {
        fluid(maxWidth: 960) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
