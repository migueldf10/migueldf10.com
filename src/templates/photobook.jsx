import React from 'react'
import { graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import Header from '../components/header'
import ArticleNavigation from '../components/articleNavigation'

const Article = styled.article`
	img {
		width: auto;
		height: auto;
	}
	.gatsby-resp-image-wrapper {
		width: 100%;
		/* height: 80vh; */
		margin-bottom: 120px;
		img {
			height: auto !important;
		}
	}
	.gatsby-resp-image-background-image {
		max-width: 100%;
		max-height: 80vh;
		display: block;
		margin: 0px;
	}
	.gatsby-resp-image-image {
		/* top: 50%;
        left: 50%;
        transform: translate(-50%,-50%); */
		width: auto;
		height: auto;
		max-height: 80vh;
	}
	section {
		h1,
		h2,
		h3,
		h4,
		h5 {
			display: block;
			min-height: 30vh;
			max-width: 50%;
			margin: auto;
			${MEDIA.PHONE`
        max-width: 90%;
        margin-bottom: 32px;

        `}
		}
	}
	${MEDIA.PHONE`
    .gatsby-resp-image-wrapper{
        height: 60vh;
        margin-bottom: 32px;
    }
    .gatsby-resp-image-background-image{
        max-height: 60vh;

    }
    .gatsby-resp-image-image{
        max-height: 60vh;
    }
    section{

      p,h1,h2,h3,h4,h5,span{
        min-height: 30vh;
      }
    }
  `}
`
class PhotobookTemplate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollTop: 0,
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll = ev => {
		let scrollTopVal = window.scrollY
		this.setState({
			scrollTop: scrollTopVal,
		})
	}

	render() {
		const post = this.props.data.markdownRemark
		const siteTitle = this.props.data.site.siteMetadata.title
		const { previous, next } = this.props.pageContext

		return (
			<Layout
				location={this.props.location}
				title={siteTitle}
				type="fullwidth"
			>
				<SEO
					title={post.frontmatter.title}
					description={post.frontmatter.description || post.excerpt}
				/>
				<Article>
					<Header
						title={post.frontmatter.title}
						subtitle={post.frontmatter.description || post.excerpt}
						date={post.frontmatter.date}
					/>
					<section dangerouslySetInnerHTML={{ __html: post.html }} />
					<footer>
						<Bio />
					</footer>
				</Article>
				<ArticleNavigation previous={previous} next={next} />
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
						fluid(maxWidth: 2600, maxHeight: 2600) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`
