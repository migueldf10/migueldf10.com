import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import Header from '../components/header'
// import Img from 'gatsby-image'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import ImageZoom from 'react-medium-image-zoom'

const Grid = styled.ul`
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -32px; /* gutter size offset */
    width: auto;

  }
  .my-masonry-grid_column {
    padding-left: 32px; /* gutter size */
    background-clip: padding-box;
  }
  /* Style your items */
  .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    background: grey;
    margin-bottom: 32px;
  }
  padding:0px;
  margin:0px;
  li {
    list-style:none;
    margin-bottom: 32px;

  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const imgs = data.allFile.nodes
    const breakpointColumnsImages = {
      default: 4,
      1100: 4,
      700: 2,
    };
    const breakpointColumnsPosts = {
      default: 2,
      1100: 2,
      700: 1,
    };

    return (
      <Layout location={this.props.location} title={siteTitle} type="fullwidth">
        <SEO title="All posts" />
        <Header 
          title="Hello, its Miguel Domenech" >
            <p>And this is my completely random blog.</p>
            </Header>
        <Grid id="onethingaday">
          <h3>#onethingaday_challenge</h3>
          <Masonry
              breakpointCols={breakpointColumnsImages}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
                {imgs.map((item,index) => {
                  return (
                    <li key={index} >
                      {/* <Link to={item.relativePath.split('/').slice(0,-1).join('/')}> */}
                      {/* <a href={item.childImageSharp.original.src}> */}
                      <ImageZoom
                        image={{
                          src: item.childImageSharp.fixed.src,
                          alt: '',
                          className: 'img',
                        }}
                        zoomImage={{
                          src: item.childImageSharp.original.src,
                          alt: ''
                        }}
                      />
                        {/* <Img fluid={item.childImageSharp.fluid}/> */}
                      {/* </a> */}
                    </li>
                  )
              })}
          </Masonry>
        </Grid>
        <Grid id="theBlog">
          <h3>#the_blog</h3>
          <p>.</p>

          <Masonry
              breakpointCols={breakpointColumnsPosts}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
                {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article key={node.fields.slug}>
                  <header>
                    <h3 style={{fontSize:'70px',}}>
                      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>{title}</Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt,}}/>
                  </section>
                </article>
              )
            })}
          </Masonry>
        </Grid>
        

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
    site {
      siteMetadata {
        title
      }
    }
    allFile (
      filter: { relativePath: {regex:"/^onethingaday/"}, extension: { eq:"jpg"}},
      sort: {fields:  relativePath order:DESC}){
      nodes{
        relativePath
        relativeDirectory
        childImageSharp{
          fixed(width: 400) {
            src
          }
          original{
            src
          }
        }
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
          }
        }
      }
    }
  }
`
