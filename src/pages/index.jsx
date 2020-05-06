import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import Img from 'gatsby-image'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'
import ArticleGridItem from '../components/articleGridItem'
import {
	mapEdgesToNodes,
	filterOutDocsWithoutSlugs,
	filterOutDocsPublishedInTheFuture,
} from '../lib/helpers'
import ProjectPreviewGrid from '../components/project-preview-grid'

const ImageWrapper = styled.div`
	.gatsby-image-wrapper {
		height: 70vh;
	}
	width: 40%;
	position: sticky;
	top: 32px;
	margin: 0 0 auto 0;
	${MEDIA.TABLET`
		display:none;

  	`}
	${MEDIA.PHONE`
	display: block;
		width: 100%;
		padding:16px;
		position: static;
		text-align: center;
		margin: 0px auto;
		.gatsby-image-wrapper {
			height: 60vh;
		}

  	`}
`

const Container = styled.div`
	padding: 100px 1rem;
	background: ${props => props.theme.bg};
	${MEDIA.TABLET`
		margin: 100px 3rem;
		`}
	${MEDIA.PHONE`
		margin: 0;
		
	`}
`

const BlogWrapper = styled.div`
	max-width: 1080px;
	margin: 32px auto;
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: ${props => props.theme.bgLight};

	/* margin: auto; */

	.blogPosts {
		width: 60%;
		display: inline-block;
		padding: 0 16px;
	}
	${MEDIA.TABLET`
		flex-direction: column-reverse;
		.blogPosts{
			padding:16px;
			width: auto;
			box-sizing: border-box;
		}
	`}
`

const SectionTitle = styled.div`
	padding: 0 32px;
	h2 {
		text-align: center;
		margin: 0px;
		font-size: 2rem;
		font-variation-settings: 'wdth' 200, 'wght' 300, 'XOPQ' 200, 'YOPQ' 94,
			'YTAS' 900, 'YTUC' 900, 'YTLC' 420;
		color: ${props => props.theme.fgLight};
	}
	${MEDIA.PHONE`
		h2{
			font-size: 1.6rem;

		}
	`}
`

class BlogIndex extends React.Component {
	render() {
		const { data } = this.props
		const siteTitle = data.site.siteMetadata.title

		const projectNodes = (data || {}).projects
			? mapEdgesToNodes(data.projects)
					.filter(filterOutDocsWithoutSlugs)
					.filter(filterOutDocsPublishedInTheFuture)
			: []
		const articleNodes = (data || {}).articles
			? mapEdgesToNodes(data.articles)
					.filter(filterOutDocsWithoutSlugs)
					.filter(filterOutDocsPublishedInTheFuture)
			: []

		return (
			<Layout
				location={this.props.location}
				title={siteTitle}
				type="fullwidth"
			>
				<SEO title="migueldf10's freelance website" />
				<Header title="Hello, it's Miguel Domenech">
					<p>
						A freelance web designer, developer and marketer living
						in Amsterdam.
					</p>
				</Header>
				<Container>
					<SectionTitle>
						<h2>Latest Projects</h2>
					</SectionTitle>
					<ProjectPreviewGrid
						nodes={projectNodes}
						browseMoreHref="/archive/"
					/>
				</Container>
				<Container>
					<SectionTitle>
						<h2>Blog</h2>
					</SectionTitle>
					<BlogWrapper>
						<ImageWrapper>
							<Img
								fluid={data.profileImg.childImageSharp.fluid}
							/>
						</ImageWrapper>

						<div className="blogPosts">
							{articleNodes &&
								articleNodes.map((node, index) => (
									<ArticleGridItem key={index} {...node} />
								))}
						</div>
					</BlogWrapper>
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

		projects: allSanityProject(
			limit: 6
			sort: { fields: [publishedAt], order: DESC }
			filter: {
				slug: { current: { ne: null } }
				publishedAt: { ne: null }
			}
		) {
			edges {
				node {
					id
					categories {
						_id
						title
					}
					mainImage {
						crop {
							_key
							_type
							top
							bottom
							left
							right
						}
						hotspot {
							_key
							_type
							x
							y
							height
							width
						}
						asset {
							_id
						}
						alt
					}
					title
					_rawExcerpt
					slug {
						current
					}
				}
			}
		}
		articles: allSanityArticle(
			limit: 6
			sort: { fields: [publishedAt], order: DESC }
			filter: {
				slug: { current: { ne: null } }
				publishedAt: { ne: null }
			}
		) {
			edges {
				node {
					id
					_rawExcerpt
					categories {
						_id
						title
					}
					mainImage {
						crop {
							_key
							_type
							top
							bottom
							left
							right
						}
						hotspot {
							_key
							_type
							x
							y
							height
							width
						}
						asset {
							_id
						}
						alt
					}
					title
					_rawExcerpt
					publishedAt
					slug {
						current
					}
				}
			}
		}
	}
`
