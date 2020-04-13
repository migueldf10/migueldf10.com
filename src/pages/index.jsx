import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import Img from 'gatsby-image'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'
import ArticleGridItem from '../components/articleGridItem'
import PortfolioGridItem from '../components/portfolioGridItem'

const ImageWrapper = styled.div`
	.gatsby-image-wrapper {
		height: 70vh;
	}
	width: 40%;
	position: sticky;
	top: 32px;
	margin: 0 0 auto 0;
	${MEDIA.PHONE`
		width: 100%;
		padding:16px;
		position: static;
		text-align: center;
		margin: 32px auto;
		.gatsby-image-wrapper {
		height: 40vh;
		}

  	`}
`

const Container = styled.div`
	padding: 100px 0px;
	background: ${props => props.theme.bg};
`

const Content = styled.div`
	max-width: 1080px;
	margin: auto;
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: ${props => props.theme.bgLight};

	/* margin: auto; */

	.blogPosts {
		width: 60%;
		display: inline-block;
		padding-left: 32px;
	}
	${MEDIA.TABLET`
		flex-direction: column;
		.blogPosts{
			padding:16px;
			width: auto;
			box-sizing: border-box;
		}
	`}
`

const PortfolioGrid = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 32px;
`
class BlogIndex extends React.Component {
	render() {
		const { data } = this.props
		const siteTitle = data.site.siteMetadata.title
		const posts = data.articles.edges
		const portfolios = data.portfolio.edges

		return (
			<Layout
				location={this.props.location}
				title={siteTitle}
				type="fullwidth"
			>
				<SEO title="All posts" />
				<Header title="Hello, its Miguel Domenech">
					<p>
						A freelance web designer & web developer living in
						Amsterdam.
					</p>
				</Header>
				<Container>
					<PortfolioGrid>
						<h2>Portfolio</h2>
						{portfolios.map(({ node }) => {
							return (
								<PortfolioGridItem
									key={node.fields.slug}
									node={node}
								/>
							)
						})}
					</PortfolioGrid>
				</Container>
				<Container>
					<Content>
						<ImageWrapper>
							<Img
								fluid={data.profileImg.childImageSharp.fluid}
							/>
						</ImageWrapper>

						<div className="blogPosts">
							<h2>Blog</h2>
							{posts.map(({ node }) => {
								return (
									<ArticleGridItem
										key={node.fields.slug}
										node={node}
									/>
								)
							})}
						</div>
					</Content>
				</Container>
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
		articles: allMarkdownRemark(
			filter: { frontmatter: { type: { ne: "photobook" } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
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
		portfolio: allMarkdownRemark(
			filter: { frontmatter: { type: { eq: "photobook" } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
						tags
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
		}
	}
`
