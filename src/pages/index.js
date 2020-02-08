import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import Header from "../components/header"
// import Img from 'gatsby-image'
import styled from "styled-components"
import Masonry from "react-masonry-css"
import ImageZoom from "react-medium-image-zoom"
import MEDIA from "../utils/mediaTemplates"
const Grid = styled.ul`
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -32px; /* gutter size offset */
    width: auto;
    margin-top: 200px;
    margin-bottom: 200px;
  }
  .my-masonry-grid_column {
    padding-left: 32px; /* gutter size */
    background-clip: padding-box;
  }
  /* Style your items */
  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    background: grey;
    margin-bottom: 100px;
  }
  .intro {
    max-width: 75%;
    ${MEDIA.PHONE`
      max-width: 100%;
    `}
  }

  .my-masonry-grid_column:nth-child(2) {
    margin-top: 50px;
  }
  padding: 0px;
  margin: 0px;
  li {
    list-style: none;
    margin-bottom: 32px;
  }
  font-size: 26px;
  h2 {
    font-size: 2em;
  }
`
const GridItem = styled.div`
  /* max-width: 400px; */
  background: none !important;
  h3 {
    font-size: 1.2em;
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
    }
    const breakpointColumnsPosts = {
      default: 2,
      1100: 2,
      700: 1,
    }

    return (
      <Layout location={this.props.location} title={siteTitle} type="fullwidth">
        <SEO title="All posts" />
        <Header title="Hello, its Miguel Domenech">
          <p>
            I'm a Spanish marketeer currently based in Amsterdam,{" "}
            <mark>I help startups to achieve their goals online.</mark>
          </p>
        </Header>

        <Grid id="whatIDo">
          <div className="intro">
            <h2>Some things I can do for your business!</h2>
            <p>
              Online marketing well done bring a lot of benefits to your
              business health. And you can hire me per hours, so with low
              commitment the ROI is huge!
            </p>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsPosts}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <GridItem>
              <h3>Market fit.</h3>
              <p>
                Who is the best match for your product? If you would know it,
                your efforts and future product development would be much
                clearer.
              </p>
            </GridItem>
            <GridItem>
              <h3>Channel Validation.</h3>
              <p>
                There are no rules on which channels work for which companies.
                Seo, Mail, Affiliates, Social, paid media... They are all valid
                channels that work sometimes, depending on stage of the funnel.
                <br />I have experience combining them, to achieve the lowest
                holistic costs.
              </p>
            </GridItem>
          </Masonry>
        </Grid>
        <Grid id="howIDo">
          <div className="intro">
            <h2>Some things I do for work regularly.</h2>
            <p>
              I believe that to create a succesful marketing plan, you need to
              have a broad view of the options. The areas where I am more
              confident about are:
            </p>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsPosts}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <GridItem>
              <h3>Advanced event tracking</h3>
              <p>
                Apart from UI/UX I have extensive experience in AB testing,
                across full webs or isolated landing pages. With experience in
                different message positioning and left brain iterations
              </p>
            </GridItem>
            <GridItem>
              <h3>Web Design.</h3>
              <p>
                As a front end developer I'm used working with html5 (html,
                javascript and css). Also I'm a React developer and I have more
                than a year developing Wordpress themes, Shopify and currently
                developing Growth frameworks in Gatsby js.
              </p>
            </GridItem>
            <GridItem>
              <h3>Web Development</h3>
              <p>
                I help companies understand the behaviour of their audience. I
                use to work with event based analytics, using Google Tag Manager
                to integrate events for Google Analytics, Mixpanel and all
                social ads platforms (facebook, pinterest, linkedIn ...)
              </p>
            </GridItem>
            <GridItem>
              <p></p>
            </GridItem>
            <GridItem>
              <h3>Data visualization</h3>
              <p></p>
            </GridItem>
            <GridItem>
              <h3>Social (organic and paid)</h3>
              <p></p>
            </GridItem>
            <GridItem>
              <h3>Technical SEO</h3>
              <p></p>
            </GridItem>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article key={node.fields.slug}>
                  {/* <header> */}
                  <h3 style={{ fontSize: "70px" }}>
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  {/* </header> */}
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
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
    allFile(
      filter: {
        relativePath: { regex: "/^onethingaday/" }
        extension: { eq: "jpg" }
      }
      sort: { fields: relativePath, order: DESC }
    ) {
      nodes {
        relativePath
        relativeDirectory
        childImageSharp {
          fixed(width: 400) {
            src
          }
          original {
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
