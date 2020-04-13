import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import ArticleNavigation from '../components/articleNavigation'

const ArticleContainer = styled.article`
	background: ${props => props.theme.bg};
	padding: 1rem;
`

const Header = styled.header`
	margin-bottom: 3rem;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	width: 100%;
	box-sizing: border-box;
	background: white;
	h1 {
		font-variation-settings: 'wdth' 200, 'wght' 700;
		letter-spacing: -4px;
	}
	${MEDIA.TABLET`
		flex-direction: column;
	`};
	.column {
		display: block;
		height: auto;
		width: 50%;
		&.column-one {
			padding-left: 0.5rem;
		}
		&.column-two {
			padding-right: 0.5rem;
		}
	}
	${MEDIA.TABLET`
		.column{
			width: 100%;
		}
	`};
`

const ArticleBody = styled.div`
	max-width: 40rem;
	margin: auto;
`

class BlogPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark
		const siteTitle = this.props.data.site.siteMetadata.title

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title={post.frontmatter.title}
					description={post.frontmatter.description || post.excerpt}
				/>
				<ArticleContainer>
					<Header>
						<div className="column column-one">
							<h1>{post.frontmatter.title}</h1>
							<blockquote>
								{post.frontmatter.description || post.excerpt}
							</blockquote>
							<p>
								Article by Miguel Domenech{' '}
								{post.frontmatter.date}
							</p>
						</div>
						<div className="column column-two">
							<Img
								fluid={
									post.frontmatter.img.childImageSharp.fluid
								}
							/>
						</div>
					</Header>
					<ArticleBody
						dangerouslySetInnerHTML={{ __html: post.html }}
					/>
					<ArticleNavigation {...this.props.pageContext} />
				</ArticleContainer>
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
				tags
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
